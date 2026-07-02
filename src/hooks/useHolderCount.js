import { useState, useEffect, useRef } from 'react';

/**
 * useHolderCount — Obtiene el número REAL de holders del token TUNG en BSC.
 * Estrategia multi-fuente con fallbacks:
 *   1. BSCScan API (gratis, 5 calls/seg)
 *   2. Moralis API (backup)
 *   3. Fallback estático
 *
 * Se actualiza automáticamente cada 1 hora.
 */

const CONTRACT = '0x09514EcF8270C12101D077B5e8B034B164F71C5f';
const CHAIN = 'bsc';

// BSCScan API key gratuita (regístrate en https://bscscan.com/apis)
const BSCSCAN_API_KEY = 'YourApiKeyToken'; // Puedes obtener una gratis en bscscan.com

// Moralis API key (backup)
const MORALIS_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImI2NzMzY2E5LTA4YWUtNDQ5Zi1iZjc0LTAzMTFkMGJmNmRjYiIsIm9yZ0lkIjoiNTE3OTcxIiwidXNlcklkIjoiNTMzMDUyIiwidHlwZUlkIjoiYWJmMDU4NGYtNDA0YS00MmY0LTliYTQtNmViYTRiM2RjMGNhIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3ODAwMTc2NzksImV4cCI6NDkzNTc3NzY3OX0.eO6Ijnmnd36wzpCV6QI2SC4-IylGcL6O936BjpHyCLI';

/**
 * Intenta obtener holders desde BSCScan (requiere API key gratuita)
 */
async function fetchFromBscScan() {
  // Si no hay API key configurada, saltar
  if (!BSCSCAN_API_KEY || BSCSCAN_API_KEY === 'YourApiKeyToken') {
    throw new Error('No BSCScan API key');
  }

  // Usamos tokenholderlist con offset=1 solo para obtener el total
  // BSCScan no devuelve el total directamente, pero podemos inferirlo
  // Usamos un approach diferente: obtenemos la primera página con offset grande
  const url = `https://api.bscscan.com/api?module=token&action=tokenholderlist&contractaddress=${CONTRACT}&page=1&offset=10000&apikey=${BSCSCAN_API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.status === '1' && Array.isArray(data.result)) {
    // Contamos los holders reales
    const count = data.result.length;
    // Si hay exactamente 10000, probablemente hay más
    if (count >= 10000) {
      return count.toLocaleString() + '+';
    }
    return count.toLocaleString();
  }
  throw new Error('BSCScan failed: ' + (data.message || 'unknown'));
}

/**
 * Intenta obtener holders desde Moralis (backup)
 */
async function fetchFromMoralis() {
  if (!MORALIS_API_KEY || MORALIS_API_KEY.startsWith('PEGA_TU')) {
    throw new Error('No Moralis API key');
  }

  // Probamos el endpoint /stats primero (más ligero)
  try {
    const statsUrl = `https://deep-index.moralis.io/api/v2.2/erc20/${CONTRACT}/stats?chain=${CHAIN}`;
    const statsRes = await fetch(statsUrl, {
      headers: { 'Accept': 'application/json', 'X-API-Key': MORALIS_API_KEY },
    });
    const statsData = await statsRes.json();

    if (statsData && statsData.total_holders !== undefined) {
      return Number(statsData.total_holders).toLocaleString();
    }
    if (statsData && statsData.holders !== undefined) {
      return Number(statsData.holders).toLocaleString();
    }
  } catch {
    // Continuar con el siguiente método
  }

  // Plan B: endpoint /owners sin limit para obtener total del cursor
  const url = `https://deep-index.moralis.io/api/v2.2/erc20/${CONTRACT}/owners?chain=${CHAIN}&disable_total=false`;

  const res = await fetch(url, {
    headers: { 'Accept': 'application/json', 'X-API-Key': MORALIS_API_KEY },
  });
  const data = await res.json();

  // Intentar obtener total de varias formas posibles
  if (data && data.total !== undefined && data.total !== null && data.total !== '') {
    return Number(data.total).toLocaleString();
  }
  if (data && data.total_holders !== undefined && data.total_holders !== null && data.total_holders !== '') {
    return Number(data.total_holders).toLocaleString();
  }
  // Contar resultados si vino array
  if (Array.isArray(data.result)) {
    const count = data.result.length;
    if (count > 0) {
      // Si page_size > count, tenemos todos los resultados
      if (data.page_size && count < data.page_size) {
        return count.toLocaleString();
      }
      // Si hay cursor o total, probablemente hay más páginas
      if (data.cursor || (data.total && Number(data.total) > count)) {
        return (data.total || count).toLocaleString() + '+';
      }
      return count.toLocaleString();
    }
  }
  // Intentar obtener del header o cursor info
  if (data && data.page_size && data.total) {
    return Number(data.total).toLocaleString();
  }

  throw new Error('No holder data in Moralis response');
}

export default function useHolderCount() {
  const [count, setCount] = useState('...');
  const [error, setError] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const fetchHolders = async () => {
      try {
        // Intentar BSCScan primero (más preciso)
        try {
          const result = await fetchFromBscScan();
          if (!cancelled) { setCount(result); setError(false); return; }
        } catch {
          // BSCScan falló, intentar Moralis
        }

        // Intentar Moralis
        const result = await fetchFromMoralis();
        if (!cancelled) { setCount(result); setError(false); }
      } catch {
        if (!cancelled) {
          setError(true);
          // Mantener el último valor conocido si existe
          setCount(prev => prev === '...' ? '...' : prev);
        }
      }
    };

    fetchHolders();
    intervalRef.current = setInterval(fetchHolders, 60 * 60 * 1000);

    return () => {
      cancelled = true;
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return { count, error };
}


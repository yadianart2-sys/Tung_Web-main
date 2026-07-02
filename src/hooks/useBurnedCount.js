import { useState, useEffect, useRef } from 'react';

/**
 * useBurnedCount — Obtiene la cantidad de tokens TUNG quemados (enviados a la dead address)
 * desde la BSC usando RPC público (sin API key).
 * Se actualiza automáticamente cada 1 hora.
 *
 * La dead address de BSC: 0x000000000000000000000000000000000000dead
 * Contrato TUNG: 0x09514EcF8270C12101D077B5e8B034B164F71C5f
 */

const CONTRACT = '0x09514EcF8270C12101D077B5e8B034B164F71C5f';
const DEAD_ADDRESS = '0x000000000000000000000000000000000000dead';
const DECIMALS = 18;

// balanceOf(address) => 0x70a08231 + padded address (32 bytes)
const BALANCE_OF_SIG = '0x70a08231';
function encodeBalanceOf(address) {
  // Remove 0x prefix and pad to 64 chars (32 bytes)
  const clean = address.replace('0x', '').toLowerCase();
  return BALANCE_OF_SIG + '000000000000000000000000' + clean;
}

// Múltiples RPCs públicos de BSC para redundancia
const RPCS = [
  'https://bsc-dataseed.binance.org/',
  'https://bsc-dataseed1.defibit.io/',
  'https://bsc-dataseed1.ninicoin.io/',
  'https://bsc-dataseed2.binance.org/',
];

async function tryFetch(rpcUrl, data) {
  const res = await fetch(rpcUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'eth_call',
      params: [
        { to: CONTRACT, data: data },
        'latest',
      ],
    }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  if (json.error) throw new Error(json.error.message || 'RPC error');
  return json.result;
}

async function fetchBurnedAmount() {
  const data = encodeBalanceOf(DEAD_ADDRESS);

  // Intentar con cada RPC hasta que uno funcione
  for (const rpc of RPCS) {
    try {
      const result = await tryFetch(rpc, data);
      // result es un hex string del balance en wei
      const balanceWei = BigInt(result);
      // Convertir a número legible (dividir por 10^18)
      const burned = Number(balanceWei) / 10 ** DECIMALS;
      return Math.floor(burned).toLocaleString();
    } catch {
      // Intentar siguiente RPC
      continue;
    }
  }
  throw new Error('All RPCs failed');
}

const FALLBACK = '2,000,000+';

export default function useBurnedCount() {
  const [count, setCount] = useState('...');
  const [error, setError] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        const result = await fetchBurnedAmount();
        if (!cancelled) {
          setCount(result);
          setError(false);
        }
      } catch {
        if (!cancelled) {
          // Usar fallback si falla
          setCount(FALLBACK);
          setError(true);
        }
      }
    };

    // Primera carga
    fetchData();

    // Actualizar cada 1 hora
    intervalRef.current = setInterval(fetchData, 60 * 60 * 1000);

    return () => {
      cancelled = true;
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return { count, error };
}

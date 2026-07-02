import { useState, useEffect, useRef } from 'react';

/**
 * useStakingInfo — Obtiene datos en vivo del contrato de staking TUNG en BSC.
 * 
 * Contrato Staking: 0x3eAea8Ec63B80e8F87dc2e97CEEAcB953047638C
 * Plataforma: https://swap.falcox.net/staking
 * 
 * Métricas:
 *  - totalStaked: cantidad de tokens TUNG en staking
 *  - apr: APR estimado del pool
 *  - totalRewards: recompensas totales depositadas
 * 
 * Se actualiza cada 1 hora.
 */

const STAKING_CONTRACT = '0x3eAea8Ec63B80e8F87dc2e97CEEAcB953047638C';
const TUNG_DECIMALS = 18;

// ABI mínimo para interactuar con SmartChefDynamicCoreDAO
const STAKING_ABI = [
  // stakedTokenAmount() → uint256
  {
    "inputs": [],
    "name": "stakedTokenAmount",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  // getEstimatedAPY() → uint256 (basis points: 10000 = 100%)
  {
    "inputs": [],
    "name": "getEstimatedAPY",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  // totalRewardTokensDeposited() → uint256  (obsoleto, usar getAvailableRewardTokens)
  {
    "inputs": [],
    "name": "getAvailableRewardTokens",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  // rewardPerBlock() → uint256
  {
    "inputs": [],
    "name": "rewardPerBlock",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
];

// RPCs públicos de BSC
const RPCS = [
  'https://bsc-dataseed.binance.org/',
  'https://bsc-dataseed1.defibit.io/',
  'https://bsc-dataseed1.ninicoin.io/',
  'https://bsc-dataseed2.binance.org/',
];

function encodeCall(abi, method, params = []) {
  // Selectores keccak256 pre-calculados correctos
  const SELECTORS = {
    'stakedTokenAmount': '0x9c367bc2',
    'getEstimatedAPY': '0xccaad55d',
    'getAvailableRewardTokens': '0x7c511456',
  };
  return SELECTORS[method] || '0x';
}

function decodeUint256(hex) {
  if (!hex || hex === '0x' || hex === '0x0') return 0n;
  return BigInt(hex);
}

async function callContract(method, rpcUrl) {
  const data = encodeCall(STAKING_ABI, method);
  const res = await fetch(rpcUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'eth_call',
      params: [{ to: STAKING_CONTRACT, data }, 'latest'],
    }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  if (json.error) throw new Error(json.error.message || 'RPC error');
  return decodeUint256(json.result);
}

async function fetchStakingData() {
  for (const rpc of RPCS) {
    try {
      const [stakedRaw, apyRaw, rewardsRaw] = await Promise.all([
        callContract('stakedTokenAmount', rpc),
        callContract('getEstimatedAPY', rpc),
        callContract('getAvailableRewardTokens', rpc),
      ]);

      // Convertir de wei a número legible
      const staked = Number(stakedRaw) / 10 ** TUNG_DECIMALS;
      const rewards = Number(rewardsRaw) / 10 ** TUNG_DECIMALS;
      // APY viene en basis points (10000 = 100%)
      const apr = Number(apyRaw) / 100;

      return {
        totalStaked: staked > 0 ? formatCompact(staked) : '0',
        apr: apr > 0 ? apr.toFixed(2) + '%' : (apyRaw > 0n ? '<0.01%' : 'Coming Soon'),
        totalRewards: rewards > 0 ? formatCompact(rewards) : (rewardsRaw > 0n ? formatCompact(rewards) : '0'),
        error: false,
      };
    } catch {
      continue;
    }
  }
  return { totalStaked: '...', apr: '...', totalRewards: '...', error: true };
}

function formatCompact(num) {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(2) + 'B';
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(2) + 'M';
  if (num >= 1_000) return (num / 1_000).toFixed(2) + 'K';
  return num < 1 ? num.toFixed(6) : num.toLocaleString(undefined, { maximumFractionDigits: 0 });
}

export default function useStakingInfo() {
  const [data, setData] = useState({ totalStaked: '...', apr: '...', totalRewards: '...', error: false });
  const intervalRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      const result = await fetchStakingData();
      if (!cancelled) setData(result);
    };

    fetchData();
    intervalRef.current = setInterval(fetchData, 60 * 60 * 1000);

    return () => {
      cancelled = true;
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return data;
}

"use client";

const NETWORKS = {
  eth: {
    id: 'eth',
    name: 'اتریوم',
    symbol: 'ETH',
    color: 'from-blue-500 to-blue-600',
    explorer: 'https://etherscan.io',
    api: '/api/eth/txs'
  },
  bsc: {
    id: 'bsc',
    name: 'BNB Smart Chain',
    symbol: 'BNB',
    color: 'from-yellow-500 to-yellow-600',
    explorer: 'https://bscscan.com',
    api: '/api/bsc/txs'
  },
  arbitrum: {
    id: 'arbitrum',
    name: 'Arbitrum One',
    symbol: 'ETH',
    color: 'from-blue-400 to-cyan-500',
    explorer: 'https://arbiscan.io',
    api: '/api/arbitrum/txs'
  },
  optimism: {
    id: 'optimism',
    name: 'Optimism',
    symbol: 'ETH',
    color: 'from-red-500 to-pink-500',
    explorer: 'https://optimistic.etherscan.io',
    api: '/api/optimism/txs'
  }
};

export default function NetworkSelector({ selectedNetwork, onNetworkChange }) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-slate-300">
        انتخاب شبکه
      </label>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {Object.values(NETWORKS).map((network) => (
          <button
            key={network.id}
            onClick={() => onNetworkChange(network.id)}
            className={`
              relative p-4 rounded-xl border-2 transition-all duration-200
              ${
                selectedNetwork === network.id
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-slate-700 hover:border-slate-600 bg-slate-800/50'
              }
            `}
          >
            <div className="flex flex-col items-center space-y-2">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${network.color} flex items-center justify-center`}>
                <span className="text-white font-bold text-xs">
                  {network.symbol.slice(0, 2)}
                </span>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-slate-200">
                  {network.name}
                </div>
                <div className="text-xs text-slate-400">
                  {network.symbol}
                </div>
              </div>
            </div>
            {selectedNetwork === network.id && (
              <div className="absolute top-2 left-2 w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export { NETWORKS };

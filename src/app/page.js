'use client';

import { useState } from 'react';
import AddressForm from '@/components/AddressForm';
import TransactionsTable from '@/components/TransactionsTable';
import NetworkSelector from '@/components/NetworkSelector';
import LoadingSpinner from '@/components/LoadingSpinner';

const networks = {
  '1': { name: 'Ethereum', symbol: 'ETH', color: 'blue', explorer: 'https://etherscan.io' },
  '56': { name: 'BNB Smart Chain', symbol: 'BNB', color: 'yellow', explorer: 'https://bscscan.com' },
  '42161': { name: 'Arbitrum', symbol: 'ETH', color: 'blue', explorer: 'https://arbiscan.io' },
  '10': { name: 'Optimism', symbol: 'ETH', color: 'red', explorer: 'https://optimistic.etherscan.io' }
};

export default function Home() {
  const [selectedNetwork, setSelectedNetwork] = useState('1');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentAddress, setCurrentAddress] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const fetchTransactions = async (address, page = 1) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`/api/transactions?address=${address}&chainId=${selectedNetwork}&page=${page}`);
      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
        setTransactions([]);
      } else {
        setTransactions(data.result || []);
        setCurrentAddress(address);
        setCurrentPage(page);
      }
    } catch (err) {
      setError('خطا در دریافت اطلاعات');
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleNetworkChange = (networkId) => {
    setSelectedNetwork(networkId);
    if (currentAddress) {
      fetchTransactions(currentAddress, 1);
    }
  };

  const handlePageChange = (page) => {
    if (currentAddress) {
      fetchTransactions(currentAddress, page);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            🔍 ردیاب تراکنش‌های کریپتو
          </h1>
          <p className="text-gray-300 text-lg">
            تاریخچه تراکنش‌های کیف پول خود را در شبکه‌های مختلف مشاهده کنید
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
            <NetworkSelector 
              networks={networks}
              selectedNetwork={selectedNetwork}
              onNetworkChange={handleNetworkChange}
            />
            
            <AddressForm 
              onSubmit={(address) => fetchTransactions(address, 1)}
              loading={loading}
            />
          </div>

          {loading && (
            <div className="flex justify-center mb-8">
              <LoadingSpinner />
            </div>
          )}

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-8 text-center">
              <p className="text-red-200">{error}</p>
            </div>
          )}

          {transactions.length > 0 && (
            <TransactionsTable 
              transactions={transactions}
              network={networks[selectedNetwork]}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useMemo } from "react";
import AddressForm from "../components/AddressForm";
import TransactionsTable from "../components/TransactionsTable";
import LoadingSpinner from "../components/LoadingSpinner";
import NetworkSelector, { NETWORKS } from "../components/NetworkSelector";

export default function HomePage() {
  const [selectedNetwork, setSelectedNetwork] = useState('eth');
  const [address, setAddress] = useState("");
  const [txs, setTxs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 25;

  const hasData = useMemo(() => txs && txs.length > 0, [txs]);
  const currentNetwork = NETWORKS[selectedNetwork];

  const fetchTxs = async (addr, p = 1, network = selectedNetwork) => {
    try {
      setLoading(true);
      setError("");
      
      const apiUrl = NETWORKS[network].api;
      const res = await fetch(`${apiUrl}?address=${addr}&page=${p}&pageSize=${pageSize}`, {
        cache: "no-cache"
      });
      
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || "خطا در دریافت اطلاعات");
      }
      
      const data = await res.json();
      setTxs(data.result || []);
    } catch (e) {
      setTxs([]);
      setError(e.message || "خطای ناشناخته رخ داد");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (addr) => {
    setAddress(addr);
    setPage(1);
    fetchTxs(addr, 1, selectedNetwork);
  };

  const handleNetworkChange = (networkId) => {
    setSelectedNetwork(networkId);
    setTxs([]);
    setError("");
    setPage(1);
    // اگر آدرسی وارد شده، دوباره جستجو کن
    if (address) {
      fetchTxs(address, 1, networkId);
    }
  };

  const handlePageChange = (nextPage) => {
    const p = Math.max(1, nextPage);
    setPage(p);
    fetchTxs(address, p, selectedNetwork);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          رهگیری تراکنش‌های چند شبکه‌ای
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          تاریخچه کامل تراکنش‌های کیف پول خود را در شبکه‌های مختلف مشاهده کنید
        </p>
      </div>

      {/* انتخاب شبکه */}
      <div className="card p-6 sm:p-8">
        <NetworkSelector 
          selectedNetwork={selectedNetwork} 
          onNetworkChange={handleNetworkChange} 
        />
      </div>

      {/* فرم جستجو */}
      <div className="card p-6 sm:p-8">
        <AddressForm 
          onSearch={handleSearch} 
          loading={loading} 
          selectedNetwork={selectedNetwork}
        />
      </div>

      {/* نتایج */}
      <div className="card p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <div className={`w-5 h-5 rounded bg-gradient-to-r ${currentNetwork.color}`}></div>
            تراکنش‌های {currentNetwork.name}
          </h2>
          {address && (
            <div className="text-xs sm:text-sm text-slate-400 truncate max-w-[60%]">
              <span className="hidden sm:inline">آدرس: </span>
              <code className="bg-slate-900 px-2 py-1 rounded text-blue-300" dir="ltr">
                {address.slice(0, 6)}...{address.slice(-4)}
              </code>
            </div>
          )}
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-400 mb-2">⚠️ خطا</div>
            <div className="text-slate-300">{error}</div>
            <button 
              onClick={() => address && fetchTxs(address, page, selectedNetwork)}
              className="btn mt-4"
            >
              تلاش مجدد
            </button>
          </div>
        ) : hasData ? (
          <>
            <TransactionsTable items={txs} network={currentNetwork} />
            <div className="mt-6 flex items-center justify-between">
              <button
                className="btn"
                onClick={() => handlePageChange(page - 1)}
                disabled={page <= 1 || loading}
              >
                ← صفحه قبل
              </button>
              <span className="text-slate-300 text-sm bg-slate-900 px-3 py-1 rounded-lg">
                صفحه {new Intl.NumberFormat('fa-IR').format(page)}
              </span>
              <button
                className="btn"
                onClick={() => handlePageChange(page + 1)}
                disabled={loading || txs.length < pageSize}
              >
                صفحه بعد →
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-16 space-y-4">
            <div className="text-6xl">🔍</div>
            <div className="text-slate-400">
              برای شروع، آدرس کیف پول خود را در شبکه {currentNetwork.name} وارد کنید
            </div>
            <div className="text-xs text-slate-500" dir="ltr">
              نمونه: 0x00000000219ab540356cBB839Cbe05303d7705Fa
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

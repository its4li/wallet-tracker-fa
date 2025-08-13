"use client";

import { useState } from "react";
import { isAddress } from "ethers";

export default function AddressForm({ onSearch, loading }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    setError("");

    const trimmed = input.trim();
    if (!isAddress(trimmed)) {
      setError("آدرس واردشده معتبر نیست. لطفاً آدرس اتریوم صحیح وارد کنید.");
      return;
    }
    
    onSearch(trimmed);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (error) setError(""); // Clear error when user starts typing
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          آدرس کیف پول (اتریوم)
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <input
              className={`input ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="0x00000000219ab540356cBB839Cbe05303d7705Fa"
              value={input}
              onChange={handleInputChange}
              dir="ltr"
              disabled={loading}
            />
          </div>
          <button 
            type="submit" 
            className="btn flex items-center gap-2 min-w-[140px] justify-center"
            disabled={loading || !input.trim()}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                در حال جستجو...
              </>
            ) : (
              <>
                🔍 نمایش تراکنش‌ها
              </>
            )}
          </button>
        </div>
      </div>
      
      {error && (
        <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">
          {error}
        </div>
      )}
      
      <div className="text-xs text-slate-500 space-y-1">
        <div>• تنها آدرس‌های اتریوم اصلی (Mainnet) پشتیبانی می‌شود</div>
        <div>• آدرس باید با 0x شروع شده و 42 کاراکتر باشد</div>
      </div>
    </form>
  );
}

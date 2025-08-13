"use client";

function formatDateFa(timestamp) {
  try {
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(timestamp * 1000));
  } catch {
    return new Date(timestamp * 1000).toLocaleString("fa-IR");
  }
}

function formatNumberFa(value, decimals = 6) {
  try {
    return new Intl.NumberFormat("fa-IR", {
      maximumFractionDigits: decimals,
      minimumFractionDigits: 0
    }).format(value);
  } catch {
    return value?.toString?.() ?? value;
  }
}

function shorten(addr, start = 6, end = 4) {
  if (!addr) return "—";
  return `${addr.slice(0, start)}...${addr.slice(-end)}`;
}

export default function TransactionsTable({ items }) {
  if (!items?.length) return null;

  return (
    <div className="space-y-4">
      <div className="hidden lg:block overflow-x-auto">
        <table className="table">
          <thead className="text-slate-300 bg-slate-900/50">
            <tr>
              <th className="rounded-r-lg">تاریخ و زمان</th>
              <th>هش تراکنش</th>
              <th>فرستنده</th>
              <th>گیرنده</th>
              <th>مقدار (ETH)</th>
              <th>کارمزد (ETH)</th>
              <th className="rounded-l-lg">وضعیت</th>
            </tr>
          </thead>
          <tbody className="text-slate-200">
            {items.map((tx) => (
              <tr key={tx.hash} className="border-t border-slate-700/50 hover:bg-slate-800/30 transition-colors">
                <td className="font-medium">{formatDateFa(tx.timeStamp)}</td>
                <td className="font-mono text-xs" dir="ltr">
                  <a
                    href={`https://etherscan.io/tx/${tx.hash}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                  >
                    {shorten(tx.hash, 8, 6)}
                  </a>
                </td>
                <td className="font-mono text-xs" dir="ltr">
                  <a
                    href={`https://etherscan.io/address/${tx.from}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                  >
                    {shorten(tx.from)}
                  </a>
                </td>
                <td className="font-mono text-xs" dir="ltr">
                  {tx.to ? (
                    <a
                      href={`https://etherscan.io/address/${tx.to}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                    >
                      {shorten(tx.to)}
                    </a>
                  ) : (
                    <span className="text-slate-500">Contract Creation</span>
                  )}
                </td>
                <td className="font-medium">{tx.valueEth > 0 ? formatNumberFa(tx.valueEth) : "0"}</td>
                <td className="text-slate-400">{formatNumberFa(tx.feeEth, 8)}</td>
                <td>
                  {tx.status === "success" ? (
                    <span className="badge badge-success">✓ موفق</span>
                  ) : (
                    <span className="badge badge-error">✗ ناموفق</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* کارت‌های موبایل */}
      <div className="lg:hidden space-y-4">
        {items.map((tx) => (
          <div key={tx.hash} className="card p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-400">{formatDateFa(tx.timeStamp)}</div>
              {tx.status === "success" ? (
                <span className="badge badge-success">✓ موفق</span>
              ) : (
                <span className="badge badge-error">✗ ناموفق</span>
              )}
            </div>

            <div className="space-y-2">
              <div>
                <span className="text-xs text-slate-500">هش:</span>
                <a
                  href={`https://etherscan.io/tx/${tx.hash}`}
                  target="_blank"
                  rel="noreferrer"
                  className="block font-mono text-xs text-blue-400 hover:underline"
                  dir="ltr"
                >
                  {tx.hash}
                </a>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-500">مقدار:</span>
                  <div className="font-medium">
                    {tx.valueEth > 0 ? `${formatNumberFa(tx.valueEth)} ETH` : "0 ETH"}
                  </div>
                </div>
                <div>
                  <span className="text-slate-500">کارمزد:</span>
                  <div className="text-slate-400">{formatNumberFa(tx.feeEth, 8)} ETH</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-xs text-slate-500 text-center bg-slate-900/30 rounded-lg p-3">
        نمایش {formatNumberFa(items.length)} تراکنش در این صفحه
      </div>
    </div>
  );
}

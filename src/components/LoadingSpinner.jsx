export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-4">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-slate-700 rounded-full"></div>
        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <div className="text-slate-400 animate-pulse-slow">
        در حال دریافت تراکنش‌ها...
      </div>
      <div className="text-xs text-slate-500">
        لطفاً شکیبا باشید
      </div>
    </div>
  );
}

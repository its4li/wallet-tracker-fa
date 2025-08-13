export const metadata = {
  title: "رهگیر تراکنش‌ها | اتریوم",
  description: "نمایش تاریخچه تراکنش‌های والت اتریوم به زبان فارسی",
  keywords: ["اتریوم", "تراکنش", "بلاک چین", "کیف پول", "رهگیری"]
};

import "../styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">
        <div className="min-h-screen">
          <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
            <div className="container py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">رت</span>
                </div>
                <h1 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  رهگیر تراکنش‌ها
                </h1>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                شبکه: اتریوم
              </div>
            </div>
          </header>
          <main className="container py-8">
            {children}
          </main>
          <footer className="container py-6 text-center">
            <div className="text-xs text-slate-500 border-t border-slate-800 pt-6">
              ساخته‌شده با ❤️ • Next.js + Tailwind
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

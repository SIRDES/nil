"use client";

export default function AdminTopbar() {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between h-16 px-8 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      {/* Search */}
      <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg px-4 py-2 border border-transparent focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all w-80">
        <span className="material-symbols-outlined text-slate-400 text-xl mr-2">search</span>
        <input
          type="text"
          placeholder="Search students, programs..."
          className="bg-transparent border-none focus:ring-0 focus:outline-none text-sm text-slate-700 dark:text-white placeholder:text-slate-400 w-full"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <span className="material-symbols-outlined text-xl">notifications</span>
          <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-700">
          <div className="flex flex-col items-end">
            <span className="text-sm font-semibold text-slate-900 dark:text-white">Admin User</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Administrator</span>
          </div>
          <div className="flex size-9 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">
            AU
          </div>
        </div>
      </div>
    </header>
  );
}

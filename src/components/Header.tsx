import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md px-6 py-4">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-white">
              <span className="material-symbols-outlined text-2xl">school</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Tech School</h2>
          </Link>
          <nav className="hidden md:flex flex-1 justify-center ml-8">
            <div className="flex items-center gap-8">
              <Link className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-white transition-colors" href="/programs/full-stack">Programs</Link>
              <Link className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-white transition-colors" href="/admissions">Admissions</Link>
              <Link className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-white transition-colors" href="/about">About Us</Link>
              <Link className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-white transition-colors" href="/contact">Contact</Link>
            </div>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/register" className="hidden sm:flex h-10 items-center justify-center rounded-full bg-primary px-6 text-sm font-bold text-white transition-all hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/30">
            Apply Now
          </Link>
          <button className="md:hidden p-2 text-slate-600 dark:text-slate-300">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}

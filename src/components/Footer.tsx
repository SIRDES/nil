import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-12 px-6">
      <div className="container mx-auto px-10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 dark:text-slate-400 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-xl">school</span>
            </div>
            <span className="text-lg font-bold text-slate-900 dark:text-white">Tech School</span>
          </div>
          <p>© 2024 Tech School Academy. All rights reserved.</p>
        </div>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

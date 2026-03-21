export function TableSkeleton({ rows = 5, cols = 5 }: { rows?: number; cols?: number }) {
 return (
 <div className="animate-pulse">
 {Array.from({ length: rows }).map((_, i) => (
 <div key={i} className="flex items-center gap-4 px-6 py-4 border-b border-slate-100">
 {Array.from({ length: cols }).map((_, j) => (
 <div key={j} className="flex-1">
 <div className={`h-4 rounded bg-slate-200 ${j === 0 ? 'w-3/4' : 'w-1/2'}`} />
 </div>
 ))}
 </div>
 ))}
 </div>
 );
}

export function CardGridSkeleton({ count = 6 }: { count?: number }) {
 return (
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
 {Array.from({ length: count }).map((_, i) => (
 <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden animate-pulse">
 <div className="h-36 bg-slate-200" />
 <div className="p-5 space-y-3">
 <div className="h-4 w-20 rounded bg-slate-200" />
 <div className="h-5 w-3/4 rounded bg-slate-200" />
 <div className="h-4 w-full rounded bg-slate-200" />
 <div className="pt-4 border-t border-slate-100 flex justify-between">
 <div className="h-4 w-16 rounded bg-slate-200" />
 <div className="h-4 w-16 rounded bg-slate-200" />
 </div>
 </div>
 </div>
 ))}
 </div>
 );
}

export function ErrorBanner({ message, onRetry }: { message: string; onRetry: () => void }) {
 return (
 <div className="flex flex-col items-center justify-center py-12 text-center">
 <span className="material-symbols-outlined text-4xl text-slate-300 mb-3">error_outline</span>
 <p className="text-sm text-slate-500 mb-3">{message}</p>
 <button
 onClick={onRetry}
 className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors"
 >
 Try Again
 </button>
 </div>
 );
}

export function EmptyState({ icon, title, subtitle }: { icon: string; title: string; subtitle: string }) {
 return (
 <div className="flex flex-col items-center justify-center py-16 text-center">
 <span className="material-symbols-outlined text-5xl text-slate-300 mb-3">{icon}</span>
 <h3 className="text-lg font-bold text-slate-900 mb-1">{title}</h3>
 <p className="text-sm text-slate-500 max-w-sm">{subtitle}</p>
 </div>
 );
}

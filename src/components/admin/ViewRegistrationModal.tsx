"use client";

interface Registration {
 _id: string;
 firstName: string;
 lastName: string;
 email: string;
 phone?: string;
 location?: string;
 programId: { _id: string; name: string; price: number } | string;
 dateOfBirth?: string;
 studentId?: string;
 status: string;
 paymentReceived: boolean;
 internalNotes?: string;
 createdAt: string;
 updatedAt?: string;
}

interface ViewRegistrationModalProps {
 registration: Registration;
 onClose: () => void;
}

function getProgramName(reg: Registration): string {
 if (typeof reg.programId === "object" && reg.programId !== null) return reg.programId.name;
 return String(reg.programId);
}

function getProgramPrice(reg: Registration): string {
 if (typeof reg.programId === "object" && reg.programId !== null)
 return `$${reg.programId.price.toLocaleString()}`;
 return "--";
}

function formatDate(iso: string | undefined): string {
 if (!iso) return "--";
 return new Date(iso).toLocaleDateString("en-US", {
 month: "short",
 day: "numeric",
 year: "numeric",
 });
}

/* Status pill classes (same as in registrations page) */
const statusClasses: Record<string, string> = {
 Enrolled:
 "bg-green-50 text-green-700 ring-green-600/20",
 Pending:
 "bg-amber-50 text-amber-700 ring-amber-600/20",
 Waitlist:
 "bg-purple-50 text-purple-700 ring-purple-600/20",
 Rejected:
 "bg-red-50 text-red-700 ring-red-600/20",
};

export default function ViewRegistrationModal({ registration: r, onClose }: ViewRegistrationModalProps) {
 return (
 <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
 {/* Overlay */}
 <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>

 {/* Modal Card */}
 <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl shadow-black/20 border border-slate-200 overflow-y-auto">
 {/* Header */}
 <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-5 bg-white border-b border-slate-200">
 <div>
 <h2 className="text-xl font-black text-slate-900 ">Registration Details</h2>
 <p className="text-sm text-slate-500 mt-0.5">
 Viewing record for {r.firstName} {r.lastName}
 </p>
 </div>
 <button
 onClick={onClose}
 className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
 >
 <span className="material-symbols-outlined">close</span>
 </button>
 </div>

 {/* Body */}
 <div className="p-8 space-y-8">
 {/* Student Info */}
 <div>
 <h3 className="text-sm font-bold uppercase text-slate-500 tracking-wider mb-4 flex items-center gap-2">
 <span className="material-symbols-outlined text-lg text-primary">person</span>
 Student Information
 </h3>
 <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
 <div>
 <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Full Name</dt>
 <dd className="mt-1 text-sm font-semibold text-slate-900 ">{r.firstName} {r.lastName}</dd>
 </div>
 <div>
 <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Email</dt>
 <dd className="mt-1 text-sm text-slate-900 break-words">{r.email}</dd>
 </div>
 <div>
 <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Phone</dt>
 <dd className="mt-1 text-sm text-slate-900 ">{r.phone || "--"}</dd>
 </div>
 <div>
 <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Location</dt>
 <dd className="mt-1 text-sm text-slate-900 ">{r.location || "--"}</dd>
 </div>
 {r.studentId && (
 <div>
 <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Student ID</dt>
 <dd className="mt-1 text-sm font-mono text-slate-900 ">{r.studentId}</dd>
 </div>
 )}
 {r.dateOfBirth && (
 <div>
 <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Date of Birth</dt>
 <dd className="mt-1 text-sm text-slate-900 ">{formatDate(r.dateOfBirth)}</dd>
 </div>
 )}
 </dl>
 </div>

 {/* Enrollment Info */}
 <div>
 <h3 className="text-sm font-bold uppercase text-slate-500 tracking-wider mb-4 flex items-center gap-2">
 <span className="material-symbols-outlined text-lg text-primary">school</span>
 Enrollment Details
 </h3>
 <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
 <div>
 <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Program</dt>
 <dd className="mt-1 text-sm font-semibold text-slate-900 ">{getProgramName(r)}</dd>
 </div>
 <div>
 <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Tuition</dt>
 <dd className="mt-1 text-sm font-semibold text-slate-900 ">{getProgramPrice(r)}</dd>
 </div>
 <div>
 <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</dt>
 <dd className="mt-1">
 <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusClasses[r.status] || "bg-slate-100 text-slate-600 ring-slate-400/20"}`}>
 {r.status}
 </span>
 </dd>
 </div>
 <div>
 <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Payment</dt>
 <dd className="mt-1">
 <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${r.paymentReceived ? "text-green-600" : "text-amber-600"}`}>
 <span className={`size-1.5 rounded-full ${r.paymentReceived ? "bg-green-500" : "bg-amber-500"}`} />
 {r.paymentReceived ? "Received" : "Pending"}
 </span>
 </dd>
 </div>
 <div>
 <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Registered On</dt>
 <dd className="mt-1 text-sm text-slate-900 ">{formatDate(r.createdAt)}</dd>
 </div>
 {r.updatedAt && (
 <div>
 <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Last Updated</dt>
 <dd className="mt-1 text-sm text-slate-900 ">{formatDate(r.updatedAt)}</dd>
 </div>
 )}
 </dl>
 </div>

 {/* Internal Notes */}
 {r.internalNotes && (
 <div>
 <h3 className="text-sm font-bold uppercase text-slate-500 tracking-wider mb-4 flex items-center gap-2">
 <span className="material-symbols-outlined text-lg text-primary">note</span>
 Internal Notes
 </h3>
 <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
 <p className="text-sm text-slate-700 whitespace-pre-wrap">{r.internalNotes}</p>
 </div>
 </div>
 )}
 </div>

 {/* Footer */}
 <div className="sticky bottom-0 flex items-center justify-end px-8 py-5 border-t border-slate-200 bg-slate-50">
 <button
 onClick={onClose}
 className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-dark text-white text-sm font-bold shadow-lg shadow-primary/20 transition-all"
 >
 Close
 </button>
 </div>
 </div>
 </div>
 );
}

"use client";

import { useState } from "react";

interface AddRegistrationModalProps {
  onClose: () => void;
}

const PROGRAMS = [
  "Junior Coders Program",
  "Developer Accelerator Program",
  "AI & Emerging Technologies",
  "Adult Education (Mature Entrance)",
  "Adult Education (JHS pre-SHS)",
];

const STATUSES = ["Pending", "Enrolled", "Waitlist"];

export default function AddRegistrationModal({ onClose }: AddRegistrationModalProps) {
  const [paymentReceived, setPaymentReceived] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl shadow-black/20 border border-slate-200 dark:border-slate-800 overflow-y-auto">
        
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">Add New Registration</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Fill in the student details to create a new enrollment record.</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-8 space-y-8">
          
          {/* Personal Information */}
          <div>
            <h3 className="text-sm font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg text-primary">person</span>
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Full Name <span className="text-red-500">*</span></label>
                <input type="text" placeholder="John Doe" className="h-11 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-primary text-sm" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email <span className="text-red-500">*</span></label>
                <input type="email" placeholder="john@example.com" className="h-11 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-primary text-sm" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Phone Number</label>
                <input type="tel" placeholder="+233 55 000 0000" className="h-11 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-primary text-sm" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Student ID <span className="text-slate-400 text-xs font-normal">(optional)</span></label>
                <input type="text" placeholder="STU-XXX" className="h-11 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-primary text-sm font-mono" />
              </div>
            </div>
          </div>

          {/* Enrollment Details */}
          <div>
            <h3 className="text-sm font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg text-primary">school</span>
              Enrollment Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Program <span className="text-red-500">*</span></label>
                <select className="h-11 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary text-sm">
                  <option value="">Select a program</option>
                  {PROGRAMS.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Enrollment Status</label>
                <select className="h-11 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary text-sm">
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            {/* Payment Toggle */}
            <div className="mt-6 flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Payment Received</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Mark if initial deposit or full payment is cleared</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={paymentReceived}
                onClick={() => setPaymentReceived(!paymentReceived)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  paymentReceived ? "bg-primary" : "bg-slate-300 dark:bg-slate-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
                    paymentReceived ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Internal Notes */}
          <div>
            <h3 className="text-sm font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg text-primary">note</span>
              Internal Notes
            </h3>
            <textarea
              placeholder="Add any internal notes about this registration..."
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-primary text-sm resize-none"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 flex items-center justify-end gap-3 px-8 py-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-dark text-white text-sm font-bold shadow-lg shadow-primary/20 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">add</span>
            Create Registration
          </button>
        </div>
      </div>
    </div>
  );
}

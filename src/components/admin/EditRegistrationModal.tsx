"use client";

import { useState } from "react";

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

interface EditRegistrationModalProps {
  registration: Registration;
  onClose: () => void;
  onSaved: () => void;
}

const STATUSES = ["Pending", "Enrolled", "Waitlist", "Rejected"];

export default function EditRegistrationModal({
  registration,
  onClose,
  onSaved,
}: EditRegistrationModalProps) {
  const [status, setStatus] = useState(registration.status);
  const [paymentReceived, setPaymentReceived] = useState(registration.paymentReceived);
  const [studentId, setStudentId] = useState(registration.studentId || "");
  const [internalNotes, setInternalNotes] = useState(registration.internalNotes || "");
  const [firstName, setFirstName] = useState(registration.firstName);
  const [lastName, setLastName] = useState(registration.lastName);
  const [email, setEmail] = useState(registration.email);
  const [phone, setPhone] = useState(registration.phone || "");
  const [location, setLocation] = useState(registration.location || "");
  const [dateOfBirth, setDateOfBirth] = useState(() => {
    if (registration.dateOfBirth) {
      return new Date(registration.dateOfBirth).toISOString().split('T')[0];
    }
    return "";
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setSaving(true);
    setError(null);

    try {
      const payload = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        location: location.trim(),
        status,
        paymentReceived,
        ...(studentId.trim() ? { studentId: studentId.trim() } : {}),
        ...(dateOfBirth ? { dateOfBirth } : {}),
        ...(internalNotes.trim() ? { internalNotes: internalNotes.trim() } : {}),
      };

      const res = await fetch(`/api/register/${registration._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.details || data.error || "Failed to update registration");
      }

      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "h-11 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-primary text-sm";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl shadow-black/20 border border-slate-200 dark:border-slate-800 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">Edit Registration</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Updating record for {registration.firstName} {registration.lastName}
            </p>
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
          {/* Error Banner */}
          {error && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30">
              <span className="material-symbols-outlined text-red-500 mt-0.5">error</span>
              <div className="flex-1">
                <p className="text-sm font-bold text-red-700 dark:text-red-400">Update Failed</p>
                <p className="text-sm text-red-600 dark:text-red-300 mt-0.5">{error}</p>
              </div>
              <button type="button" onClick={() => setError(null)} className="text-red-400 hover:text-red-600">
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
          )}

          {/* Personal Information */}
          <div>
            <h3 className="text-sm font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg text-primary">person</span>
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Date of Birth</label>
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className={inputClass}
                />
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
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Enrollment Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className={inputClass}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Student ID <span className="text-slate-400 text-xs font-normal">(optional, auto-generated)</span>
                </label>
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="Leave blank to auto-generate"
                  className={`${inputClass} font-mono`}
                />
              </div>
            </div>

            {/* Payment Toggle */}
            <div className="mt-6 flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Payment Received</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Mark if initial deposit or full payment is cleared
                </p>
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
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
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
            disabled={saving}
            className="px-5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-dark text-white text-sm font-bold shadow-lg shadow-primary/20 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-sm">save</span>
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

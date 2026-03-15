"use client";

import { useState } from "react";

interface DeleteRegistrationModalProps {
  registrationId: string;
  studentName: string;
  onClose: () => void;
  onDeleted: () => void;
}

export default function DeleteRegistrationModal({
  registrationId,
  studentName,
  onClose,
  onDeleted,
}: DeleteRegistrationModalProps) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setDeleting(true);
    setError(null);

    try {
      const res = await fetch(`/api/register/${registrationId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete registration");
      }

      onDeleted();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl shadow-black/20 border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-8 text-center">
          {/* Icon */}
          <div className="mx-auto w-16 h-16 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center mb-5">
            <span className="material-symbols-outlined text-3xl text-red-500">delete_forever</span>
          </div>

          <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2">Delete Registration</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Are you sure you want to delete the registration for{" "}
            <span className="font-semibold text-slate-700 dark:text-white">{studentName}</span>?
            This action cannot be undone.
          </p>

          {/* Error Banner */}
          {error && (
            <div className="mt-4 flex items-start gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-left">
              <span className="material-symbols-outlined text-red-500 text-base mt-0.5">error</span>
              <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 px-8 py-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <button
            onClick={onClose}
            disabled={deleting}
            className="flex-1 px-5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex-1 px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-bold shadow-lg shadow-red-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {deleting ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Deleting...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-sm">delete</span>
                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

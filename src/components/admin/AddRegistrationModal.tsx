"use client";

import { useState, useEffect } from "react";

interface AddRegistrationModalProps {
    onClose: () => void;
}

interface ProgramOption {
    _id: string;
    name: string;
    category?: string;
}

const STATUSES = ["Pending", "Enrolled", "Waitlist", "Rejected"];

export default function AddRegistrationModal({ onClose }: AddRegistrationModalProps) {
    // Form state
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState("");
    const [programId, setProgramId] = useState("");
    const [status, setStatus] = useState("Pending");
    const [paymentReceived, setPaymentReceived] = useState(false);
    const [internalNotes, setInternalNotes] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");

    // Programs fetched from database
    const [programs, setPrograms] = useState<ProgramOption[]>([]);
    const [programsLoading, setProgramsLoading] = useState(true);

    // Submission state
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    // Fetch programs on mount
    useEffect(() => {
        async function fetchPrograms() {
            try {
                const res = await fetch("/api/programs");
                if (res.ok) {
                    const data: ProgramOption[] = await res.json();
                    setPrograms(data);
                }
            } catch (err) {
                console.error("Failed to fetch programs:", err);
            } finally {
                setProgramsLoading(false);
            }
        }
        fetchPrograms();
    }, []);

    // Client-side validation
    const validate = (): boolean => {
        const errors: Record<string, string> = {};

        if (!firstName.trim()) errors.firstName = "First name is required";
        if (!lastName.trim()) errors.lastName = "Last name is required";
        if (!email.trim()) errors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Invalid email format";
        if (!phone.trim()) errors.phone = "Phone number is required";
        if (!location.trim()) errors.location = "Location is required";
        if (!programId) errors.programId = "Please select a program";

        const selectedProgram = programs.find((p) => p._id === programId);
        const isMatureEntrance = selectedProgram && (
            selectedProgram.name?.toLowerCase().includes('mature entrance') ||
            selectedProgram.category?.toLowerCase().includes('mature entrance')
        );

        if (isMatureEntrance && !dateOfBirth) {
            errors.dateOfBirth = "Date of Birth is required for Mature Entrance";
        }

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        setSaving(true);
        setError(null);

        try {
            const payload = {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.trim(),
                phone: phone.trim(),
                location: location.trim(),
                programId,
                status,
                paymentReceived,
                ...(dateOfBirth ? { dateOfBirth } : {}),
                ...(internalNotes.trim() ? { internalNotes: internalNotes.trim() } : {}),
            };

            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const data = await res.json();
                console.log(data)
                throw new Error(data.details || data.error || "Failed to create registration");
            }

            onClose(); // closes modal & triggers refetch in parent
        } catch (err) {
            console.log(err)
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setSaving(false);
        }
    };

    const inputClass = (field?: string) =>
        `h-11 px-4 rounded-lg border ${field && fieldErrors[field]
            ? "border-red-400 ring-1 ring-red-400"
            : "border-slate-200"
        } bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-primary text-sm`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>

            {/* Modal Card */}
            <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl shadow-black/20 border border-slate-200 overflow-y-auto">

                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-5 bg-white border-b border-slate-200">
                    <div>
                        <h2 className="text-xl font-black text-slate-900 ">Add New Registration</h2>
                        <p className="text-sm text-slate-500 mt-0.5">Fill in the student details to create a new enrollment record.</p>
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

                    {/* Error Banner */}
                    {error && (
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200">
                            <span className="material-symbols-outlined text-red-500 mt-0.5">error</span>
                            <div className="flex-1">
                                <p className="text-sm font-bold text-red-700">Submission Failed</p>
                                <p className="text-sm text-red-600 mt-0.5">{error}</p>
                            </div>
                            <button type="button" onClick={() => setError(null)} className="text-red-400 hover:text-red-600">
                                <span className="material-symbols-outlined text-lg">close</span>
                            </button>
                        </div>
                    )}

                    {/* Personal Information */}
                    <div>
                        <h3 className="text-sm font-bold uppercase text-slate-500 tracking-wider mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg text-primary">person</span>
                            Personal Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-slate-700 ">First Name <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    placeholder="John"
                                    value={firstName}
                                    onChange={(e) => { setFirstName(e.target.value); setFieldErrors(prev => ({ ...prev, firstName: "" })); }}
                                    className={inputClass("firstName")}
                                />
                                {fieldErrors.firstName && <span className="text-xs text-red-500 font-medium">{fieldErrors.firstName}</span>}
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-slate-700 ">Last Name <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    placeholder="Doe"
                                    value={lastName}
                                    onChange={(e) => { setLastName(e.target.value); setFieldErrors(prev => ({ ...prev, lastName: "" })); }}
                                    className={inputClass("lastName")}
                                />
                                {fieldErrors.lastName && <span className="text-xs text-red-500 font-medium">{fieldErrors.lastName}</span>}
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-slate-700 ">Email <span className="text-red-500">*</span></label>
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value); setFieldErrors(prev => ({ ...prev, email: "" })); }}
                                    className={inputClass("email")}
                                />
                                {fieldErrors.email && <span className="text-xs text-red-500 font-medium">{fieldErrors.email}</span>}
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-slate-700 ">Phone Number <span className="text-red-500">*</span></label>
                                <input
                                    type="tel"
                                    placeholder="e.g. 0200000000"
                                    value={phone}
                                    onChange={(e) => { setPhone(e.target.value); setFieldErrors(prev => ({ ...prev, phone: "" })); }}
                                    className={inputClass("phone")}
                                />
                                {fieldErrors.phone && <span className="text-xs text-red-500 font-medium">{fieldErrors.phone}</span>}
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-slate-700 ">Location <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    placeholder="Accra, Ghana"
                                    value={location}
                                    onChange={(e) => { setLocation(e.target.value); setFieldErrors(prev => ({ ...prev, location: "" })); }}
                                    className={inputClass("location")}
                                />
                                {fieldErrors.location && <span className="text-xs text-red-500 font-medium">{fieldErrors.location}</span>}
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-slate-700 ">Date of Birth</label>
                                <input
                                    type="date"
                                    value={dateOfBirth}
                                    onChange={(e) => { setDateOfBirth(e.target.value); setFieldErrors(prev => ({ ...prev, dateOfBirth: "" })); }}
                                    className={inputClass("dateOfBirth")}
                                />
                                {fieldErrors.dateOfBirth && <span className="text-xs text-red-500 font-medium">{fieldErrors.dateOfBirth}</span>}
                            </div>
                        </div>
                    </div>

                    {/* Enrollment Details */}
                    <div>
                        <h3 className="text-sm font-bold uppercase text-slate-500 tracking-wider mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg text-primary">school</span>
                            Enrollment Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-slate-700 ">Program <span className="text-red-500">*</span></label>
                                <select
                                    value={programId}
                                    onChange={(e) => { setProgramId(e.target.value); setFieldErrors(prev => ({ ...prev, programId: "" })); }}
                                    className={inputClass("programId")}
                                >
                                    <option value="">{programsLoading ? "Loading programs..." : "Select a program"}</option>
                                    {programs.map((p) => (
                                        <option key={p._id} value={p._id}>{p.name}</option>
                                    ))}
                                </select>
                                {fieldErrors.programId && <span className="text-xs text-red-500 font-medium">{fieldErrors.programId}</span>}
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-slate-700 ">Enrollment Status</label>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className={inputClass()}
                                >
                                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* Payment Toggle */}
                        <div className="mt-6 flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <div>
                                <p className="text-sm font-semibold text-slate-900 ">Payment Received</p>
                                <p className="text-xs text-slate-500 mt-0.5">Mark if initial deposit or full payment is cleared</p>
                            </div>
                            <button
                                type="button"
                                role="switch"
                                aria-checked={paymentReceived}
                                onClick={() => setPaymentReceived(!paymentReceived)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${paymentReceived ? "bg-primary" : "bg-slate-300"
                                    }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${paymentReceived ? "translate-x-6" : "translate-x-1"
                                        }`}
                                />
                            </button>
                        </div>
                    </div>

                    {/* Internal Notes */}
                    <div>
                        <h3 className="text-sm font-bold uppercase text-slate-500 tracking-wider mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg text-primary">note</span>
                            Internal Notes
                        </h3>
                        <textarea
                            value={internalNotes}
                            onChange={(e) => setInternalNotes(e.target.value)}
                            placeholder="Add any internal notes about this registration..."
                            rows={4}
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-primary text-sm resize-none"
                        />
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="sticky bottom-0 flex items-center justify-end gap-3 px-8 py-5 border-t border-slate-200 bg-slate-50">
                    <button
                        onClick={onClose}
                        disabled={saving}
                        className="px-5 py-2.5 rounded-lg border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={saving}
                        className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-dark text-white text-sm font-bold shadow-lg shadow-primary/20 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {saving ? (
                            <>
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating...
                            </>
                        ) : (
                            <>
                                <span className="material-symbols-outlined text-sm">add</span>
                                Create Registration
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

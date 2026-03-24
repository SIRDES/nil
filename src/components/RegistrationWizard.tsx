"use client";

import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { DayPicker } from 'react-day-picker';
import { differenceInYears, format } from 'date-fns';
import "react-day-picker/style.css";

// Program type returned from the API
interface ProgramOption {
    _id: string;
    name: string;
    category?: string;
    duration: string;
    price: number;
    isRegistrationOpen: boolean;
    isPubliclyVisible: boolean;
}

// 1. Define Zod schema
// `program` now stores the MongoDB ObjectId string of the selected program
const RegistrationSchema = z.object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(7, "Phone number is required"),
    location: z.string().min(2, "Location is required"),

    program: z.string().min(1, "Please select a program"),
    dateOfBirth: z.date().optional(),

    agreeTerms: z.boolean(),
});

type RegistrationFormData = z.infer<typeof RegistrationSchema>;

export default function RegistrationWizard() {
    const [step, setStep] = useState<number>(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const [programs, setPrograms] = useState<ProgramOption[]>([]);
    const [programsLoading, setProgramsLoading] = useState(true);
    const totalSteps = 3;

    // Fetch programs from the database on mount
    useEffect(() => {
        async function fetchPrograms() {
            try {
                const res = await fetch('/api/programs');
                if (res.ok) {
                    const data: ProgramOption[] = await res.json();
                    // Only show programs that are publicly visible and have registration open
                    setPrograms(data.filter(p => p.isPubliclyVisible && p.isRegistrationOpen));
                }
            } catch (err) {
                console.error('Failed to fetch programs:', err);
            } finally {
                setProgramsLoading(false);
            }
        }
        fetchPrograms();
    }, []);

    const {
        register,
        handleSubmit,
        control,
        trigger,
        watch,
        reset,
        setError,
        formState: { errors },
    } = useForm<RegistrationFormData>({
        resolver: zodResolver(RegistrationSchema),
        mode: "onTouched",
        defaultValues: {
            program: "",
            agreeTerms: false,
        }
    });

    const selectedProgramValue = watch("program");
    const selectedProgramDetails = programs.find(p => p._id === selectedProgramValue);
    const agreeTermsVal = watch("agreeTerms");

    // Check if selected program is a Mature Entrance program
    const isMatureEntrance = selectedProgramDetails
        ? (selectedProgramDetails.name?.toLowerCase().includes('mature entrance') ||
            selectedProgramDetails.category?.toLowerCase().includes('mature entrance'))
        : false;

    const nextStep = async () => {
        let fieldsToValidate: (keyof RegistrationFormData)[] = [];
        if (step === 1) {
            fieldsToValidate = ['firstName', 'lastName', 'email', 'phone', 'location'];
        } else if (step === 2) {
            fieldsToValidate = ['program'];
        }

        const isValid = await trigger(fieldsToValidate);
        if (!isValid) return;

        // Client-side Mature Entrance age validation
        if (step === 2 && isMatureEntrance) {
            const dob = watch('dateOfBirth');
            if (!dob) {
                setError('dateOfBirth', {
                    type: 'manual',
                    message: 'Date of Birth is required to verify your age.',
                });
                return;
            }
            const age = differenceInYears(new Date(), dob);
            if (age < 25) {
                setError('dateOfBirth', {
                    type: 'manual',
                    message: 'You must be at least 25 years old to enroll in the Mature Entrance program.',
                });
                return;
            }
        }

        setStep((prev) => Math.min(prev + 1, totalSteps));
    };

    const prevStep = () => {
        setStep((prev) => Math.max(prev - 1, 1));
    };

    const onSubmit = async (data: RegistrationFormData) => {
        if (!data.agreeTerms) {
            trigger('agreeTerms');
            return;
        }

        setIsSubmitting(true);
        setApiError(null);

        try {
            const payload = {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                location: data.location,
                programId: data.program,
                ...(data.dateOfBirth ? { dateOfBirth: data.dateOfBirth.toISOString() } : {}),
            };

            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await res.json();

            if (!res.ok) {
                // Handle specific Mature Entrance age error
                if (result.error === "Age requirement not met" || result.error === "Date of birth is required") {
                    setError("dateOfBirth", {
                        type: "server",
                        message: result.details || result.error,
                    });
                    // Jump back to step 2 to show the error
                    setStep(2);
                } else {
                    setApiError(result.details || result.error || "Something went wrong. Please try again.");
                }
                return;
            }

            // Success!
            setSubmitSuccess(true);
            reset();
        } catch {
            setApiError("Network error. Please check your connection and try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // ── Success Confirmation UI ──
    if (submitSuccess) {
        return (
            <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="flex flex-col items-center justify-center text-center py-16 px-8">
                    <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-6 animate-bounce">
                        <span className="material-symbols-outlined text-4xl text-emerald-600">
                            check_circle
                        </span>
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-3">
                        Registration Submitted!
                    </h2>
                    <p className="text-slate-500 text-lg max-w-md leading-relaxed mb-2">
                        Thank you for applying. Our admissions team will review your application and contact you within 2-3 business days.
                    </p>
                    <p className="text-sm text-slate-400 mb-8">
                        A confirmation email has been sent to your inbox.
                    </p>
                    <button
                        onClick={() => {
                            setSubmitSuccess(false);
                            setStep(1);
                        }}
                        className="px-8 py-3 rounded-full bg-primary text-white font-bold hover:bg-primary-dark transition-all"
                    >
                        Submit Another Registration
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            {/* Progress Bar Header */}
            <div className="bg-slate-50 p-6 border-b border-slate-100">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-slate-900 ">Student Registration</h2>
                    <span className="text-sm font-medium text-slate-500 ">Step {step} of {totalSteps}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                        className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${(step / totalSteps) * 100}%` }}
                    />
                </div>
            </div>

            <div className="p-6 md:p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    {/* API Error Banner */}
                    {apiError && (
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200">
                            <span className="material-symbols-outlined text-red-500 mt-0.5">error</span>
                            <div>
                                <p className="text-sm font-bold text-red-700">Submission Failed</p>
                                <p className="text-sm text-red-600 mt-0.5">{apiError}</p>
                            </div>
                            <button type="button" onClick={() => setApiError(null)} className="ml-auto text-red-400 hover:text-red-600">
                                <span className="material-symbols-outlined text-lg">close</span>
                            </button>
                        </div>
                    )}

                    {/* STEP 1: Personal Information */}
                    <div className={`space-y-6 ${step === 1 ? 'block' : 'hidden'}`}>
                        <div className="flex items-center gap-3 border-b border-border-light pb-4">
                            <span className="flex size-8 rounded-full items-center justify-center bg-primary/10 text-primary font-bold">1</span>
                            <h3 className="text-lg font-bold text-text-main ">Personal Information</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-700 ">First Name</label>
                                <input
                                    type="text"
                                    {...register("firstName")}
                                    className={`border rounded-xl px-4 h-12 bg-transparent text-text-main focus:ring-2 focus:ring-primary ${errors.firstName ? 'border-red-500' : 'border-slate-200'}`}
                                    placeholder="John"
                                />
                                {errors.firstName && <span className="text-xs text-red-500 font-medium">{errors.firstName.message}</span>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-700 ">Last Name</label>
                                <input
                                    type="text"
                                    {...register("lastName")}
                                    className={`border rounded-xl px-4 h-12 bg-transparent text-text-main focus:ring-2 focus:ring-primary ${errors.lastName ? 'border-red-500' : 'border-slate-200'}`}
                                    placeholder="Doe"
                                />
                                {errors.lastName && <span className="text-xs text-red-500 font-medium">{errors.lastName.message}</span>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-700 ">Email Address</label>
                                <input
                                    type="email"
                                    {...register("email")}
                                    className={`border rounded-xl px-4 h-12 bg-transparent text-text-main focus:ring-2 focus:ring-primary ${errors.email ? 'border-red-500' : 'border-slate-200'}`}
                                    placeholder="you@example.com"
                                />
                                {errors.email && <span className="text-xs text-red-500 font-medium">{errors.email.message}</span>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-700 ">Phone Number</label>
                                <input
                                    type="tel"
                                    {...register("phone")}
                                    className={`border rounded-xl px-4 h-12 bg-transparent text-text-main focus:ring-2 focus:ring-primary ${errors.phone ? 'border-red-500' : 'border-slate-200'}`}
                                    placeholder="e.g. 0200000000"
                                />
                                {errors.phone && <span className="text-xs text-red-500 font-medium">{errors.phone.message}</span>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-700 ">Location</label>
                                <input
                                    type="text"
                                    {...register("location")}
                                    className={`border rounded-xl px-4 h-12 bg-transparent text-text-main focus:ring-2 focus:ring-primary ${errors.location ? 'border-red-500' : 'border-slate-200'}`}
                                    placeholder="Accra"
                                />
                                {errors.location && <span className="text-xs text-red-500 font-medium">{errors.location.message}</span>}
                            </div>

                        </div>
                    </div>

                    {/* STEP 2: Program Selection */}
                    <div className={`space-y-6 ${step === 2 ? 'block' : 'hidden'}`}>
                        <div className="flex items-center gap-3 border-b border-border-light pb-4">
                            <span className="flex size-8 rounded-full items-center justify-center bg-primary/10 text-primary font-bold">2</span>
                            <h3 className="text-lg font-bold text-text-main ">Program Selection</h3>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-slate-700 ">Select Enrolling Program</label>
                            <select
                                {...register("program")}
                                className={`border rounded-xl px-4 h-12 bg-white text-text-main focus:ring-2 focus:ring-primary ${errors.program ? 'border-red-500' : 'border-slate-200'}`}
                            >
                                <option value="">{programsLoading ? 'Loading programs...' : '-- Select a program --'}</option>
                                {programs.map((p) => (
                                    <option key={p._id} value={p._id}>{p.name}</option>
                                ))}
                            </select>
                            {errors.program && <span className="text-xs text-red-500 font-medium">{errors.program.message}</span>}
                        </div>

                        {isMatureEntrance && (
                            <div className="mt-6 p-6 rounded-xl border-2 border-primary/20 bg-primary/5">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="material-symbols-outlined text-primary text-2xl">verified_user</span>
                                    <h4 className="text-md font-bold text-text-main ">Age Verification Required</h4>
                                </div>
                                <p className="text-sm text-text-secondary mb-6 leading-relaxed">
                                    As per regulations, students must be 25 years or older to enroll in the Mature Entrance program. Please accurately select your date of birth using the interactive picker below.
                                </p>

                                <div className="flex flex-col gap-2 bg-white p-4 rounded-xl border border-slate-200 shadow-sm inline-block">
                                    <Controller
                                        control={control}
                                        name="dateOfBirth"
                                        render={({ field }) => (
                                            <div className="flex flex-col">
                                                <DayPicker
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    defaultMonth={new Date(new Date().getFullYear() - 25, 0)}
                                                    captionLayout="dropdown"
                                                    startMonth={new Date(1950, 0)}
                                                    endMonth={new Date()}
                                                    className=" p-0 m-0"
                                                    classNames={{
                                                        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                                                        month: "space-y-4",
                                                        caption: "flex justify-center pt-1 relative items-center",
                                                        caption_label: "text-sm font-medium",
                                                        nav: "space-x-1 flex items-center",
                                                        nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                                                        nav_button_previous: "absolute left-1",
                                                        nav_button_next: "absolute right-1",
                                                        table: "w-full border-collapse space-y-1",
                                                        head_row: "flex",
                                                        head_cell: "text-slate-500 rounded-md w-9 font-normal text-[0.8rem]",
                                                        row: "flex w-full mt-2",
                                                        cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-primary/10 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                                                        day: "h-9 w-9 p-0 font-normal hover:bg-slate-100 rounded-md transition-colors",
                                                        day_selected: "bg-primary text-white hover:bg-primary-dark hover:text-white focus:bg-primary focus:text-white",
                                                        day_today: "font-bold text-primary",
                                                        day_outside: "text-slate-400 opacity-50",
                                                        day_disabled: "text-slate-400 opacity-50",
                                                        day_hidden: "invisible",
                                                    }}
                                                />
                                                {field.value && (
                                                    <div className="mt-4 pt-4 border-t border-slate-100 text-sm font-medium text-center text-primary">
                                                        Selected: {format(field.value, 'PP')}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    />
                                    {errors.dateOfBirth && (
                                        <div className="flex items-center gap-2 mt-2 p-2 bg-red-50 rounded-lg">
                                            <span className="material-symbols-outlined text-red-500 text-base">warning</span>
                                            <span className="text-xs text-red-600 font-bold">{errors.dateOfBirth.message}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* STEP 3: Review & Submit */}
                    <div className={`space-y-8 ${step === 3 ? 'block' : 'hidden'}`}>
                        <div className="flex items-center gap-3 border-b border-border-light pb-4">
                            <span className="flex size-8 rounded-full items-center justify-center bg-primary/10 text-primary font-bold">3</span>
                            <h3 className="text-lg font-bold text-text-main ">Review & Submit</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="font-bold text-slate-900 ">Personal Details</h4>
                                    <button type="button" onClick={() => setStep(1)} className="text-primary text-sm font-medium hover:underline flex items-center">
                                        <span className="material-symbols-outlined text-sm mr-1">edit</span>Edit
                                    </button>
                                </div>
                                <dl className="space-y-3 text-sm">
                                    <div className="grid grid-cols-3">
                                        <dt className="text-slate-500 ">Name</dt>
                                        <dd className="col-span-2 font-medium text-slate-900 ">{watch("firstName")} {watch("lastName")}</dd>
                                    </div>
                                    <div className="grid grid-cols-3">
                                        <dt className="text-slate-500 ">Email</dt>
                                        <dd className="col-span-2 font-medium text-slate-900 break-words">{watch("email")}</dd>
                                    </div>
                                    <div className="grid grid-cols-3">
                                        <dt className="text-slate-500 ">Phone</dt>
                                        <dd className="col-span-2 font-medium text-slate-900 ">{watch("phone")}</dd>
                                    </div>
                                    <div className="grid grid-cols-3">
                                        <dt className="text-slate-500 ">Location</dt>
                                        <dd className="col-span-2 font-medium text-slate-900 ">{watch("location")}</dd>
                                    </div>
                                    {watch("dateOfBirth") && isMatureEntrance && (
                                        <div className="grid grid-cols-3">
                                            <dt className="text-slate-500 ">DOB</dt>
                                            <dd className="col-span-2 font-medium text-slate-900 ">
                                                {format(watch("dateOfBirth") as Date, 'PP')}
                                            </dd>
                                        </div>
                                    )}
                                </dl>
                            </div>

                            <div className="bg-primary/5 border border-primary/20 p-6 rounded-xl flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="font-bold text-slate-900 ">Selected Program</h4>
                                        <button type="button" onClick={() => setStep(2)} className="text-primary text-sm font-medium hover:underline flex items-center">
                                            <span className="material-symbols-outlined text-sm mr-1">edit</span>Edit
                                        </button>
                                    </div>
                                    <p className="font-bold text-primary mb-2 leading-tight pr-4">
                                        {selectedProgramDetails?.name || "None Selected"}
                                    </p>
                                    <div className="flex gap-4 mt-4">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-slate-500 font-medium">Duration</span>
                                            <span className="text-sm font-bold text-slate-900 ">{selectedProgramDetails?.duration || "--"}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 pt-4 border-t border-primary/10 flex justify-between items-end">
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tuition Fee</span>
                                    <span className="text-2xl font-black text-slate-900 ">{selectedProgramDetails ? `GHS ${selectedProgramDetails.price.toLocaleString()}` : "--"}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-100">
                            <label className="flex items-start gap-4 p-4 hover:bg-slate-50/50 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-slate-200">
                                <div className="relative flex items-center h-6 mt-0.5">
                                    <input
                                        type="checkbox"
                                        {...register("agreeTerms")}
                                        className="peer h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary/20 cursor-pointer"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-slate-900 leading-relaxed">
                                        I agree to the <a href="#" className="text-primary hover:underline">Terms & Conditions</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                                    </span>
                                    {errors.agreeTerms && <span className="text-xs text-red-500 font-medium mt-1">{errors.agreeTerms.message}</span>}
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                        {step > 1 ? (
                            <button
                                type="button"
                                onClick={prevStep}
                                disabled={isSubmitting}
                                className="px-6 py-3 rounded-full text-slate-600 font-bold hover:bg-slate-100 transition-colors flex items-center gap-2 disabled:opacity-50"
                            >
                                <span className="material-symbols-outlined text-sm">arrow_back</span>
                                Back
                            </button>
                        ) : <div></div>}

                        {step < totalSteps ? (
                            <button
                                type="button"
                                onClick={nextStep}
                                className="px-8 py-3 rounded-full bg-primary text-white font-bold hover:bg-primary-dark hover:shadow-lg shadow-primary/30 transition-all flex items-center gap-2"
                            >
                                Continue
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className={`px-8 py-3 rounded-full font-bold transition-all flex items-center gap-2 shadow-lg shadow-primary/30 ${agreeTermsVal && !isSubmitting
                                    ? 'bg-primary text-white hover:bg-primary-dark hover:shadow-xl hover:scale-105'
                                    : 'bg-slate-300 text-slate-500 cursor-not-allowed opacity-50'
                                    }`}
                                disabled={!agreeTermsVal || isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        Submit
                                        <span className="material-symbols-outlined text-sm">check_circle</span>
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}


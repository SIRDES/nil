"use client";

import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

/* ─── Types ───────────────────────────────────────────────────── */
interface AddAdminForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  password: string;
  permissions: string[];
  sendInvite: boolean;
  enforce2FA: boolean;
  accountStatus: "Active" | "Suspended" | "Pending Activation";
}

/* ─── Constants ───────────────────────────────────────────────── */
const ROLES = ["Super Admin", "Registrar", "Program Manager", "Instructor", "Editor", "Support"];

const MODULE_PERMISSIONS = [
  { key: "analytics", label: "Analytics Dashboard", icon: "analytics" },
  { key: "registrations", label: "Registrations Management", icon: "assignment" },
  { key: "programs", label: "Program Settings", icon: "local_library" },
  { key: "instructors", label: "Instructor Management", icon: "people" },
  { key: "settings", label: "System Settings", icon: "settings" },
  { key: "users", label: "User Management", icon: "admin_panel_settings" },
];

const ACCOUNT_STATUSES = [
  { value: "Active" as const, label: "Active", description: "User can log in and access all assigned modules" },
  { value: "Suspended" as const, label: "Suspended", description: "Account is temporarily disabled" },
  { value: "Pending Activation" as const, label: "Pending Activation", description: "Waiting for email verification" },
];

/* ─── Shared Input Classes ────────────────────────────────────── */
const inputClass =
  "h-11 w-full px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm transition-all";

const labelClass = "text-sm font-semibold text-slate-700 dark:text-slate-300";

/* ─── Toggle Switch Component ─────────────────────────────────── */
function Toggle({
  enabled,
  onChange,
  id,
}: {
  enabled: boolean;
  onChange: (v: boolean) => void;
  id: string;
}) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 ${
        enabled ? "bg-primary" : "bg-slate-300 dark:bg-slate-600"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

/* ─── Main Page Component ─────────────────────────────────────── */
export default function AddAdminPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AddAdminForm>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: "",
      password: "",
      permissions: ["analytics", "registrations"],
      sendInvite: true,
      enforce2FA: false,
      accountStatus: "Active",
    },
  });

  const permissions = watch("permissions");
  const firstName = watch("firstName");
  const lastName = watch("lastName");

  const initials =
    (firstName?.[0] || "").toUpperCase() + (lastName?.[0] || "").toUpperCase() || "?";

  /* Permission toggle helper */
  const togglePermission = (key: string) => {
    const current = permissions || [];
    if (current.includes(key)) {
      setValue(
        "permissions",
        current.filter((p) => p !== key)
      );
    } else {
      setValue("permissions", [...current, key]);
    }
  };

  /* Avatar upload handler */
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  /* Form submit */
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: AddAdminForm) => {
    setIsSubmitting(true);
    try {
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone || undefined,
        role: data.role,
        password: data.password,
        permissions: data.permissions,
        status: data.accountStatus === "Pending Activation" ? "Pending" : data.accountStatus,
      };
      const res = await fetch("/api/admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        
        const err = await res.json().catch(() => null);
        console.log("Error creating admin:", err);
        if (res.status === 409) throw new Error("An admin with this email already exists.");
        throw new Error(err?.error || `Failed to create account (${res.status})`);
      }
      toast.success("Admin account created successfully!");
      router.push("/admin/users");
    } catch (err) {
      console.error("Error creating admin:", err);
      toast.error(err instanceof Error ? err.message : "Failed to create account.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* ── Page Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <nav className="flex items-center gap-2 text-sm mb-1">
            <Link
              href="/admin/users"
              className="text-slate-500 hover:text-primary transition-colors"
            >
              Administrators
            </Link>
            <span className="material-symbols-outlined text-slate-400 text-base">
              chevron_right
            </span>
            <span className="text-slate-900 dark:text-white font-medium">
              Add New Admin
            </span>
          </nav>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Create Admin Account
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="cancel-btn"
            type="button"
            onClick={() => router.push("/admin/users")}
            className="px-5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            id="create-account-btn"
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-dark text-white text-sm font-bold shadow-lg shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                Creating...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-lg">person_add</span>
                Create Account
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Card 1: Personal Information (Full Width) ── */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
        <h2 className="text-sm font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-5 flex items-center gap-2">
          <span className="material-symbols-outlined text-lg text-primary">
            person
          </span>
          Personal Information
        </h2>

        <div className="flex items-start gap-6">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-2 shrink-0">
            <button
              id="avatar-upload-btn"
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="relative flex size-24 items-center justify-center rounded-full border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 hover:border-primary hover:bg-primary/5 transition-all group overflow-hidden"
            >
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar"
                  className="size-full object-cover rounded-full"
                />
              ) : (
                <div className="flex flex-col items-center">
                  {initials !== "?" ? (
                    <span className="text-2xl font-bold text-primary">
                      {initials}
                    </span>
                  ) : (
                    <span className="material-symbols-outlined text-3xl text-slate-400 group-hover:text-primary transition-colors">
                      add_a_photo
                    </span>
                  )}
                </div>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-white text-xl">
                  photo_camera
                </span>
              </div>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />

            <span className="text-[11px] text-slate-400 text-center">
              Upload Photo
            </span>
          </div>

          {/* 2x2 Input Grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="firstName" className={labelClass}>
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="e.g. Alex"
                className={`${inputClass} ${errors.firstName ? "ring-2 ring-red-500 border-red-500" : ""}`}
                {...register("firstName", { required: "First name is required" })}
              />
              {errors.firstName && (
                <p className="text-xs text-red-500">{errors.firstName.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="lastName" className={labelClass}>
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="e.g. Morgan"
                className={`${inputClass} ${errors.lastName ? "ring-2 ring-red-500 border-red-500" : ""}`}
                {...register("lastName", { required: "Last name is required" })}
              />
              {errors.lastName && (
                <p className="text-xs text-red-500">{errors.lastName.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className={labelClass}>
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="e.g. alex@techschool.io"
                className={`${inputClass} ${errors.email ? "ring-2 ring-red-500 border-red-500" : ""}`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="phone" className={labelClass}>
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="e.g. +1 (555) 123-4567"
                className={inputClass}
                {...register("phone")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Row: Two Cards Side by Side ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* ── Card 2: Access & Security (3/5 width) ── */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-6">
          <h2 className="text-sm font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider flex items-center gap-2">
            <span className="material-symbols-outlined text-lg text-primary">
              shield
            </span>
            Access &amp; Security
          </h2>

          {/* Role & Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="role" className={labelClass}>
                Role <span className="text-red-500">*</span>
              </label>
              <select
                id="role"
                className={`${inputClass} cursor-pointer ${errors.role ? "ring-2 ring-red-500 border-red-500" : ""}`}
                {...register("role", { required: "Please select a role" })}
              >
                <option value="">Select a role</option>
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              {errors.role && (
                <p className="text-xs text-red-500">{errors.role.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className={labelClass}>
                Temporary Password <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                type="password"
                placeholder="Min. 8 characters"
                className={`${inputClass} ${errors.password ? "ring-2 ring-red-500 border-red-500" : ""}`}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Minimum 8 characters" },
                })}
              />
              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Module Permissions */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              Module Permissions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {MODULE_PERMISSIONS.map((perm) => {
                const isChecked = permissions?.includes(perm.key);
                return (
                  <button
                    key={perm.key}
                    id={`perm-${perm.key}`}
                    type="button"
                    onClick={() => togglePermission(perm.key)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all duration-200 ${
                      isChecked
                        ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                        : "border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600"
                    }`}
                  >
                    <div
                      className={`flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                        isChecked
                          ? "bg-primary text-white"
                          : "bg-slate-100 dark:bg-slate-700 text-slate-500"
                      }`}
                    >
                      <span className="material-symbols-outlined text-base">
                        {perm.icon}
                      </span>
                    </div>

                    <span
                      className={`text-sm font-medium transition-colors ${
                        isChecked
                          ? "text-primary dark:text-primary"
                          : "text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      {perm.label}
                    </span>

                    {/* Checkbox indicator */}
                    <div className="ml-auto">
                      <div
                        className={`flex size-5 items-center justify-center rounded-md border-2 transition-all ${
                          isChecked
                            ? "border-primary bg-primary"
                            : "border-slate-300 dark:border-slate-600"
                        }`}
                      >
                        {isChecked && (
                          <span className="material-symbols-outlined text-white text-sm">
                            check
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Card 3: Account Preferences (2/5 width) ── */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-6 h-fit">
          <h2 className="text-sm font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider flex items-center gap-2">
            <span className="material-symbols-outlined text-lg text-primary">
              tune
            </span>
            Account Preferences
          </h2>

          {/* Toggle Switches */}
          <div className="space-y-4">
            {/* Send Invite */}
            <Controller
              control={control}
              name="sendInvite"
              render={({ field }) => (
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      Send Invite Email
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      User receives a welcome email with login details
                    </p>
                  </div>
                  <Toggle
                    id="send-invite-toggle"
                    enabled={field.value}
                    onChange={field.onChange}
                  />
                </div>
              )}
            />

            {/* 2FA Enforcement */}
            <Controller
              control={control}
              name="enforce2FA"
              render={({ field }) => (
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      2FA Enforcement
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Require two-factor authentication on login
                    </p>
                  </div>
                  <Toggle
                    id="enforce-2fa-toggle"
                    enabled={field.value}
                    onChange={field.onChange}
                  />
                </div>
              )}
            />
          </div>

          {/* Account Status */}
          <div>
            <h3 className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400 tracking-widest mb-3">
              Account Status
            </h3>
            <Controller
              control={control}
              name="accountStatus"
              render={({ field }) => (
                <div className="space-y-2.5">
                  {ACCOUNT_STATUSES.map((status) => {
                    const isSelected = field.value === status.value;
                    return (
                      <label
                        key={status.value}
                        htmlFor={`status-${status.value}`}
                        className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all duration-200 ${
                          isSelected
                            ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                            : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                        }`}
                      >
                        <input
                          type="radio"
                          id={`status-${status.value}`}
                          name="accountStatus"
                          value={status.value}
                          checked={isSelected}
                          onChange={() => field.onChange(status.value)}
                          className="sr-only"
                        />

                        {/* Custom Radio Circle */}
                        <div
                          className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                            isSelected
                              ? "border-primary"
                              : "border-slate-300 dark:border-slate-600"
                          }`}
                        >
                          {isSelected && (
                            <div className="size-2.5 rounded-full bg-primary" />
                          )}
                        </div>

                        <div>
                          <p
                            className={`text-sm font-semibold transition-colors ${
                              isSelected
                                ? "text-primary"
                                : "text-slate-700 dark:text-slate-300"
                            }`}
                          >
                            {status.label}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {status.description}
                          </p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </form>
  );
}

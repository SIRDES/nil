"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/* ─── Navigation links ────────────────────────────────────────── */
const NAV_LINKS = [
    { href: "/", label: "Home", icon: "home" },
    { href: "/programs", label: "Programs", icon: "school" },
    { href: "/about-us", label: "About Us", icon: "info" },
    { href: "/contact", label: "Contact", icon: "mail" },
];

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();

    /* Close drawer on route change */
    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    /* Lock body scroll when drawer is open */
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-background-light/90 backdrop-blur-md px-6 py-4">
                <div className="mx-auto flex h-14 max-w-7xl items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link
                            href="/"
                            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                        >
                            <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-white">
                                <span className="material-symbols-outlined text-2xl">
                                    school
                                </span>
                            </div>
                            <h2 className="text-xl font-bold tracking-tight text-slate-900">
                                FBI
                            </h2>
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Desktop nav */}
                        <nav className="hidden md:flex flex-1 justify-center ml-8">
                            <div className="flex items-center gap-8">
                                {NAV_LINKS.filter((l) => l.href !== "/").map((link) => (
                                    <Link
                                        key={link.href}
                                        className={`text-sm font-medium transition-colors ${pathname === link.href
                                            ? "text-primary font-semibold"
                                            : "text-slate-600 hover:text-primary"
                                            }`}
                                        href={link.href}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </nav>

                        {/* Mobile hamburger button */}
                        <button
                            className="md:hidden p-2 text-slate-600 hover:text-primary transition-colors"
                            onClick={() => setMobileOpen(true)}
                            aria-label="Open menu"
                        >
                            <span className="material-symbols-outlined text-2xl">menu</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* ─── Mobile Drawer Overlay ──────────────────────────────── */}
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${mobileOpen
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setMobileOpen(false)}
                aria-hidden="true"
            />

            {/* Drawer panel */}
            <div
                className={`fixed inset-y-0 right-0 z-[70] w-[85%] max-w-sm bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out md:hidden ${mobileOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Drawer Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-white">
                            <span className="material-symbols-outlined text-xl">school</span>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold tracking-tight text-slate-900">
                                FBI
                            </h2>
                            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                                Training Center
                            </p>
                        </div>
                    </div>
                    <button
                        className="p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-lg hover:bg-slate-100"
                        onClick={() => setMobileOpen(false)}
                        aria-label="Close menu"
                    >
                        <span className="material-symbols-outlined text-2xl">close</span>
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 overflow-y-auto px-4 py-4">
                    <ul className="space-y-1">
                        {NAV_LINKS.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className={`flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive
                                            ? "bg-primary text-white shadow-lg shadow-primary/30"
                                            : "text-slate-700 hover:bg-slate-50 active:bg-slate-100"
                                            }`}
                                    >
                                        <span
                                            className={`material-symbols-outlined text-xl ${isActive ? "text-white" : "text-slate-400"
                                                }`}
                                        >
                                            {link.icon}
                                        </span>
                                        <span className="flex-1">{link.label}</span>
                                        {!isActive && (
                                            <span className="material-symbols-outlined text-lg text-slate-300">
                                                chevron_right
                                            </span>
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Drawer Footer */}
                <div className="px-6 py-5 border-t border-slate-100">
                    <p className="text-[10px] text-center uppercase tracking-widest text-slate-400 font-medium">
                        <span className="text-primary">◈</span> Future Bridge Institute {" "}
                        <span className="text-primary">◈</span>
                    </p>
                </div>
            </div>
        </>
    );
}

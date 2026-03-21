"use client";

import { useSession } from "next-auth/react";

export default function AdminTopbar() {
 const { data: session } = useSession();
 const user = session?.user;
 console.log("user", user)

function getInitials(): string {
 return `${user?.firstName[0] || ""}${user?.lastName?.[0] || ""}`.toUpperCase();
}

 return (
 <header className="sticky top-0 z-40 flex items-center justify-between h-16 px-8 bg-white border-b border-slate-200">
 {/* Search */}
 {/* <div className="flex items-center bg-slate-100 rounded-lg px-4 py-2 border border-transparent focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all w-80"> */}
 <div>
 {/* <span className="material-symbols-outlined text-slate-400 text-xl mr-2">search</span>
 <input
 type="text"
 placeholder="Search students, programs..."
 className="bg-transparent border-none focus:ring-0 focus:outline-none text-sm text-slate-700 placeholder:text-slate-400 w-full"
 /> */}
 </div>

 {/* Right side */}
 <div className="flex items-center gap-4">
 {/* Notifications */}
 {/* <button className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors">
 <span className="material-symbols-outlined text-xl">notifications</span>
 <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-red-500"></span>
 </button> */}

 {/* Profile */}
 <div className="flex items-center gap-3">
 <div className="flex flex-col items-end">
 <span className="text-sm font-semibold text-slate-500">{user?.firstName?.toUpperCase()}</span>
 <span className="text-xs text-slate-500">{user?.role}</span>
 </div>
 <div className="flex size-9 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">
 {getInitials()}
 </div>
 </div>
 </div>
 </header>
 );
}

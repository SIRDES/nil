import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="mt-auto border-t border-slate-200 bg-primary py-12 px-6">
            <div className="container mx-auto px-10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 max-w-7xl">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex items-center gap-3">
                        {/* <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                            <span className="material-symbols-outlined text-xl">school</span>
                        </div> */}
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            width={50}
                            height={50}
                            unoptimized
                        // className="invert mix-blend-screen brightness-125"
                        />
                        <span className="text-lg font-bold text-white">Future Bridge Institute</span>
                    </div>
                    <p className='text-white'>© {new Date().getFullYear()} Future Bridge Institute. All rights reserved.</p>
                </div>
                <div className="flex gap-6">
                    <Link href="#" className="hover:text-slate-200 text-white transition-colors">Privacy Policy</Link>
                    <Link href="#" className="hover:text-slate-200 text-white transition-colors">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
}

import RegistrationWizard from "@/components/RegistrationWizard";

export default function Register() {
    return (
        <div className="flex-grow flex flex-col items-center w-full px-4 py-12 md:py-20 bg-background-light">
            <div className="w-full max-w-7xl flex flex-col gap-8 mb-12 text-center">
                <h1 className="text-slate-900 text-4xl md:text-5xl font-black leading-tight tracking-tight">Begin Your Journey</h1>
                <p className="text-slate-500 text-lg md:text-xl font-normal max-w-2xl mx-auto">
                    Complete the 3-step registration form below to secure your spot in an upcoming cohort.
                </p>
            </div>

            <div className="w-full">
                <RegistrationWizard />
            </div>
        </div>
    );
}

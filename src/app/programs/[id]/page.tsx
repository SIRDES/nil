import Link from 'next/link';

export default function ProgramDetail() {
  // Normally, we would fetch data based on params.id. For now, we display the UI based on the design.
  return (
    <div className="flex-grow">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark">
        <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-primary/10 to-transparent dark:from-primary/20 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="flex flex-col gap-6 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider w-fit">
                <span className="size-2 rounded-full bg-green-500 animate-pulse"></span>
                Accepting Applications
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-text-main dark:text-white leading-tight tracking-tight">
                Full Stack Web <br/><span className="text-primary">Development Bootcamp</span>
              </h1>
              <p className="text-lg md:text-xl text-text-secondary dark:text-gray-400 max-w-xl leading-relaxed">
                Master the MERN stack and launch your tech career. Build real-world projects and get hired by top tech companies.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 mt-2">
                <div className="flex items-center gap-2 px-4 py-2 bg-background-light dark:bg-background-dark rounded-lg border border-border-light dark:border-border-dark">
                  <span className="material-symbols-outlined text-primary">schedule</span>
                  <span className="text-sm font-semibold text-text-main dark:text-white">3 Months Full-time</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-background-light dark:bg-background-dark rounded-lg border border-border-light dark:border-border-dark">
                  <span className="material-symbols-outlined text-primary">group</span>
                  <span className="text-sm font-semibold text-text-main dark:text-white">Cohort Based</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-background-light dark:bg-background-dark rounded-lg border border-border-light dark:border-border-dark">
                  <span className="material-symbols-outlined text-primary">workspace_premium</span>
                  <span className="text-sm font-semibold text-text-main dark:text-white">Certificate Included</span>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-auto flex flex-col gap-4">
              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl shadow-primary/5 border border-border-light dark:border-border-dark md:min-w-[320px]">
                <p className="text-sm text-text-secondary dark:text-gray-400 font-medium mb-1">Next Start Date</p>
                <p className="text-xl font-bold text-text-main dark:text-white mb-4">April 15, 2024</p>
                <Link href="/register" className="w-full py-3 px-6 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold text-lg shadow-lg shadow-primary/30 transition-all transform active:scale-95 flex items-center justify-center gap-2">
                  <span>Apply Now</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
                <p className="text-xs text-center text-text-secondary dark:text-gray-500 mt-3">Limited seats available for this cohort.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Details */}
        <div className="lg:col-span-8 flex flex-col gap-16">
          
          {/* Program Focus */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <span className="material-symbols-outlined">target</span>
              </div>
              <h2 className="text-3xl font-bold text-text-main dark:text-white">Program Focus</h2>
            </div>
            <p className="text-text-secondary dark:text-gray-300 text-lg mb-8 leading-relaxed">
              Our intensive curriculum is designed to make you job-ready from day one, focusing on the technologies employers demand most. You won&apos;t just learn syntax; you&apos;ll learn how to think like a software engineer.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group flex flex-col gap-4 p-6 rounded-2xl bg-white dark:bg-gray-800 border border-border-light dark:border-border-dark hover:border-primary/50 hover:shadow-lg transition-all">
                <div className="size-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">code</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-main dark:text-white mb-2">Frontend Mastery</h3>
                  <p className="text-sm text-text-secondary dark:text-gray-400 leading-relaxed">Deep dive into React, Redux, and modern CSS frameworks to build responsive, interactive UIs.</p>
                </div>
              </div>
              <div className="group flex flex-col gap-4 p-6 rounded-2xl bg-white dark:bg-gray-800 border border-border-light dark:border-border-dark hover:border-primary/50 hover:shadow-lg transition-all">
                <div className="size-12 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">database</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-main dark:text-white mb-2">Backend Logic</h3>
                  <p className="text-sm text-text-secondary dark:text-gray-400 leading-relaxed">Build robust APIs with Node.js, Express, and MongoDB. Understand data structures and algorithms.</p>
                </div>
              </div>
              <div className="group flex flex-col gap-4 p-6 rounded-2xl bg-white dark:bg-gray-800 border border-border-light dark:border-border-dark hover:border-primary/50 hover:shadow-lg transition-all">
                <div className="size-12 rounded-xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">cloud_upload</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-main dark:text-white mb-2">DevOps Basics</h3>
                  <p className="text-sm text-text-secondary dark:text-gray-400 leading-relaxed">Learn deployment, CI/CD pipelines, containerization with Docker, and cloud basics.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Curriculum Highlights */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <span className="material-symbols-outlined">menu_book</span>
              </div>
              <h2 className="text-3xl font-bold text-text-main dark:text-white">Curriculum Highlights</h2>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-border-light dark:border-border-dark overflow-hidden">
              <div className="divide-y divide-border-light dark:divide-border-dark">
                
                <label className="flex items-start gap-4 p-5 hover:bg-background-light dark:hover:bg-gray-700/50 cursor-pointer transition-colors group">
                  <div className="relative flex items-center">
                    <input type="checkbox" checked={true} disabled className="peer h-6 w-6 rounded border-gray-300 text-primary focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-700 dark:checked:bg-primary"/>
                  </div>
                  <div>
                    <p className="text-base font-semibold text-text-main dark:text-white group-hover:text-primary transition-colors">JavaScript Fundamentals & ES6+</p>
                    <p className="text-sm text-text-secondary dark:text-gray-400 mt-1">Variables, loops, functions, DOM manipulation, and modern syntax.</p>
                  </div>
                </label>
                
                <label className="flex items-start gap-4 p-5 hover:bg-background-light dark:hover:bg-gray-700/50 cursor-pointer transition-colors group">
                  <div className="relative flex items-center">
                    <input type="checkbox" checked={true} disabled className="peer h-6 w-6 rounded border-gray-300 text-primary focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-700 dark:checked:bg-primary"/>
                  </div>
                  <div>
                    <p className="text-base font-semibold text-text-main dark:text-white group-hover:text-primary transition-colors">React Component Lifecycle & Hooks</p>
                    <p className="text-sm text-text-secondary dark:text-gray-400 mt-1">State management, effect hooks, context API, and custom hooks.</p>
                  </div>
                </label>

                <label className="flex items-start gap-4 p-5 hover:bg-background-light dark:hover:bg-gray-700/50 cursor-pointer transition-colors group">
                  <div className="relative flex items-center">
                    <input type="checkbox" checked={true} disabled className="peer h-6 w-6 rounded border-gray-300 text-primary focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-700 dark:checked:bg-primary"/>
                  </div>
                  <div>
                    <p className="text-base font-semibold text-text-main dark:text-white group-hover:text-primary transition-colors">RESTful API Design & Implementation</p>
                    <p className="text-sm text-text-secondary dark:text-gray-400 mt-1">HTTP methods, status codes, middleware, and API security.</p>
                  </div>
                </label>

              </div>
            </div>
          </section>

        </div>

        {/* Right Column: Outcomes & Sticky CTA */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          
          {/* Career Outcomes Card */}
          <div className="bg-primary text-white rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-black/10 rounded-full blur-xl"></div>
            
            <h3 className="text-xl font-bold mb-6 relative z-10">Career Outcomes</h3>
            <div className="space-y-6 relative z-10">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-white">trending_up</span>
                </div>
                <div>
                  <p className="text-3xl font-black">$75k+</p>
                  <p className="text-white/80 text-sm">Average Starting Salary</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-white">verified</span>
                </div>
                <div>
                  <p className="text-3xl font-black">92%</p>
                  <p className="text-white/80 text-sm">Hiring Rate within 6 Months</p>
                </div>
              </div>
              <div className="h-px bg-white/20 my-4"></div>
              <div>
                <p className="font-semibold mb-3">Our graduates work at:</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white/10 rounded text-xs font-medium">Google</span>
                  <span className="px-3 py-1 bg-white/10 rounded text-xs font-medium">Amazon</span>
                  <span className="px-3 py-1 bg-white/10 rounded text-xs font-medium">Shopify</span>
                  <span className="px-3 py-1 bg-white/10 rounded text-xs font-medium">Microsoft</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky CTA for Mobile/Desktop small */}
          <div className="sticky top-24 z-10 bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-lg border border-primary/20">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-text-secondary dark:text-gray-400">Tuition</span>
                <span className="text-xl font-bold text-text-main dark:text-white">$12,500</span>
              </div>
              <div className="h-px bg-border-light dark:border-border-dark"></div>
              <p className="text-xs text-text-secondary dark:text-gray-400 text-center">Flexible payment plans and scholarships available.</p>
              <Link href="/register" className="w-full mt-2 py-3 px-6 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold text-base shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2">
                Register for April Cohort
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

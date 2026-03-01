import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col group/design-root">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-navy-dark dark:bg-black py-20 sm:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1152d41a_1px,transparent_1px),linear-gradient(to_bottom,#1152d41a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
            <div className="flex flex-col items-start gap-6 lg:w-1/2">
              <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-blue-200 backdrop-blur-sm">
                <span className="mr-2 flex h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
                Enrollment Closing Soon
              </div>
              <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-6xl">
                April Cohorts <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-primary">Now Open</span>
              </h1>
              <p className="text-lg text-slate-300 max-w-xl leading-relaxed">
                Launch your career in technology with our intensive, industry-aligned training programs designed for modern workforce demands.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="#programs" className="h-12 px-8 rounded-full bg-primary text-white font-bold text-base transition-all hover:bg-primary-dark hover:scale-105 hover:shadow-xl hover:shadow-primary/20 flex items-center gap-2">
                  Explore Programs
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </Link>
                <button className="h-12 px-8 rounded-full border border-slate-600 bg-transparent text-white font-medium hover:bg-white/10 transition-all flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">play_circle</span>
                  Watch Intro
                </button>
              </div>
              <div className="flex items-center gap-4 pt-8 text-sm text-slate-400">
                <div className="flex -space-x-3">
                  <div className="h-10 w-10 rounded-full border-2 border-navy-dark bg-slate-700 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBnRD1deMpyojpD1DLbZ9YX8B2Yha6iDv9P1S7UHJaFVpIl3bqe7Pzza_i2OGEBqpw4VlQpT6wPKtlSsqA3JB8LbgIvdSfzvFNEXRu9UdQMZE-ZE-yEVAr3dAwZ2Gnoo8-zJ1TsmqwUKqQKaTB16qFF0qsOQ40MQ1E5uO63fpz_nrgBJynwwGJDO-VIKpd8EojqzSIzXcec0pnXd0cymEeoeLHGSn2F2B7XAmVUgs14K2aL8TY3IhV-JdeW3bKrRECc5_i0T2cg_OY")' }}></div>
                  <div className="h-10 w-10 rounded-full border-2 border-navy-dark bg-slate-700 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCIQSEUiqmSBOmj5pDTw0IFVxgnpHehUOkSiGxc8mczyVuR4KgnWw8frQPdhGVJ7ApF-679Ol3rI3-dgfrF0KHIeMEp-VVifMaI6xoVLcdwDkSa2eJCUKm94Mhda-tyec8Fr4x_qlNHv-ahFdGpyzmT1x-83m_oYFQ8BiujPXWguiF-HRYDgNoWPU5gSNqOJjX3HkMU7Zi5EpnHpAl6F10WgP6zdjiG9MUqsSKOwMxxFZuPvBCcCWn4v9a4Bonr6A5BaaS6r0AQThM")' }}></div>
                  <div className="h-10 w-10 rounded-full border-2 border-navy-dark bg-slate-700 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCBuCoa7zCxaTCkpfzug8jtkw95_vfiZzBCdiv7wCo79v7zg-Sdfxff3SFcwseFH0ASLqtLTsuCoNsWFfM-UO_qRXJBOA-hIh0CqmUsUWr6XKqPfqvBNNS0r62pvX1RcvcGAEzSydWbOJYtMTG3X5X3D6GeaMxX2OkBI9L5TMKTbl9maGQajR0tBWGmjpXqF-nxlKNnlvALT6eDYMVOPVfvrebn_bhhnmI1hdroAFUeOxk_4h1Oa7QmbXuHIVsgWSKTkPX-vGJw-No")' }}></div>
                </div>
                <p>Join 500+ successful graduates</p>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="relative rounded-2xl bg-gradient-to-br from-slate-800 to-black p-2 shadow-2xl shadow-primary/20">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-900 relative">
                  <div className="absolute inset-0 bg-cover bg-center opacity-90 transition-transform duration-700 hover:scale-105" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDU7svlfNBYPUcyYiXGWzwdAIbdW3QPHwWTg1ps0kWkN37cVlJ4ziHbibKotw4NjxdlvUQoBmOJDXxa4DlQKWRfVI_nDl0Rcv6CvHAbC4o30rdJr8VTkYI7dhK6vmoUj3o0Hv1bi7qogGYcj7TToSbfKUECAwuOXigXpzm9QpwdxfSTRCEPsKTmJyP9zzPh12NzQhc-p4hDchogZJUZd3skozCoC05cuc9d2ddi0hVyTMzdy6BD8zohJ9nAI9qluD-348in4U7Rzg0")' }}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-3 rounded-lg bg-white/10 p-4 backdrop-blur-md border border-white/20">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                        <span className="material-symbols-outlined">code</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">Live Coding Session</p>
                        <p className="text-xs text-slate-300">Web Development Bootcamp</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Programs Section */}
      <div id="programs" className="bg-background-light dark:bg-background-dark py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-primary font-bold tracking-wide uppercase text-sm mb-3">Our Offerings</h2>
            <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Specialized Training Tracks</h3>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">Select the path that matches your career ambitions.</p>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* Card 1 */}
            <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-navy-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 border border-slate-100 dark:border-slate-800">
              <div className="aspect-video w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
                <div className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBJWQauzqVJhpr_rSk8miePezjBqUhltcF5pKOSbCGBWqRdZrSq55WX_IstPKD18r1D8T77iVJ_j84tnVNrK7opsGmR9pHtIfp29V8jIyyG-QYn7Rpsr9sxrkxNCW8hCwvUvpXvJYO56Udiyy9M7NLomPUToX8lJTHtysf9OwflhLvZLFbDAHUOUTD8_cIQ-LMxPspoTW0pzC7Zyyc8Ouoe3ouoEVNuYhHapTTvijV2XucL3n9KLEQNgmveMgCdjOhf5hIqGy1F_I4")' }}></div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-2 flex items-center gap-2">
                  <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30">Ages 8-14</span>
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">Junior Coders</h4>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">Introduction to Python and Scratch. Building the foundation for future tech leaders.</p>
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700">
                  <Link href="/programs/junior-coders" className="flex items-center text-sm font-semibold text-primary hover:text-primary-dark transition-colors">
                    Learn More <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-navy-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 border border-slate-100 dark:border-slate-800">
              <div className="aspect-video w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
                <div className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBd_uyyzXRa-jH1Z4TWbM6HcXfD_BhWTuzNpFuYw3T3ueLcctwtzWVsZm52ZZT30j8w8_hRiAaThAZUI9Sp5pvvuLpRKgchBGUHwny2g-NeBP6zd6ghnrQWAC3lT_4pUbQIHCjDI_Dusa1wg3YnM43dYtmOtd-uh4xnoIaUKKAD9su4er2VrEwbg3NRqGGB_JoHH9UfIxjVgmeA7nma5wWgkP_sA8PWbVVwY73mQ60VAyzNLxvJXtfXeSJRjKntkAXlHk5jKffOINg")' }}></div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-2 flex items-center gap-2">
                  <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10 dark:bg-purple-400/10 dark:text-purple-400 dark:ring-purple-400/30">Bootcamp</span>
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">Developer Accelerator</h4>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">Full-stack web development bootcamp. From zero to hero in 12 intensive weeks.</p>
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700">
                  <Link href="/programs/developer-accelerator" className="flex items-center text-sm font-semibold text-primary hover:text-primary-dark transition-colors">
                    Learn More <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-navy-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 border border-slate-100 dark:border-slate-800">
              <div className="aspect-video w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
                <div className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBzGMSX_1P-yieuWFT0QNhIgy84Etxt65Et7fIs9xWdOBMw-FmtHX4lDheDi3rTrbxQEP1l75O8Al3bAZVOLW-66x2OV_LDfmSPZ7zMiWkvsTvnwDRXscybIdCE6dvuHI1vk-SLDIS-cNkUJSKQ4foIj0FhF27CATFKk7pqyEFFMi20PEbmF1SYSPGQgdl_JnGOT3DjQekA-krIX1EaSsK3KavpVIdZ0iCb5l6L7RItio2UTIfej6T8WmO6OsnvN7RRThQZIjIUyD0")' }}></div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-2 flex items-center gap-2">
                  <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 dark:bg-indigo-400/10 dark:text-indigo-400 dark:ring-indigo-400/30">Advanced</span>
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">AI & Emerging Tech</h4>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">Master Machine Learning and Data Science. Prepare for the future of tech.</p>
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700">
                  <Link href="/programs/ai-emerging-tech" className="flex items-center text-sm font-semibold text-primary hover:text-primary-dark transition-colors">
                    Learn More <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-navy-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 border border-slate-100 dark:border-slate-800">
              <div className="aspect-video w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
                <div className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDqMC04Z_2Oas2kWXXJ2v80vbM9Ni6TVSztvbT8idNtXW3hwaHJobQlqSM1UH1lrNwKGuFKuvp9--dx8XZBF7OUcg7zrbnGXBcCsoxsggDXVie6Zax4bXJYZ2_o6updwJ6P-x5YIc_QmMJYQ8Ug1LDmTLr_W_anPOWwcqbdrTGFhjn5JOBVHoFQ2co-ZOnG-Y_GXAv6zMOgqMIpaldqftCyKuOYJdV1idTKkBmmYHisq61XzFQg9pG61hinZz1DLQl6SPxwuJNRwwQ")' }}></div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-2 flex items-center gap-2">
                  <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-700/10 dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-emerald-400/30">Professional</span>
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">Adult Education</h4>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">Upskilling for professionals. Flexible evening and weekend classes available.</p>
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700">
                  <Link href="/programs/adult-education" className="flex items-center text-sm font-semibold text-primary hover:text-primary-dark transition-colors">
                    Learn More <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-navy-dark py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 text-center">
            <div className="flex flex-col gap-1">
              <span className="text-4xl font-black text-primary">98%</span>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Hiring Rate</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-4xl font-black text-primary">500+</span>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Graduates</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-4xl font-black text-primary">120+</span>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Hiring Partners</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-4xl font-black text-primary">$75k</span>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Avg. Starting Salary</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

import Link from 'next/link';
import ProgramsGrid from '@/components/ProgramsGrid';

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-navy-dark py-20 sm:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1152d41a_1px,transparent_1px),linear-gradient(to_bottom,#1152d41a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
            <div className="flex flex-col items-start gap-6 lg:w-1/2">
              <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-slate-300">
                <span className="mr-2 flex h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
                Enrollment Closing Soon
              </div>
              <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-300 sm:text-6xl">
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
                {/* <button className="h-12 px-8 rounded-full border border-slate-600 bg-transparent text-white font-medium hover:bg-white/10 transition-all flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">play_circle</span>
                  Watch Intro
                </button> */}
              </div>
              {/* <div className="flex items-center gap-4 pt-8 text-sm text-slate-400">
                <div className="flex -space-x-3">
                  <div className="h-10 w-10 rounded-full border-2 border-navy-dark bg-slate-700 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBnRD1deMpyojpD1DLbZ9YX8B2Yha6iDv9P1S7UHJaFVpIl3bqe7Pzza_i2OGEBqpw4VlQpT6wPKtlSsqA3JB8LbgIvdSfzvFNEXRu9UdQMZE-ZE-yEVAr3dAwZ2Gnoo8-zJ1TsmqwUKqQKaTB16qFF0qsOQ40MQ1E5uO63fpz_nrgBJynwwGJDO-VIKpd8EojqzSIzXcec0pnXd0cymEeoeLHGSn2F2B7XAmVUgs14K2aL8TY3IhV-JdeW3bKrRECc5_i0T2cg_OY")' }}></div>
                  <div className="h-10 w-10 rounded-full border-2 border-navy-dark bg-slate-700 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCIQSEUiqmSBOmj5pDTw0IFVxgnpHehUOkSiGxc8mczyVuR4KgnWw8frQPdhGVJ7ApF-679Ol3rI3-dgfrF0KHIeMEp-VVifMaI6xoVLcdwDkSa2eJCUKm94Mhda-tyec8Fr4x_qlNHv-ahFdGpyzmT1x-83m_oYFQ8BiujPXWguiF-HRYDgNoWPU5gSNqOJjX3HkMU7Zi5EpnHpAl6F10WgP6zdjiG9MUqsSKOwMxxFZuPvBCcCWn4v9a4Bonr6A5BaaS6r0AQThM")' }}></div>
                  <div className="h-10 w-10 rounded-full border-2 border-navy-dark bg-slate-700 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCBuCoa7zCxaTCkpfzug8jtkw95_vfiZzBCdiv7wCo79v7zg-Sdfxff3SFcwseFH0ASLqtLTsuCoNsWFfM-UO_qRXJBOA-hIh0CqmUsUWr6XKqPfqvBNNS0r62pvX1RcvcGAEzSydWbOJYtMTG3X5X3D6GeaMxX2OkBI9L5TMKTbl9maGQajR0tBWGmjpXqF-nxlKNnlvALT6eDYMVOPVfvrebn_bhhnmI1hdroAFUeOxk_4h1Oa7QmbXuHIVsgWSKTkPX-vGJw-No")' }}></div>
                </div>
                <p>Join 500+ successful graduates</p>
              </div> */}
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

      {/* Programs Section — Now fetched from API */}
      <div id="programs" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-primary font-bold tracking-wide uppercase text-sm mb-3">Our Offerings</h2>
            <h3 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Specialized Training Tracks</h3>
            <p className="mt-4 text-lg text-slate-600">Select the path that matches your career ambitions.</p>
          </div>
          
          <ProgramsGrid />
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white border-y border-slate-200 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 text-center">
            <div className="flex flex-col gap-1">
              <span className="text-4xl font-black text-primary">98%</span>
              <span className="text-sm font-medium text-slate-500">Hiring Rate</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-4xl font-black text-primary">500+</span>
              <span className="text-sm font-medium text-slate-500">Graduates</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-4xl font-black text-primary">120+</span>
              <span className="text-sm font-medium text-slate-500">Hiring Partners</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-4xl font-black text-primary">$75k</span>
              <span className="text-sm font-medium text-slate-500">Avg. Starting Salary</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

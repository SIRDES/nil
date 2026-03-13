import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Natural Intelligence Lab",
  description:
    "Learn about our mission, story, and the expert team behind Natural Intelligence Lab's industry-leading IT training programs.",
};

/* ─── Timeline data ───────────────────────────────────────────── */
const TIMELINE = [
  {
    year: "2015",
    title: "The Beginning",
    description:
      "NIL started in a small community center with a bold vision: to bridge the growing gap between corporate IT requirements and the skills available in the local workforce.",
  },
  {
    year: "2018",
    title: "Expanding Horizons",
    description:
      "After helping over 500 adults transition into tech roles, we expanded our curriculum to include Cloud Computing and Cybersecurity, partnering with industry giants.",
  },
  {
    year: "2021",
    title: "Digital Transformation",
    description:
      "We launched our global online learning platform, allowing us to mentor students from across the world while maintaining our core hands-on teaching philosophy.",
  },
  {
    year: "2024",
    title: "AI-Forward Learning",
    description:
      "We introduced AI & Emerging Tech programs, preparing the next generation of professionals for the rapidly evolving landscape of artificial intelligence and machine learning.",
  },
];

/* ─── Team data ───────────────────────────────────────────────── */
const TEAM = [
  {
    name: "Sarah Jenkins",
    role: "Lead Instructor, Cybersecurity",
    bio: "Ex-Amazon Security Engineer with 12 years of experience in network defense and ethical hacking.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC3un9zi_DuGs1sdOq5uYq1Hz918LfnBkGUVLyi7Vr_16HD_4mehEiX_gL0kT8HQ0bZogrwfrQWJa7xOJxz1zf2Qlbx4NSwnVq562AplaRPUBkt45HDYarYt3elE7_9XfNhh1LROlAnQPz01r4zlvS1PPyOkni6b9xUpEfkoZcZHvAUWtXkC2IDU40PEJ_MmQ50axlD8oKAJMcKhMjWLMmqHHCcBI-kgRYNp_XVGS0lbDnkdwbv_UZvK4P8mWQRlwTPlGxecoA7H4k",
  },
  {
    name: "David Chen",
    role: "Director of Curriculum",
    bio: "Specialist in Adult Learning Methodologies with a background in Full-Stack Development.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCpw5YzPut73HiQC93JdcrEiNbFmaQDLtV1vzaw31AZo2P64xLegO03tD8cPYzwIHZWsMXGFgct-ge9-X1VpfSYhKtvSoU0au0Pal45sPiq0fr1tKzJzhI_CLMXijzJWhFlZ6QCJMXsDdVL15m7P0sBNlK0l5uR-JagLOrCPaIh_I2HmDjwnj_VDIIxZJcBKEAGo43YRWJz9tALwZi8J4Fm6fen7_O5WYxwcwtxzWGiLG0IMFXiEQRsc1M5g5eA46Y-xtpV4igD7aI",
  },
  {
    name: "Aisha Rahmani",
    role: "Senior Cloud Architect",
    bio: "AWS Certified Professional helping students master cloud infrastructure and DevOps pipelines.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuApHCtZKqSX3A0PB9xOQHlsJfAH4yCbWFrR5FCWkry3I4eUkFa6sy1fRAYoaNbRMIloQFR9qwoSN6tK7DjTgUTOaL7hY0zt7oAwjy4RSxCbApLSEK5wfxOHFQefti85l0XTF7xb3wIjFlwu9aTR3vqXELdnQ5zimZhHyUKP-xNBck57vNSxwZsczaAovP_ZfJ7rtxTopQw-yWOSkVAD6FYiIb_BhNlm09-ahbMSz15WkxJWSMzWsAc243weDbymlu800aB5qXV0Ch0",
  },
];

/* ─── Stats data ──────────────────────────────────────────────── */
const STATS = [
  { value: "95%", label: "Employment Rate" },
  { value: "10k+", label: "Students Trained" },
  { value: "120+", label: "Hiring Partners" },
  { value: "50+", label: "Expert Instructors" },
];

/* ─── Page Component ──────────────────────────────────────────── */
export default function AboutUsPage() {
  return (
    <div className="flex flex-col flex-1">
      {/* ─── Hero Banner ──────────────────────────────────────── */}
      <section className="px-4 md:px-10 lg:px-20 pt-8 md:pt-12 pb-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative w-full aspect-[21/9] overflow-hidden rounded-2xl bg-slate-200 shadow-2xl shadow-primary/10">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent z-10" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Modern classroom with adult students collaborating on tech projects"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAew6xGXJlCUB1pnYAo9bXhUDMxjOketXjvV4Ev6ls3oplGlI43cOUsko87X5soTN27lLVm_c4zZbzHlqYU8WhOI7XuSLUxCEFK0S9biSJoNE8bP03FDhfytbIia3O5hEXj0rwKRgcnnvyBYUV2nHckn8GURdaRYhXKEDXP2pUmyMV4tl8TkVmTwToIUgX0Mgo2ghPY9tvdOZHbtZuF6Ce9mGgXGo9ILR36pEQWUcN4W55uOL5gzsYvDJXWIC8t1Kl-JEnn7ljTF5w"
            />
            <div className="absolute bottom-0 left-0 p-6 md:p-10 z-20 max-w-3xl">
              <h1 className="text-white text-3xl md:text-5xl font-black leading-tight tracking-tight">
                Empowering Careers Through IT Excellence
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Our Mission ──────────────────────────────────────── */}
      <section className="px-4 md:px-10 lg:px-20 py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 lg:gap-16 items-center">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-sm">
                rocket_launch
              </span>
              Our Mission
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-text-main leading-tight">
              Bridging the digital skills gap for everyone.
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed">
              We provide world-class IT training and adult education that
              transforms lives and businesses. Our agency is dedicated to
              creating accessible, high-quality learning paths for professionals
              looking to pivot into tech or advance their current skill sets.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              {STATS.slice(0, 2).map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <div className="text-primary font-black text-3xl">
                    {stat.value}
                  </div>
                  <div className="text-slate-500 text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 w-full">
            <div className="relative p-2 bg-primary/5 rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Diverse group of adult learners in a tech workshop"
                className="rounded-xl shadow-xl w-full"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8-r-kfwucbNpWq5Fef5WdTLbs94faElwOZte5m7KI0JVMNl530phUKuhmucNmXmEbgvycrQeAHgiKku0Q_5jlmDpRc800nRtXSHON2NiNFEQqTnpRByfFEnbfIfSNfxAgFv2VhxUj-i3jm77rs4JDQBIitph1ow0l3p68Kh1o3nkPQPYO0seI9-wB9uXW7wayVsNgDfEemgNYqxkeZnVq99a0WEq45CJP0_vhZpiO-k7AawAG1fFTUHP_-sEreao_vXsdcWKWI2Y"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats Bar ────────────────────────────────────────── */}
      <section className="bg-primary py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="text-4xl font-black text-white">
                  {stat.value}
                </span>
                <span className="text-sm font-medium text-blue-200">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Our Story Timeline ───────────────────────────────── */}
      <section className="px-4 md:px-10 lg:px-20 py-20 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-12 border-l-4 border-primary pl-6">
            Our Story
          </h2>
          <div className="space-y-12 relative before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200">
            {TIMELINE.map((item) => (
              <div key={item.year} className="relative pl-12">
                {/* Dot */}
                <div className="absolute left-0 top-1 size-6 rounded-full bg-primary border-4 border-background-light shadow-md shadow-primary/20" />
                {/* Year pill */}
                <span className="inline-block px-3 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-2">
                  {item.year}
                </span>
                <h3 className="text-xl font-bold text-text-main mb-2">
                  {item.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Meet Our Team ────────────────────────────────────── */}
      <section className="px-4 md:px-10 lg:px-20 py-20 md:py-24 bg-primary/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mx-auto">
              <span className="material-symbols-outlined text-sm">groups</span>
              Our People
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-main">
              Meet Our Team
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto text-lg">
              Our instructors are industry veterans with a passion for teaching.
              We believe in mentorship that goes beyond the classroom.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group hover:-translate-y-1 border border-border-light"
              >
                <div className="aspect-square mb-6 overflow-hidden rounded-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={member.image}
                  />
                </div>
                <h4 className="text-xl font-bold text-text-main">
                  {member.name}
                </h4>
                <p className="text-primary font-medium text-sm mb-3">
                  {member.role}
                </p>
                <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Section ──────────────────────────────────────── */}
      <section className="px-4 md:px-10 lg:px-20 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="bg-navy-dark rounded-2xl p-10 md:p-16 relative overflow-hidden text-center">
            {/* Decorative blurs */}
            <div className="absolute inset-0 opacity-15 pointer-events-none">
              <div className="absolute top-0 left-0 w-64 h-64 bg-primary rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
            </div>
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                Ready to start your journey?
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto text-lg leading-relaxed">
                Join thousands of professionals who have transformed their
                careers with Natural Intelligence Lab.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-2">
                <Link
                  href="/programs"
                  className="px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary-dark transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/30"
                >
                  Browse Programs
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-white/10 text-white font-bold rounded-full border border-white/20 hover:bg-white/20 transition-all hover:scale-105 active:scale-95"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

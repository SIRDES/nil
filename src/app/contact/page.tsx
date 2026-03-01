export default function Contact() {
  return (
    <div className="flex-grow flex flex-col items-center w-full px-4 py-8 md:py-12 bg-background-light dark:bg-background-dark">
      <div className="w-full max-w-7xl flex flex-col gap-10">
        
        {/* Hero Section */}
        <div className="flex flex-col gap-4 text-center md:text-left">
          <h1 className="text-slate-900 dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">Get in Touch</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl font-normal max-w-2xl">
            Whether you have questions about our curriculum, admissions process, or career support, we&apos;re here to help you start your journey in tech.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Contact Form Card */}
          <div className="lg:col-span-7 bg-white dark:bg-navy-card rounded-lg p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Send us a message</h3>
              <p className="text-slate-500 dark:text-slate-400">Fill out the form below and our admissions team will get back to you within 24 hours.</p>
            </div>
            
            <form className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <label className="flex flex-col gap-2">
                  <span className="text-slate-900 dark:text-slate-200 text-sm font-bold">First Name</span>
                  <input type="text" placeholder="Jane" className="form-input w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:border-primary focus:ring-primary h-12 px-4 placeholder:text-slate-400" />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-slate-900 dark:text-slate-200 text-sm font-bold">Last Name</span>
                  <input type="text" placeholder="Doe" className="form-input w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:border-primary focus:ring-primary h-12 px-4 placeholder:text-slate-400" />
                </label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <label className="flex flex-col gap-2">
                  <span className="text-slate-900 dark:text-slate-200 text-sm font-bold">Email Address</span>
                  <input type="email" placeholder="jane.doe@example.com" className="form-input w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:border-primary focus:ring-primary h-12 px-4 placeholder:text-slate-400" />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-slate-900 dark:text-slate-200 text-sm font-bold">Phone Number</span>
                  <input type="tel" placeholder="+1 (555) 000-0000" className="form-input w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:border-primary focus:ring-primary h-12 px-4 placeholder:text-slate-400" />
                </label>
              </div>
              <label className="flex flex-col gap-2">
                <span className="text-slate-900 dark:text-slate-200 text-sm font-bold">Subject</span>
                <select className="form-select w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:border-primary focus:ring-primary h-12 px-4">
                  <option>General Inquiry</option>
                  <option>Course Details</option>
                  <option>Tuition & Financing</option>
                  <option>Partnerships</option>
                </select>
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-slate-900 dark:text-slate-200 text-sm font-bold">Message</span>
                <textarea placeholder="How can we help you achieve your career goals?" className="form-textarea w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:border-primary focus:ring-primary min-h-[8rem] p-4 placeholder:text-slate-400 resize-none"></textarea>
              </label>
              <button type="button" className="mt-2 flex w-full md:w-auto cursor-pointer items-center justify-center rounded-full h-12 px-8 bg-primary hover:bg-primary-dark transition-all text-white text-base font-bold shadow-lg shadow-primary/25">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info Side */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Image Card */}
            <div className="relative overflow-hidden rounded-lg h-64 shadow-md group">
              <div className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBgKctl0F_jhrm3SWPUdYwnNDBAdnhwsxpUcnUs8kEoazM_yDomdahxO6l6jyc94Fqg7nSjQ42LSzDRMCkyZGQLhnwOA0OzD41G08qZNnTDbRfX59tP7k6T5qvjBMH-jiytBvm37Zh06hRKFjNxTM5fOEJK2tok5lh4ErLSZbF1jYik2roescibJwdbq6FuoPol02T7_GgSNTQb3zfle7cHXJ8B6b0fXcUUKALyZds52Zx0Q5yhAbDVNHju6Xfsxzq3_CAvugZ11wI")' }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-bold mb-1">Visit Our Campus</h3>
                <p className="text-white/90 text-sm">Experience our state-of-the-art labs and learning spaces.</p>
              </div>
            </div>

            {/* Info Cards */}
            <div className="bg-white dark:bg-navy-card rounded-lg p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined">call</span>
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold mb-1">Call Us</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">Mon-Fri from 8am to 5pm.</p>
                  <a href="tel:+15551234567" className="text-primary hover:underline font-medium block">+1 (555) 123-4567</a>
                  <a href="tel:+15559876543" className="text-primary hover:underline font-medium block">+1 (555) 987-6543</a>
                </div>
              </div>
              <div className="w-full h-px bg-slate-100 dark:bg-slate-800"></div>
              
              <div className="flex items-start gap-4">
                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold mb-1">Email Us</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">Our friendly team is here to help.</p>
                  <a href="mailto:admissions@techschool.edu" className="text-primary hover:underline font-medium">admissions@techschool.edu</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="w-full bg-white dark:bg-navy-card rounded-lg overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 p-2">
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-800">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.063683693245!2d-122.41941548468166!3d37.77492927975974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sTwitter+HQ!5e0!3m2!1sen!2sus!4v1532986422383" 
              className="absolute inset-0 w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500" 
              loading="lazy" 
              title="TechTrain Academy Location Map"
              allowFullScreen
            ></iframe>
            <div className="absolute bottom-4 left-4 bg-white dark:bg-slate-900 p-4 rounded-lg shadow-lg max-w-xs transition-opacity hover:opacity-100">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-primary">location_on</span>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Main Campus</h4>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                123 Innovation Drive, Tech District<br/>
                San Francisco, CA 94103
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

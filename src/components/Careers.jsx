import { motion } from 'framer-motion'
import { ArrowRight, Briefcase, MapPin, Clock, Star, Sparkles, Send } from 'lucide-react'

const Careers = ({ onBack }) => {
  const jobs = [
    {
      title: "Senior Portfolio Manager",
      location: "Remote / SF",
      type: "Full-time",
      category: "Operations"
    },
    {
      title: "Investment Analyst (Acquisitions)",
      location: "Berlin / Remote",
      type: "Full-time",
      category: "Investor Relations"
    },
    {
      title: "Financial Systems Architect",
      location: "Remote",
      type: "Full-time",
      category: "Engineering"
    },
    {
      title: "Portfolio Growth Director",
      location: "New York",
      type: "Full-time",
      category: "Strategy"
    }
  ]

  return (
    <div className="pt-32 pb-24 min-h-screen bg-neutral-950 text-neutral-200">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-16 mb-32 border-b border-neutral-800 pb-24">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 text-amber-400 mb-10 font-black uppercase tracking-[0.4em] text-[10px]"
            >
              <Star size={12} />
              Join Our Team
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-7xl md:text-9xl font-black text-neutral-200 tracking-tighter mb-10 uppercase italic"
            >
              Build Together<span className="text-amber-400">.</span>
            </motion.h1>
            <p className="text-2xl text-neutral-400 font-medium leading-relaxed max-w-2xl">
              Join the team shaping the future of institutional holding company operations, driving acquisition strategy, and scaling proven revenue-generating assets.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="p-8 bg-neutral-800 text-neutral-200 rounded-[40px] shadow-2xl">
              <span className="text-5xl font-black mb-4 block tracking-tighter italic">40+</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Portfolio Holdings</span>
            </div>
            <div className="p-8 bg-gradient-to-br from-amber-400 to-neutral-800 text-neutral-950 rounded-[40px] shadow-2xl">
              <span className="text-5xl font-black mb-4 block tracking-tighter italic">100%</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-300">Investor Focused</span>
            </div>
          </div>
        </div>

        <div className="grid gap-8 mb-32">
          {jobs.map((job, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-10 bg-neutral-900 rounded-[48px] border border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-8 hover:bg-neutral-800/50 hover:border-amber-400/20 hover:shadow-2xl transition-all duration-700"
            >
              <div className="flex items-start gap-10">
                <div className="w-16 h-16 bg-neutral-800 rounded-3xl flex items-center justify-center text-amber-400 shadow-sm group-hover:bg-neutral-950 transition-all duration-700">
                  <Briefcase size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-neutral-200 mb-4 tracking-tight group-hover:text-amber-400 transition-colors uppercase italic text-lg">{job.title}</h3>
                  <div className="flex flex-wrap items-center gap-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">
                    <span className="flex items-center gap-2"><MapPin size={12} className="text-amber-400" /> {job.location}</span>
                    <span className="flex items-center gap-2"><Clock size={12} className="text-purple-400" /> {job.type}</span>
                    <span className="px-3 py-1 bg-neutral-800 border border-neutral-700 rounded-full group-hover:border-neutral-600 transition-colors">{job.category}</span>
                  </div>
                </div>
              </div>
              <button className="px-10 py-5 bg-neutral-950 text-neutral-200 rounded-2xl font-black text-xs uppercase tracking-widest border border-neutral-800 hover:bg-amber-400 hover:text-neutral-950 transition-all flex items-center gap-4 shadow-xl translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-500">
                Apply Now <Send size={16} />
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative p-20 bg-neutral-800 rounded-[64px] text-neutral-200 overflow-hidden text-center group"
        >
          <div className="absolute top-0 right-0 p-12 text-neutral-300/10 group-hover:text-amber-400/10 transition-colors">
            <Sparkles size={240} />
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-12 tracking-tighter uppercase italic relative z-10">Have a unique skillset?</h2>
          <p className="text-xl text-neutral-400 font-medium leading-relaxed max-w-2xl mx-auto mb-16 relative z-10">
            We're always looking for exceptional talent. If you think you'd be a great fit, send us your portfolio and let's talk.
          </p>
          <button className="px-16 py-8 bg-amber-400 text-neutral-950 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-amber-300 transition-all shadow-2xl relative z-10 group-hover:scale-105 duration-500">
            Send Open Application
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default Careers

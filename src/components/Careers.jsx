import { motion } from 'framer-motion'
import { ArrowRight, Briefcase, MapPin, Clock, Star, Sparkles, Send } from 'lucide-react'

const Careers = ({ onBack }) => {
  const jobs = [
    {
      title: "Senior Product Designer",
      location: "Remote / SF",
      type: "Full-time",
      category: "Design"
    },
    {
      title: "Full Stack Engineer (React/Go)",
      location: "Berlin / Remote",
      type: "Full-time",
      category: "Engineering"
    },
    {
      title: "AI Solutions Architect",
      location: "Remote",
      type: "Full-time",
      category: "Engineering"
    },
    {
      title: "Growth Marketing Manager",
      location: "New York",
      type: "Full-time",
      category: "Marketing"
    }
  ]

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-16 mb-32 border-b border-neutral-100 pb-24">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 text-blue-600 mb-10 font-black uppercase tracking-[0.4em] text-[10px]"
            >
              <Star size={12} />
              Join the team
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-7xl md:text-9xl font-black text-neutral-950 tracking-tighter mb-10 uppercase italic"
            >
              Innovate Together<span className="text-blue-600">.</span>
            </motion.h1>
            <p className="text-2xl text-neutral-500 font-medium leading-relaxed max-w-2xl">
              We're looking for ambitious minds to help us define the next era of digital excellence.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="p-8 bg-neutral-950 text-white rounded-[40px] shadow-2xl">
              <span className="text-5xl font-black mb-4 block tracking-tighter italic">24+</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Open Positions</span>
            </div>
            <div className="p-8 bg-blue-600 text-white rounded-[40px] shadow-2xl">
              <span className="text-5xl font-black mb-4 block tracking-tighter italic">100%</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-200">Remote Friendly</span>
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
              className="group p-10 bg-neutral-50 rounded-[48px] border border-neutral-100 flex flex-col md:flex-row md:items-center justify-between gap-8 hover:bg-white hover:border-blue-600/20 hover:shadow-2xl transition-all duration-700"
            >
              <div className="flex items-start gap-10">
                <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-neutral-950 shadow-sm group-hover:bg-neutral-950 group-hover:text-white transition-all duration-700">
                  <Briefcase size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-neutral-950 mb-4 tracking-tight group-hover:text-blue-600 transition-colors uppercase italic text-lg">{job.title}</h3>
                  <div className="flex flex-wrap items-center gap-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">
                    <span className="flex items-center gap-2"><MapPin size={12} className="text-blue-600" /> {job.location}</span>
                    <span className="flex items-center gap-2"><Clock size={12} className="text-purple-600" /> {job.type}</span>
                    <span className="px-3 py-1 bg-white border border-neutral-100 rounded-full group-hover:border-neutral-200 transition-colors">{job.category}</span>
                  </div>
                </div>
              </div>
              <button className="px-10 py-5 bg-neutral-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center gap-4 shadow-xl translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-500">
                Apply Now <Send size={16} />
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="relative p-20 bg-neutral-950 rounded-[64px] text-white overflow-hidden text-center group"
        >
          <div className="absolute top-0 right-0 p-12 text-white/5 group-hover:text-blue-600/10 transition-colors">
            <Sparkles size={240} />
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-12 tracking-tighter uppercase italic relative z-10">Don't see a role?</h2>
          <p className="text-xl text-neutral-400 font-medium leading-relaxed max-w-2xl mx-auto mb-16 relative z-10">
            We're always looking for exceptional talent. If you think you'd be a great fit, send us your portfolio and let's talk.
          </p>
          <button className="px-16 py-8 bg-white text-neutral-950 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-all shadow-2xl relative z-10 group-hover:scale-105 duration-500">
            Send Open Application
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default Careers

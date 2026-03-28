import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink, ArrowUpRight } from 'lucide-react'

const CaseStudies = ({ onBack }) => {
  const studies = [
    {
      title: "FinTech Dashboard Reimagined",
      description: "How we increased user retention by 45% for a leading finance platform.",
      category: "UX/UI Design",
      image: "https://images.unsplash.com/photo-1551288049-bbdac8a28a80?auto=format&fit=crop&q=80&w=1200",
      color: "bg-blue-600"
    },
    {
      title: "SaaS Platform Scalability",
      description: "Architecting a multi-tenant cloud solution for 10M+ active monthly users.",
      category: "Engineering",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
      color: "bg-purple-600"
    },
    {
      title: "AI-Driven Healthcare",
      description: "Implementing predictive analytics for personalized patient care.",
      category: "Artificial Intelligence",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200",
      color: "bg-emerald-600"
    }
  ]

  return (
    <div className="pt-32 pb-24 min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-32">
          <div className="max-w-2xl">
            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-7xl md:text-9xl font-black text-neutral-950 tracking-tighter mb-12"
            >
              Proven Results<span className="text-blue-600">.</span>
            </motion.h1>
            <p className="text-2xl text-neutral-500 font-medium leading-relaxed">
              We don't just build software. We solve complex business challenges with creative engineering and strategic design.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => onBack('landing')}
            className="w-20 h-20 bg-neutral-950 rounded-full flex items-center justify-center text-white shadow-2xl transition-transform"
          >
            <ArrowRight size={24} className="-rotate-180" />
          </motion.button>
        </div>

        <div className="space-y-40">
          {studies.map((study, index) => (
            <motion.section 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-20 items-center group"
            >
              <div className={`${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[48px] shadow-2xl transition-transform group-hover:scale-[0.98] duration-700">
                  <img src={study.image} alt={study.title} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-1000" />
                  <div className={`absolute inset-0 ${study.color} mix-blend-multiply opacity-20 group-hover:opacity-10 transition-opacity`} />
                </div>
              </div>
              
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-8 block">
                  {study.category}
                </span>
                <h2 className="text-4xl md:text-6xl font-black text-neutral-950 mb-8 tracking-tighter leading-tight">
                  {study.title}
                </h2>
                <p className="text-xl text-neutral-500 font-medium mb-12 leading-relaxed">
                  {study.description}
                </p>
                
                <div className="flex items-center gap-6 group/btn">
                  <button className="px-10 py-5 bg-neutral-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center gap-4 shadow-xl">
                    View Case Study <ArrowUpRight size={18} />
                  </button>
                  <button className="p-5 border border-neutral-200 rounded-2xl hover:border-neutral-950 transition-colors">
                    <ExternalLink size={20} className="text-neutral-400 group-hover/btn:text-neutral-950 transition-colors" />
                  </button>
                </div>
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CaseStudies

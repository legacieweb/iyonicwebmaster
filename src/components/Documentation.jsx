import { motion } from 'framer-motion'
import { Search, ChevronRight, Book, Code, Terminal, Zap, Shield, Globe } from 'lucide-react'

const Documentation = ({ onBack }) => {
  const sections = [
    {
      title: "Getting Started",
      icon: <Zap size={20} />,
      items: ["Introduction", "Quick Start Guide", "Installation", "Core Concepts"]
    },
    {
      title: "Architecture",
      icon: <Globe size={20} />,
      items: ["Project Structure", "State Management", "Data Flow", "Deployment"]
    },
    {
      title: "API Reference",
      icon: <Terminal size={20} />,
      items: ["Authentication", "Endpoints", "Webhooks", "Errors"]
    },
    {
      title: "Security",
      icon: <Shield size={20} />,
      items: ["Best Practices", "Compliance", "Access Control", "Audit Logs"]
    }
  ]

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24 border-b border-neutral-100 pb-20">
          <div className="max-w-2xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-7xl font-black text-neutral-950 tracking-tighter mb-8"
            >
              Docs<span className="text-blue-600">.</span>
            </motion.h1>
            <p className="text-xl text-neutral-500 font-medium leading-relaxed">
              Everything you need to build, deploy, and scale with Iyonicorp technologies.
            </p>
          </div>
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-blue-600 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search documentation..."
              className="w-full pl-16 pr-8 py-5 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:border-blue-600 focus:bg-white transition-all font-bold text-sm"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-12">
          {sections.map((section, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 text-neutral-950">
                <div className="w-10 h-10 bg-neutral-950 text-white rounded-xl flex items-center justify-center">
                  {section.icon}
                </div>
                <h3 className="text-xl font-black tracking-tight uppercase text-xs tracking-[0.2em] opacity-40">{section.title}</h3>
              </div>
              
              <ul className="space-y-4">
                {section.items.map((item, i) => (
                  <li key={i} className="group">
                    <a href="#" className="flex items-center justify-between p-4 rounded-xl hover:bg-neutral-50 transition-all">
                      <span className="text-sm font-bold text-neutral-500 group-hover:text-neutral-950 transition-colors">{item}</span>
                      <ChevronRight size={16} className="text-neutral-300 group-hover:text-blue-600 transition-all group-hover:translate-x-1" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-32 p-12 bg-neutral-950 rounded-[40px] text-white flex flex-col md:flex-row items-center justify-between gap-12"
        >
          <div className="max-w-md">
            <h2 className="text-3xl font-black mb-6 tracking-tight">Need custom help?</h2>
            <p className="text-neutral-400 font-medium leading-relaxed">Our technical support team is available 24/7 for enterprise partners.</p>
          </div>
          <button className="px-12 py-6 bg-white text-neutral-950 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-all shadow-2xl">
            Open Support Ticket
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default Documentation

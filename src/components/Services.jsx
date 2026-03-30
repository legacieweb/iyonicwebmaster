import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { SERVICES } from '../utils/constants'
import { MODULES } from '../utils/membership'

const Services = ({ onServiceClick }) => {
  return (
    <section id="services" className="py-24 bg-neutral-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block text-sm font-bold text-blue-600 tracking-wider uppercase mb-4"
            >
              Our Expertise
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-neutral-900 leading-tight"
            >
              Solutions designed for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">modern businesses</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-neutral-500 max-w-sm mb-2"
          >
            We leverage the latest technologies to build scalable, high-performance products that solve real-world problems.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => {
            const Icon = service.icon
            const isWebDev = service.id === 'web-development'
            
            if (isWebDev) {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="lg:col-span-2 group relative bg-white rounded-[2.5rem] p-10 shadow-sm hover:shadow-2xl transition-all duration-500 border border-neutral-100 hover:border-blue-500/20 cursor-pointer overflow-hidden"
                  onClick={() => onServiceClick && onServiceClick(service.id)}
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-600/10 transition-colors duration-500" />
                  
                  <div className="flex flex-col md:flex-row gap-10 relative z-10">
                    <div className="md:w-1/2">
                      <div className={`w-16 h-16 rounded-2xl ${service.color} text-white flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-xl`}>
                        <Icon size={32} />
                      </div>
                      
                      <h3 className="text-3xl font-black mb-6 text-neutral-900 group-hover:text-blue-600 transition-colors uppercase italic tracking-tighter">
                        {service.title}
                      </h3>
                      
                      <p className="text-neutral-500 mb-8 leading-relaxed text-lg font-medium">
                        {service.description}
                      </p>

                      <div className="flex flex-wrap gap-3 mb-10">
                        {['Portfolio', 'E-commerce', 'SaaS', 'Business', 'Blogs', 'Travel'].map((type) => (
                          <span key={type} className="px-4 py-2 bg-neutral-50 text-neutral-600 text-[10px] font-black uppercase tracking-widest rounded-xl border border-neutral-100">
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="md:w-1/2 bg-neutral-50 rounded-[2rem] p-8 border border-neutral-100">
                      <div className="space-y-6">
                        <div>
                          <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-3">Investment Models</div>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-neutral-100">
                              <div className="font-bold text-sm text-neutral-900">Instant Purchase</div>
                              <div className="font-black text-blue-600">from $100</div>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-neutral-100">
                              <div className="font-bold text-sm text-neutral-900">Rent to Own</div>
                              <div className="font-black text-blue-600">from $12/mo</div>
                            </div>
                          </div>
                        </div>

                        <div className="pt-6 border-t border-neutral-200">
                          <div className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-3">Access Protocol</div>
                          <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                            <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-sm">
                              <Check size={16} strokeWidth={3} />
                            </div>
                            <div className="text-xs font-bold text-amber-900">Basic Membership Required</div>
                          </div>
                        </div>

                        <button
                          className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg flex items-center justify-center gap-3"
                        >
                          Explore Architectures
                          <ArrowRight size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            }

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-100 hover:border-transparent cursor-pointer"
                onClick={() => onServiceClick && onServiceClick(service.id)}
              >
                <div className={`w-14 h-14 rounded-2xl ${service.color} text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <Icon size={28} />
                </div>
                
                <h3 className="text-xl font-black mb-4 text-neutral-900 group-hover:text-blue-600 transition-colors uppercase italic tracking-tighter">
                  {service.title}
                </h3>
                
                <p className="text-neutral-500 mb-6 leading-relaxed font-medium">
                  {service.description}
                </p>
                
                <div className="space-y-3 mb-8">
                  {service.moduleIds.slice(0, 4).map((moduleId, idx) => {
                    const module = MODULES.find(m => m.id === moduleId)
                    return (
                      <div key={idx} className="flex items-center gap-2 text-xs text-neutral-600 font-bold">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        {module ? module.name : moduleId}
                      </div>
                    )
                  })}
                </div>
                
                <button
                  className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-900 group-hover:gap-3 transition-all"
                >
                  Explore Service
                  <ArrowRight size={16} className="text-blue-600" />
                </button>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services

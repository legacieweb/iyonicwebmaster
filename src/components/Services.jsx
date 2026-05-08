import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Layout, Zap, Shield, Globe, Award, Palette, Megaphone } from 'lucide-react'
import { SERVICES, SERVICES_CONTENT, PRICING_DATA } from '../utils/constants'

const Services = ({ onServiceClick }) => {
  return (
    <section id="services" className="py-32 bg-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[120px] -z-10 opacity-60" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-[140px] -z-10 opacity-60" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-16 mb-24">
          <div className="lg:max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-6"
            >
              <Sparkles size={14} className="text-blue-600" />
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">
                {SERVICES_CONTENT.subtitle}
              </span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-neutral-900 leading-[0.9] tracking-tighter uppercase italic"
            >
              {SERVICES_CONTENT.title.split(' ').slice(0, -1).join(' ')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                {SERVICES_CONTENT.title.split(' ').slice(-1)}
              </span>
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:max-w-md"
          >
            <p className="text-neutral-500 text-lg font-medium leading-relaxed italic border-l-4 border-blue-600 pl-8">
              {SERVICES_CONTENT.description}
            </p>
          </motion.div>
        </div>

        {/* Hero Service Card - Redesigned to Light Theme */}
        {SERVICES.map((service, index) => {
          const Icon = service.icon
          const servicePlans = PRICING_DATA[service.id] || []
          
          const minPrice = servicePlans.length > 0 
            ? Math.min(...servicePlans.map(p => p.price))
            : service.minPrice || 200

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative group"
            >
              <div 
                className="relative z-10 bg-white rounded-[3rem] p-8 md:p-16 overflow-hidden flex flex-col lg:flex-row gap-16 cursor-pointer border border-neutral-100 shadow-xl"
                onClick={() => onServiceClick && onServiceClick(service.id)}
              >
                {/* Visual Elements inside card */}
                <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
                  <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[80%] bg-blue-50 rounded-full blur-[120px] group-hover:bg-blue-100 transition-colors duration-700" />
                  <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[60%] bg-indigo-50 rounded-full blur-[100px]" />
                </div>

                <div className="lg:w-1/2 relative z-20">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center text-white mb-10 shadow-2xl shadow-blue-500/40">
                    <Icon size={40} />
                  </div>
                  
                  <h3 className="text-4xl md:text-5xl font-black text-neutral-900 mb-8 uppercase italic tracking-tighter">
                    {service.title}
                  </h3>
                  
                  <p className="text-neutral-500 text-xl leading-relaxed mb-12 font-medium">
                    {service.description}
                  </p>

                  <div className="grid grid-cols-2 gap-6 mb-12">
                    {[
                      { icon: Layout, label: 'Custom UI/UX' },
                      { icon: Zap, label: 'Fast Performance' },
                      { icon: Shield, label: 'Secure Architecture' },
                      { icon: Globe, label: 'Global Scaling' }
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 text-neutral-600">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                          <feature.icon size={16} className="text-blue-500" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest">{feature.label}</span>
                      </div>
                    ))}
                  </div>

                  <button className="inline-flex items-center gap-4 px-10 py-5 bg-neutral-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-blue-600 transition-all duration-300 shadow-xl shadow-neutral-900/20 active:scale-95">
                    Explore Solutions
                    <ArrowRight size={20} />
                  </button>
                </div>

                <div className="lg:w-1/2 relative z-20 flex flex-col justify-center">
                  <div className="bg-neutral-50 backdrop-blur-md border border-neutral-100 rounded-[2.5rem] p-10 relative overflow-hidden group/branding shadow-inner">
                    {/* Free Branding Badge */}
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-2 font-black text-[10px] uppercase tracking-widest -rotate-0 rounded-bl-2xl shadow-lg">
                      Free Benefit
                    </div>

                    <h4 className="text-2xl font-black text-neutral-900 mb-8 uppercase italic tracking-tight flex items-center gap-3">
                      <Award className="text-emerald-500" />
                      Complimentary Branding Suite
                    </h4>
                    
                    <div className="space-y-6">
                      {[
                        { icon: Palette, title: 'Custom Logo Design', desc: 'A unique visual mark that defines your brand.' },
                        { icon: Layout, title: 'Brand Banner', desc: 'High-impact visuals for your digital presence.' },
                        { icon: Megaphone, title: 'Marketing Material', desc: 'Professional flyers and posters for growth.' }
                      ].map((item, i) => (
                        <div key={i} className="flex gap-4 group-hover/branding:translate-x-2 transition-transform duration-300">
                          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center flex-shrink-0 text-emerald-500 shadow-sm border border-neutral-100">
                            <item.icon size={24} />
                          </div>
                          <div>
                            <h5 className="text-sm font-black text-neutral-900 uppercase tracking-wider mb-1">{item.title}</h5>
                            <p className="text-neutral-500 text-xs font-medium">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-10 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl">
                      <p className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em] text-center">
                        Total Value: $250 — Included Free with Web Development
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements behind card */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-100/50 to-indigo-100/50 rounded-[3.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

export default Services

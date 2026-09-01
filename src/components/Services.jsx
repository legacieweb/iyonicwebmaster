import { motion } from 'framer-motion'
import { ArrowRight, Briefcase, Building2, Shield, Globe, Award, BarChart3, TrendingUp } from 'lucide-react'
import { SERVICES, SERVICES_CONTENT, PRICING_DATA } from '../utils/constants'

const Services = ({ onServiceClick }) => {
  return (
    <section id="services" className="py-32 bg-neutral-950 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-400/5 rounded-full blur-[120px] -z-10 opacity-60" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-neutral-800 rounded-full blur-[140px] -z-10 opacity-60" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-16 mb-24">
          <div className="lg:max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-full mb-6"
            >
              <Briefcase size={14} className="text-amber-400" />
              <span className="text-[10px] font-black text-amber-400 uppercase tracking-[0.2em]">
                {SERVICES_CONTENT.subtitle}
              </span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-neutral-100 tracking-tight leading-[1.05]"
            >
              {SERVICES_CONTENT.title.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="relative inline-block text-amber-400">
                {SERVICES_CONTENT.title.split(' ').slice(-1)}
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-400/40 rounded-full" />
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
            <p className="text-neutral-400 text-lg font-medium leading-relaxed italic border-l-4 border-amber-400 pl-8">
              {SERVICES_CONTENT.description}
            </p>
          </motion.div>
        </div>

        {/* Holding Portfolio */}
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
                className="relative z-10 bg-neutral-900 rounded-[3rem] p-8 md:p-16 overflow-hidden flex flex-col lg:flex-row gap-16 cursor-pointer border border-neutral-800 hover:border-amber-400/30 transition-all duration-500 shadow-xl shadow-black/20"
                onClick={() => onServiceClick && onServiceClick(service.id)}
              >
                {/* Visual Elements inside card */}
                <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
                  <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[80%] bg-amber-400/5 rounded-full blur-[120px] group-hover:bg-amber-400/10 transition-colors duration-700" />
                  <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[60%] bg-neutral-950 rounded-full blur-[100px]" />
                </div>

                <div className="lg:w-1/2 relative z-20">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-neutral-200 rounded-3xl flex items-center justify-center text-neutral-950 mb-10 shadow-2xl shadow-amber-400/20">
                    <Icon size={40} />
                  </div>
                  
                  <h3 className="text-4xl md:text-5xl font-black text-neutral-200 mb-8 uppercase italic tracking-tighter">
                    {service.title}
                  </h3>
                  
                  <p className="text-neutral-400 text-xl leading-relaxed mb-12 font-medium">
                    {service.description}
                  </p>

                  <div className="grid grid-cols-2 gap-6 mb-12">
                    {[
                      { icon: Building2, label: 'Operational Assets' },
                      { icon: BarChart3, label: 'Revenue Streams' },
                      { icon: Shield, label: 'Established Processes' },
                      { icon: Globe, label: 'Scalable Model' }
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 text-neutral-400">
                        <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center">
                          <feature.icon size={16} className="text-amber-400" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest">{feature.label}</span>
                      </div>
                    ))}
                  </div>

                  <button className="inline-flex items-center gap-4 px-10 py-5 bg-amber-400 text-neutral-950 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-amber-300 transition-all duration-300 shadow-xl shadow-amber-400/20 active:scale-95">
                    View Holding Details
                    <ArrowRight size={20} />
                  </button>
                </div>

                <div className="lg:w-1/2 relative z-20 flex flex-col justify-center">
                  <div className="bg-neutral-800/30 backdrop-blur-md border border-neutral-700/50 rounded-[2.5rem] p-10 relative overflow-hidden group/branding shadow-inner">
                    {/* Due Diligence Report Badge */}
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-400 to-neutral-700 text-neutral-950 px-8 py-2 font-black text-[10px] uppercase tracking-widest rounded-bl-2xl shadow-lg">
                      Included Report
                    </div>

                    <h4 className="text-2xl font-black text-neutral-200 mb-8 uppercase italic tracking-tight flex items-center gap-3">
                      <Award className="text-amber-400" />
                      Institutional Due Diligence
                    </h4>
                    
                    <div className="space-y-6">
                      {[
                        { icon: BarChart3, title: 'Financial Analysis', desc: '12-month revenue, EBITDA, and cash flow projections.' },
                        { icon: Shield, title: 'Risk Assessment', desc: 'Operational and legal risk evaluation with mitigation plan.' },
                        { icon: TrendingUp, title: 'Growth Projections', desc: 'Sector analysis and scaling opportunity mapping.' }
                      ].map((item, i) => (
                        <div key={i} className="flex gap-4 group-hover/branding:translate-x-2 transition-transform duration-300">
                          <div className="w-12 h-12 rounded-xl bg-neutral-900 flex items-center justify-center flex-shrink-0 text-amber-400 border border-neutral-700">
                            <item.icon size={24} />
                          </div>
                          <div>
                            <h5 className="text-sm font-black text-neutral-200 uppercase tracking-wider mb-1">{item.title}</h5>
                            <p className="text-neutral-400 text-xs font-medium">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-10 p-4 bg-neutral-900/50 border border-neutral-700/50 rounded-2xl">
                      <p className="text-amber-400 text-[10px] font-black uppercase tracking-[0.2em] text-center">
                        Valuation: {formatPrice(minPrice)} — Full Report Included in Data Room
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements behind card */}
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-400/5 to-neutral-800/5 rounded-[3.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

function formatPrice(price) {
  if (!price || price === 0) return '$0'
  if (price >= 1000000) {
    return `$${(price / 1000000).toFixed(1)}M`
  }
  if (price >= 1000) {
    return `$${Math.round(price / 1000)}K`
  }
  return `$${price.toLocaleString()}`
}

export default Services

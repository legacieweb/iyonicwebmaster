import { ArrowRight, Check } from 'lucide-react'
import { SERVICES } from '../utils/constants'
import { MODULES } from '../utils/membership'

const Services = ({ onServiceClick }) => {
  return (
    <section id="services" className="py-24 bg-neutral-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="inline-block text-sm font-bold text-blue-600 tracking-wider uppercase mb-4">
              Our Expertise
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 leading-tight">
              Custom Web Development <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Solutions</span>
            </h2>
          </div>
          <p className="text-neutral-500 max-w-sm mb-2 font-medium">
            From high-conversion landing pages to complex enterprise architectures, we build digital products that drive growth and deliver exceptional user experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service, index) => {
            const Icon = service.icon
            
            return (
              <div
                key={index}
                className="group relative bg-white rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-neutral-100 hover:border-blue-500/20 cursor-pointer overflow-hidden flex flex-col"
                onClick={() => onServiceClick && onServiceClick(service.id)}
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-600/10 transition-colors duration-500" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-8">
                    <div className={`w-14 h-14 rounded-2xl ${service.color} text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                      <Icon size={28} />
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Architecture</span>
                      <span className="text-xs font-bold text-neutral-400">Next.js / React</span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-black mb-4 text-neutral-900 group-hover:text-blue-600 transition-colors uppercase italic tracking-tighter">
                    {service.title}
                  </h3>
                  
                  <p className="text-neutral-500 mb-8 leading-relaxed text-sm font-medium flex-grow">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {(service.types || ['Portfolio', 'E-commerce', 'SaaS', 'Business']).map((type) => (
                      <span key={type} className="px-3 py-1.5 bg-neutral-50 text-neutral-600 text-[9px] font-black uppercase tracking-widest rounded-lg border border-neutral-100 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100 transition-colors">
                        {type}
                      </span>
                    ))}
                  </div>

                  <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100 mt-auto">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">Investment starts at</div>
                      <div className="font-black text-blue-600 text-lg">$100</div>
                    </div>
                    
                    <button
                      className="w-full py-3 bg-neutral-950 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center justify-center gap-2 group/btn"
                    >
                      View Solutions
                      <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services
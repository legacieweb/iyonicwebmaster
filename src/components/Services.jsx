import { ArrowRight, Check } from 'lucide-react'
import { SERVICES, SERVICES_CONTENT, PRICING_DATA } from '../utils/constants'

const Services = ({ onServiceClick }) => {
  return (
    <section id="services" className="py-24 bg-neutral-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="inline-block text-sm font-bold text-blue-600 tracking-wider uppercase mb-4">
              {SERVICES_CONTENT.subtitle}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 leading-tight">
              {SERVICES_CONTENT.title.split(' ').slice(0, -1).join(' ')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                {SERVICES_CONTENT.title.split(' ').slice(-1)}
              </span>
            </h2>
          </div>
          <p className="text-neutral-500 max-w-sm mb-2 font-medium">
            {SERVICES_CONTENT.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service, index) => {
            const Icon = service.icon
            const servicePlans = PRICING_DATA[service.id] || []
            const minPrice = servicePlans.length > 0 
              ? Math.min(...servicePlans.map(p => p.price))
              : service.minPrice || 200
            
            return (
              <div
                key={index}
                className={`group relative bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm hover:shadow-2xl transition-all duration-500 border border-neutral-100 hover:border-blue-500/20 cursor-pointer overflow-hidden flex flex-col ${
                  service.id === 'branding-package' ? 'bg-gradient-to-br from-white to-indigo-50/30' : ''
                }`}
                onClick={() => onServiceClick && onServiceClick(service.id)}
              >
                {service.id === 'branding-package' && (
                  <div className="absolute -right-12 -top-12 bg-indigo-600 text-white px-16 py-8 rotate-45 z-20 shadow-lg">
                    <span className="text-xs font-black uppercase tracking-[0.2em]">Premium Logo</span>
                  </div>
                )}
                
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-600/10 transition-colors duration-500" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-8">
                    <div className={`w-16 h-16 rounded-2xl ${service.color} text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                      <Icon size={32} />
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">
                        {service.id === 'branding-package' ? 'Complimentary' : 'Architecture'}
                      </span>
                      <span className="text-xs font-bold text-neutral-400">{service.architecture || 'Next.js / React'}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-black mb-6 text-neutral-900 group-hover:text-blue-600 transition-colors uppercase italic tracking-tighter">
                    {service.title}
                  </h3>
                  
                  <p className="text-neutral-500 mb-10 leading-relaxed text-base font-medium flex-grow">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-10">
                    {(service.types || []).map((type) => (
                      <span key={type} className="px-4 py-2 bg-neutral-50 text-neutral-600 text-[10px] font-black uppercase tracking-widest rounded-xl border border-neutral-100 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100 transition-colors">
                        {type}
                      </span>
                    ))}
                  </div>

                  <div className={`${service.id === 'branding-package' ? 'bg-indigo-600 text-white' : 'bg-neutral-900 text-white'} rounded-3xl p-8 border border-neutral-100 mt-auto shadow-xl group-hover:-translate-y-1 transition-transform duration-300`}>
                    <div className="flex items-center justify-between mb-6">
                      <div className={`text-[10px] font-black uppercase tracking-widest ${service.id === 'branding-package' ? 'text-indigo-200' : 'text-neutral-400'}`}>
                        {service.id === 'branding-package' ? 'Value' : 'Investment starts at'}
                      </div>
                      <div className={`font-black text-2xl ${service.id === 'branding-package' ? 'text-white' : 'text-blue-400'}`}>
                        {`$${minPrice}`}
                      </div>
                    </div>
                    
                    <button
                      className={`w-full py-4 ${service.id === 'branding-package' ? 'bg-white text-indigo-600' : 'bg-blue-600 text-white'} rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group/btn shadow-lg`}
                    >
                      {service.id === 'branding-package' ? 'View Catalog' : 'View Solutions'}
                      <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
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
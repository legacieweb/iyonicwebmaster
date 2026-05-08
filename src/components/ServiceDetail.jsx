import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, Check, Star, Zap, Shield, Sparkles, Globe, Cpu, Info, CheckCircle2, AlertCircle
} from 'lucide-react'
import AnimatedCTA from './AnimatedCTA'
import { MODULES } from '../utils/membership'
import { useAuth } from '../contexts/AuthContext'

const CoolPopup = ({ isOpen, onClose, title, message, type = 'info' }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-sm bg-white rounded-[32px] p-8 shadow-2xl overflow-hidden"
          >
            <div className={`absolute top-0 left-0 w-full h-2 ${
              type === 'success' ? 'bg-emerald-500' : type === 'error' ? 'bg-rose-500' : 'bg-blue-600'
            }`} />
            
            <div className="flex flex-col items-center text-center">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                type === 'success' ? 'bg-emerald-50 text-emerald-500' : 
                type === 'error' ? 'bg-rose-50  text-rose-500' : 
                'bg-blue-50 text-blue-600'
              }`}>
                {type === 'success' ? <CheckCircle2 size={32} /> : 
                 type === 'error' ? <AlertCircle size={32} /> : 
                 <Info size={32} />}
              </div>
              
              <h3 className="text-xl font-black text-neutral-900 mb-2 uppercase tracking-tight italic">
                {title}
              </h3>
              <p className="text-neutral-500 text-sm font-medium leading-relaxed mb-8">
                {message}
              </p>
              
              <button
                onClick={onClose}
                className="w-full py-4 bg-neutral-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-colors shadow-lg active:scale-95"
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

const ServiceDetail = ({ service, onBack, pricingPlans, onViewCatalog }) => {
  const [currency, setCurrency] = useState('USD')
  const [popup, setPopup] = useState({ isOpen: false, title: '', message: '', type: 'info' })
  const KES_RATE = 125

  const formatPrice = (price) => {
    if (currency === 'KES') {
      return `KES ${(price * KES_RATE).toLocaleString()}`
    }
    return `$${price.toLocaleString()}`
  }

  const getMonthlyPrice = (price) => {
    const monthly = price / 12
    if (currency === 'KES') {
      return `KES ${(monthly * KES_RATE).toLocaleString()}/mo`
    }
    return `$${monthly.toLocaleString()}/mo`
  }

  const formatPriceRange = (price, maxPrice) => {
    if (!maxPrice) return formatPrice(price)
    
    if (currency === 'KES') {
      return `KES ${(price * KES_RATE).toLocaleString()} - ${(maxPrice * KES_RATE).toLocaleString()}`
    }
    return `$${price.toLocaleString()} - $${maxPrice.toLocaleString()}`
  }

  if (!service) return null

  const Icon = service.icon

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Navigation */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 transition-colors mb-12 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold text-sm uppercase tracking-widest">Back to Services</span>
        </motion.button>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className={`w-16 h-16 rounded-2xl ${service.color} text-white flex items-center justify-center mb-8 shadow-xl`}>
                <Icon size={32} />
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-neutral-900 mb-6 leading-tight">
                {service.title}
              </h1>
              <p className="text-xl text-neutral-500 mb-10 leading-relaxed">
                {service.description}
              </p>

              <div className="space-y-6 mb-12">
                <h3 className="text-xl font-bold text-neutral-900">Modular Components</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {service.moduleIds.map((moduleId, index) => {
                    const module = MODULES.find(m => m.id === moduleId)
                    return (
                      <div key={index} className="flex items-center gap-3 p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <Check size={14} className="text-blue-600" />
                        </div>
                        <span className="font-bold text-neutral-700 text-sm">{module ? module.name : moduleId}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Sample Content Area */}
              <div className="p-10 bg-neutral-950 rounded-[48px] text-white relative overflow-hidden shadow-2xl group">
                <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-600/40 transition-colors duration-700" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
                
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-600/20 rounded-full text-blue-400 text-[10px] font-black mb-8 tracking-[0.2em] uppercase">
                    <Sparkles size={14} className="animate-pulse" />
                    Premium Experience
                  </div>
                  
                  <h3 className="text-3xl font-black mb-6 leading-tight">
                    Beyond standard <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">expectations.</span>
                  </h3>
                  
                  <p className="text-neutral-400 leading-relaxed mb-10 text-lg font-medium">
                    Our {service.title} methodology is rooted in deep technical excellence and architectural precision. We don't just build—we engineer for the future.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/5 backdrop-blur-sm">
                      <div className="text-2xl font-black text-white mb-1 italic tracking-tighter">100%</div>
                      <div className="text-[10px] font-black text-neutral-500 uppercase tracking-widest leading-none">Custom Built</div>
                    </div>
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/5 backdrop-blur-sm">
                      <div className="text-2xl font-black text-white mb-1 italic tracking-tighter">24hr</div>
                      <div className="text-[10px] font-black text-neutral-500 uppercase tracking-widest leading-none">Response Time</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Added trust element */}
              <div className="mt-12 flex items-center gap-8 opacity-40 grayscale group hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-950">Trusted By</span>
                <div className="h-[1px] flex-1 bg-neutral-200" />
                <div className="flex gap-8 items-center">
                  <Globe size={20} />
                  <Cpu size={20} />
                  <Shield size={20} />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Pricing */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="sticky top-32"
          >
            <div className="bg-neutral-50 rounded-[48px] p-8 md:p-12 border border-neutral-100">
              <div className="flex flex-col items-center mb-10">
                <h2 className="text-3xl font-black text-neutral-900 mb-2 text-center">Service Pricing</h2>
                <p className="text-neutral-500 font-medium mb-6 text-center">Select the best plan for your needs</p>
                
                <div className="flex gap-2 bg-white p-1.5 rounded-2xl border border-neutral-200">
                  <button
                    onClick={() => setCurrency('USD')}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest ${
                      currency === 'USD' ? 'bg-blue-600 text-white shadow-sm' : 'text-neutral-400 hover:text-neutral-600'
                    }`}
                  >
                    USD
                  </button>
                  <button
                    onClick={() => setCurrency('KES')}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest ${
                      currency === 'KES' ? 'bg-blue-600 text-white shadow-sm' : 'text-neutral-400 hover:text-neutral-600'
                    }`}
                  >
                    KES
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {pricingPlans.map((plan, index) => (
                  <div 
                    key={index}
                    className={`relative p-8 rounded-[32px] border transition-all duration-300 hover:shadow-xl group bg-white overflow-hidden ${
                      plan.popular ? 'border-transparent ring-4 ring-blue-50' : 'border-neutral-200 hover:border-blue-200'
                    } ${plan.design?.shadow || ''}`}
                  >
                    {/* Design Background Pattern */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 ${plan.design?.pattern || ''}`} />
                    
                    {/* Design Gradient Bar */}
                    <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${plan.design?.gradient || 'from-blue-600 to-indigo-600'}`} />

                    {plan.tag && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 z-20 shadow-lg">
                        <Star size={10} fill="currentColor" />
                        {plan.tag}
                      </div>
                    )}
                    
                    {plan.popular && !plan.tag && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 z-20 shadow-lg">
                        <Star size={10} fill="currentColor" />
                        Most Popular
                      </div>
                    )}
                    
                    <div className="relative z-10 flex flex-col mb-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex flex-col">
                          <h4 className="font-black text-neutral-900 text-lg uppercase tracking-tight">{plan.name}</h4>
                          {plan.category && (
                            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{plan.category}</span>
                          )}
                        </div>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${plan.popular ? 'bg-blue-600 text-white shadow-lg' : 'bg-neutral-100 text-neutral-400 group-hover:bg-blue-600 group-hover:text-white'}`}>
                          <Zap size={20} />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className="text-3xl font-black text-neutral-900">{formatPriceRange(plan.price, plan.maxPrice)}</span>
                          {plan.period && <span className="text-neutral-400 text-sm font-bold">{plan.period}</span>}
                        </div>
                        <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-1">
                          Or {getMonthlyPrice(plan.price)} for 12 months
                        </div>
                      </div>
                    </div>

                    <div className="relative z-10 space-y-3 mb-8">
                      {plan.moduleIds.slice(0, 4).map((moduleId, i) => {
                        const module = MODULES.find(m => m.id === moduleId)
                        return (
                          <div key={i} className="flex items-center gap-3 text-sm text-neutral-600 font-bold">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-opacity-10 ${plan.color === 'blue' ? 'bg-blue-600' : 'bg-neutral-900'}`}>
                              <Check size={12} className={plan.color === 'blue' ? 'text-blue-600' : 'text-neutral-900'} />
                            </div>
                            {module ? module.name : moduleId}
                          </div>
                        )
                      })}
                    </div>

                    <AnimatedCTA 
                      onClick={() => onViewCatalog(plan)} 
                      className={`w-full relative z-10 font-black group-hover:bg-gradient-to-r ${plan.design?.gradient || ''}`} 
                    />
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-blue-600/5 rounded-[32px] border border-blue-600/10 flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <Shield size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 text-sm">Quality Guaranteed</h4>
                  <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">100% Satisfaction or Money Back</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <CoolPopup {...popup} onClose={() => setPopup(prev => ({ ...prev, isOpen: false }))} />
    </div>
  )
}

export default ServiceDetail

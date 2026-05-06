import { useState } from 'react'
import { Check, ArrowRight, Star, Sparkles, Mail } from 'lucide-react'
import { PRICING_DATA } from '../utils/constants'
import { MODULES, MEMBERSHIP_TIERS } from '../utils/membership'
import { useAuth } from '../contexts/AuthContext'

const Pricing = ({ onPlanClick }) => {
  const { currentUser } = useAuth()
  const [currency, setCurrency] = useState('USD')
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

  const offers = [
    {
      id: 'basic',
      name: 'Basic Membership',
      serviceName: 'Core Infrastructure',
      price: MEMBERSHIP_TIERS.BASIC.price,
      description: 'Perfect for small businesses starting their digital journey with essential core features.',
      tag: 'Essential',
      color: 'blue',
      membership_tier: true,
      priceType: 'monthly',
      design: {
        gradient: 'from-blue-600 to-cyan-500',
        pattern: 'bg-grid-white/[0.02]',
        shadow: 'hover:shadow-blue-500/20'
      },
      benefits: MEMBERSHIP_TIERS.BASIC.features
    },
    {
      id: 'premium',
      name: 'Premium Membership',
      serviceName: 'Professional Stack',
      price: MEMBERSHIP_TIERS.PREMIUM.price,
      description: 'Total digital transformation for businesses ready to scale with advanced analytics.',
      tag: 'Most Popular',
      popular: true,
      membership_tier: true,
      priceType: 'monthly',
      color: 'purple',
      design: {
        gradient: 'from-purple-600 to-indigo-600',
        pattern: 'bg-dot-white/[0.05]',
        shadow: 'hover:shadow-purple-500/20'
      },
      benefits: MEMBERSHIP_TIERS.PREMIUM.features
    },
    {
      id: 'premium_plus',
      name: 'Premium Plus',
      serviceName: 'Enterprise Ecosystem',
      price: MEMBERSHIP_TIERS.PREMIUM_PLUS.price,
      description: 'The complete tech ecosystem. Unlimited modules and 24/7 VIP engineering support.',
      tag: 'Total Power',
      membership_tier: true,
      priceType: 'monthly',
      color: 'indigo',
      design: {
        gradient: 'from-indigo-600 to-blue-700',
        pattern: 'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))]',
        shadow: 'hover:shadow-indigo-500/20'
      },
      benefits: MEMBERSHIP_TIERS.PREMIUM_PLUS.features
    },
    {
      id: 'enterprise',
      name: 'Enterprise Tier',
      serviceName: 'Unlimited Infrastructure',
      price: MEMBERSHIP_TIERS.ENTERPRISE.price,
      description: 'Maximum scalability with dedicated infrastructure and full whitelabel business platform.',
      tag: 'Maximum Scale',
      membership_tier: true,
      priceType: 'monthly',
      color: 'rose',
      design: {
        gradient: 'from-rose-600 to-orange-500',
        pattern: 'bg-grid-white/[0.02]',
        shadow: 'hover:shadow-rose-500/20'
      },
      benefits: MEMBERSHIP_TIERS.ENTERPRISE.features
    },
    {
      id: 'partner',
      name: 'Alliance Partner',
      serviceName: 'E-commerce Alliance',
      price: 7,
      isCommission: true,
      description: 'Strategic partnership for high-volume e-commerce with zero upfront development costs.',
      tag: 'Strategic Partner',
      membership_tier: true,
      priceType: 'commission',
      color: 'emerald',
      design: {
        gradient: 'from-emerald-600 to-teal-500',
        pattern: 'bg-grid-white/[0.02]',
        shadow: 'hover:shadow-emerald-500/20'
      },
      benefits: MEMBERSHIP_TIERS.PARTNER.features
    }
  ]

  return (
    <section id="pricing" className="py-24 bg-white overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-bold text-blue-600 tracking-wider uppercase mb-4">
            Membership Tiers
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Precision Engineered <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Growth Plans</span>
          </h2>
          <p className="text-neutral-500 max-w-2xl mx-auto font-medium">
            Select the infrastructure tier that matches your business ambition.
          </p>
        </div>

        <div className="flex items-center justify-center gap-6 mb-16">
          <div className="flex gap-2 bg-neutral-50 p-1.5 rounded-2xl border border-neutral-100 shadow-sm">
            <button
              onClick={() => setCurrency('USD')}
              className={`px-6 py-2 rounded-xl text-[10px] font-black transition-all uppercase tracking-[0.2em] ${
                currency === 'USD' ? 'bg-white text-blue-600 shadow-sm' : 'text-neutral-400 hover:text-neutral-600'
              }`}
            >
              USD
            </button>
            <button
              onClick={() => setCurrency('KES')}
              className={`px-6 py-2 rounded-xl text-[10px] font-black transition-all uppercase tracking-[0.2em] ${
                currency === 'KES' ? 'bg-white text-blue-600 shadow-sm' : 'text-neutral-400 hover:text-neutral-600'
              }`}
            >
              KES
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 justify-center">
          {offers.map((plan, i) => (
            <div 
              key={i} 
              className={`relative flex flex-col bg-white rounded-[40px] p-10 border transition-all duration-500 hover:shadow-2xl group ${
                plan.popular ? 'border-transparent ring-4 ring-blue-50 scale-105 z-20' : 'border-neutral-100'
              }`}
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[40px] ${plan.design?.pattern || ''}`} />
              
              <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${plan.design?.gradient || 'from-blue-600 to-indigo-600'} rounded-t-[40px]`} />

              <div className={`absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full text-[11px] font-black tracking-widest uppercase flex items-center gap-2 z-30 transition-all shadow-xl ${
                plan.popular ? 'bg-blue-600 text-white scale-110' : 'bg-neutral-900 text-white group-hover:bg-blue-600'
              }`}>
                <Star size={14} fill="currentColor" />
                {plan.tag}
              </div>
              
              <div className="relative z-10 mb-8 mt-2">
                <div className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-2">{plan.serviceName}</div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4">{plan.name}</h3>
                
                <div className="flex flex-col mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-neutral-900 tracking-tighter italic">
                      {plan.isCommission ? `${plan.price}%` : formatPrice(plan.price)}
                    </span>
                    <span className="text-neutral-400 font-bold uppercase text-[10px] tracking-widest ml-1">
                      {plan.priceType === 'monthly' ? '/mo' : plan.priceType === 'commission' ? 'fee' : 'One-time'}
                    </span>
                  </div>
                  <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-1">
                    {plan.priceType === 'monthly' ? 'Billing Cycle: Monthly' : plan.priceType === 'commission' ? 'Revenue Share Model' : 'Flexible payment plans'}
                  </div>
                </div>
                <p className="text-neutral-500 text-xs leading-relaxed font-medium line-clamp-2">{plan.description}</p>
              </div>

              <div className="relative z-10 flex-1 space-y-3 mb-10">
                {plan.benefits.slice(0, 8).map((benefit, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 bg-blue-50 text-blue-600 mt-0.5">
                      <Check size={10} strokeWidth={4} />
                    </div>
                    <span className="text-neutral-700 text-[11px] font-bold leading-tight">{benefit}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => onPlanClick?.(plan)}
                disabled={currentUser?.membership_tier === plan.id}
                className={`relative z-10 w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 hover:bg-blue-700 ${currentUser?.membership_tier === plan.id ? 'opacity-80 cursor-default' : ''}`}
              >
                {currentUser?.membership_tier === plan.id ? 'Current Plan' : 'Select Plan'}
                <Sparkles size={16} className="text-blue-200 group-hover:rotate-12 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-20 p-12 bg-neutral-50 rounded-[48px] border border-neutral-100 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner">
              <Mail size={32} />
            </div>
            <div>
              <h4 className="text-2xl font-bold text-neutral-900 mb-2">Have specific requirements?</h4>
              <p className="text-neutral-500 font-medium">We specialize in custom enterprise solutions and high-end integrations.</p>
            </div>
          </div>
          <button className="flex-shrink-0 px-10 py-5 bg-blue-600 text-white rounded-full font-black uppercase tracking-widest text-sm hover:bg-blue-700 transition-all flex items-center gap-2 group">
            Contact Expert
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Pricing
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, Star, ArrowRight, ShoppingBag, Globe, Cloud, ShieldCheck, Users, Wallet, BarChart3 } from 'lucide-react'
import { BUSINESS_MEMBERSHIP_TIERS, formatPrice } from '../utils/constants'
import { useAuth } from '../contexts/AuthContext'

const TIER_ICONS = [ShoppingBag, Globe, Cloud, ShieldCheck, Users]

const Pricing = ({ onLoginClick }) => {
  const [currency, setCurrency] = useState('USD')
  const KES_RATE = 125
  const navigate = useNavigate()
  const { isAuthenticated, toggleAuthModal } = useAuth()

  const handleSelectPlan = () => {
    if (isAuthenticated) {
      navigate('/dashboard')
    } else {
      if (onLoginClick) {
        onLoginClick('login')
      } else {
        toggleAuthModal('login')
      }
    }
  }

  const formatPlanPrice = (price) => {
    if (currency === 'KES') {
      return `KES ${(price * KES_RATE).toLocaleString()}`
    }
    return `$${price.toLocaleString()}`
  }

  return (
    <section id="pricing" className="py-32 bg-neutral-950 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-400/5 rounded-full blur-[140px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-neutral-800 rounded-full blur-[140px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 border border-neutral-800 text-amber-400 text-[11px] font-black uppercase tracking-widest mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Membership Tiers
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-neutral-100 tracking-tight leading-[1.05] mb-6">
            Precision Engineered
            <span className="relative inline-block text-amber-400">
              {' '}Growth Plans.
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-400/40 rounded-full" />
            </span>
          </h2>
          <p className="text-neutral-400 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
            Select the infrastructure tier that matches your business ambition.
          </p>
        </motion.div>

        {/* Currency Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="flex justify-center mb-20"
        >
          <div className="flex gap-2 bg-neutral-900 p-2 rounded-2xl border border-neutral-800">
            <button
              onClick={() => setCurrency('USD')}
              className={`px-8 py-3 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest ${
                currency === 'USD'
                  ? 'bg-amber-400 text-neutral-950 shadow-lg shadow-amber-400/20'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              USD
            </button>
            <button
              onClick={() => setCurrency('KES')}
              className={`px-8 py-3 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest ${
                currency === 'KES'
                  ? 'bg-amber-400 text-neutral-950 shadow-lg shadow-amber-400/20'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              KES
            </button>
          </div>
        </motion.div>

        {/* Tier Cards */}
        <div className="grid lg:grid-cols-3 gap-8">
          {BUSINESS_MEMBERSHIP_TIERS.map((tier, index) => {
            const Icon = TIER_ICONS[index] || ShoppingBag
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.1 }}
                className={`relative group bg-neutral-900/70 backdrop-blur-xl rounded-[32px] p-8 border transition-all duration-300 flex flex-col ${
                  tier.popular
                    ? 'border-2 border-amber-400/20 shadow-2xl shadow-amber-400/5'
                    : 'border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg">
                    <Star size={10} fill="currentColor" />
                    Most Popular
                  </div>
                )}

                <div className="text-xs font-black text-neutral-600 uppercase tracking-widest mb-4">
                  {tier.tierLabel}
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-neutral-800/30 flex items-center justify-center text-amber-400 border border-neutral-800">
                    <Icon size={22} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-medium text-neutral-100 tracking-tight">
                      {tier.name}
                    </h3>
                    <p className="text-sm text-neutral-500 font-medium mt-0.5">
                      {tier.subtitle}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  {tier.price !== null ? (
                    <>
                      <div className="text-4xl font-medium text-amber-400 tracking-tight">
                        {formatPlanPrice(tier.price)}
                      </div>
                      <div className="text-xs font-medium text-neutral-600 uppercase tracking-widest mt-1">
                        Billing Cycle: Monthly
                      </div>
                    </>
                  ) : (
                    <div>
                      {tier.priceLabel.split(' ').map((word, i) => (
                        <div
                          key={i}
                          className={
                            i === 0
                              ? 'text-4xl font-medium text-amber-400 tracking-tight'
                              : 'text-sm font-medium text-neutral-500 uppercase tracking-widest'
                          }
                        >
                          {word}
                        </div>
                      ))}
                      {tier.badge && (
                        <div className="mt-2 inline-flex items-center px-3 py-1 bg-neutral-800/30 text-neutral-300 rounded-full text-[10px] font-black uppercase tracking-wider border border-neutral-800">
                          {tier.badge}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <p className="text-sm text-neutral-400 font-medium leading-relaxed mb-6 flex-1">
                  {tier.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-neutral-300 font-medium text-sm">
                      <CheckCircle2 size={16} className="text-amber-400 flex-shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={handleSelectPlan}
                  className="w-full py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-amber-400/20 hover:shadow-amber-400/30 transition-shadow mt-auto"
                >
                  Select Plan
                </button>
              </motion.div>
            )
          })}
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20"
        >
          <div className="flex flex-wrap gap-8 justify-center items-center bg-neutral-900/50 backdrop-blur-xl rounded-[32px] p-10 border border-neutral-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-400">
                <Wallet size={24} />
              </div>
              <div className="text-left">
                <div className="text-xs font-black text-neutral-600 uppercase tracking-widest">
                  Average Revenue Multiple
                </div>
                <div className="text-3xl font-black text-neutral-200 italic">
                  3.2x
                </div>
              </div>
            </div>
            <div className="w-px h-16 bg-neutral-800 hidden sm:block" />
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-400">
                <BarChart3 size={24} />
              </div>
              <div className="text-left">
                <div className="text-xs font-black text-neutral-600 uppercase tracking-widest">
                  Portfolio Assets
                </div>
                <div className="text-3xl font-black text-neutral-200 italic">
                  70+
                </div>
              </div>
            </div>
            <div className="w-px h-16 bg-neutral-800 hidden sm:block" />
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-400">
                <ShoppingBag size={24} />
              </div>
              <div className="text-left">
                <div className="text-xs font-black text-neutral-600 uppercase tracking-widest">
                  Acquisition Success
                </div>
                <div className="text-3xl font-black text-neutral-200 italic">
                  100%
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Pricing

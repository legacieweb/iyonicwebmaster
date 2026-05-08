import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, HeartHandshake, Zap, ShieldCheck, ArrowRight, Check, ChevronLeft, ChevronRight } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

const PartnershipDetail = () => {
  const { isAuthenticated, toggleAuthModal } = useAuth()
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % sections.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const handlePartnerNow = () => {
    if (isAuthenticated) {
      // Redirect to dashboard membership section
      navigate('/dashboard', { state: { tab: 'membership' } })
    } else {
      // Set redirect flag for after login
      localStorage.setItem('auth_redirect', JSON.stringify({ path: '/dashboard', state: { tab: 'membership' } }))
      toggleAuthModal('login')
    }
  }

  const sections = [
    {
      title: 'Revenue Alignment',
      description: 'Traditional models demand upfront capital for unproven results. We invert the risk, investing our talent and technology into your store\'s success first.',
      icon: ShieldCheck,
      color: 'blue'
    },
    {
      title: 'All-Inclusive 7% Fee',
      description: 'A single 7% fee that covers everything: service fee, maintenance fee, operating fee, and transaction fees. You receive the exact amount you see on your dashboard.',
      icon: HeartHandshake,
      color: 'indigo'
    },
    {
      title: 'Instant Payouts',
      description: 'Experience true liquidity. Your earnings are settled to mobile money within 30 seconds of a sale. No 3-day waiting periods.',
      icon: Zap,
      color: 'purple'
    }
  ]

  const benefits = [
    '7% All-Inclusive Service Fee',
    '30-Second Mobile Money Settlements',
    'Zero Upfront Development Costs',
    'Exact Dashboard Value Transfers',
    'Free Lifetime Maintenance',
    'Enterprise-Grade Security',
    'Bespoke Store Customization',
    'Direct Dashboard Management'
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar onLoginClick={() => navigate('/login')} />
      
      {/* Clean Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.05),transparent_50%)]" />
      </div>

      <main className="relative z-10">
        {/* Clean Hero Section */}
        <section className="pt-40 pb-20 px-8 max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-blue-50 rounded-full text-blue-600 shadow-sm">
                <Sparkles size={14} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Strategic E-commerce Alliance</span>
              </div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-8xl lg:text-[100px] font-black mb-10 leading-[0.9] tracking-tighter text-neutral-900 uppercase italic"
            >
              The <span className="text-blue-600">Alliance</span> <br />
              Protocol.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-neutral-500 mb-12 leading-relaxed max-w-3xl font-medium"
            >
              Build your e-commerce empire with zero upfront costs. Join our 7% revenue sharing alliance and scale with instant settlements.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={handlePartnerNow}
              className="px-12 py-6 bg-blue-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 flex items-center gap-3"
            >
              Partner Now
              <ArrowRight size={18} />
            </motion.button>
          </div>
        </section>

        {/* Clean Partnership Benefits Section - Auto Slider */}
        <section className="max-w-7xl mx-auto px-8 mb-32 overflow-hidden relative">
          <div className="flex md:grid md:grid-cols-3 gap-8 transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${activeSection * 0}%)` }}>
            <AnimatePresence mode="wait">
              {sections.map((section, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    scale: activeSection === i ? 1 : 0.95,
                    display: 'flex'
                  }}
                  className={`flex-shrink-0 w-full md:w-auto group bg-white rounded-[3rem] p-10 border transition-all duration-500 ${
                    activeSection === i ? 'border-blue-600 shadow-xl' : 'border-neutral-100 opacity-40 md:opacity-100'
                  }`}
                  style={{ 
                    display: typeof window !== 'undefined' && window.innerWidth < 768 ? (activeSection === i ? 'flex' : 'none') : 'flex'
                  }}
                >
                  <div className="flex flex-col h-full">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${
                      section.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                      section.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' :
                      'bg-purple-50 text-purple-600'
                    }`}>
                      <section.icon size={28} />
                    </div>
                    <h3 className="text-2xl font-black text-neutral-900 mb-4 tracking-tighter uppercase italic">{section.title}</h3>
                    <p className="text-base text-neutral-500 font-medium leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {/* Slider Indicators */}
          <div className="flex justify-center gap-3 mt-12 md:hidden">
            {sections.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSection(i)}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  activeSection === i ? 'w-8 bg-blue-600' : 'bg-neutral-200'
                }`}
              />
            ))}
          </div>
        </section>

        {/* Clean Benefits Grid */}
        <section className="bg-neutral-50 py-32 overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-5xl md:text-7xl font-black text-neutral-900 mb-10 leading-[0.9] tracking-tighter uppercase italic">
                  Alliance <br />
                  <span className="text-blue-600">Assets.</span>
                </h2>
                <div className="space-y-4">
                  {[
                    { step: '01', title: 'Real-Time Settlement', desc: 'Unlike traditional gateways that release funds after 3 days, our system settles sales in 30 seconds.' },
                    { step: '02', title: 'Mobile Money Ready', desc: 'Direct transfer to your preferred mobile money wallet. Exact amounts, zero friction.' },
                    { step: '03', title: 'Zero Maintenance', desc: 'We handle all infrastructure updates, security patches, and optimizations. Focus only on sales.' }
                  ].map((item, i) => (
                    <div key={i} className="p-8 bg-white border border-neutral-100 rounded-[2rem] hover:border-blue-200 transition-colors group">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Protocol {item.step}</span>
                        <ArrowRight size={18} className="text-neutral-300 group-hover:text-blue-600 transition-colors" />
                      </div>
                      <h4 className="text-xl font-black text-neutral-900 mb-2 tracking-tight uppercase italic">{item.title}</h4>
                      <p className="text-neutral-500 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-[4rem] p-12 md:p-16 shadow-xl">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white">
                      <Check size={24} />
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tight italic text-neutral-900">Alliance Perks</h3>
                  </div>
                  <div className="space-y-6">
                    {benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-4 group">
                        <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                          <Check size={12} className="text-blue-600 group-hover:text-white transition-colors" />
                        </div>
                        <span className="text-base font-bold text-neutral-600 group-hover:text-neutral-900 transition-colors uppercase tracking-wide">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default PartnershipDetail

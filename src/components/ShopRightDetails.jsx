import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, ArrowLeft, Zap, Globe, Layout, ShieldCheck, CheckCircle2, DollarSign, Package, Star, ArrowRight, X, RefreshCw, TrendingUp } from 'lucide-react'

const ShopRightDetails = ({ onBack }) => {
  const [showWaitlistModal, setShowWaitlistModal] = useState(false)
  const [waitlistType, setWaitlistType] = useState('seller') // 'seller' or 'buyer'
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handlePreorder = (type) => {
    setWaitlistType(type)
    setShowWaitlistModal(true)
  }

  const handleSubmitWaitlist = (e) => {
    e.preventDefault()
    // Simulated submission
    console.log(`Submitted to waitlist: ${email} as ${waitlistType}`)
    setSubmitted(true)
    setTimeout(() => {
      setShowWaitlistModal(false)
      setSubmitted(false)
      setEmail('')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="relative pt-24 pb-40 bg-white overflow-hidden">
        {/* Advanced Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-blue-600/5 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[70%] h-[70%] bg-indigo-600/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:32px_32px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.button
                whileHover={{ x: -5 }}
                onClick={onBack}
                className="flex items-center gap-3 text-neutral-500 hover:text-blue-600 transition-colors mb-12 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-neutral-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all shadow-sm">
                  <ArrowLeft size={18} />
                </div>
                <span className="text-xs font-black uppercase tracking-[0.2em]">Return to Hub</span>
              </motion.button>

              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-[0.3em] mb-10 shadow-sm">
                <ShoppingBag size={14} className="animate-bounce" />
                Merchant Revolution
              </div>
              
              <h1 className="text-7xl lg:text-9xl font-black text-neutral-900 mb-10 tracking-tighter leading-[0.85] italic">
                Shop<span className="text-blue-600">Right.</span>
              </h1>
              
              <p className="text-2xl text-neutral-600 font-medium leading-relaxed mb-12 max-w-xl">
                The ultimate ecosystem for the modern merchant. We don't just build stores; we engineer <span className="text-blue-600 font-bold italic">digital empires.</span>
              </p>

              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => handlePreorder('seller')}
                  className="px-10 py-5 bg-neutral-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-blue-600 hover:scale-105 transition-all flex items-center gap-3 group"
                >
                  Start Selling
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex -space-x-3 items-center ml-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-neutral-100 overflow-hidden shadow-sm">
                      <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                    </div>
                  ))}
                  <div className="pl-6 text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                    Joined by 2.5k+ Merchants
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 bg-white p-4 rounded-[64px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-neutral-100">
                <div className="bg-neutral-50 rounded-[48px] aspect-square overflow-hidden relative flex items-center justify-center border border-neutral-100/50">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5" />
                  <motion.div
                    animate={{ 
                      y: [0, -15, 0],
                      rotate: [0, 2, 0]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-20 text-center"
                  >
                    <div className="w-32 h-32 bg-white rounded-[40px] shadow-2xl flex items-center justify-center text-blue-600 mb-8 mx-auto border border-blue-50">
                      <ShoppingBag size={56} />
                    </div>
                    <div className="text-3xl font-black text-neutral-900 uppercase italic tracking-tighter mb-2">Alpha Terminal</div>
                    <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full mb-6" />
                    <div className="space-y-3 opacity-30">
                      <div className="w-40 h-2 bg-neutral-400 mx-auto rounded-full" />
                      <div className="w-24 h-2 bg-neutral-400 mx-auto rounded-full" />
                    </div>
                  </motion.div>

                  {/* Floating UI Elements */}
                  <motion.div
                    animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-12 right-12 bg-white p-5 rounded-3xl shadow-xl border border-neutral-100 flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <TrendingUp size={16} />
                    </div>
                    <div className="text-[10px] font-black text-neutral-900 uppercase tracking-widest">+150% ROI</div>
                  </motion.div>

                  <motion.div
                    animate={{ x: [0, -10, 0], y: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-12 left-12 bg-white p-5 rounded-3xl shadow-xl border border-neutral-100 flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                      <Zap size={16} />
                    </div>
                    <div className="text-[10px] font-black text-neutral-900 uppercase tracking-widest">99.9% Uptime</div>
                  </motion.div>
                </div>
              </div>
              
              {/* Decorative Rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-blue-600/5 rounded-full pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-blue-600/5 rounded-full pointer-events-none opacity-50" />
            </motion.div>
          </div>
        </div>
      </header>

      {/* Program Details */}
      <section className="py-32 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-24 items-center mb-32">
            <div className="space-y-8">
              <h2 className="text-4xl font-black text-neutral-950 uppercase italic tracking-tighter">Everything you need to <span className="text-blue-600">Scale.</span></h2>
              <p className="text-lg text-neutral-600 leading-relaxed font-medium">
                ShopRight empowers merchants to take full control of their online presence. From inventory management to real-time performance tracking, every feature is built to be intuitive, powerful, and beautiful.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: 'Custom Storefronts', desc: 'Every storefront is uniquely tailored to reflect your brand identity. No generic templates here.' },
                  { title: 'Advanced Tracking', desc: 'Monitor your sales, customer behavior, and inventory levels with precision data visualizations.' },
                  { title: 'Merchant Autonomy', desc: 'You own your store, your data, and your relationship with your customers.' },
                  { title: 'Global Infrastructure', desc: 'Deployed on edge networks for lightning-fast loading speeds anywhere in the world.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1">
                      <CheckCircle2 size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-black text-neutral-950 uppercase tracking-widest text-sm mb-1">{item.title}</h4>
                      <p className="text-neutral-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-[64px] p-8 shadow-3xl border border-neutral-100">
                <div className="aspect-square bg-neutral-50 rounded-[48px] overflow-hidden flex flex-col">
                  <div className="p-8 border-b border-neutral-100 flex items-center justify-between">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-400" />
                      <div className="w-3 h-3 rounded-full bg-amber-400" />
                      <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    </div>
                    <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">ShopRight Live View</div>
                  </div>
                  <div className="flex-1 p-12 flex flex-col items-center justify-center text-center">
                    <div className="w-24 h-24 bg-blue-600/5 rounded-[32px] flex items-center justify-center text-blue-600 mb-8 shadow-inner">
                      <Layout size={40} />
                    </div>
                    <div className="text-3xl font-black text-neutral-900 uppercase italic tracking-tighter mb-4">Storefront Alpha</div>
                    <p className="text-neutral-500 text-sm max-w-xs mx-auto mb-8 font-medium italic">Generating unique merchant identity through our custom design engine...</p>
                    <div className="flex gap-3">
                      <div className="w-3 h-3 bg-blue-600 rounded-full animate-ping" />
                      <div className="w-3 h-3 bg-blue-600 rounded-full animate-ping delay-75" />
                      <div className="w-3 h-3 bg-blue-600 rounded-full animate-ping delay-150" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Waitlist Section */}
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-neutral-950 uppercase italic tracking-tighter mb-6">Pre-Order <span className="text-blue-600">Now.</span></h2>
            <p className="text-neutral-500 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
              Secure your spot in the future of commerce. Join our exclusive waitlist for early access and special pre-order pricing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Monthly Subscription */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-white p-12 rounded-[48px] border border-neutral-100 shadow-xl shadow-neutral-200/50 flex flex-col"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-8">
                <RefreshCw size={32} />
              </div>
              <h3 className="text-3xl font-black text-neutral-950 uppercase italic tracking-tighter mb-4">Monthly Access</h3>
              <p className="text-neutral-500 text-sm mb-8 font-medium leading-relaxed">
                Perfect for growing brands. Pay as you go with full access to the ShopRight merchant ecosystem.
              </p>
              <div className="mb-10">
                <span className="text-5xl font-black text-neutral-950 tracking-tighter">$149</span>
                <span className="text-neutral-400 font-bold ml-2 uppercase text-xs tracking-widest">/ Per Month</span>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-2">(Estimated Pricing)</p>
              </div>
              <ul className="space-y-4 mb-12 flex-1">
                {['All Platform Features', 'Standard Support', 'Custom Domain Support', 'Unlimited Products'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-neutral-600 font-bold text-xs uppercase tracking-widest">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => handlePreorder('seller')}
                className="w-full py-5 bg-neutral-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-blue-600 transition-colors"
              >
                Join Seller Waitlist
              </button>
            </motion.div>

            {/* Lifetime/Enterprise Buyout */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-white p-12 rounded-[48px] shadow-2xl border-4 border-blue-50 flex flex-col relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8">
                <Star size={32} className="text-blue-500 group-hover:fill-blue-500 transition-all" />
              </div>
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-xl shadow-blue-500/20">
                <Package size={32} />
              </div>
              <h3 className="text-3xl font-black text-neutral-950 uppercase italic tracking-tighter mb-4">Software Buyout</h3>
              <p className="text-neutral-600 text-sm mb-8 font-medium leading-relaxed">
                Full ownership. Deploy on your own servers or let us host. Lifetime license for elite enterprises.
              </p>
              <div className="mb-10">
                <span className="text-5xl font-black text-neutral-900 tracking-tighter">$4,999</span>
                <span className="text-neutral-400 font-bold ml-2 uppercase text-xs tracking-widest">/ One-time</span>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-2">(Special Pre-Order Offer)</p>
              </div>
              <ul className="space-y-4 mb-12 flex-1">
                {['Full Source License', '24/7 Priority Support', 'Dedicated Success Manager', 'Multi-Store License'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-neutral-700 font-bold text-xs uppercase tracking-widest">
                    <CheckCircle2 size={16} className="text-blue-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => handlePreorder('buyer')}
                className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-500/30 hover:bg-neutral-900 transition-colors"
              >
                Pre-Order Software
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Waitlist Modal */}
      <AnimatePresence>
        {showWaitlistModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-neutral-950/80 backdrop-blur-xl"
              onClick={() => setShowWaitlistModal(false)}
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white w-full max-w-lg rounded-[48px] p-12 shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setShowWaitlistModal(false)}
                className="absolute top-8 right-8 text-neutral-400 hover:text-neutral-950 transition-colors"
              >
                <X size={24} />
              </button>

              <div className="text-center">
                <div className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center mb-8 ${waitlistType === 'seller' ? 'bg-blue-50 text-blue-600' : 'bg-neutral-950 text-white'}`}>
                  {waitlistType === 'seller' ? <ShoppingBag size={40} /> : <Package size={40} />}
                </div>
                
                <h2 className="text-3xl font-black text-neutral-950 uppercase italic tracking-tighter mb-4">
                  {waitlistType === 'seller' ? 'Join Seller Waitlist' : 'Pre-Order Software'}
                </h2>
                
                <p className="text-neutral-500 text-sm font-medium mb-10 leading-relaxed">
                  Enter your email below to receive early access and special launch details.
                </p>

                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="py-10"
                  >
                    <CheckCircle2 size={64} className="text-emerald-500 mx-auto mb-6" />
                    <div className="text-xl font-black text-neutral-950 uppercase italic tracking-tighter">You're on the list!</div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmitWaitlist} className="space-y-6">
                    <div className="relative">
                      <input 
                        type="email" 
                        required
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-8 py-5 bg-neutral-50 rounded-2xl border border-neutral-100 focus:outline-none focus:ring-4 focus:ring-blue-600/5 font-bold text-sm"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full py-5 bg-neutral-950 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-neutral-200"
                    >
                      Confirm Spot
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ShopRightDetails

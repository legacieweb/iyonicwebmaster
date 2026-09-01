import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, ArrowLeft, Zap, Globe, Layout, ShieldCheck, CheckCircle2, Package, Star, ArrowRight, X, RefreshCw, TrendingUp, CreditCard, Bot, Plus, Minus, Building2 } from 'lucide-react'

const ProductCard = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1)
  const [selectedTier, setSelectedTier] = useState(0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-neutral-900 rounded-[48px] overflow-hidden shadow-2xl border border-neutral-800"
    >
      <div className="relative h-64 bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-950 p-8 flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23f59e0b%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
        <div className="relative z-10 text-center">
          <div className="w-24 h-24 bg-neutral-800/50 backdrop-blur-sm rounded-[32px] flex items-center justify-center mx-auto mb-4 border border-neutral-700">
            <Package size={48} className="text-amber-400" />
          </div>
          <h3 className="text-2xl font-black text-neutral-200 uppercase italic tracking-tighter">{product.name}</h3>
        </div>
        
        <div className="absolute top-6 left-6 px-4 py-2 bg-neutral-800/50 backdrop-blur-sm rounded-full border border-neutral-700">
          <span className="text-xs font-black text-amber-400 uppercase tracking-widest">{product.badge}</span>
        </div>
        
        {product.isNew && (
          <div className="absolute top-6 right-6 px-4 py-2 bg-amber-400 rounded-full">
            <span className="text-xs font-black text-neutral-950 uppercase tracking-widest">New Listing</span>
          </div>
        )}
      </div>

      <div className="p-10">
        <p className="text-neutral-400 font-medium leading-relaxed mb-8">{product.description}</p>

        <div className="flex gap-3 mb-8">
          {product.integrations.map((integration, i) => (
            <div key={i} className="flex items-center gap-2 px-4 py-2 bg-neutral-800/30 rounded-xl">
              {integration.icon === 'payment' && <CreditCard size={16} className="text-amber-400" />}
              {integration.icon === 'bot' && <Bot size={16} className="text-neutral-400" />}
              {integration.icon === 'shop' && <ShoppingBag size={16} className="text-amber-400" />}
              <span className="text-xs font-black text-neutral-400 uppercase tracking-widest">{integration.name}</span>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <div className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-4">Select Package</div>
          <div className="grid grid-cols-3 gap-3">
            {product.tiers.map((tier, i) => (
              <button
                key={i}
                onClick={() => setSelectedTier(i)}
                className={`p-4 rounded-2xl border-2 transition-all text-left ${
                  selectedTier === i 
                    ? 'border-amber-400 bg-amber-50/10' 
                    : 'border-neutral-700 hover:border-neutral-600'
                }`}
              >
                <div className="text-xs font-black text-neutral-300 uppercase tracking-wider mb-1">{tier.name}</div>
                <div className="text-lg font-black text-amber-400 tracking-tighter">${tier.price.toLocaleString()}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-8 border-t border-neutral-800">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-neutral-800 rounded-2xl px-4 py-3">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center hover:bg-neutral-700 transition-colors text-neutral-300"
              >
                <Minus size={14} />
              </button>
              <span className="w-8 text-center font-black text-neutral-200">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center hover:bg-neutral-700 transition-colors text-neutral-300"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div>
              <div className="text-xs font-black text-neutral-500 uppercase tracking-widest">Total Valuation</div>
              <div className="text-2xl font-black text-neutral-200 tracking-tighter">
                ${(product.tiers[selectedTier].price * quantity).toLocaleString()}
              </div>
            </div>
            <button
              onClick={() => onAddToCart(product, quantity, product.tiers[selectedTier])}
              className="px-8 py-4 bg-amber-400 text-neutral-950 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20"
            >
              <ShoppingCart size={18} />
              Request Acquisition
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const ShopDetails = ({ onBack }) => {
  const [cartItems, setCartItems] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [showWaitlistModal, setShowWaitlistModal] = useState(false)
  const [waitlistType, setWaitlistType] = useState('seller')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const products = [
    {
      id: 1,
      name: 'Shop Enterprise',
      badge: 'Premium',
      isNew: true,
      description: 'Fully operational e-commerce business generating sustainable monthly revenue. Complete operational stack with established customer base and proven growth trajectory.',
      integrations: [
        { name: 'IyonicPay', icon: 'payment' },
        { name: 'IyonicBots', icon: 'bot' },
        { name: 'Shop', icon: 'shop' }
      ],
      tiers: [
        { name: 'Starter', price: 2999 },
        { name: 'Pro', price: 5999 },
        { name: 'Elite', price: 9999 }
      ]
    }
  ]

  const handleAddToCart = (product, quantity, tier) => {
    const existingIndex = cartItems.findIndex(item => item.productId === product.id && item.tier.name === tier.name)
    if (existingIndex > -1) {
      const newCart = [...cartItems]
      newCart[existingIndex].quantity += quantity
      setCartItems(newCart)
    } else {
      setCartItems([...cartItems, { ...product, quantity, tier }])
    }
    setShowCart(true)
  }

  const handlePreorder = (type) => {
    setWaitlistType(type)
    setShowWaitlistModal(true)
  }

  const handleSubmitWaitlist = (e) => {
    e.preventDefault()
    console.log(`Submitted acquisition request: ${email} as ${waitlistType}`)
    setSubmitted(true)
    setTimeout(() => {
      setShowWaitlistModal(false)
      setSubmitted(false)
      setEmail('')
    }, 2000)
  }

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.tier.price * item.quantity), 0)

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200">
      {/* Hero Section */}
      <header className="relative pt-24 pb-40 bg-neutral-950 overflow-hidden">
        {/* Advanced Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-amber-400/5 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[70%] h-[70%] bg-neutral-800 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:32px_32px]" />
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
                className="flex items-center gap-3 text-neutral-500 hover:text-amber-400 transition-colors mb-12 group"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-neutral-950 transition-all shadow-sm">
                  <ArrowLeft size={18} />
                </div>
                <span className="text-xs font-black uppercase tracking-[0.2em]">Return to Portfolio</span>
              </motion.button>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900/50 border border-neutral-800 text-amber-400 text-[10px] font-black uppercase tracking-[0.3em] mb-10 shadow-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <ShoppingBag size={14} />
                Live Portfolio
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8 }}
                className="text-7xl lg:text-9xl font-black text-neutral-200 mb-10 tracking-tighter leading-[0.85] italic"
              >
                Iyoni<span className="text-amber-400 relative">
                  Corp
                  <span className="absolute -bottom-2 left-0 w-16 h-0.5 bg-amber-400/40 rounded-full" />
                </span>.
              </motion.h1>
              
              <p className="text-2xl text-neutral-400 font-medium leading-relaxed mb-12 max-w-xl">
                Corporate holding platform offering institutional-grade operational assets. We acquire, operate, and optimize proven revenue-generating businesses, presenting them as transparent acquisition opportunities for qualified investors.
              </p>

              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => handlePreorder('seller')}
                  className="px-10 py-5 bg-amber-400 text-neutral-950 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-amber-300 hover:scale-105 transition-all flex items-center gap-3 group"
                >
                  Request Acquisition Brief
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex -space-x-3 items-center ml-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-neutral-800 bg-neutral-700 overflow-hidden shadow-sm">
                      <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Investor" />
                    </div>
                  ))}
                  <div className="pl-6 text-[10px] font-black text-neutral-500 uppercase tracking-widest">
                    Trusted by 2.5k+ Investors
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
              <div className="relative z-10 bg-neutral-900 p-4 rounded-[64px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border border-neutral-800">
                <div className="bg-neutral-800/50 rounded-[48px] aspect-square overflow-hidden relative flex items-center justify-center border border-neutral-700">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-neutral-800/5" />
                  <motion.div
                    animate={{ 
                      y: [0, -15, 0],
                      rotate: [0, 2, 0]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-20 text-center"
                  >
                    <div className="w-32 h-32 bg-neutral-800/50 rounded-[40px] shadow-2xl flex items-center justify-center text-amber-400 mb-8 border border-neutral-700">
                      <Building2 size={56} />
                    </div>
                    <div className="text-3xl font-black text-neutral-200 uppercase italic tracking-tighter mb-2">Featured Holding</div>
                    <div className="w-24 h-1.5 bg-amber-400 mx-auto rounded-full mb-6" />
                    <div className="space-y-3 opacity-30">
                      <div className="w-40 h-2 bg-neutral-600 mx-auto rounded-full" />
                      <div className="w-24 h-2 bg-neutral-700 mx-auto rounded-full" />
                    </div>
                  </motion.div>

                  {/* Floating UI Elements */}
                  <motion.div
                    animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-12 right-12 bg-neutral-900 p-5 rounded-3xl shadow-xl border border-neutral-800 flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-400/10 flex items-center justify-center text-amber-400">
                      <TrendingUp size={16} />
                    </div>
                    <div className="text-[10px] font-black text-neutral-300 uppercase tracking-widest">180% ROI</div>
                  </motion.div>

                  <motion.div
                    animate={{ x: [0, -10, 0], y: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-12 left-12 bg-neutral-900 p-5 rounded-3xl shadow-xl border border-neutral-800 flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-amber-400">
                      <Star size={16} />
                    </div>
                    <div className="text-[10px] font-black text-neutral-300 uppercase tracking-widest">Portfolio Grade</div>
                  </motion.div>
                </div>
              </div>
              
              {/* Decorative Rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-amber-400/10 rounded-full pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-amber-400/5 rounded-full pointer-events-none opacity-50" />
            </motion.div>
          </div>
        </div>
      </header>

      {/* Program Details */}
      <section className="py-32 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-24 items-center mb-32">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-neutral-100 tracking-tight leading-[1.05]">
                Everything you need to{' '}
                <span className="relative inline-block text-amber-400">
                  Acquire.
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-400/40 rounded-full" />
                </span>
              </h2>
              <p className="text-lg text-neutral-400 leading-relaxed font-medium">
                Iyoni Corp holdings are fully operational, revenue-generating businesses with established market positions. From operational metrics to growth strategies, every business detail is documented for investor transparency.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: 'Turnkey Operations', desc: 'Each business is fully operational with established processes, systems, and local management teams already in place.' },
                  { title: 'Financial Transparency', desc: 'Complete financial documentation, revenue reports, and valuation models provided for institutional due diligence.' },
                  { title: 'Operational Independence', desc: 'Holdings maintain their operational autonomy while benefiting from scaled infrastructure and shared services.' },
                  { title: 'Scalable Assets', desc: 'All holdings are deployed on proven infrastructure models with clear paths for growth and expansion.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1">
                      <CheckCircle2 size={24} className="text-amber-400" />
                    </div>
                    <div>
                      <h4 className="font-black text-neutral-200 uppercase tracking-widest text-sm mb-1">{item.title}</h4>
                      <p className="text-neutral-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-neutral-900 rounded-[64px] p-8 shadow-3xl border border-neutral-800">
                <div className="aspect-square bg-neutral-800/30 rounded-[48px] overflow-hidden flex flex-col">
                  <div className="p-8 border-b border-neutral-800 flex items-center justify-between">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-400" />
                      <div className="w-3 h-3 rounded-full bg-amber-400" />
                      <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    </div>
                    <div className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Business Performance</div>
                  </div>
                  <div className="flex-1 p-12 flex flex-col items-center justify-center text-center">
                    <div className="w-24 h-24 bg-amber-400/10 rounded-[32px] flex items-center justify-center text-amber-400 mb-8 shadow-inner border border-neutral-700">
                      <Layout size={40} />
                    </div>
                    <div className="text-3xl font-black text-neutral-200 uppercase italic tracking-tighter mb-4">Asset Alpha</div>
                    <p className="text-neutral-500 text-sm max-w-xs mx-auto mb-8 font-medium italic">Generating consistent monthly revenue through established operational processes...</p>
                    <div className="flex gap-3">
                      <div className="w-3 h-3 bg-amber-400 rounded-full animate-ping" />
                      <div className="w-3 h-3 bg-amber-400 rounded-full animate-ping delay-75" />
                      <div className="w-3 h-3 bg-amber-400 rounded-full animate-ping delay-150" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Acquisition Options Section */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-medium text-neutral-100 tracking-tight leading-[1.05] mb-6">
              Available for{' '}
              <span className="relative inline-block text-amber-400">
                Acquisition.
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-400/40 rounded-full" />
              </span>
            </h2>
            <p className="text-neutral-400 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
              Select your acquisition structure. Each holding is priced at its total business valuation with full operational transparency.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Investor Tier */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-neutral-900 p-12 rounded-[48px] border border-neutral-800 shadow-xl flex flex-col"
            >
              <div className="w-16 h-16 bg-neutral-800/50 rounded-2xl flex items-center justify-center text-amber-400 mb-8">
                <RefreshCw size={32} />
              </div>
              <h3 className="text-3xl font-black text-neutral-200 uppercase italic tracking-tighter mb-4">Investor Tier</h3>
              <p className="text-neutral-400 text-sm mb-8 font-medium leading-relaxed">
                Portfolio access tier for qualified investors. Monthly access to due diligence reports and acquisition opportunities.
              </p>
              <div className="mb-10">
                <span className="text-5xl font-black text-neutral-200 tracking-tighter">$99</span>
                <span className="text-neutral-500 font-bold ml-2 uppercase text-xs tracking-widest">/ Per Month</span>
                <p className="text-[10px] font-black text-amber-400 uppercase tracking-widest mt-2">(Investor Subscription)</p>
              </div>
              <ul className="space-y-4 mb-12 flex-1">
                {['Portfolio Access', 'Due Diligence Reports', 'Priority Acquisition Alerts', 'Investor Support'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-neutral-400 font-bold text-xs uppercase tracking-widest">
                    <CheckCircle2 size={16} className="text-amber-400" />
                    {item}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => handlePreorder('seller')}
                className="w-full py-5 bg-neutral-800 text-neutral-200 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-amber-400 hover:text-neutral-950 transition-colors"
              >
                Subscribe as Investor
              </button>
            </motion.div>

            {/* Full Business Acquisition */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-neutral-900 p-12 rounded-[48px] shadow-2xl border-4 border-amber-400/20 flex flex-col relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8">
                <Star size={32} className="text-amber-400 group-hover:fill-amber-400 transition-all" />
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-neutral-800 rounded-2xl flex items-center justify-center text-neutral-950 mb-8 shadow-xl shadow-amber-400/20">
                <Building2 size={32} />
              </div>
              <h3 className="text-3xl font-black text-neutral-200 uppercase italic tracking-tighter mb-4">Full Business Acquisition</h3>
              <p className="text-neutral-500 text-sm mb-8 font-medium leading-relaxed">
                Complete ownership transfer. Full equity, assets, and operational control of the entire business.
              </p>
              <div className="mb-10">
                <span className="text-5xl font-black text-neutral-200 tracking-tighter">$349,999</span>
                <span className="text-neutral-500 font-bold ml-2 uppercase text-xs tracking-widest">/ One-time</span>
                <p className="text-[10px] font-black text-amber-400 uppercase tracking-widest mt-2">(Total Business Valuation)</p>
              </div>
              <ul className="space-y-4 mb-12 flex-1">
                {['100% Equity Transfer', 'All Assets Included', 'Dedicated Handoff', 'Full IP Rights'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-neutral-400 font-bold text-xs uppercase tracking-widest">
                    <CheckCircle2 size={16} className="text-amber-400" />
                    {item}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => handlePreorder('buyer')}
                className="w-full py-5 bg-amber-400 text-neutral-950 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-amber-400/30 hover:bg-neutral-800 hover:text-neutral-200 transition-colors"
              >
                Request Acquisition Brief
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
              className="relative bg-neutral-900 w-full max-w-lg rounded-[48px] p-12 shadow-2xl overflow-hidden border border-neutral-800"
            >
              <button 
                onClick={() => setShowWaitlistModal(false)}
                className="absolute top-8 right-8 text-neutral-500 hover:text-amber-400 transition-colors"
              >
                <X size={24} />
              </button>

              <div className="text-center">
                <div className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center mb-8 ${waitlistType === 'seller' ? 'bg-amber-50/10 text-amber-400' : 'bg-neutral-800 text-neutral-200'}`}>
                  {waitlistType === 'seller' ? <ShoppingBag size={40} /> : <Package size={40} />}
                </div>
                
                <h2 className="text-3xl font-black text-neutral-200 uppercase italic tracking-tighter mb-4">
                  {waitlistType === 'seller' ? 'Request Acquisition Brief' : 'Request Acquisition Brief'}
                </h2>
                
                <p className="text-neutral-400 text-sm font-medium mb-10 leading-relaxed">
                  Enter your email below to receive our investor relations team's follow-up with portfolio details and valuation assessment.
                </p>

                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="py-10"
                  >
                    <CheckCircle2 size={64} className="text-amber-400 mx-auto mb-6" />
                    <div className="text-xl font-black text-neutral-200 uppercase italic tracking-tighter">You're on the list!</div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmitWaitlist} className="space-y-6">
                    <div className="relative">
                      <input 
                        type="email" 
                        required
                        placeholder="your@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-8 py-5 bg-neutral-800/50 border border-neutral-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-400/5 font-black text-sm text-neutral-200 placeholder-neutral-500"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full py-5 bg-amber-400 text-neutral-950 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-amber-400/20"
                    >
                      Confirm Request
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cart */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-neutral-900 border-l border-neutral-800 shadow-2xl z-[200] overflow-y-auto"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-neutral-200 uppercase tracking-widest">Acquisition Request</h3>
                <button 
                  onClick={() => setShowCart(false)}
                  className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-400 hover:text-amber-400 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              
              {cartItems.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag size={48} className="mx-auto text-neutral-600 mb-4" />
                  <p className="text-neutral-500 font-medium">No holdings in request queue.</p>
                </div>
              ) : (
                <div className="space-y-6 mb-8">
                  {cartItems.map((item, i) => (
                    <div key={i} className="p-4 bg-neutral-800/30 rounded-2xl border border-neutral-700">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-black text-neutral-200">{item.name}</h4>
                        <span className="text-xs font-black text-amber-400 uppercase">{item.tier.name}</span>
                      </div>
                      <div className="text-sm text-neutral-400">Qty: {item.quantity}</div>
                      <div className="text-lg font-black text-neutral-200 mt-2">${(item.tier.price * item.quantity).toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="border-t border-neutral-800 pt-6 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400 font-black uppercase text-xs tracking-widest">Total Valuation</span>
                  <span className="text-2xl font-black text-neutral-200">${cartTotal.toLocaleString()}</span>
                </div>
              </div>
              
              <button
                onClick={() => { setShowCart(false); alert('Acquisition request submitted. Our team will contact you shortly.') }}
                className="w-full py-5 bg-amber-400 text-neutral-950 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-amber-300 transition-all shadow-xl shadow-amber-400/20"
              >
                Submit Acquisition Request
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ShopDetails

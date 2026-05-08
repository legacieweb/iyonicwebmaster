import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Check, Eye, ExternalLink, X, Layout, Zap, ArrowRight, Lock, Shield, 
  ShoppingBag, Calendar, User, Search, Sparkles, Loader2, Info,
  CheckCircle2, AlertCircle, Phone, Mail, Filter, ChevronDown
} from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Hero from '../components/Hero'
import Contact from '../components/Contact'
import DesignPreview from '../components/DesignPreview'
import Pricing from '../components/Pricing'
import Partnership from '../components/Partnership'
import HowItWorks from '../components/HowItWorks'
import { CATALOG_ITEMS, SERVICES, WEBSITE_TYPES, PRICING_DATA } from '../utils/constants'
import { MODULES, checkAccess, MEMBERSHIP_TIERS } from '../utils/membership'
import { saveProject, saveOrder } from '../utils/api'

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

const DesignDetails = ({ item, onClose, formatPrice, getMonthlyPrice, onPreview, onSelect, currentUser, startAtPricing = false }) => {
  const [selectedPlan, setSelectedPlan] = useState('instant')
  const [isSelecting, setIsSelecting] = useState(false)
  const [popup, setPopup] = useState({ isOpen: false, title: '', message: '', type: 'info' })
  const navigate = useNavigate()
  
  useEffect(() => {
    if (startAtPricing) {
      const element = document.getElementById('ownership-strategy')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [startAtPricing])

  const rentToOwnTotal = item.price
  const rentToOwnMonthly = Math.round(rentToOwnTotal / 12)

  const requiredTier = Object.values(MEMBERSHIP_TIERS).find(t => t.id === item.minTier)
  const userTier = currentUser?.membership_tier
  const userTierData = userTier ? Object.values(MEMBERSHIP_TIERS).find(t => t.id === userTier) : null
  const hasAccess = checkAccess(userTier, item.minTier)

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-neutral-900/60 backdrop-blur-xl"
      />
      <motion.div 
        initial={{ opacity: 0, y: '100%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="relative w-full h-full bg-white flex flex-col md:flex-row overflow-hidden"
      >
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 w-14 h-14 bg-white/80 backdrop-blur-md rounded-2xl flex items-center justify-center text-neutral-900 hover:bg-neutral-100 transition-all z-[250] border border-neutral-200 shadow-xl active:scale-95"
        >
          <X size={28} />
        </button>

      <div className="md:w-3/5 h-[40vh] md:h-full bg-neutral-100 relative overflow-hidden group">
        <img 
          src={item.url ? `https://s.wordpress.com/mshots/v1/${encodeURIComponent(item.url)}?w=1920` : item.image} 
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 via-transparent to-transparent" />
      </div>

      <div className="md:w-2/5 h-full overflow-y-auto custom-scrollbar bg-white p-8 md:p-20 flex flex-col">
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            {requiredTier && requiredTier.id !== 'basic' && (
              <div className={`flex items-center gap-2 font-black text-[10px] uppercase tracking-[0.2em] px-4 py-2 rounded-xl backdrop-blur-md border ${
                hasAccess ? 'text-emerald-500 bg-emerald-50 border-emerald-500/20' : 'text-amber-500 bg-amber-50 border-amber-500/20'
              }`}>
                <Shield size={14} /> {requiredTier.name} Membership Required
              </div>
            )}
          </div>

          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter text-neutral-900 mb-8 leading-[0.9]">
            {item.name}
          </h1>
          
          <div className="flex flex-wrap gap-4 mb-12">
            <button 
              onClick={() => onPreview(item)}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:bg-blue-500 transition-all flex items-center gap-2"
            >
              <Eye size={14} /> Preview Website
            </button>
            <button 
              onClick={() => window.open(item.url, '_blank')}
              className="px-6 py-3 bg-neutral-100 text-neutral-900 rounded-xl font-black text-[10px] uppercase tracking-widest border border-neutral-200 hover:bg-neutral-200 transition-all flex items-center gap-2"
            >
              <ExternalLink size={14} /> Open Live
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Layout size={24} />
            </div>
            <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">Design Specifications</h4>
          </div>
          <p className="text-2xl text-neutral-500 font-medium leading-relaxed italic">
            "{item.description}"
          </p>
        </div>

        <div className="mb-16">
          <h4 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em] mb-8">Integrated Business Logic</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {item.moduleIds?.map(modId => {
              const mod = MODULES.find(m => m.id === modId)
              return (
                <div key={modId} className="flex items-center gap-4 p-5 bg-neutral-50 rounded-[24px] border border-neutral-100 hover:border-blue-500/20 transition-all group">
                  <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:text-blue-600 transition-colors">
                    <Check size={16} />
                  </div>
                  <span className="text-sm font-bold text-neutral-800">{mod?.name || modId}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-auto pt-16 border-t border-neutral-100" id="ownership-strategy">
          <div className="flex items-center justify-between mb-10">
            <h4 className="text-[10px] font-black text-neutral-900 uppercase tracking-[0.4em]">Ownership Strategy</h4>
            <div className="flex gap-2 p-1 bg-neutral-100 rounded-xl border border-neutral-200">
              {['instant', 'rent-to-own', 'subscription'].map(p => (
                <button 
                  key={p}
                  onClick={() => setSelectedPlan(p)}
                  className={`px-4 py-2 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${
                    selectedPlan === p ? 'bg-white text-blue-600 shadow-sm' : 'text-neutral-400 hover:text-neutral-600'
                  }`}
                >
                  {p.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
          
          <div className="relative p-10 bg-neutral-50 rounded-[40px] border border-neutral-100 mb-10 overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
              <div>
                <div className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-2">
                  {selectedPlan === 'instant' ? 'Full Ownership' : selectedPlan === 'rent-to-own' ? 'Rent to Own Plan' : 'Membership Access'}
                </div>
                <h5 className="text-3xl font-black italic tracking-tighter text-neutral-900">
                  {selectedPlan === 'instant' ? formatPrice(item.price) : selectedPlan === 'rent-to-own' ? `${formatPrice(rentToOwnMonthly)}/mo` : (
                    hasAccess ? `${requiredTier?.name || 'Member'} Available` : 'Tier Restricted'
                  )}
                </h5>
                <p className="text-xs text-neutral-500 font-bold mt-2 uppercase tracking-widest">
                  {selectedPlan === 'instant' ? '100% IP & Source Code' : selectedPlan === 'rent-to-own' ? 'Own after 12 monthly payments' : (
                    !currentUser ? `${requiredTier?.name || 'Member'} Tier Required` : 
                    !userTier ? 'No Active Membership' :
                    hasAccess ? `${userTierData?.name || userTier} Tier Active` : 
                    `Upgrade to ${requiredTier?.name || 'Higher'} Required`
                  )}
                </p>
              </div>
              
              <button 
                onClick={async () => {
                  if (currentUser && !userTier && selectedPlan === 'subscription') {
                    setPopup({
                      isOpen: true,
                      title: 'Membership Required',
                      message: 'You need an active membership to select and deploy templates. Please subscribe to a plan first.',
                      type: 'error'
                    })
                    return
                  }
                  if (currentUser && selectedPlan === 'subscription' && !hasAccess) {
                    setPopup({
                      isOpen: true,
                      title: 'Tier Restricted',
                      message: `Access Denied: This design requires ${requiredTier?.name} membership.`,
                      type: 'error'
                    })
                    return
                  }
                  
                  setIsSelecting(true)
                  try {
                    await onSelect(item, selectedPlan)
                  } finally {
                    setIsSelecting(false)
                  }
                }}
                disabled={isSelecting || (currentUser && selectedPlan === 'subscription' && !hasAccess)}
                className={`px-10 py-6 text-white rounded-[24px] font-black text-sm uppercase tracking-widest shadow-2xl transition-all flex items-center justify-center gap-3 active:scale-95 whitespace-nowrap ${
                  isSelecting || (currentUser && selectedPlan === 'subscription' && !hasAccess) ? 'bg-neutral-400 cursor-not-allowed shadow-none grayscale opacity-50' : 'bg-blue-600 shadow-blue-600/30 hover:bg-blue-500'
                }`}
              >
                {isSelecting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Processing...
                  </>
                ) : !userTier && selectedPlan === 'subscription' ? 'Membership Required' : (currentUser && selectedPlan === 'subscription' && !hasAccess) ? 'Upgrade Required' : `Select ${selectedPlan.replace('-', ' ')}`}
                {!isSelecting && <ArrowRight size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      <CoolPopup {...popup} onClose={() => setPopup(prev => ({ ...prev, isOpen: false }))} />
    </motion.div>
  </div>
)
}

const LandingPage = ({ onLoginClick }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated, currentUser, toggleAuthModal } = useAuth()
  
  const [currency, setCurrency] = useState('USD')
  const [selectedType, setSelectedType] = useState('All')
  const [selectedModules, setSelectedModules] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [selectedDesign, setSelectedDesign] = useState(null)
  const [startAtPricing, setStartAtPricing] = useState(false)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [previewItem, setPreviewItem] = useState(null)
  const [popup, setPopup] = useState({ isOpen: false, title: '', message: '', type: 'info' })
  const [activeMetric, setActiveMetric] = useState(0)
  const [showCustomInquiry, setShowCustomInquiry] = useState(false)
  const [showModules, setShowModules] = useState(false)
  
  const KES_RATE = 125

  useEffect(() => {
    const targetId = location.state?.scrollTo || (location.hash ? location.hash.substring(1) : null)
    if (targetId) {
      const el = document.getElementById(targetId)
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' })
          navigate('/', { replace: true, state: {} })
        }, 100)
      }
    }
  }, [location.hash, location.state, navigate])

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % 3)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

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

  const allItems = useMemo(() => {
    return Object.values(CATALOG_ITEMS).flat()
  }, [])

  const filteredItems = useMemo(() => {
    return allItems.filter(item => {
      const matchesType = selectedType === 'All' || item.type === selectedType
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1]
      const matchesModules = selectedModules.length === 0 || 
                           selectedModules.every(modId => item.moduleIds?.includes(modId))
      return matchesType && matchesSearch && matchesPrice && matchesModules
    })
  }, [allItems, selectedType, searchTerm, priceRange, selectedModules])

  const websiteTypes = useMemo(() => {
    const types = new Set(allItems.map(item => item.type).filter(Boolean))
    return ['All', ...Array.from(types).sort()]
  }, [allItems])

  const handleSelectDesign = async (item, planType) => {
    if (!isAuthenticated) {
      toggleAuthModal('login')
      return
    }

    try {
      const projectData = {
        title: item.name,
        description: item.description,
        category: item.type || 'Web Design',
        thumbnail: item.image || `https://s.wordpress.com/mshots/v1/${encodeURIComponent(item.url)}?w=1280`,
        status: 'requested_customization',
        template: item.id,
        userId: currentUser.id,
        data: {
          plan: planType,
          price: item.price,
          url: item.url,
          moduleIds: item.moduleIds
        }
      }
      await saveProject(projectData)

      if (currentUser?.subscription_status !== 'active') {
        const orderData = {
          order_number: `ORD-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
          service_id: item.id,
          service_name: `Design Selection: ${item.name}`,
          plan_name: planType === 'instant' ? 'Instant Purchase' : 'Rent to Own',
          amount: planType === 'instant' ? parseFloat(item.price) : Math.round(parseFloat(item.price) / 12),
          full_price: parseFloat(item.price),
          status: 'pending',
          userId: currentUser.id,
          description: `Provisioning for ${item.name} (${planType} plan)`
        }
        await saveOrder(orderData)
      }

      setPopup({
        isOpen: true,
        title: 'Success!',
        message: `Great choice! Your selection "${item.name}" has been saved to your projects.`,
        type: 'success'
      })
      setTimeout(() => navigate('/dashboard', { state: { tab: 'projects' } }), 2000)
    } catch (err) {
      console.error('Error saving project:', err)
      setPopup({
        isOpen: true,
        title: 'Error',
        message: 'Failed to save your selection. Please try again.',
        type: 'error'
      })
    }
  }

  const handleCustomInquiry = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await saveOrder({
        order_number: `CUST-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        service_name: 'Custom Vision Inquiry',
        amount: 0,
        status: 'pending',
        description: `Custom Inquiry: ${inquiryData.message} | Phone: ${inquiryData.phone}`,
        userId: currentUser?.id,
        email: inquiryData.email
      })
      setPopup({
        isOpen: true,
        title: 'Vision Received',
        message: 'Your custom requirements have been submitted. Our engineering team will review and contact you within 24 hours.',
        type: 'success'
      })
      setInquiryData({ email: '', phone: '', message: '' })
      setShowCustomInquiry(false)
    } catch (err) {
      setPopup({
        isOpen: true,
        title: 'Submission Error',
        message: 'Failed to send your inquiry. Please try again later.',
        type: 'error'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <AnimatePresence>
        {selectedDesign && (
          <DesignDetails 
            item={selectedDesign} 
            onClose={() => {
              setSelectedDesign(null)
              setStartAtPricing(false)
            }} 
            formatPrice={formatPrice}
            getMonthlyPrice={getMonthlyPrice}
            onPreview={(item) => {
              setPreviewItem(item)
              setIsPreviewOpen(true)
              setSelectedDesign(null)
            }}
            onSelect={handleSelectDesign}
            currentUser={currentUser}
            startAtPricing={startAtPricing}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isPreviewOpen && (
          <DesignPreview 
            item={previewItem} 
            onExit={() => setIsPreviewOpen(false)}
            onAddToWishlist={() => {}}
            isWishlisted={false}
            currentUser={currentUser}
            onRequestCustomization={() => {
              setIsPreviewOpen(false)
              setSelectedDesign(previewItem)
              setStartAtPricing(true)
            }}
          />
        )}
      </AnimatePresence>

      <Hero onGetStarted={() => {
        const el = document.getElementById('catalog')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }} onSignUp={() => toggleAuthModal('signup')} />

      {/* Catalog Section */}
      <section className="py-24 bg-neutral-50" id="catalog">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
            <div>
              <h2 className="text-6xl font-black text-neutral-900 italic tracking-tighter mb-4">
                Available <span className="text-blue-600">Blueprints</span>
              </h2>
              <p className="text-neutral-500 font-medium uppercase text-[10px] tracking-[0.3em]">
                Displaying {filteredItems.length} curated architectures
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="p-1.5 bg-white border border-neutral-200 rounded-[24px] flex shadow-inner">
                {['USD', 'KES'].map(c => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`px-8 py-4 rounded-[20px] text-[10px] font-black transition-all uppercase tracking-widest ${
                      currency === c ? 'bg-neutral-900 text-white shadow-xl scale-105' : 'text-neutral-400 hover:text-neutral-900'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="sticky top-24 z-40 mb-16 space-y-4">
            <div className="bg-white/80 backdrop-blur-xl border border-neutral-200/50 rounded-[40px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
              <div className="flex flex-col gap-8">
                {/* Search Bar & Currency */}
                <div className="flex flex-col lg:flex-row gap-6 items-center">
                  <div className="flex-1 w-full relative group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                    <input 
                      type="text"
                      placeholder="Search architectures, features, or industries..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-16 pr-6 py-6 bg-neutral-50 border border-neutral-100 rounded-3xl text-sm font-bold focus:outline-none focus:border-blue-500/50 focus:bg-white transition-all shadow-inner"
                    />
                  </div>
                  
                  <div className="flex items-center gap-3 p-1.5 bg-neutral-50 border border-neutral-100 rounded-2xl">
                    {['USD', 'KES'].map(c => (
                      <button
                        key={c}
                        onClick={() => setCurrency(c)}
                        className={`px-6 py-3 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest ${
                          currency === c ? 'bg-white text-blue-600 shadow-sm' : 'text-neutral-400 hover:text-neutral-900'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Horizontal Category Slider */}
                <div className="relative">
                  <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-2 px-1">
                    {websiteTypes.map(type => (
                      <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`whitespace-nowrap px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border ${
                          selectedType === type 
                            ? 'bg-neutral-900 text-white border-neutral-900 shadow-xl shadow-neutral-900/20 scale-105' 
                            : 'bg-white text-neutral-500 border-neutral-100 hover:border-neutral-900 hover:text-neutral-900'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bottom Row: Price & Modules Toggle */}
                <div className="flex flex-col xl:flex-row items-center gap-8 pt-6 border-t border-neutral-100">
                  <div className="flex items-center gap-6 w-full xl:w-auto">
                    <div className="flex flex-col gap-1 min-w-[140px]">
                      <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Price Limit</span>
                      <span className="text-sm font-black text-neutral-900 italic">{formatPrice(priceRange[1])}</span>
                    </div>
                    <input 
                      type="range"
                      min="0"
                      max="10000"
                      step="500"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="flex-1 xl:w-48 h-2 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>

                  <div className="h-8 w-[1px] bg-neutral-100 hidden xl:block" />

                  <div className="flex-1 w-full flex items-center justify-between">
                    <button 
                      onClick={() => setShowModules(!showModules)}
                      className={`flex items-center gap-3 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                        showModules || selectedModules.length > 0
                          ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/20'
                          : 'bg-white text-neutral-900 border-neutral-200 hover:border-blue-600'
                      }`}
                    >
                      <Filter size={14} />
                      {selectedModules.length > 0 ? `${selectedModules.length} Modules Active` : 'Filter by Modules'}
                      <ChevronDown size={14} className={`transition-transform duration-300 ${showModules ? 'rotate-180' : ''}`} />
                    </button>

                    {selectedModules.length > 0 && (
                      <button 
                        onClick={() => setSelectedModules([])}
                        className="px-4 py-2 text-[9px] font-black text-rose-500 uppercase tracking-widest hover:underline"
                      >
                        Reset Modules
                      </button>
                    )}
                  </div>
                </div>

                {/* Dropdown Horizontal Module Slider */}
                <AnimatePresence>
                  {showModules && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 border-t border-neutral-100">
                        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 px-1">
                          {MODULES.map(mod => (
                            <button
                              key={mod.id}
                              onClick={() => {
                                if (selectedModules.includes(mod.id)) {
                                  setSelectedModules(selectedModules.filter(id => id !== mod.id))
                                } else {
                                  setSelectedModules([...selectedModules, mod.id])
                                }
                              }}
                              className={`whitespace-nowrap px-6 py-4 rounded-2xl text-[9px] font-bold uppercase tracking-widest border transition-all ${
                                selectedModules.includes(mod.id)
                                  ? 'bg-neutral-900 text-white border-neutral-900 shadow-xl'
                                  : 'bg-white text-neutral-400 border-neutral-100 hover:border-neutral-900 hover:text-neutral-900'
                              }`}
                            >
                              {mod.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  onClick={() => setSelectedDesign(item)}
                  className="group bg-white rounded-[40px] overflow-hidden border border-neutral-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] transition-all duration-700 flex flex-col hover:-translate-y-2 cursor-pointer"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-50">
                    <img 
                      src={item.url ? `https://s.wordpress.com/mshots/v1/${encodeURIComponent(item.url)}?w=1280` : item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  </div>

                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-black text-neutral-900 group-hover:text-blue-600 transition-colors tracking-tighter italic leading-tight">{item.name}</h3>
                    </div>

                    <div className="flex flex-col gap-1 mb-6">
                      <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Starting At</div>
                      <div className="text-3xl font-black text-neutral-900 italic tracking-tighter">
                        {formatPrice(item.price)}
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <div className="text-[9px] font-bold text-blue-600 uppercase tracking-widest">
                          Or {getMonthlyPrice(item.price)} (Rent to Own)
                        </div>
                        <span className={`px-2 py-1 rounded-lg text-[7px] font-black uppercase tracking-widest border ${
                          !currentUser?.membership_tier
                            ? 'bg-slate-50 text-slate-400 border-slate-100'
                            : item.minTier === 'free' || !item.minTier
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                            : item.minTier === 'premium'
                            ? 'bg-purple-50 text-purple-600 border-purple-100'
                            : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                        }`}>
                          {item.minTier ? `${MEMBERSHIP_TIERS[item.minTier.toUpperCase()]?.name || item.minTier}` : 'Basic'}
                        </span>
                      </div>
                    </div>

                    <p className="text-neutral-500 text-sm leading-relaxed mb-6 line-clamp-2 font-medium italic">
                      "{item.description}"
                    </p>

                    <div className="mt-auto pt-6 border-t border-neutral-50 flex items-center gap-3">
                      <button 
                        className="flex-[2] py-4 bg-neutral-900 text-white rounded-[16px] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-600 transition-all flex items-center justify-center gap-3"
                      >
                        Get Started <ArrowRight size={12} />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewItem(item)
                          setIsPreviewOpen(true)
                        }}
                        className="flex-1 py-4 border border-neutral-100 rounded-[16px] flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:border-neutral-900 hover:text-neutral-900 transition-all"
                      >
                        Preview
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Ownership Models Section (Previously Pricing Section) */}
      <section className="py-24 bg-white" id="ownership-models">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-black text-neutral-900 italic tracking-tighter mb-6">
              Ownership <span className="text-blue-600">Models</span>
            </h2>
            <p className="text-xl text-neutral-500 font-medium italic max-w-2xl mx-auto">
              Select the strategy that fits your growth. From full ownership to flexible rental plans.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: 'Instant Purchase', 
                desc: 'Full Ownership & Source Code', 
                icon: ShoppingBag, 
                color: 'blue', 
                price: 'Base Value',
                benefit: '100% Rights & Source Access'
              },
              { 
                title: 'Rent to Own', 
                desc: '12-Month Path to Equity', 
                icon: Calendar, 
                color: 'indigo', 
                price: '+15% Premium',
                benefit: 'Monthly Payments, own at end'
              },
              { 
                title: 'Subscription', 
                desc: 'Member-Exclusive Access', 
                icon: User, 
                color: 'emerald', 
                price: 'Tier Based',
                benefit: 'Low entry, full module access'
              }
            ].map((model) => (
              <div
                key={model.title}
                className="p-10 bg-white border border-neutral-100 rounded-[48px] hover:shadow-2xl transition-all duration-500 group"
              >
                <div className={`w-16 h-16 rounded-3xl bg-neutral-50 flex items-center justify-center text-neutral-900 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500`}>
                  <model.icon size={28} />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-neutral-900 mb-2 italic">{model.title}</h3>
                <p className="text-sm text-neutral-500 font-medium mb-6">{model.desc}</p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest">
                    <Check size={14} /> {model.benefit}
                  </div>
                </div>
                <div className="pt-6 border-t border-neutral-50">
                  <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">Pricing Model</div>
                  <div className="text-xl font-black italic text-neutral-900">{model.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Tiers Section */}
      <Pricing onPlanClick={(plan) => navigate('/dashboard', { state: { tab: 'membership', selectedPlan: plan } })} />
      
      <Partnership onLearnMore={() => navigate('/partnership')} />
      <section className="py-32 bg-white border-t border-neutral-100 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-6xl font-black text-neutral-900 mb-20 italic tracking-tighter">Ownership <span className="text-blue-600">Dynamics</span></h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
            {/* Ownership Models */}
            <div className="p-10 bg-neutral-50 rounded-[48px] border border-neutral-100 hover:shadow-2xl transition-all duration-500 flex flex-col">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-neutral-900 text-white rounded-2xl flex items-center justify-center shadow-lg">
                  <ShoppingBag size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-black italic tracking-tight">Asset Ownership</h4>
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Model Selection</p>
                </div>
              </div>
              
              <div className="space-y-8 flex-1">
                <div>
                  <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-3">Instant Transfer</div>
                  <ul className="space-y-3">
                    {['100% IP & Source Code', 'Permanent License'].map((f, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-bold text-neutral-600">
                        <Check size={14} className="text-blue-600" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-8 border-t border-neutral-200/60">
                  <div className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-3">Rent to Own</div>
                  <ul className="space-y-3">
                    {['12 Monthly Installments', 'Automated IP Transfer'].map((f, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-bold text-neutral-600">
                        <Check size={14} className="text-indigo-600" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  const el = document.getElementById('ownership-models');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="mt-10 w-full py-4 bg-white border border-neutral-200 text-neutral-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-neutral-900 hover:text-white transition-all"
              >
                View Models Above
              </button>
            </div>

            {/* Membership Tile */}
            <div className="p-10 bg-white rounded-[48px] border-2 border-neutral-900 shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-neutral-900/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <Zap size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black italic tracking-tight">Membership Hub</h4>
                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Network Access</p>
                  </div>
                </div>
                {isAuthenticated && currentUser?.membership_tier && (
                  <div className="px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg text-[8px] font-black uppercase tracking-widest">
                    Active
                  </div>
                )}
              </div>

              <div className="flex-1 relative z-10">
                {isAuthenticated && currentUser?.membership_tier ? (
                  <div className="space-y-6">
                    <div className="p-6 bg-neutral-50 rounded-3xl border border-neutral-100">
                      <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">Current Tier</div>
                      <div className="text-2xl font-black italic text-neutral-900 uppercase">{MEMBERSHIP_TIERS[currentUser.membership_tier.toUpperCase()]?.name || currentUser.membership_tier}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-4">Core Benefits Included</div>
                      <ul className="space-y-3">
                        {MEMBERSHIP_TIERS[currentUser.membership_tier.toUpperCase()]?.features.slice(0, 4).map((f, i) => (
                          <li key={i} className="flex items-center gap-3 text-sm font-bold text-neutral-600">
                            <div className="w-5 h-5 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                              <Check size={10} />
                            </div>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <p className="text-sm font-medium text-neutral-500 leading-relaxed italic">
                      "Join the Iyonic Network to unlock exclusive infrastructure, priority engineering, and automated scaling tools."
                    </p>
                    <div className="space-y-3">
                      {['Priority Node Deployment', 'Enterprise Infrastructure', '24/7 Engineering Support'].map((f, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm font-bold text-neutral-800 list-none">
                          <Check size={16} className="text-blue-600" /> {f}
                        </li>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-10 relative z-10">
                {!isAuthenticated ? (
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => toggleAuthModal('login')}
                      className="py-4 bg-neutral-100 text-neutral-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-neutral-200 transition-all"
                    >
                      Login
                    </button>
                    <button 
                      onClick={() => toggleAuthModal('signup')}
                      className="py-4 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
                    >
                      Join Now
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => navigate('/dashboard')}
                    className="w-full py-4 bg-neutral-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl"
                  >
                    Management Portal
                  </button>
                )}
              </div>
            </div>

            {/* Custom Vision Card */}
            <div className="p-10 bg-blue-600 text-white rounded-[48px] border border-blue-500 hover:shadow-2xl transition-all duration-500 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-md text-white rounded-2xl flex items-center justify-center border border-white/10">
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black italic tracking-tight text-white">Custom Vision</h4>
                    <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">Special Projects</p>
                  </div>
                </div>

                {!showCustomInquiry ? (
                  <div className="flex-1 flex flex-col">
                    <p className="text-blue-100 text-sm font-medium mb-8 leading-relaxed italic">
                      "Didn't find the exact architecture? Share your concepts, redesign ideas, or existing sites for a custom engineering audit."
                    </p>
                    <div className="space-y-3 mb-10">
                      {['Redesign & Refactor', 'Feature Integration', 'Custom Architectures'].map((f, i) => (
                        <div key={i} className="flex items-center gap-3 text-xs font-bold text-white/80">
                          <Check size={14} className="text-blue-300" /> {f}
                        </div>
                      ))}
                    </div>
                    <button 
                      onClick={() => setShowCustomInquiry(true)}
                      className="mt-auto w-full py-4 bg-white text-blue-600 rounded-[24px] font-black text-[10px] uppercase tracking-widest hover:bg-neutral-50 transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-900/20"
                    >
                      Share Your Vision
                      <ArrowRight size={14} />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleCustomInquiry} className="space-y-4 flex-1 flex flex-col">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={14} />
                        <input 
                          required
                          type="email"
                          placeholder="Email Address"
                          value={inquiryData.email}
                          onChange={(e) => setInquiryData({...inquiryData, email: e.target.value})}
                          className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-all"
                        />
                      </div>
                      <div className="relative group">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={14} />
                        <input 
                          required
                          type="tel"
                          placeholder="Phone Number"
                          value={inquiryData.phone}
                          onChange={(e) => setInquiryData({...inquiryData, phone: e.target.value})}
                          className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-all"
                        />
                      </div>
                    </div>
                    <textarea 
                      required
                      placeholder="Share your concepts, ideas, or redesigns..."
                      value={inquiryData.message}
                      onChange={(e) => setInquiryData({...inquiryData, message: e.target.value})}
                      className="w-full flex-1 min-h-[100px] bg-white/10 border border-white/20 rounded-xl p-4 text-xs text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-all resize-none"
                    />
                    <div className="flex gap-2">
                      <button 
                        type="button"
                        onClick={() => setShowCustomInquiry(false)}
                        className="flex-1 py-3 bg-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10 hover:bg-white/20 transition-all"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-[2] py-3 bg-white text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-neutral-50 disabled:opacity-50 transition-all shadow-lg"
                      >
                        {isSubmitting ? 'Sending...' : 'Submit Vision'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>


      <Contact />
      <CoolPopup {...popup} onClose={() => setPopup(prev => ({ ...prev, isOpen: false }))} />
    </div>
  )
}

export default LandingPage

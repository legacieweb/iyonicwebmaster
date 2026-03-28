import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  ArrowLeft, Check, Star, Zap, Shield, Sparkles, Code, Smartphone, Cpu, 
  CreditCard, Megaphone, Globe, ShoppingBag, Calendar, 
  User, ExternalLink, Eye, Info, Layout, Layers, MousePointer2,
  ChevronRight, X, Monitor, Tablet, ArrowRight, Lock, Phone, Mail
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import AnimatedCTA from './AnimatedCTA'
import { MODULES, MEMBERSHIP_TIERS, checkAccess } from '../utils/membership'
import { CATALOG_ITEMS, SERVICES, PRICING_DATA, WEBSITE_TYPES } from '../utils/constants'
import { useAuth } from '../contexts/AuthContext'
import DesignPreview from './DesignPreview'
import { saveProject, saveOrder, submitLead } from '../utils/api'
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'

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

const DesignDetails = ({ item, onClose, formatPrice, getMonthlyPrice, onPreview, onSelect, currency, currentUser, startAtPricing = false }) => {
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

      {/* Left: Visuals */}
      <div className="md:w-3/5 h-[40vh] md:h-full bg-neutral-100 relative overflow-hidden group">
        <img 
          src={item.url ? `https://s.wordpress.com/mshots/v1/${encodeURIComponent(item.url)}?w=1920` : item.image} 
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 via-transparent to-transparent" />
      </div>

      {/* Right: Detailed Content & Plan Configuration */}
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

        <div className="mb-16">
          <h4 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em] mb-8">Available Growth Modules</h4>
          <div className="space-y-3">
            {MODULES.filter(m => !item.moduleIds?.includes(m.id)).slice(0, 3).map(mod => (
              <div key={mod.id} className="flex items-center justify-between p-5 bg-white border border-neutral-100 rounded-[24px] hover:border-blue-500/30 transition-all group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-neutral-50 rounded-xl flex items-center justify-center text-neutral-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Zap size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-black text-neutral-900">{mod.name}</div>
                    <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">Scalability Ready</div>
                  </div>
                </div>
                <div className="text-blue-600 font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Request Add</div>
              </div>
            ))}
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
                    setTimeout(() => navigate('/', { state: { scrollTo: 'pricing' } }), 2000)
                    return
                  }
                  if (currentUser && selectedPlan === 'subscription' && !hasAccess) {
                    setPopup({
                      isOpen: true,
                      title: 'Tier Restricted',
                      message: `Access Denied: This design requires ${requiredTier?.name} membership. Please upgrade your tier in the billing section.`,
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

          <div className="flex items-center gap-6 opacity-40 grayscale">
            <Shield size={24} />
            <div className="h-[1px] flex-1 bg-neutral-300" />
            <span className="text-[8px] font-black uppercase tracking-[0.3em]">Secure Architecture</span>
          </div>
        </div>
      </div>
      <CoolPopup {...popup} onClose={() => setPopup(prev => ({ ...prev, isOpen: false }))} />
    </motion.div>
  </div>
)
}

const WebDevelopmentLanding = ({ service, onBack, pricingPlans, currency, setCurrency, formatPrice, getMonthlyPrice }) => {
  const { scrollY } = useScroll()
  const navigate = useNavigate()
  const { isAuthenticated, currentUser, toggleAuthModal } = useAuth()
  const [selectedType, setSelectedType] = useState('All')
  const [selectedDesign, setSelectedDesign] = useState(null)
  const [startAtPricing, setStartAtPricing] = useState(false)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [previewItem, setPreviewItem] = useState(null)
  const [showCustomInquiry, setShowCustomInquiry] = useState(false)
  const [inquiryData, setInquiryData] = useState({ name: '', email: '', phone: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [popup, setPopup] = useState({ isOpen: false, title: '', message: '', type: 'info' })

  const handleCustomInquiry = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await submitLead({
        name: inquiryData.name || (currentUser?.name || 'Anonymous User'),
        email: inquiryData.email || (currentUser?.email || 'no-email@iyonic.com'),
        message: `CUSTOM PROJECT INQUIRY: ${inquiryData.message} | CONTACT: ${inquiryData.phone || 'Not provided'}`
      })
      setPopup({
        isOpen: true,
        title: 'Inquiry Sent',
        message: 'Your inquiry has been sent to our engineering team. We will get back to you shortly.',
        type: 'success'
      })
      setShowCustomInquiry(false)
      setInquiryData({ name: '', email: '', phone: '', message: '' })
    } catch (err) {
      setPopup({
        isOpen: true,
        title: 'Error',
        message: 'Failed to send inquiry. Please try again.',
        type: 'error'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const allItems = useMemo(() => {
    return [
      ...(CATALOG_ITEMS['Launch Pad'] || []),
      ...(CATALOG_ITEMS['Service Suite'] || []),
      ...(CATALOG_ITEMS['Retail Engine'] || [])
    ]
  }, [])

  const filteredItems = useMemo(() => {
    return allItems.filter(item => {
      const matchesType = selectedType === 'All' || item.type === selectedType
      return matchesType
    })
  }, [allItems, selectedType])

  // Individual website types for filtering
  const websiteTypes = ['All', ...WEBSITE_TYPES.map(t => t.name)]

  const handleSelectDesign = async (item, planType) => {
    if (!isAuthenticated) {
      toggleAuthModal('login')
      return
    }

    if (planType === 'subscription' && (!currentUser?.membership_tier || currentUser?.subscription_status !== 'active')) {
      setPopup({
        isOpen: true,
        title: 'Membership Required',
        message: 'You need an active membership to select and deploy templates. Please subscribe to a plan first.',
        type: 'error'
      })
      setTimeout(() => navigate('/', { state: { scrollTo: 'pricing' } }), 2000)
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

      // If not an active subscriber, create an order (bill)
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

  return (
    <div className="min-h-screen bg-white">
      {/* Design Details Overlay */}
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
            currency={currency}
            currentUser={currentUser}
            startAtPricing={startAtPricing}
          />
        )}
      </AnimatePresence>

      {/* Live Preview Overlay */}
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

      {/* Hero Section - Light Theme Redesign */}
      <section className="relative pt-40 pb-32 bg-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(37,99,235,0.05),_transparent)]" />
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="flex items-center gap-3 text-neutral-400 hover:text-neutral-900 transition-all mb-12 group"
          >
            <div className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center group-hover:border-neutral-900 transition-colors">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            </div>
            <span className="font-black text-[10px] uppercase tracking-[0.3em]">Back to Hub</span>
          </motion.button>

          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-[10px] font-black mb-8 tracking-[0.2em] uppercase shadow-sm">
                <Sparkles size={14} className="animate-pulse" />
                Digital Engineering Excellence
              </div>
              <h1 className="text-6xl md:text-9xl font-black mb-10 leading-[0.9] italic tracking-tighter text-neutral-900">
                Forge Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600">Vision.</span>
              </h1>
              <p className="text-2xl text-neutral-500 mb-12 leading-relaxed max-w-lg font-medium italic">
                Architectural precision meets boundary-pushing design. Select your ownership strategy and scale without limits.
              </p>

              <div className="flex items-center gap-6">
                <div className="p-1.5 bg-neutral-50 border border-neutral-200 rounded-[24px] flex shadow-inner">
                  {['USD', 'KES'].map(c => (
                    <button
                      key={c}
                      onClick={() => setCurrency(c)}
                      className={`px-8 py-4 rounded-[20px] text-[10px] font-black transition-all uppercase tracking-widest ${
                        currency === c ? 'bg-white text-blue-600 shadow-xl scale-105' : 'text-neutral-400 hover:text-neutral-900'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <div className="h-12 w-[1px] bg-neutral-200 hidden sm:block" />
                <div className="hidden sm:flex flex-col">
                  <div className="text-[8px] font-black text-neutral-400 uppercase tracking-widest mb-1">Global Standard</div>
                  <div className="text-xs font-bold text-neutral-900">Real-time Rates</div>
                </div>
              </div>
            </motion.div>

            <div className="grid gap-6">
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
              ].map((model, idx) => (
                <motion.div
                  key={model.title}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + (idx * 0.1) }}
                  className="p-8 bg-white border border-neutral-100 rounded-[40px] hover:border-blue-500/30 transition-all group shadow-sm hover:shadow-[0_30px_60px_rgba(0,0,0,0.05)] cursor-default"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex gap-6">
                      <div className={`w-16 h-16 rounded-3xl bg-${model.color}-50 flex items-center justify-center text-${model.color}-600 group-hover:bg-${model.color}-600 group-hover:text-white transition-all duration-500 shadow-sm`}>
                        <model.icon size={28} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black uppercase tracking-tight text-neutral-900 mb-1 italic leading-none">{model.title}</h3>
                        <p className="text-sm text-neutral-500 font-medium">{model.desc}</p>
                        <div className="mt-4 flex items-center gap-2 text-[9px] font-black text-blue-600 uppercase tracking-widest">
                          <Check size={14} /> {model.benefit}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">Pricing</div>
                      <div className="text-lg font-black italic tracking-tighter text-neutral-900">{model.price}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>


        </div>
      </section>

      {/* Catalog Section */}
      <section className="py-24 bg-white" id="catalog">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header Section */}
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
              <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                Sort: <span className="text-neutral-900">Highest Performance</span>
              </div>
            </div>
          </div>

          {/* Category Filter Navbar - Stylish & Sticky */}
          <div className="sticky top-24 z-40 mb-16">
            <div className="bg-white/80 backdrop-blur-xl border border-neutral-200/50 rounded-[32px] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
              {/* Category Scroller */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 px-2">
                {websiteTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`whitespace-nowrap px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      selectedType === type 
                        ? 'bg-neutral-900 text-white shadow-lg shadow-neutral-900/20 scale-105' 
                        : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Grid Section */}
          <div className="w-full">
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
                      {/* Image Area */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-50">
                        <img 
                          src={item.url ? `https://s.wordpress.com/mshots/v1/${encodeURIComponent(item.url)}?w=1280` : item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        
                        {/* Technical Serial ID */}
                        <div className="absolute top-6 left-6 px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[8px] font-black text-white uppercase tracking-[0.2em] border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          {item.id}
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="p-8 flex-1 flex flex-col">
                          <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                              <h3 className="text-2xl font-black text-neutral-900 group-hover:text-blue-600 transition-colors tracking-tighter italic leading-tight">{item.name}</h3>
                              <span className={`px-2 py-1 rounded-lg text-[7px] font-black uppercase tracking-widest border ${
                                !currentUser?.membership_tier
                                  ? 'bg-slate-50 text-slate-400 border-slate-100'
                                  : item.minTier === 'free' || !item.minTier
                                  ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                  : item.minTier === 'premium'
                                  ? 'bg-purple-50 text-purple-600 border-purple-100'
                                  : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                              }`}>
                                {!currentUser?.membership_tier ? 'Locked' : item.minTier ? `${MEMBERSHIP_TIERS[item.minTier.toUpperCase()]?.name || item.minTier}` : 'Basic'}
                              </span>
                            </div>

                            <div className="flex flex-col gap-1">
                              <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Pricing Structure</div>
                              <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-black text-neutral-900 italic tracking-tighter">
                                  {formatPrice(item.price)}
                                </span>
                                <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Full Ownership</span>
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-[9px] font-black uppercase tracking-tighter">
                                  {getMonthlyPrice(item.price)}
                                </div>
                                <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest italic">Rent to Own Plan</span>
                              </div>
                            </div>
                          </div>
                        
                        <p className="text-neutral-500 text-sm leading-relaxed my-6 line-clamp-2 font-medium italic">
                          "{item.description}"
                        </p>
                        
                        {/* Architecture Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-8">
                          {item.moduleIds?.slice(0, 3).map((moduleId, i) => {
                            const module = MODULES.find(m => m.id === moduleId)
                            return (
                              <span key={i} className="px-3 py-1.5 bg-neutral-50 border border-neutral-100/50 rounded-lg text-[7px] font-black text-neutral-400 uppercase tracking-widest group-hover:border-neutral-200 transition-colors">
                                {module ? module.name : moduleId}
                              </span>
                            )
                          })}
                          {item.moduleIds?.length > 3 && (
                            <span className="px-3 py-1.5 bg-neutral-50 border border-neutral-100/50 rounded-lg text-[7px] font-black text-neutral-400 uppercase tracking-widest">
                              +{item.moduleIds.length - 3}
                            </span>
                          )}
                        </div>

                        {/* Bottom Action Section */}
                        <div className="mt-auto pt-6 border-t border-neutral-50 flex items-center gap-3">
                          {(() => {
                            const isTierLocked = item.minTier && item.minTier !== 'free' && !checkAccess(currentUser?.membership_tier || 'free', item.minTier);
                            const isMembershipRequired = !currentUser?.membership_tier;
                            
                            return (
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (isMembershipRequired) {
                                    setPopup({
                                      isOpen: true,
                                      title: 'Membership Required',
                                      message: 'You need an active membership to access blueprints. Please subscribe to a plan first.',
                                      type: 'error'
                                    })
                                    setTimeout(() => navigate('/', { state: { scrollTo: 'pricing' } }), 2000)
                                    return;
                                  }
                                  if (isTierLocked) {
                                    setPopup({
                                      isOpen: true,
                                      title: 'Tier Restricted',
                                      message: `This blueprint requires ${MEMBERSHIP_TIERS[item.minTier.toUpperCase()]?.name || item.minTier} membership.`,
                                      type: 'error'
                                    })
                                    return;
                                  }
                                  setSelectedDesign(item);
                                }}
                                className={`flex-[2] py-4 rounded-[16px] font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 active:scale-[0.98] ${
                                  isMembershipRequired || isTierLocked
                                    ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed border border-neutral-200'
                                    : 'bg-neutral-900 text-white hover:bg-blue-600 shadow-xl shadow-neutral-900/10 hover:shadow-blue-600/20'
                                }`}
                              >
                                {isMembershipRequired ? (
                                  <>
                                    <Lock size={12} /> Join Now
                                  </>
                                ) : isTierLocked ? (
                                  <>
                                    <Shield size={12} /> Upgrade Tier
                                  </>
                                ) : (
                                  <>
                                    Get Started
                                    <ArrowRight size={12} />
                                  </>
                                )}
                              </button>
                            );
                          })()}
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

              {filteredItems.length === 0 && (
                <div className="text-center py-32 bg-white rounded-[64px] border-2 border-dashed border-neutral-200">
                  <div className="w-24 h-24 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
                    <Search size={40} className="text-neutral-300" />
                  </div>
                  <h3 className="text-3xl font-black text-neutral-900 mb-4 italic tracking-tighter">Blueprint Not Found</h3>
                  <p className="text-neutral-500 font-medium text-lg">No architecture matches your current filter configuration.</p>
                  <button 
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedType('All')
                      setSelectedModules([])
                      setPriceRange([0, 5000])
                    }}
                    className="mt-12 px-10 py-5 bg-blue-600 text-white rounded-[24px] font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20"
                  >
                    Reset Environment
                  </button>
                </div>
              )}
          </div>
        </div>
      </section>

      {/* Pricing Comparison Table */}
      <section className="py-32 bg-white border-t border-neutral-100 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
        
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
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
                  const el = document.getElementById('ownership-strategy');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="mt-10 w-full py-4 bg-white border border-neutral-200 text-neutral-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-neutral-900 hover:text-white transition-all"
              >
                View Pricing Below
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
    </div>
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

  if (service.id === 'web-development') {
    return (
      <WebDevelopmentLanding 
        service={service} 
        onBack={onBack} 
        pricingPlans={pricingPlans}
        currency={currency}
        setCurrency={setCurrency}
        formatPrice={formatPrice}
        getMonthlyPrice={getMonthlyPrice}
      />
    )
  }

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

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ShoppingBag,
  Globe,
  ShieldCheck,
  Shield,
  CheckCircle2,
  Star,
  ExternalLink,
  X,
  ArrowRight,
  Building2,
  BarChart3,
  Wallet,
  FileText,
  Lock,
  Cloud,
  Database,
  Package,
  Info,
  RefreshCw,
  CreditCard,
  Layout,
  Zap,
  Calendar,
  Users,
  Award,
  PieChart,
  Activity,
  TrendingUp,
  Gauge
} from 'lucide-react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import {
  findBusinessById,
  formatPrice,
  MEMBERSHIP_INFO,
  getModuleName,
  OWNERSHIP_MODELS,
  BUSINESS_MEMBERSHIP_TIERS
} from '../utils/constants'
import { saveOrder } from '../utils/api'

const MODULE_ICONS = {
  crm: Users,
  auth: Shield,
  db_basic: Database,
  cloud_infra: Cloud,
  seo_basic: BarChart3,
  analytics: BarChart3,
  inventory: Package,
  collaboration: Layout,
  payment_gateway: CreditCard,
  chatbots: ShoppingBag,
  security: Lock,
  'customer profiles': Users,
  'order management': Package,
  'product catalog': ShoppingBag,
  bookings: Calendar,
  forms: FileText,
  marketing: BarChart3,
  'customer management': Users
}

const getModuleIcon = (moduleId) => MODULE_ICONS[moduleId] || Info

const TIER_ICONS = [ShoppingBag, Globe, Cloud, ShieldCheck, Users]

const AcquisitionModal = ({ isOpen, onClose, business, onSubmit }) => {
  const [email, setEmail] = useState('')
  const [acquisitionType, setAcquisitionType] = useState('investor')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(email, acquisitionType)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setEmail('')
      onClose()
    }, 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-950/80 backdrop-blur-xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: 'spring', damping: 25 }}
            className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-[40px] p-10 shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-amber-400/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-neutral-500 hover:text-amber-400 transition-colors z-10"
            >
              <X size={20} />
            </button>

            <div className="relative z-10 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50/10 flex items-center justify-center text-amber-400 mb-6 border border-neutral-800">
                <ShoppingBag size={28} />
              </div>

              <h2 className="text-2xl font-black text-neutral-200 uppercase italic tracking-tighter mb-3">
                Request Acquisition Brief
              </h2>

              <p className="text-neutral-400 text-sm font-medium mb-8 leading-relaxed max-w-sm mx-auto">
                Enter your email. Our investor relations team will follow up with portfolio details and valuation assessment for{' '}
                <span className="text-neutral-200 font-bold">{business?.name}</span>.
              </p>

              <div className="flex gap-3 justify-center mb-8">
                <button
                  onClick={() => setAcquisitionType('investor')}
                  className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    acquisitionType === 'investor'
                      ? 'bg-amber-400 text-neutral-950 shadow-lg shadow-amber-400/20'
                      : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                  }`}
                >
                  Investor
                </button>
                <button
                  onClick={() => setAcquisitionType('buyer')}
                  className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    acquisitionType === 'buyer'
                      ? 'bg-amber-400 text-neutral-950 shadow-lg shadow-amber-400/20'
                      : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                  }`}
                >
                  Full Acquisition
                </button>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-8"
                >
                  <CheckCircle2 size={56} className="text-amber-400 mx-auto mb-4" />
                  <div className="text-lg font-black text-neutral-200 uppercase italic tracking-tighter">
                    Request Submitted!
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="your@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-6 py-4 bg-neutral-800/40 border border-neutral-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400/30 font-medium text-sm text-neutral-200 placeholder-neutral-500 transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 bg-amber-400 text-neutral-950 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-amber-400/20 hover:bg-amber-300 transition-all"
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
  )
}

const BusinessDetail = ({ business: propBusiness, onBack: propOnBack }) => {
  const { businessId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, toggleAuthModal, currentUser } = useAuth()

  const [business, setBusiness] = useState(propBusiness || location.state?.business || null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    if (!business && businessId) {
      setBusiness(findBusinessById(businessId))
    }
  }, [businessId, business])

  const onBack = propOnBack || (() => {
    navigate(location.state?.from || '/')
  })

  const handleRequestBrief = (email, type) => {
    console.log(`Acquisition request for ${business.name}: ${email} as ${type}`)
  }

  const handleAcquire = async () => {
    if (!isAuthenticated) {
      toggleAuthModal('login')
      return
    }

    try {
      const orderData = {
        order_number: `ACQ-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        service_id: business.id,
        service_name: business.name,
        plan_name: `Business Acquisition - ${businessTier.name}`,
        amount: business.price,
        status: 'pending',
        userId: currentUser?.id
      }

      await saveOrder(orderData)

      navigate('/dashboard', {
        state: { tab: 'orders', acquiredBusiness: business }
      })
    } catch (err) {
      console.error('Acquisition failed:', err)
      alert('Failed to initialize acquisition. Please try again or contact support.')
    }
  }

  if (!business) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="text-center">
          <Package size={56} className="text-neutral-600 mx-auto mb-6" />
          <h2 className="text-2xl font-black text-neutral-200 mb-2">Business Not Found</h2>
          <p className="text-neutral-500 text-sm mb-8">The requested business could not be located.</p>
          <button
            onClick={onBack}
            className="px-10 py-5 bg-amber-400 text-neutral-950 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-amber-300 transition-all shadow-xl shadow-amber-400/20"
          >
            Return to Portfolio
          </button>
        </div>
      </div>
    )
  }

  const modules = business.moduleIds || []
  const tierInfo = MEMBERSHIP_INFO[business.minTier] || null
  const businessTier = BUSINESS_MEMBERSHIP_TIERS.find((t) => t.id === business.minTier) || BUSINESS_MEMBERSHIP_TIERS[0]
  const tierIcon = TIER_ICONS[businessTier ? BUSINESS_MEMBERSHIP_TIERS.indexOf(businessTier) : 0] || ShoppingBag

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 border-b border-neutral-800">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-[-15%] right-[-5%] w-[500px] h-[500px] bg-amber-400/3 blur-[140px] rounded-full" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] bg-neutral-800 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-amber-400 transition-colors mb-10 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </motion.button>

          <div className="grid lg:grid-cols-2 gap-20 items-start">
            {/* Business Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-10"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-amber-400 text-[11px] font-black uppercase tracking-wider">
                <ShoppingBag size={12} />
                {business.type || 'Digital Business'}
              </div>

              <h1 className="text-5xl lg:text-6xl font-black text-neutral-100 tracking-tight leading-[0.9] italic">
                {business.name}
              </h1>

              <p className="text-lg text-neutral-400 leading-relaxed max-w-2xl">
                {business.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4">
                <div className="flex items-center gap-4 p-5 bg-neutral-900 rounded-2xl border border-neutral-800">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-400">
                    <Wallet size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">
                      Valuation
                    </div>
                    <div className="text-2xl font-black text-neutral-200">
                      {formatPrice(business.price)}
                    </div>
                  </div>
                </div>

                {tierInfo && (
                  <div className="flex items-center gap-4 p-5 bg-neutral-900 rounded-2xl border border-neutral-800">
                    <div className="w-10 h-10 rounded-xl bg-neutral-800/50 flex items-center justify-center text-amber-400">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">
                        Min. Tier
                      </div>
                      <div className="text-xl font-black text-neutral-200">
                        {tierInfo.name}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-4 p-5 bg-neutral-900 rounded-2xl border border-neutral-800">
                  <div className="w-10 h-10 rounded-xl bg-neutral-800/50 flex items-center justify-center text-amber-400">
                    <BarChart3 size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">
                      Category
                    </div>
                    <div className="text-xl font-black text-neutral-200">
                      {business.type}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <motion.button
                  whileHover={{ y: -2 }}
                  onClick={handleAcquire}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-amber-400 text-neutral-950 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all hover:bg-amber-300 shadow-xl shadow-amber-400/20"
                >
                  Request Acquisition Brief
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </motion.button>

                <motion.button
                  whileHover={{ y: -2 }}
                  onClick={handleAcquire}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-neutral-900 border border-neutral-800 text-neutral-200 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all hover:border-amber-400 hover:text-amber-400"
                >
                  Full Business Acquisition
                  <Building2 size={16} />
                </motion.button>

                {business.url && (
                  <motion.a
                    whileHover={{ y: -2 }}
                    href={business.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-6 py-4 bg-neutral-800/30 text-neutral-400 hover:text-amber-400 border border-neutral-800 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all"
                    title="View Live Site"
                  >
                    View Live Site
                    <ExternalLink size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </motion.a>
                )}
              </div>

                {/* Quick Pricing Summary card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mt-12 p-8 bg-neutral-900 rounded-[32px] border-2 border-amber-400/10 shadow-xl shadow-amber-400/5"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-400">
                      <Wallet size={20} />
                    </div>
                    <div>
                      <div className="text-xs font-black text-neutral-500 uppercase tracking-widest">
                        Acquisition Starting From
                      </div>
                      <div className="text-3xl font-black text-amber-400">
                        {formatPrice(business.price)}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-500 font-black uppercase tracking-widest">
                        Business Valuation
                      </span>
                      <span className="text-neutral-200 font-black">
                        {formatPrice(business.price)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-500 font-black uppercase tracking-widest">
                        Minimum Tier
                      </span>
                      <span className="text-neutral-200 font-black">
                        {businessTier.name} · ${businessTier.price !== null ? businessTier.price : 0}/mo
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm pt-3 border-t border-neutral-800">
                      <span className="text-neutral-200 font-black uppercase tracking-widest">
                        Total Initial Cost
                      </span>
                      <span className="text-xl font-black text-amber-400">
                        {formatPrice(business.price + (businessTier.price !== null ? businessTier.price : 0))}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleAcquire}
                    className="w-full py-4 bg-amber-400 text-neutral-950 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/20 flex items-center justify-center gap-3 group"
                  >
                    Proceed to Dashboard
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              </motion.div>

            {/* Business Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative"
            >
              <div className="relative bg-neutral-900 rounded-[32px] border border-neutral-800 overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900" />
                {business.url ? (
                  <img
                    src={`https://s.wordpress.com/mshots/v1/${encodeURIComponent(business.url)}?w=800`}
                    alt={business.name}
                    className="w-full h-full object-cover rounded-[32px] opacity-60"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                ) : business.image ? (
                  <img
                    src={business.image}
                    alt={business.name}
                    className="w-full h-full object-cover rounded-[32px] opacity-60"
                  />
                ) : (
                  <div className="aspect-[4/3] flex items-center justify-center text-neutral-500">
                    <ShoppingBag size={64} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent flex items-end p-12">
                  <div className="w-full">
                    <div className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-2">
                      {business.type}
                    </div>
                    <div className="text-4xl font-black text-neutral-200 tracking-tighter mb-2">
                      {business.name}
                    </div>
                    <div className="text-3xl font-black text-amber-400">
                      {formatPrice(business.price)}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-16">
              {/* Business Description */}
              <div className="space-y-8">
                <h2 className="text-3xl font-black text-neutral-200 uppercase italic tracking-tight">
                  Business Profile
                </h2>
                <p className="text-neutral-400 leading-relaxed text-lg font-medium">
                  {business.description}
                </p>

                <div className="grid sm:grid-cols-2 gap-6 pt-2">
                  {[
                    { icon: ShoppingBag, label: 'Status', value: 'Fully Operational' },
                    { icon: Layout, label: 'Type', value: business.type || 'Digital Business' },
                    { icon: BarChart3, label: 'Revenue', value: 'Active' },
                    { icon: Calendar, label: 'Tenure', value: 'Established' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-5 bg-neutral-900 rounded-2xl border border-neutral-800">
                      <div className="w-10 h-10 rounded-xl bg-neutral-800/50 flex items-center justify-center text-amber-400">
                        <item.icon size={20} />
                      </div>
                      <div>
                        <div className="text-[10px] font-black text-neutral-600 uppercase tracking-widest">
                          {item.label}
                        </div>
                        <div className="text-neutral-200 font-black text-sm">
                          {item.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Operational Modules */}
              {modules.length > 0 && (
                <div className="space-y-8">
                  <h3 className="text-3xl font-black text-neutral-200 uppercase italic tracking-tight">
                    Operational Modules
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {modules.map((moduleId, i) => {
                      const Icon = getModuleIcon(moduleId)
                      const moduleName = getModuleName(moduleId)
                      return (
                        <div
                          key={i}
                          className="flex items-center gap-4 p-5 bg-neutral-900 rounded-2xl border border-neutral-800 hover:border-neutral-700 transition-colors"
                        >
                          <div className="w-10 h-10 rounded-xl bg-neutral-800/50 flex items-center justify-center text-amber-400 border border-neutral-700">
                            <Icon size={18} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-black text-neutral-200 text-sm truncate">
                              {moduleName}
                            </div>
                            <div className="text-[10px] text-neutral-600 font-black uppercase tracking-widest">
                              {moduleId}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Technology Ecosystem */}
              <div className="space-y-8">
                <h3 className="text-3xl font-black text-neutral-200 uppercase italic tracking-tight">
                  Technology Ecosystem
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-6 bg-neutral-900 rounded-2xl border border-neutral-800 text-center">
                    <Cloud size={28} className="text-amber-400 mx-auto mb-3" />
                    <div className="text-sm font-black text-neutral-200 uppercase tracking-widest mb-1">
                      Infrastructure
                    </div>
                    <p className="text-[10px] text-neutral-600 font-black uppercase">
                      Cloud Native
                    </p>
                  </div>
                  <div className="p-6 bg-neutral-900 rounded-2xl border border-neutral-800 text-center">
                    <ShieldCheck size={28} className="text-amber-400 mx-auto mb-3" />
                    <div className="text-sm font-black text-neutral-200 uppercase tracking-widest mb-1">
                      Security
                    </div>
                    <p className="text-[10px] text-neutral-600 font-black uppercase">
                      Enterprise Grade
                    </p>
                  </div>
                  <div className="p-6 bg-neutral-900 rounded-2xl border border-neutral-800 text-center">
                    <Zap size={28} className="text-amber-400 mx-auto mb-3" />
                    <div className="text-sm font-black text-neutral-200 uppercase tracking-widest mb-1">
                      Scaling
                    </div>
                    <p className="text-[10px] text-neutral-600 font-black uppercase">
                      Auto-Scaler
                    </p>
                  </div>
                </div>
              </div>

              {/* Data Room */}
              <div className="space-y-8">
                <h3 className="text-3xl font-black text-neutral-200 uppercase italic tracking-tight">
                  Data Room
                </h3>
                <div className="space-y-3">
                  {[
                    { name: 'Financial Statements (12 Months)', desc: 'Revenue, EBITDA, and cash flow reports' },
                    { name: 'Operational Metrics', desc: 'Key performance indicators and growth data' },
                    { name: 'Customer Analytics', desc: 'User base, retention, and acquisition metrics' },
                    { name: 'Technology Audit', desc: 'Full infrastructure and architecture review' }
                  ].map((doc, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-5 bg-neutral-900 rounded-2xl border border-neutral-800 hover:border-neutral-700 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-neutral-800/50 flex items-center justify-center text-amber-400">
                          <FileText size={20} />
                        </div>
                        <div>
                          <div className="font-black text-neutral-200 text-sm uppercase tracking-widest">
                            {doc.name}
                          </div>
                          <div className="text-[11px] text-neutral-600 font-medium">
                            {doc.desc}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">
                        Included
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Acquisition Options */}
            <div className="space-y-8">
              {/* Ownership Models */}
              <div>
                <h3 className="text-2xl font-black text-neutral-200 uppercase italic tracking-tight mb-8">
                  Ownership Models
                </h3>
                <div className="space-y-6">
                  {OWNERSHIP_MODELS.map((model) => {
                    const Icon = model.icon
                    return (
                      <motion.div
                        key={model.id}
                        whileHover={{ y: -4 }}
                        className={`p-8 bg-neutral-900 rounded-[32px] border ${
                          model.popular ? 'border-amber-400/30 shadow-xl shadow-amber-400/5' : 'border-neutral-800'
                        } flex flex-col`}
                      >
                        <div className="flex items-start justify-between mb-5">
                          <div className="w-12 h-12 rounded-xl bg-neutral-800/50 flex items-center justify-center text-amber-400 border border-neutral-700">
                            <Icon size={22} />
                          </div>
                          {model.popular && (
                            <Star size={16} className="text-amber-400" fill="currentColor" />
                          )}
                        </div>
                        <h4 className="text-xl font-black text-neutral-200 uppercase italic tracking-tighter mb-1">
                          {model.title}
                        </h4>
                        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest mb-3">
                          {model.subtitle}
                        </p>
                        <p className="text-neutral-400 text-sm font-medium leading-relaxed mb-5 flex-1">
                          {model.description}
                        </p>
                        <div className="mb-5">
                          <span className="text-2xl font-black text-neutral-200">
                            {model.priceLabel}
                          </span>
                        </div>
                        <ul className="space-y-2 mb-6">
                          {model.features.map((feat, i) => (
                            <li key={i} className="flex items-center gap-2 text-neutral-500 font-bold text-xs">
                              <CheckCircle2 size={12} className="text-amber-400" />
                              {feat}
                            </li>
                          ))}
                        </ul>
                        <button
                          onClick={handleAcquire}
                          className="w-full py-4 bg-amber-400 text-neutral-950 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20"
                        >
                          Select Model
                        </button>
                      </motion.div>
                    )
                  })}
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tier Subscription Section */}
      <section className="py-32 bg-neutral-950 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-400/5 rounded-full blur-[140px] -z-10" />
        <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-neutral-800 rounded-full blur-[140px] -z-10" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-24"
          >
            {/* Section Header */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="space-y-6 max-w-2xl"
              >
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 border border-neutral-800 text-amber-400 text-[11px] font-black uppercase tracking-widest">
                  <Gauge size={12} />
                  Required Membership
                </div>
                <h2 className="text-5xl lg:text-6xl font-medium text-neutral-100 tracking-tight leading-[0.95]">
                  Tier Subscription
                </h2>
                <p className="text-neutral-400 text-lg font-medium leading-relaxed">
                  Every business in the Iyoni Corp portfolio requires a minimum membership tier for deployment.
                  This tier grants you access to the business infrastructure, operational modules, and ongoing
                  platform support.
                </p>
              </motion.div>

              <motion.button
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAcquire}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-amber-400/20 hover:shadow-amber-400/30 transition-shadow"
              >
                Subscribe & Begin Acquisition
                <ArrowRight size={16} />
              </motion.button>
            </div>

            {/* Main Tier Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: 'spring', damping: 25 }}
              className="relative bg-neutral-900/80 backdrop-blur-xl rounded-[36px] border border-neutral-800 shadow-2xl shadow-amber-400/5 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/5 rounded-full blur-[100px]" />

              <div className="grid lg:grid-cols-12 gap-12 p-10 lg:p-14 relative z-10">
                {/* Left Column: Tier Identity */}
                <div className="lg:col-span-4 space-y-8">
                  <div className="flex items-center gap-5">
                    <div className="w-18 h-18 rounded-2xl bg-neutral-800/30 flex items-center justify-center text-amber-400 border border-neutral-800">
                      {tierIcon ? <tierIcon size={32} /> : <ShoppingBag size={32} />}
                    </div>
                    <div>
                      <h3 className="text-4xl font-medium text-neutral-100 tracking-tight">
                        {businessTier.name}
                      </h3>
                      <p className="text-sm font-medium text-neutral-500 uppercase tracking-widest mt-1">
                        {businessTier.subtitle}
                      </p>
                    </div>
                  </div>

                  {businessTier.popular && (
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-amber-400/10 to-amber-400/5 text-amber-400 rounded-full text-[11px] font-black uppercase tracking-wider">
                      <Star size={12} fill="currentColor" />
                      Most Popular Tier
                    </div>
                  )}

                  {businessTier.partner && (
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-neutral-800/30 text-neutral-300 rounded-full text-[11px] font-black uppercase tracking-wider border border-neutral-800">
                      <Award size={12} />
                      Revenue Share Model
                    </div>
                  )}

                  <div className="space-y-2 pt-2">
                    {businessTier.price !== null && (
                      <div>
                        <div className="text-5xl font-medium text-amber-400 tracking-tight">
                          ${businessTier.price}
                          <span className="text-base font-medium text-neutral-600">
                            /mo
                          </span>
                        </div>
                        <p className="text-xs font-medium text-neutral-600 uppercase tracking-widest mt-1">
                          Billing Cycle: Monthly
                        </p>
                      </div>
                    )}

                    {businessTier.price === null && businessTier.priceLabel && (
                      <div>
                        <div className="text-3xl font-medium text-neutral-200 uppercase tracking-tight">
                          {businessTier.priceLabel}
                        </div>
                        <p className="text-xs font-medium text-neutral-600 uppercase tracking-widest mt-1">
                          Revenue share pricing model
                        </p>
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-neutral-400 font-medium leading-relaxed pt-4 border-t border-neutral-800">
                    {businessTier.description}
                  </p>
                </div>

                {/* Middle Column: Features */}
                <div className="lg:col-span-5">
                  <h4 className="text-xs font-black text-neutral-600 uppercase tracking-widest mb-6">
                    What's Included
                  </h4>

                  <ul className="space-y-4">
                    {businessTier.features.map((feat, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-4 text-neutral-300 font-medium text-sm"
                      >
                        <div className="w-6 h-6 rounded-full bg-amber-400/10 flex items-center justify-center border border-neutral-800 flex-shrink-0">
                          <CheckCircle2 size={14} className="text-amber-400" />
                        </div>
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-12 pt-8 border-t border-neutral-800 space-y-6">
                    <h4 className="text-xs font-black text-neutral-600 uppercase tracking-widest">
                      Billing & Access
                    </h4>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="p-5 bg-neutral-800/20 rounded-2xl border border-neutral-800">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar size={14} className="text-amber-400" />
                          <span className="text-[10px] font-black text-neutral-600 uppercase tracking-widest">
                            Billing
                          </span>
                        </div>
                        <div className="text-sm font-medium text-neutral-200">
                          {businessTier.partner ? 'Revenue Share' : 'Monthly'}
                        </div>
                      </div>
                      <div className="p-5 bg-neutral-800/20 rounded-2xl border border-neutral-800">
                        <div className="flex items-center gap-2 mb-2">
                          <ShieldCheck size={14} className="text-amber-400" />
                          <span className="text-[10px] font-black text-neutral-600 uppercase tracking-widest">
                            Commitment
                          </span>
                        </div>
                        <div className="text-sm font-medium text-neutral-200">
                          Month-to-month
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Tier Progression & Cost */}
                <div className="lg:col-span-3 space-y-10">
                  {/* Tier Progression */}
                  <div>
                    <h4 className="text-xs font-black text-neutral-600 uppercase tracking-widest mb-6">
                      Tier Progression
                    </h4>
                    <div className="relative pl-6">
                      <div className="absolute left-2 top-0 bottom-0 w-px bg-neutral-800" />
                      <div className="space-y-4">
                        {BUSINESS_MEMBERSHIP_TIERS.map((tier, i) => {
                          const isCurrent = tier.id === businessTier.id
                          const Icon = TIER_ICONS[i] || ShoppingBag
                          return (
                            <div
                              key={tier.id}
                              className={`relative flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                                isCurrent
                                  ? 'bg-amber-400/5 border-amber-400/20'
                                  : 'bg-neutral-800/10 border-neutral-800 hover:border-neutral-700'
                              }}`}
                            >
                              <div
                                className={`absolute left-[-14px] w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                                  isCurrent
                                    ? 'border-amber-400 bg-amber-400 text-neutral-950'
                                    : 'border-neutral-700 bg-neutral-800/50 text-neutral-500'
                                }`}
                              >
                                {isCurrent ? <Star size={12} /> : <div className="w-2 h-2 rounded-full bg-current" />}
                              </div>
                              <div
                                className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                                  isCurrent
                                    ? 'bg-amber-400/10 text-amber-400'
                                    : 'bg-neutral-800/50 text-neutral-500'
                                }`}
                              >
                                <Icon size={16} />
                              </div>
                              <div className="flex-1">
                                <div
                                  className={`font-medium text-xs ${
                                    isCurrent ? 'text-amber-400' : 'text-neutral-400'
                                  }`}
                                >
                                  {tier.name}
                                </div>
                                {tier.price !== null ? (
                                  <div className="text-[10px] text-neutral-600">
                                    ${tier.price}/mo
                                  </div>
                                ) : (
                                  <div className="text-[10px] text-neutral-600">
                                    {tier.priceLabel}
                                  </div>
                                )}
                              </div>
                              {isCurrent && (
                                <div className="text-amber-400">
                                  <Star size={12} />
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Cost Breakdown */}
                  <div className="pt-8 border-t border-neutral-800">
                    <h4 className="text-xs font-black text-neutral-600 uppercase tracking-widest mb-6">
                      Cost Breakdown
                    </h4>
                    <div className="space-y-4 text-sm">
                      <div className="flex items-center justify-between py-2">
                        <span className="text-neutral-600 font-medium">
                          Business Valuation
                        </span>
                        <span className="text-neutral-200 font-medium">
                          {formatPrice(business.price)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-t border-neutral-800">
                        <span className="text-neutral-600 font-medium">
                          Required Tier
                        </span>
                        <span className="text-neutral-200 font-medium">
                          {businessTier.name}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <span className="text-neutral-600 font-medium">
                          Monthly Subscription
                        </span>
                        <span className="text-neutral-200 font-medium">
                          ${businessTier.price !== null ? businessTier.price : 0}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-3 border-t border-neutral-700 pt-4">
                        <span className="text-base font-medium text-neutral-200 uppercase tracking-widest">
                          Total Initial Cost
                        </span>
                        <span className="text-2xl font-medium text-amber-400">
                          {formatPrice(business.price + (businessTier.price !== null ? businessTier.price : 0))}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Stats */}
              <div className="border-t border-neutral-800 pt-10 mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-amber-400/5 flex items-center justify-center text-amber-400 border border-neutral-800">
                    <Database size={20} />
                  </div>
                  <div className="text-[11px] font-black text-neutral-600 uppercase tracking-widest">
                    Infrastructure
                  </div>
                  <div className="text-sm font-medium text-neutral-200">
                    {BUSINESS_MEMBERSHIP_TIERS.indexOf(businessTier) >= 0
                      ? `${BUSINESS_MEMBERSHIP_TIERS.indexOf(businessTier) + 1} Node${BUSINESS_MEMBERSHIP_TIERS.indexOf(businessTier) > 0 ? 's' : ''}`
                      : 'N/A'}
                  </div>
                </div>

                <div className="text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-amber-400/5 flex items-center justify-center text-amber-400 border border-neutral-800">
                    <Layout size={20} />
                  </div>
                  <div className="text-[11px] font-black text-neutral-600 uppercase tracking-widest">
                    Modules
                  </div>
                  <div className="text-sm font-medium text-neutral-200">
                    {businessTier.features.length} Features
                  </div>
                </div>

                <div className="text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-amber-400/5 flex items-center justify-center text-amber-400 border border-neutral-800">
                    <Zap size={20} />
                  </div>
                  <div className="text-[11px] font-black text-neutral-600 uppercase tracking-widest">
                    Support
                  </div>
                  <div className="text-sm font-medium text-neutral-200 uppercase">
                    {businessTier.id === 'basic'
                      ? 'Standard'
                      : businessTier.id === 'premium'
                        ? 'Priority'
                        : businessTier.id === 'premium_plus'
                          ? 'VIP'
                          : businessTier.id === 'enterprise'
                            ? '24/7 Dedicated'
                            : 'Dedicated'}
                  </div>
                </div>

                <div className="text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-amber-400/5 flex items-center justify-center text-amber-400 border border-neutral-800">
                    <Cloud size={20} />
                  </div>
                  <div className="text-[11px] font-black text-neutral-600 uppercase tracking-widest">
                    Deployment
                  </div>
                  <div className="text-sm font-medium text-neutral-200">
                    Instant
                  </div>
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div className="border-t border-neutral-800 pt-8 mt-8 flex flex-col sm:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-6 text-sm font-medium text-neutral-500 uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-amber-400" />
                    Instant Access
                  </div>
                  <div className="w-1 h-1 bg-neutral-700 rounded-full" />
                  <div className="flex items-center gap-2">
                    <RefreshCw size={16} className="text-amber-400" />
                    Cancel anytime
                  </div>
                </div>

                <motion.button
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAcquire}
                  className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-amber-400/20 hover:shadow-amber-400/30 transition-shadow"
                >
                  Confirm Tier Subscription
                  <ArrowRight size={16} />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <AcquisitionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        business={business}
        onSubmit={handleRequestBrief}
      />
    </div>
  )
}

export default BusinessDetail

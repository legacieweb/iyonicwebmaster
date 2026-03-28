import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Eye, ShoppingCart, Star } from 'lucide-react'
import { CATALOG_ITEMS, SERVICES, PRICING_DATA } from '../utils/constants'
import { MODULES, MEMBERSHIP_TIERS, checkAccess } from '../utils/membership'
import { useAuth } from '../contexts/AuthContext'
import { Shield } from 'lucide-react'
import { saveProject, saveOrder } from '../utils/api'
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
                 <Shield size={32} />}
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

const ServiceCatalog = ({ serviceId, onBack, onPreview, onAddToWishlist, wishlist = [] }) => {
  const { currentUser, isAuthenticated, toggleAuthModal } = useAuth()
  const [isSelecting, setIsSelecting] = useState(false)
  const [popup, setPopup] = useState({ isOpen: false, title: '', message: '', type: 'info' })
  const navigate = useNavigate()
  const handlePreview = (item) => {
    if (typeof onPreview === 'function') {
      onPreview(item)
    }
  }

  const handleAddToWishlist = (item) => {
    if (typeof onAddToWishlist === 'function') {
      onAddToWishlist(item)
    }
  }

  const handleSelect = async (item) => {
    if (!isAuthenticated) {
      // Store pending selection for after login/signup
      const pendingData = {
        title: item.name,
        description: item.description,
        category: service.title,
        thumbnail: item.url ? `https://s.wordpress.com/mshots/v1/${encodeURIComponent(item.url)}?w=1280` : item.image,
        status: 'requested_customization',
        template: item.id,
        data: {
          price: item.price,
          url: item.url,
          moduleIds: item.moduleIds
        }
      }
      localStorage.setItem('pending_selection', JSON.stringify(pendingData))
      toggleAuthModal('login')
      return
    }

    // Check membership - user must have a membership to select any template
    if (!currentUser?.membership_tier || currentUser?.subscription_status !== 'active') {
      setPopup({
        isOpen: true,
        title: 'Membership Required',
        message: 'You need an active membership to select and deploy templates. Please subscribe to a plan first.',
        type: 'error'
      })
      setTimeout(() => navigate('/', { state: { scrollTo: 'pricing' } }), 2000)
      return
    }

    // Check tier access
    if (item.minTier && item.minTier !== 'free') {
      const hasAccess = checkAccess(currentUser?.membership_tier, item.minTier)
      if (!hasAccess) {
        setPopup({
          isOpen: true,
          title: 'Tier Restricted',
          message: `Requires ${MEMBERSHIP_TIERS[item.minTier.toUpperCase()]?.name || item.minTier} membership tier to deploy this infrastructure.`,
          type: 'error'
        })
        return
      }
    }

    // Partner Tier Restriction: Only e-commerce
    if (currentUser?.membership_tier === 'partner') {
      if (serviceId !== 'e-commerce') {
        setPopup({
          isOpen: true,
          title: 'Alliance Restrict',
          message: 'Alliance Partner tier is exclusive to E-commerce infrastructure. Please select from the E-commerce catalog.',
          type: 'error'
        })
        return
      }
      
      // Check if approved
      if (currentUser?.partnership_status !== 'approved') {
        setPopup({
          isOpen: true,
          title: 'Under Review',
          message: 'Your Alliance Partner application is currently under review. Access to infrastructure deployment will be granted upon approval.',
          type: 'info'
        })
        return
      }
    }

    setIsSelecting(true)
    try {
      const projectData = {
        title: item.name,
        description: item.description,
        category: service.title,
        thumbnail: item.url ? `https://s.wordpress.com/mshots/v1/${encodeURIComponent(item.url)}?w=1280` : item.image,
        status: 'requested_customization',
        template: item.id,
        userId: currentUser.id,
        data: {
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
          service_name: `${service.title}: ${item.name}`,
          plan_name: service.title,
          amount: item.price,
          status: 'pending',
          userId: currentUser.id,
          description: `Provisioning for ${item.name}`
        }
        await saveOrder(orderData)
      }

      setPopup({
        isOpen: true,
        title: 'Success!',
        message: `Blueprint "${item.name}" has been added to your projects.`,
        type: 'success'
      })
      setTimeout(() => navigate('/dashboard', { state: { tab: 'projects' } }), 2000)
    } catch (err) {
      console.error('Error selecting item:', err)
      setPopup({
        isOpen: true,
        title: 'Error',
        message: 'Failed to process selection. Please try again.',
        type: 'error'
      })
    } finally {
      setIsSelecting(false)
    }
  }

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
  // Try to find the service by ID or by matching a plan name
  let service = SERVICES.find(s => s.id === serviceId)
  
  if (!service) {
    // If not found, it might be a plan name. Find which service category this plan belongs to.
    for (const category in CATALOG_ITEMS) {
      if (category === serviceId) {
        // Find the service category that contains this plan
        for (const sCat in PRICING_DATA) {
          const plan = PRICING_DATA[sCat].find(p => p.name === serviceId)
          if (plan) {
            const baseService = SERVICES.find(s => s.id === sCat)
            service = {
              ...baseService,
              title: plan.name,
              color: plan.color === 'blue' ? 'bg-blue-600' : 'bg-neutral-900'
            }
            break
          }
        }
      }
    }
  }

  const items = (CATALOG_ITEMS[serviceId] || []).filter(item => {
    // If user is a partner, they can only see/select items if they are in the e-commerce category
    if (currentUser?.membership_tier === 'partner' && serviceId !== 'e-commerce') {
      return false
    }
    
    // Also if pending, maybe show them but disable? The user said "restrict them", 
    // we already handle that in handleSelect.
    return true
  })

  if (!service) return null

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
          <span className="font-bold text-sm uppercase tracking-widest">Back to Service</span>
        </motion.button>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-black text-neutral-900 mb-4"
            >
              {service.title} <span className="text-blue-600">Catalog</span>
            </motion.h1>
            <p className="text-neutral-500 text-lg max-w-2xl font-medium">
              Select a base design to begin your journey. Every design is fully customizable to your brand's unique identity.
            </p>
          </div>

          <div className="flex gap-2 bg-neutral-50 p-1.5 rounded-2xl border border-neutral-100 flex-shrink-0">
            <button
              onClick={() => setCurrency('USD')}
              className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest ${
                currency === 'USD' ? 'bg-white text-blue-600 shadow-sm' : 'text-neutral-400 hover:text-neutral-600'
              }`}
            >
              USD
            </button>
            <button
              onClick={() => setCurrency('KES')}
              className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest ${
                currency === 'KES' ? 'bg-white text-blue-600 shadow-sm' : 'text-neutral-400 hover:text-neutral-600'
              }`}
            >
              KES
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {items.map((item, index) => {
            const isWishlisted = wishlist.some(w => w.id === item.id)
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handlePreview(item)}
                className="group bg-white rounded-[40px] overflow-hidden border border-neutral-100 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100 flex items-center justify-center">
                  {/* Background Logo Placeholder */}
                  {!item.url && (
                    <div className="absolute inset-0 flex items-center justify-center p-12 opacity-10">
                      <img src="https://i.imgur.com/6nGQFtj.png" alt="Iyonicorp" className="w-full h-full object-contain" />
                    </div>
                  )}
                  
                  <img 
                    src={item.url ? `https://s.wordpress.com/mshots/v1/${encodeURIComponent(item.url)}?w=1280` : item.image} 
                    alt={item.name} 
                    className={`w-full h-full ${item.url ? 'object-cover' : 'object-contain'} transition-transform duration-700 group-hover:scale-110`}
                    loading="lazy"
                  />
                  
                  {item.url && (
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                      <div className="px-3 py-1 bg-blue-600 text-white text-[8px] font-black uppercase tracking-widest rounded-full shadow-lg flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                        Live System
                      </div>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-neutral-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePreview(item);
                      }}
                      className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-neutral-900 hover:bg-blue-600 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500"
                    >
                      <Eye size={24} />
                    </button>
                  </div>
                  
                  {/* Price Tag */}
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <div className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-sm font-black text-neutral-900 shadow-xl flex flex-col items-center">
                      <span>{formatPrice(item.price)}</span>
                      <span className="text-[8px] text-blue-600 uppercase tracking-tighter">Or {getMonthlyPrice(item.price)}/mo</span>
                    </div>
                    {item.minTier && item.minTier !== 'free' && (
                      <div className={`px-3 py-1 backdrop-blur-md rounded-full text-[8px] font-black shadow-lg flex items-center gap-1.5 uppercase tracking-widest border ${
                        checkAccess(currentUser?.membership_tier || 'free', item.minTier)
                          ? 'bg-emerald-500/90 text-white border-emerald-400'
                          : 'bg-amber-500/90 text-white border-amber-400'
                      }`}>
                        <Shield size={10} />
                        {MEMBERSHIP_TIERS[item.minTier.toUpperCase()]?.name || item.minTier} Tier
                        <span className="ml-1 opacity-70">
                          ({checkAccess(currentUser?.membership_tier || 'free', item.minTier) ? 'Unlocked' : 'Locked'})
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-neutral-900">{item.name}</h3>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star size={14} fill="currentColor" />
                      <span className="text-xs font-black">4.9</span>
                    </div>
                  </div>
                  <p className="text-neutral-500 text-sm leading-relaxed mb-8 line-clamp-2 font-medium">
                    {item.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {item.moduleIds?.map((moduleId, i) => {
                      const module = MODULES.find(m => m.id === moduleId)
                      return (
                        <span key={i} className="px-3 py-1 bg-neutral-50 border border-neutral-100 rounded-lg text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                          {module ? module.name : moduleId}
                        </span>
                      )
                    }) || (
                      <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">No modules assigned</span>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelect(item);
                      }}
                      disabled={isSelecting || !currentUser?.membership_tier || (item.minTier && item.minTier !== 'free' && !checkAccess(currentUser?.membership_tier, item.minTier))}
                      className={`flex-1 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 ${
                        isSelecting || !currentUser?.membership_tier || (item.minTier && item.minTier !== 'free' && !checkAccess(currentUser?.membership_tier, item.minTier))
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                          : 'bg-neutral-900 text-white hover:bg-blue-600 shadow-neutral-900/10'
                      }`}
                    >
                      {isSelecting ? (
                        <>
                          <Loader2 size={14} className="animate-spin" /> Processing...
                        </>
                      ) : !currentUser?.membership_tier ? (
                        <>
                          <Lock size={14} /> Membership Required
                        </>
                      ) : item.minTier && item.minTier !== 'free' && !checkAccess(currentUser?.membership_tier, item.minTier) ? (
                        <>
                          <Shield size={14} /> {MEMBERSHIP_TIERS[item.minTier.toUpperCase()]?.name || item.minTier} Required
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={14} />
                          Select Plan
                        </>
                      )}
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePreview(item);
                      }}
                      className="w-14 h-14 border border-neutral-100 rounded-2xl flex items-center justify-center text-neutral-400 hover:border-blue-600 hover:text-blue-600 transition-all group/info"
                    >
                      <Eye size={20} className="group-hover/info:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
      <CoolPopup {...popup} onClose={() => setPopup(prev => ({ ...prev, isOpen: false }))} />
    </div>
  )
}

export default ServiceCatalog

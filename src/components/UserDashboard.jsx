import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, ArrowRight, Plus, Globe, BarChart3, Settings, Zap, Eye, Edit3, Trash2, 
  AlertCircle, RefreshCw, Layout, Search, Filter, MoreVertical, LogOut, 
  ShoppingBag, CreditCard, Box, PieChart, Users, MessageSquare, Shield,
  ChevronRight, Star, ExternalLink, Briefcase, TrendingUp, Menu as MenuIcon, X,
  HeartHandshake, Rocket, Sparkles, Clock, Wallet, FileText, Lock, CheckCircle2, Cpu, ShieldCheck, Database, Mail, Repeat, Coins
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { fetchUserProjects, deleteProject, fetchUserOrders, saveOrder, updateProject, saveProject, BASE_URL, updateUserProfile, updateOrder, submitPartnershipRequest, uploadPartnershipDocument } from '../utils/api'
import { SERVICES, PRICING_DATA } from '../utils/constants'
import { MEMBERSHIP_TIERS, MODULES, checkAccess, getUnlockedToolsForTier } from '../utils/membership'
import { PaystackButton } from 'react-paystack'

const UserDashboard = ({ onBack, onSelectTemplate, onEditProject, initialTab = 'projects', initialServiceId = null }) => {
  const { currentUser, logout, refreshUser } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [projects, setProjects] = useState(() => {
    const cached = localStorage.getItem('iyonicorp_projects')
    return cached ? JSON.parse(cached) : []
  })
  const [orders, setOrders] = useState(() => {
    const cached = localStorage.getItem('iyonicorp_orders')
    return cached ? JSON.parse(cached) : []
  })
  const [loading, setLoading] = useState(!projects.length && !orders.length)
  const [activeTab, setActiveTab] = useState(location.state?.tab || initialTab)
  
  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab)
      
      // If navigating to membership, scroll to partnership section after a short delay
      if (location.state.tab === 'membership') {
        setTimeout(() => {
          const partnerTier = document.getElementById('tier-partner')
          if (partnerTier) {
            partnerTier.scrollIntoView({ behavior: 'smooth', block: 'center' })
            partnerTier.classList.add('ring-4', 'ring-amber-400', 'ring-offset-8')
            setTimeout(() => {
              partnerTier.classList.remove('ring-4', 'ring-amber-400', 'ring-offset-8')
            }, 3000)
          }
        }, 500)
      }
    }
  }, [location.state?.tab])
  const [error, setError] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedService, setSelectedService] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currency, setCurrency] = useState('USD')
  const [editingProject, setEditingProject] = useState(null)
  const [editFormData, setEditFormData] = useState({ title: '', domain: '' })
  const [profileFormData, setProfileFormData] = useState({
    first_name: currentUser?.first_name || '',
    last_name: currentUser?.last_name || '',
    email: currentUser?.email || '',
    phone_number: currentUser?.phone_number || ''
  })
  const [unlockedTools, setUnlockedTools] = useState(() => {
    const cached = localStorage.getItem('iyonicorp_unlocked_tools')
    return cached ? JSON.parse(cached) : (currentUser?.unlocked_tools || [])
  })
  const [activatedTools, setActivatedTools] = useState(() => {
    const cached = localStorage.getItem('iyonicorp_activated_tools')
    return cached ? JSON.parse(cached) : (currentUser?.activated_tools || [])
  })
  const [purchasingTool, setPurchasingTool] = useState(null)
  const [selectedModuleCategory, setSelectedModuleCategory] = useState('all')
  
  // Partnership states
  const [partnershipModalOpen, setPartnershipModalOpen] = useState(false)
  const [partnershipSuccess, setPartnershipSuccess] = useState(false)
  const [partnershipFormData, setPartnershipFormData] = useState({
    businessName: '',
    businessType: '',
    website: '',
    description: '',
    credentials: '',
    // Business verification fields
    annualRevenue: '',
    revenueCurrency: 'USD',
    socialMediaFacebook: '',
    socialMediaTwitter: '',
    socialMediaInstagram: '',
    socialMediaLinkedin: '',
    isRegistered: false,
    registrationNumber: '',
    registrationDocument: null,
    bankStatement: null,
    mobileMoneyStatement: null
  })

  const KES_RATE = 125

  useEffect(() => {
    if (currentUser) {
      setProfileFormData({
        first_name: currentUser.first_name || '',
        last_name: currentUser.last_name || '',
        email: currentUser.email || '',
        phone_number: currentUser.phone_number || ''
      })
    }
  }, [currentUser])

  const formatPrice = (price) => {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price
    if (currency === 'KES') {
      return `KES ${(numericPrice * KES_RATE).toLocaleString()}`
    }
    return `$${numericPrice.toLocaleString()}`
  }

  const getMonthlyPrice = (price) => {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price
    const monthly = numericPrice / 12
    if (currency === 'KES') {
      return `KES ${(monthly * KES_RATE).toLocaleString()}/mo`
    }
    return `$${monthly.toLocaleString()}/mo`
  }

  const getTimeUntilBilling = () => {
    if (!currentUser?.next_billing_date) return null
    const next = new Date(currentUser.next_billing_date)
    const now = new Date()
    const diff = next - now
    if (diff <= 0) return 'Payment Overdue'
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    return `${days}d ${hours}h remaining`
  }

  // Load initial data
  const loadDashboardData = async () => {
    if (!currentUser?.id) return
    try {
      setError(null)
      // Refresh user profile to validate account and get latest data
      try {
        const updatedUser = await refreshUser()
        if (updatedUser) {
          setProfileFormData({
            first_name: updatedUser.first_name || '',
            last_name: updatedUser.last_name || '',
            email: updatedUser.email || '',
            phone_number: updatedUser.phone_number || ''
          })
          setUnlockedTools(updatedUser.unlocked_tools || [])
          setActivatedTools(updatedUser.activated_tools || [])
          localStorage.setItem('iyonicorp_unlocked_tools', JSON.stringify(updatedUser.unlocked_tools || []))
          localStorage.setItem('iyonicorp_activated_tools', JSON.stringify(updatedUser.activated_tools || []))
        }
      } catch (userErr) {
        // refreshUser already handles logout for 401/404
        return
      }

      const [projectsData, ordersData] = await Promise.all([
        fetchUserProjects(currentUser.id),
        fetchUserOrders(currentUser.id)
      ])
      
      const pData = projectsData || []
      const oData = ordersData || []
      
      setProjects(pData)
      setOrders(oData)
      
      // Update cache
      localStorage.setItem('iyonicorp_projects', JSON.stringify(pData))
      localStorage.setItem('iyonicorp_orders', JSON.stringify(oData))
    } catch (err) {
      console.error('Error loading dashboard data:', err)
      setError('Failed to load dashboard data. Please try again.')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    if (currentUser?.id) {
      loadDashboardData()
      const refreshInterval = setInterval(loadDashboardData, 60000)
      return () => clearInterval(refreshInterval)
    }
  }, [currentUser?.id])

  // Handle initial service redirection
  useEffect(() => {
    if (initialServiceId) {
      const service = SERVICES.find(s => s.id === initialServiceId)
      if (service) {
        setSelectedService(service)
        setActiveTab('marketplace')
      }
    }
  }, [initialServiceId])

  const handleMembershipUpgrade = async (tierId, reference) => {
    try {
      setRefreshing(true)
      const nextBillingDate = new Date()
      nextBillingDate.setMonth(nextBillingDate.getMonth() + 1)
      
      // Calculate discounted price if referred
      const tier = Object.values(MEMBERSHIP_TIERS).find(t => t.id === tierId)
      let finalPrice = tier.price
      if (currentUser?.referral_code) {
        finalPrice = finalPrice * 0.90 // 10% off membership
      }

      await updateUserProfile(currentUser.id, { 
        membership_tier: tierId,
        subscription_status: 'active',
        next_billing_date: nextBillingDate.toISOString()
      })
      
      // Force refresh user profile in AuthContext
      const updatedUser = await refreshUser()
      
      // Save order record
      const orderData = {
        order_number: `SUB-${reference}`,
        service_id: 'membership-subscription',
        service_name: `Membership Upgrade (${tier.name})`,
        plan_name: 'Monthly Subscription',
        amount: finalPrice,
        status: 'paid',
        userId: currentUser.id
      }
      await saveOrder(orderData)
      await loadDashboardData()
      alert(`Success! You are now a ${tier.name} member. Next billing date: ${nextBillingDate.toLocaleDateString()}`)
    } catch (err) {
      console.error('Upgrade failed:', err)
      alert('Failed to update membership. Please contact support.')
    } finally {
      setRefreshing(false)
    }
  }

  const handlePurchase = async (plan) => {
    try {
      setRefreshing(true)
      let finalAmount = parseFloat(plan.price.toString().replace(/[^0-9.]/g, ''))
      
      if (currentUser?.referral_code) {
        finalAmount = finalAmount * 0.70 // 30% off initial purchase
      }

      const orderData = {
        order_number: `ORD-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        service_id: selectedService.id,
        service_name: selectedService.title,
        plan_name: plan.name,
        amount: finalAmount,
        status: 'pending',
        userId: currentUser.id
      }
      
      await saveOrder(orderData)
      alert(`Success! Order for ${plan.name} has been initialized. Our team will contact you for the next steps.`)
      await loadDashboardData()
      setActiveTab('orders')
    } catch (err) {
      console.error('Purchase failed:', err)
      alert('Failed to initialize purchase. Please try again or contact support.')
    } finally {
      setRefreshing(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await loadDashboardData()
  }

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to decommission this enterprise node?')) return
    setDeletingId(id)
    try {
      await deleteProject(id)
      setProjects(prev => prev.filter(p => p.id !== id))
    } catch (err) {
      console.error('Delete failed:', err)
      const errorMsg = err.response?.status === 404 
        ? 'Infrastructure node not found or already decommissioned.' 
        : 'Failed to decommission node. You may not have the required clearance.'
      alert(errorMsg)
      setError(errorMsg)
    } finally {
      setDeletingId(null)
    }
  }

  const handleUpdateProject = async () => {
    if (!editingProject) return
    try {
      setRefreshing(true)
      // Only allow updating title, not domain
      const updateData = { title: editFormData.title }
      await updateProject(editingProject.id, updateData)
      await loadDashboardData()
      setEditingProject(null)
      alert('Node settings updated successfully.')
    } catch (err) {
      console.error('Update failed:', err)
      alert('Failed to update project settings.')
    } finally {
      setRefreshing(false)
    }
  }

  const handleUpdateProfile = async () => {
    try {
      setRefreshing(true)
      await updateUserProfile(currentUser.id, profileFormData)
      await refreshUser()
      alert('Profile updated successfully.')
    } catch (err) {
      console.error('Update profile failed:', err)
      alert('Failed to update profile settings.')
    } finally {
      setRefreshing(false)
    }
  }

  const handleRequestUpdate = async () => {
    if (!currentUser?.membership_tier) {
      alert('Please activate a membership tier first.')
      return
    }
    
    try {
      setRefreshing(true)
      const unlockedForTier = getUnlockedToolsForTier(currentUser.membership_tier)
      
      // Merge with existing unlocked tools
      const currentUnlocked = currentUser.unlocked_tools || []
      const newUnlocked = [...new Set([...currentUnlocked, ...unlockedForTier])]
      
      await updateUserProfile(currentUser.id, { 
        unlocked_tools: newUnlocked 
      })
      
      await refreshUser()
      // Switch to tools tab to "open" them for the user
      setActiveTab('tools')
      // No reload needed as refreshUser and loadDashboardData will sync state
    } catch (err) {
      console.error('Error updating modules:', err)
      setError('Failed to update modules. Please try again.')
    } finally {
      setRefreshing(false)
    }
  }

  const handlePaymentSuccess = async (orderId, reference) => {
    try {
      setRefreshing(true)
      await updateOrder(orderId, { status: 'paid', payment_reference: reference })
      await loadDashboardData()
      alert('Payment successful! Your infrastructure node is being provisioned.')
    } catch (err) {
      console.error('Payment processing failed:', err)
      alert('Payment recorded but failed to update status. Please contact support.')
    } finally {
      setRefreshing(false)
    }
  }

  const handleToolPurchase = async (tool, plan, reference) => {
    try {
      setRefreshing(true)
      const newUnlocked = [...unlockedTools, tool.id]
      setUnlockedTools(newUnlocked)
      localStorage.setItem('iyonicorp_unlocked_tools', JSON.stringify(newUnlocked))
      
      const updateData = { unlocked_tools: newUnlocked }
      
      // If monthly, update subscription tracking
      if (plan === 'monthly') {
        const nextDate = new Date()
        nextDate.setMonth(nextDate.getMonth() + 1)
        updateData.next_billing_date = nextDate.toISOString()
        updateData.subscription_status = 'active'
      }

      // Save order record
      const orderData = {
        order_number: `TL-${reference}`,
        service_id: 'tool-unlock',
        service_name: `Module: ${tool.name}`,
        plan_name: plan === 'oneTime' ? 'Lifetime License' : 'Monthly License',
        amount: plan === 'oneTime' ? tool.prices.oneTime : tool.prices.monthly,
        status: 'paid',
        userId: currentUser.id
      }
      await saveOrder(orderData)
      
      // Try to persist to user profile
      try {
        await updateUserProfile(currentUser.id, updateData)
      } catch (err) {
        console.warn('Could not persist to DB:', err)
      }

      setPurchasingTool(null)
      alert(`Success! ${tool.name} is now unlocked. ${plan === 'monthly' ? 'Next billing date: ' + new Date(updateData.next_billing_date).toLocaleDateString() : ''}`)
      await refreshUser()
      await loadDashboardData()
    } catch (err) {
      console.error('Tool purchase failed:', err)
      alert('Purchase failed. Please contact support.')
    } finally {
      setRefreshing(false)
    }
  }

  const handleToolActivate = async (toolId) => {
    try {
      const isActivated = activatedTools.includes(toolId)
      let newActivated;
      if (isActivated) {
        newActivated = activatedTools.filter(id => id !== toolId)
      } else {
        newActivated = [...activatedTools, toolId]
      }
      
      setActivatedTools(newActivated)
      localStorage.setItem('iyonicorp_activated_tools', JSON.stringify(newActivated))
      
      try {
        await updateUserProfile(currentUser.id, { activated_tools: newActivated })
      } catch (err) {
        console.warn('Could not persist activated_tools to DB:', err)
      }
      
      if (!isActivated) {
        alert('System activated successfully.')
      }
    } catch (err) {
      console.error('Activation failed:', err)
    }
  }

  const handlePartnershipSubmit = async (e) => {
    e.preventDefault()
    try {
      setRefreshing(true)
      const fullName = `${currentUser.first_name} ${currentUser.last_name}`.trim();
      
      // Upload documents first if provided
      let registrationDocPath = ''
      let bankStatementPath = ''
      let mobileMoneyPath = ''
      
      if (partnershipFormData.registrationDocument) {
        const regDoc = await uploadPartnershipDocument(partnershipFormData.registrationDocument)
        registrationDocPath = regDoc.path
      }
      
      if (!partnershipFormData.isRegistered && partnershipFormData.bankStatement) {
        const bankDoc = await uploadPartnershipDocument(partnershipFormData.bankStatement)
        bankStatementPath = bankDoc.path
      }
      
      if (!partnershipFormData.isRegistered && partnershipFormData.mobileMoneyStatement) {
        const mobileDoc = await uploadPartnershipDocument(partnershipFormData.mobileMoneyStatement)
        mobileMoneyPath = mobileDoc.path
      }
      
      await submitPartnershipRequest({
        ...partnershipFormData,
        userId: currentUser.id,
        userEmail: currentUser.email,
        userName: fullName || currentUser.name || currentUser.email,
        registrationDocumentPath: registrationDocPath,
        bankStatementPath: bankStatementPath,
        mobileMoneyStatementPath: mobileMoneyPath
      })
      
      setPartnershipModalOpen(false)
      setPartnershipSuccess(true)
      setPartnershipFormData({
        businessName: '',
        businessType: '',
        website: '',
        description: '',
        credentials: '',
        annualRevenue: '',
        revenueCurrency: 'USD',
        socialMediaFacebook: '',
        socialMediaTwitter: '',
        socialMediaInstagram: '',
        socialMediaLinkedin: '',
        isRegistered: false,
        registrationNumber: '',
        registrationDocument: null,
        bankStatement: null,
        mobileMoneyStatement: null
      })
    } catch (err) {
      console.error('Partnership request failed:', err)
      alert('Failed to submit partnership request. Please try again.')
    } finally {
      setRefreshing(false)
    }
  }

  const filteredProjects = projects.filter(p => 
    (p.title || p.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = [
    { label: 'Active Projects', value: projects.length, icon: Zap, color: 'text-amber-400', bg: 'bg-amber-400/10' },
    { 
      label: 'Total Investment', 
      value: formatPrice(orders.reduce((acc, o) => acc + (parseFloat(o.amount) || 0), 0)), 
      icon: CreditCard, 
      color: 'text-purple-500', 
      bg: 'bg-purple-500/10' 
    },
    { label: 'Services Pulse', value: 'Active', icon: ShoppingBag, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  ]

  const navItems = [
    { id: 'overview', label: 'User Hub', icon: ShieldCheck },
    { id: 'projects', label: 'My Projects', icon: Layout },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
    { id: 'membership', label: 'Membership', icon: Zap },
    { id: 'orders', label: 'Billing', icon: CreditCard },
    { id: 'tools', label: 'Modules', icon: Briefcase },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="h-screen bg-neutral-950 text-neutral-200 flex flex-col font-sans selection:bg-amber-400/30 overflow-hidden">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-400/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-400/5 rounded-full blur-[120px]" />
      </div>

      {/* Modern Dashboard Header */}
      <header className="bg-neutral-950/80 backdrop-blur-xl border-b border-neutral-800 py-4 px-4 sm:px-8 z-50 shadow-sm flex-shrink-0">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between w-full">
          <div className="flex items-center gap-4 sm:gap-6">
            <motion.button
              onClick={() => onBack('landing')}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(0,0,0,0.05)' }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex w-10 h-10 rounded-xl bg-neutral-800 items-center justify-center text-neutral-500 hover:text-amber-400 transition-all border border-neutral-800"
            >
              <ArrowLeft size={18} />
            </motion.button>
            
            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => onBack('landing')}>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-amber-500 to-neutral-700 rounded-lg sm:rounded-xl flex items-center justify-center text-neutral-100 font-black italic shadow-lg shadow-amber-400/20 group-hover:scale-110 transition-transform">I</div>
              <div className="flex flex-col">
                <span className="font-black text-base sm:text-lg text-neutral-200 tracking-tighter leading-none">Iyonic</span>
                <span className="text-[8px] sm:text-[10px] font-bold text-amber-400 uppercase tracking-widest mt-0.5 sm:mt-1">Intelligence</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-neutral-500 hover:text-amber-400 transition-all bg-neutral-800 rounded-xl border border-neutral-800"
            >
              <MenuIcon size={20} />
            </button>
            <div className="hidden md:flex items-center gap-4 pr-6 border-r border-neutral-800">
              <div className="text-right">
                <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest leading-none mb-1">Active Session</div>
                <div className="text-sm font-bold text-neutral-200">{currentUser?.name || 'User Identity'}</div>
              </div>
              <div className="w-11 h-11 bg-gradient-to-br from-neutral-700 to-neutral-600 rounded-xl flex items-center justify-center text-neutral-300 font-black border border-neutral-800 shadow-sm overflow-hidden">
                {currentUser?.photoURL ? (
                  <img src={currentUser.photoURL} alt="" className="w-full h-full object-cover" />
                ) : (
                  currentUser?.first_name?.charAt(0) || currentUser?.email?.charAt(0)?.toUpperCase() || 'U'
                )}
              </div>
            </div>

          </div>
        </div>
      </header>

      <div className="flex-1 flex max-w-[1600px] mx-auto w-full relative z-10 overflow-hidden">
        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-neutral-800/40 backdrop-blur-sm z-[60] lg:hidden"
              />
              <motion.aside 
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 left-0 bottom-0 w-[280px] bg-neutral-900 border-r border-neutral-800 z-[70] p-6 flex flex-col lg:hidden"
              >
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center text-neutral-100 font-black italic">I</div>
                    <span className="font-black text-neutral-200 uppercase italic tracking-tighter">Iyonic</span>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)} className="text-neutral-400 hover:text-neutral-200 transition-colors">
                    <X size={24} />
                  </button>
                </div>
                
                <div className="space-y-2 flex-1">
                  {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = activeTab === item.id
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id)
                          if (item.id !== 'marketplace') setSelectedService(null)
                          setMobileMenuOpen(false)
                        }}
                        className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all relative ${
                          isActive ? 'text-amber-400 bg-neutral-800/30' : 'text-neutral-500 hover:bg-neutral-950'
                        }`}
                      >
                        <Icon size={18} className={isActive ? 'text-amber-400' : ''} />
                        <span className="relative z-10">{item.label}</span>
                      </button>
                    )
                  })}
                </div>

                <div className="mt-auto pt-6 border-t border-neutral-700">
                  <button onClick={logout} className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-rose-600 font-bold text-xs uppercase tracking-widest hover:bg-rose-50 transition-all">
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
        {/* Modern Sidebar */}
        <aside className="w-72 p-6 hidden lg:flex flex-col flex-shrink-0 h-full border-r border-neutral-700 bg-neutral-900/50 backdrop-blur-sm">
          <div className="space-y-2 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id)
                    if (item.id !== 'marketplace') setSelectedService(null)
                  }}
                  className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl font-bold text-[11px] uppercase tracking-widest transition-all duration-300 relative group ${
                    isActive 
                      ? 'text-amber-300' 
                      : 'text-neutral-500 hover:text-neutral-200 hover:bg-neutral-800'
                  }`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="sidebar-active"
                      className="absolute inset-0 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-sm"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <div className={`relative z-10 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                    isActive ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-400/20' : 'bg-neutral-800 text-neutral-400 group-hover:bg-neutral-700'
                  }`}>
                    <Icon size={16} />
                  </div>
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                  )}
                </button>
              )
            })}
          </div>

          <div className="mt-4">
            <button onClick={logout} className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-rose-600 font-bold text-xs uppercase tracking-widest hover:bg-rose-50 transition-all">
              <LogOut size={18} /> Logout
            </button>
          </div>
        </aside>

        {/* Main Content View */}
        <main className="flex-1 p-4 sm:p-8 lg:p-12 overflow-y-auto min-h-0">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div 
                key="overview"
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                  <div className="flex items-center gap-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-neutral-700 rounded-[2.5rem] flex items-center justify-center text-neutral-100 font-black text-4xl italic shadow-2xl shadow-amber-400/20 border-4 border-neutral-200">
                      {currentUser?.photoURL ? (
                        <img src={currentUser.photoURL} alt="" className="w-full h-full object-cover rounded-[2.2rem]" />
                      ) : (
                        currentUser?.first_name?.charAt(0) || currentUser?.email?.charAt(0)?.toUpperCase() || 'U'
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm ${
                          currentUser?.subscription_status === 'active' 
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                            : 'bg-neutral-800 text-neutral-500 border-neutral-800'
                        }`}>
                          {currentUser?.membership_tier && currentUser?.subscription_status === 'active'
                            ? `${MEMBERSHIP_TIERS[currentUser?.membership_tier?.toUpperCase()]?.name || currentUser.membership_tier} - Subscribed` 
                            : 'No Active Membership'}
                        </span>
                        {(currentUser?.is_affiliate || currentUser?.referral_code) && (
                          <span className="px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm bg-neutral-800/30 text-amber-400 border-neutral-700">
                            {currentUser?.is_affiliate ? 'Alliance Partner' : 'Alliance Discount Active'}
                          </span>
                        )}
                        <span className="text-neutral-400 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                          <Clock size={12} className="text-amber-400" /> Session Active
                        </span>
                      </div>
                      <h1 className="text-5xl font-black text-neutral-200 uppercase italic tracking-tighter leading-none">
                        {currentUser?.first_name || 'Partner'}<span className="text-amber-400">.</span>
                      </h1>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-neutral-500 font-medium text-sm">
                          <Mail size={14} className="text-amber-400" /> {currentUser?.email}
                        </div>
                        <div className="flex items-center gap-2 text-neutral-500 font-medium text-sm">
                          <Database size={14} className="text-amber-400" /> {projects.length} Nodes Deployed
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <div className="px-8 py-4 bg-neutral-900 border border-neutral-800 rounded-[2rem] shadow-sm flex flex-col justify-center min-w-[180px]">
                      <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">Total Investment</span>
                      <span className="text-2xl font-black text-neutral-200 tracking-tighter italic">{formatPrice(orders.reduce((acc, o) => acc + (parseFloat(o.amount) || 0), 0))}</span>
                    </div>
                    <motion.button 
                      onClick={() => setActiveTab('marketplace')} 
                      whileHover={{ scale: 1.02, translateY: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-10 py-4 bg-neutral-800 text-neutral-100 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] flex items-center gap-4 shadow-xl shadow-slate-900/20 hover:bg-amber-400 transition-all group"
                    >
                      <Plus size={20} strokeWidth={3} className="group-hover:rotate-90 transition-transform duration-500" /> Launch Node
                    </motion.button>
                  </div>
                </div>

                {/* Alliance Partner Review Alert */}
                {(currentUser?.partnership_status === 'pending' || location.state?.partnershipPending) && (
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 bg-neutral-900 rounded-[2.5rem] border-2 border-dashed border-amber-400/30 p-8 md:p-12 relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-amber-400/10 transition-all duration-1000" />
                    <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                      <div className="w-20 h-20 bg-amber-400 rounded-3xl flex items-center justify-center text-neutral-100 shadow-lg shadow-amber-400/20 flex-shrink-0 animate-pulse">
                        <AlertCircle size={32} />
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-neutral-800/30 rounded-full text-amber-400 text-[10px] font-black uppercase tracking-widest mb-4">
                          Protocol: Under Review
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black text-neutral-200 uppercase italic tracking-tighter mb-3 leading-none">
                          Alliance Application <span className="text-amber-400">Pending.</span>
                        </h3>
                        <p className="text-neutral-500 font-medium text-lg max-w-2xl leading-relaxed">
                          Your strategic partnership request is currently being reviewed by our administration. 
                          Expect a verification call or email within 24-48 business hours. 
                        </p>
                      </div>
                      <div className="flex-shrink-0 bg-neutral-950 px-8 py-6 rounded-[2rem] border border-neutral-700">
                        <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1 text-center">Status</div>
                        <div className="text-xl font-black text-amber-400 uppercase italic tracking-tighter">In Queue</div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="grid sm:grid-cols-3 gap-8">
                  {stats.map((stat, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="group bg-neutral-900 p-10 rounded-[3rem] border border-neutral-800 shadow-sm hover:shadow-xl hover:border-amber-400/30 transition-all duration-700 relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-neutral-950 rounded-full blur-3xl group-hover:bg-amber-400/10 transition-all duration-700" />
                      <div className="flex items-center justify-between mb-8">
                        <div className={`w-14 h-14 bg-neutral-950 text-neutral-400 rounded-2xl flex items-center justify-center border border-neutral-700 group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-neutral-100 transition-all duration-500 shadow-sm`}>
                          <stat.icon size={28} />
                        </div>
                        <div className="h-2 w-12 bg-neutral-800 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 w-2/3" />
                        </div>
                      </div>
                      <div className="relative z-10">
                        <div className="text-5xl font-black text-neutral-200 mb-2 tracking-tighter italic">{stat.value}</div>
                        <div className="text-[11px] font-black text-neutral-400 uppercase tracking-[0.2em] group-hover:text-amber-400 transition-colors flex items-center gap-2">
                          {stat.label} <ArrowLeft size={12} className="rotate-180" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-8 bg-neutral-900 p-10 rounded-[3rem] border border-neutral-800 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 pointer-events-none">
                      <BarChart3 className="text-neutral-700" size={120} />
                    </div>
                    <div className="flex items-center justify-between mb-10 relative z-10">
                      <div>
                        <h3 className="text-2xl font-black uppercase italic tracking-tighter text-neutral-200">Project Infrastructure</h3>
                        <p className="text-neutral-500 text-sm font-medium">Real-time performance across deployed nodes.</p>
                      </div>
                      <button onClick={() => setActiveTab('projects')} className="text-[11px] font-black text-amber-400 uppercase tracking-widest hover:text-amber-300 transition-colors flex items-center gap-2 group">
                        Access Grid <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>

                    {projects.length === 0 ? (
                      <div className="py-20 text-center border-2 border-dashed border-neutral-700 rounded-[2rem]">
                        <Layout className="mx-auto text-neutral-600 mb-6" size={64} />
                        <p className="text-neutral-400 text-lg font-medium">No active infrastructure detected.</p>
                        <button onClick={() => setActiveTab('marketplace')} className="mt-6 text-amber-400 font-black text-[10px] uppercase tracking-widest hover:underline">Deploy First Node</button>
                      </div>
                    ) : (
                      <div className="grid sm:grid-cols-2 gap-6 relative z-10">
                        {projects.slice(0, 4).map((p) => (
                          <div key={p.id} className="flex items-center justify-between p-6 bg-neutral-950 rounded-3xl border border-neutral-700 group hover:border-amber-400/30 hover:bg-neutral-900 hover:shadow-sm transition-all duration-500">
                            <div className="flex items-center gap-5">
                              <div className="w-14 h-14 bg-neutral-900 rounded-2xl flex items-center justify-center text-neutral-400 border border-neutral-700 group-hover:scale-110 transition-transform shadow-sm">
                                <Globe size={24} className="text-amber-400" />
                              </div>
                              <div>
                                <div className="font-black text-sm uppercase tracking-tight italic text-neutral-200 mb-1">{p.title || p.name}</div>
                                <div className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{p.status || 'Active'}</span>
                                  {p.domain && (
                                    <>
                                      <span className="text-neutral-600">|</span>
                                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">{p.domain}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                            <button onClick={() => onEditProject?.(p)} className="p-3 bg-neutral-900 text-neutral-400 hover:text-neutral-100 hover:bg-amber-400 rounded-xl transition-all opacity-0 group-hover:opacity-100 shadow-sm">
                              <ExternalLink size={18} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-4 space-y-8">
                    <div className="bg-gradient-to-br from-amber-500 to-neutral-800 p-10 rounded-[3rem] text-neutral-100 shadow-xl shadow-amber-400/20 relative overflow-hidden group">
                      <div className="absolute -right-4 -bottom-4 w-40 h-40 bg-neutral-900/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                      <div className="relative z-10">
                        <Star className="text-amber-400 mb-6" size={32} fill="currentColor" />
                        <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-4 leading-tight">Scale to Enterprise</h3>
                        <p className="text-neutral-300/70 text-sm font-medium mb-10 leading-relaxed">Unlock advanced AI automation and priority node deployment for your growing business.</p>
                        <button className="w-full py-4 bg-neutral-900 text-neutral-200 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-neutral-950 transition-all shadow-lg">
                          Upgrade Plans
                        </button>
                      </div>
                    </div>

                    <div className="bg-neutral-900 p-8 rounded-[2.5rem] border border-neutral-800 shadow-sm">
                      <div className="flex items-center justify-between mb-8">
                        <h4 className="text-[11px] font-black text-neutral-400 uppercase tracking-widest">Marketplace High-Demand</h4>
                        <TrendingUp size={18} className="text-emerald-500" />
                      </div>
                      <div className="space-y-4">
                        {SERVICES.slice(0, 3).map((s) => (
                          <div key={s.id} className="p-4 rounded-2xl bg-neutral-950 border border-neutral-700 hover:border-amber-400/20 hover:bg-neutral-900 hover:shadow-sm flex items-center justify-between group cursor-pointer transition-all" onClick={() => navigate(`/services/${s.id}`)}>
                            <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-neutral-900 text-amber-400 border border-neutral-700 group-hover:scale-110 transition-transform shadow-sm`}>
                                <Box size={18} />
                              </div>
                              <span className="font-bold text-[10px] uppercase tracking-widest text-neutral-400 group-hover:text-neutral-200 transition-colors">{s.title}</span>
                            </div>
                            <ChevronRight size={14} className="text-neutral-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'marketplace' && (
              <motion.div 
                key="marketplace"
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
              >
                {selectedService ? (
                  <div className="space-y-12">
                    <button 
                      onClick={() => setSelectedService(null)}
                      className="flex items-center gap-3 text-neutral-500 hover:text-amber-400 transition-all font-black text-[11px] uppercase tracking-[0.2em] group"
                    >
                      <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Return to Catalog
                    </button>
                    
                    <div className="grid lg:grid-cols-12 gap-10">
                      <div className="lg:col-span-8 space-y-10">
                        <div className="bg-neutral-900 p-12 rounded-[3.5rem] border border-neutral-800 shadow-sm relative overflow-hidden group">
                          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 group-hover:bg-amber-400/10 transition-all duration-1000" />
                          <div className="relative z-10">
                            <div className="flex items-center justify-between mb-10">
                              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-neutral-700 text-neutral-100 rounded-[2rem] flex items-center justify-center shadow-lg shadow-amber-400/20">
                                <Box size={40} />
                              </div>
                              <div className="flex gap-2 bg-neutral-950 p-1.5 rounded-2xl border border-neutral-700">
                                <button
                                  onClick={() => setCurrency('USD')}
                                  className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest ${
                                    currency === 'USD' ? 'bg-neutral-900 text-amber-400 shadow-sm' : 'text-neutral-400 hover:text-neutral-400'
                                  }`}
                                >
                                  USD
                                </button>
                                <button
                                  onClick={() => setCurrency('KES')}
                                  className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest ${
                                    currency === 'KES' ? 'bg-neutral-900 text-amber-400 shadow-sm' : 'text-neutral-400 hover:text-neutral-400'
                                  }`}
                                >
                                  KES
                                </button>
                              </div>
                            </div>
                            <h2 className="text-5xl font-black text-neutral-200 uppercase italic tracking-tighter mb-6 leading-none">{selectedService.title}</h2>
                            <p className="text-neutral-500 text-xl font-medium leading-relaxed mb-10 max-w-2xl">{selectedService.description}</p>
                            
                            <div className="grid sm:grid-cols-2 gap-4">
                              {selectedService.features?.slice(0, 4).map((f, i) => (
                                <div key={i} className="flex items-center gap-4 p-5 bg-neutral-950 rounded-2xl border border-neutral-700 hover:border-amber-400/20 transition-colors">
                                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                    <Shield size={16} className="text-emerald-500" />
                                  </div>
                                  <span className="text-[11px] font-black uppercase tracking-widest text-neutral-400">{f}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                          {(PRICING_DATA[selectedService.id] || []).map((plan, i) => (
                            <div key={i} className="bg-neutral-900 p-10 rounded-[3rem] border border-neutral-800 shadow-sm flex flex-col hover:border-amber-400/50 hover:shadow-md transition-all duration-500 group relative overflow-hidden">
                              <div className="absolute top-0 right-0 w-32 h-32 bg-neutral-950 rounded-full blur-3xl group-hover:bg-amber-400/5 transition-all" />
                              <h4 className="text-2xl font-black text-neutral-200 uppercase italic tracking-tighter mb-2">{plan.name}</h4>
                              <div className="flex flex-col mb-8">
                                <div className="text-4xl font-black text-amber-400 tracking-tighter">{formatPrice(plan.price)}</div>
                                <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-1">
                                  Or {getMonthlyPrice(plan.price)} for 12 months
                                </div>
                              </div>
                              <ul className="space-y-4 mb-12 flex-1 relative z-10">
                                {plan.features.slice(0, 5).map((feat, j) => (
                                  <li key={j} className="flex items-center gap-4 text-[11px] font-bold text-neutral-500 uppercase tracking-widest group-hover:text-neutral-300 transition-colors">
                                    <Zap className="w-4 h-4 text-amber-400/50" /> {feat}
                                  </li>
                                ))}
                              </ul>
                              <button 
                                onClick={() => handlePurchase(plan)}
                                className="w-full py-5 bg-neutral-800 text-neutral-100 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-amber-400 transition-all disabled:opacity-50 shadow-lg shadow-slate-900/10"
                                disabled={refreshing}
                              >
                                {refreshing ? 'Provisioning...' : 'Deploy Infrastructure'}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="lg:col-span-4 space-y-8">
                        <div className="bg-gradient-to-br from-neutral-950 via-neutral-800 to-neutral-950 p-10 rounded-[3rem] border border-neutral-700 text-neutral-100 shadow-2xl relative overflow-hidden group">
                          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-amber-400/20 transition-all duration-1000" />
                          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-400/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
                          
                          <div className="relative z-10">
                            <div className="w-20 h-20 bg-neutral-900/5 backdrop-blur-2xl rounded-2xl flex items-center justify-center mb-10 border border-neutral-200/10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-2xl">
                              <Briefcase className="text-amber-400 w-10 h-10 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                            </div>
                            <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-6 leading-tight">
                              Services <br/>
                              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-neutral-400">Solutions.</span>
                            </h3>
                            <p className="text-neutral-400 text-sm font-medium leading-relaxed mb-12 max-w-xs">
                              Need a specialized business solution? Spas, rentals, hotel bookings - our architects design your specific service infrastructure from the ground up.
                            </p>
                            
                            <div className="space-y-4 mb-12">
                              {['Hospitality & Spa Systems', 'High-End Rental Engines', 'Global Booking Networks'].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-amber-400/70">
                                  <Shield size={12} className="text-amber-400" />
                                  {item}
                                </div>
                              ))}
                            </div>

                            <button 
                              onClick={() => setActiveTab('marketplace')}
                              className="w-full py-6 bg-amber-500 text-neutral-950 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-amber-400 transition-all shadow-lg shadow-amber-400/20 flex items-center justify-center gap-4 group/btn overflow-hidden relative"
                            >
                              <span className="relative z-10 flex items-center gap-3">
                                Explore Solutions
                                <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                              </span>
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-shimmer" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="bg-neutral-900 p-10 rounded-[3rem] border border-neutral-800 shadow-sm">
                          <h4 className="text-[11px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-8">Infrastructure Specs</h4>
                          <div className="space-y-4">
                            {[
                              { label: 'Deployment', value: 'Instant' },
                              { label: 'Uptime', value: '99.99%' },
                              { label: 'Security', value: 'Enterprise' },
                              { label: 'Scaling', value: 'Automatic' }
                            ].map(spec => (
                              <div key={spec.label} className="flex items-center justify-between py-3 border-b border-neutral-700">
                                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{spec.label}</span>
                                <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">{spec.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-16">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
                      <div className="space-y-3">
                        <h1 className="text-5xl font-black text-neutral-200 uppercase italic tracking-tighter leading-none">Marketplace<span className="text-amber-400">.</span></h1>
                        <p className="text-neutral-500 text-lg font-medium">Provision world-class digital infrastructure in seconds.</p>
                      </div>
                      <div className="relative group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-amber-400 transition-colors" size={20} />
                        <input 
                          type="text" 
                          placeholder="Search infrastructure..." 
                          className="pl-14 pr-8 py-5 bg-neutral-900 border border-neutral-800 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-amber-400/5 focus:border-amber-400/30 w-full md:w-96 font-bold text-xs uppercase tracking-widest transition-all text-neutral-200 placeholder:text-neutral-500 shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
                      {SERVICES.map((service, i) => (
                        <motion.div
                          key={service.id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          onClick={() => navigate(`/services/${service.id}`)}
                          className="group bg-neutral-900 rounded-[3.5rem] border border-neutral-800 p-10 shadow-sm hover:border-amber-400/30 hover:shadow-md transition-all duration-700 cursor-pointer relative overflow-hidden"
                        >
                          <div className="absolute top-0 right-0 p-10 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 duration-500">
                            <ChevronRight size={24} className="text-amber-400" />
                          </div>
                          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-neutral-700 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                          
                          <div className={`w-16 h-16 rounded-2xl mb-10 flex items-center justify-center transition-all duration-700 group-hover:scale-110 group-hover:rotate-3 bg-neutral-950 text-amber-400 border border-neutral-700 group-hover:bg-amber-400 group-hover:text-neutral-100 group-hover:border-transparent group-hover:shadow-lg group-hover:shadow-amber-400/20 shadow-sm`}>
                            <Box size={32} />
                          </div>
                          <h3 className="text-2xl font-black text-neutral-200 uppercase italic tracking-tighter mb-5">{service.title}</h3>
                          <p className="text-neutral-500 text-sm font-medium leading-relaxed mb-10 line-clamp-2 group-hover:text-neutral-400 transition-colors">{service.description}</p>
                          
                          <div className="pt-8 border-t border-neutral-700 flex items-center justify-between">
                            <div className="text-[11px] font-black text-amber-400 uppercase tracking-[0.25em] group-hover:tracking-[0.3em] transition-all">Provision Now</div>
                            <div className="flex -space-x-3 group-hover:-space-x-1 transition-all duration-500">
                              {[1, 2, 3].map(j => (
                                <div key={j} className="w-7 h-7 rounded-full border-2 border-neutral-200 bg-neutral-800 flex items-center justify-center text-[8px] font-black text-neutral-400">PB</div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'projects' && (
              <motion.div 
                key="projects"
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                <div className="flex flex-col sm:flex-row gap-8 items-center justify-between">
                  <div className="space-y-2">
                    <h2 className="text-4xl font-black text-neutral-200 uppercase italic tracking-tighter leading-none">Global Infrastructure<span className="text-amber-400">.</span></h2>
                    <p className="text-neutral-500 font-medium">Manage and monitor your deployed nodes across the Iyonic network.</p>
                  </div>
                  <div className="flex gap-4 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-80 group">
                      <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-amber-400 transition-colors" size={18} />
                      <input 
                        type="text" 
                        placeholder="Filter nodes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-14 pr-6 py-4 bg-neutral-900 border border-neutral-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-400/5 focus:border-amber-400/30 font-bold text-xs uppercase tracking-widest transition-all text-neutral-200 shadow-sm"
                      />
                    </div>
                    <motion.button 
                      onClick={() => setActiveTab('marketplace')} 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-amber-500 text-neutral-950 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-amber-400/20 hover:bg-amber-400 transition-all"
                    >
                      Provision
                    </motion.button>
                  </div>
                </div>

                {loading ? (
                  <div className="py-32 flex flex-col items-center gap-6">
                    <RefreshCw className="text-amber-400 animate-spin" size={48} />
                    <span className="text-[11px] font-black uppercase tracking-[0.3em] text-neutral-400">Scanning Network...</span>
                  </div>
                ) : filteredProjects.length === 0 ? (
                  <div className="py-32 bg-neutral-900 rounded-[4rem] border border-dashed border-neutral-800 flex flex-col items-center text-center px-10 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-amber-400/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Layout size={80} className="text-neutral-700 mb-8 group-hover:scale-110 transition-transform duration-700" />
                    <h3 className="text-3xl font-black text-neutral-200 mb-4 uppercase italic tracking-tighter">No active nodes found.</h3>
                    <p className="text-neutral-500 max-w-sm mb-12 font-medium text-lg leading-relaxed">Start building your next enterprise node using our high-end architecture templates.</p>
                    <button onClick={() => setActiveTab('marketplace')} className="px-12 py-5 bg-neutral-800 text-neutral-100 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-amber-400 transition-all shadow-lg relative z-10">Provision First Node</button>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-10">
                    {filteredProjects.map((project, i) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="group bg-neutral-900 rounded-[3.5rem] border border-neutral-800 overflow-hidden shadow-sm hover:shadow-md hover:border-amber-400/30 transition-all duration-700 relative"
                      >
                        <div className="h-56 bg-neutral-800 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-purple-600/10 group-hover:scale-110 transition-transform duration-1000" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            {project.image || project.thumbnail ? (
                              <img 
                                src={project.image ? `${BASE_URL}/api/files/projects/${project.id}/${project.image}` : project.thumbnail} 
                                alt="" 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Globe size={64} className="text-neutral-100 opacity-40 group-hover:scale-110 group-hover:opacity-60 transition-all duration-1000" />
                            )}
                          </div>
                          <div className="absolute top-8 left-8">
                            <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg backdrop-blur-md border border-neutral-300/20 ${
                              project.status === 'live' || project.status === 'published' ? 'bg-emerald-500 text-neutral-100' : 
                              project.status === 'requested_customization' ? 'bg-amber-500 text-neutral-950' :
                              project.status === 'in_development' ? 'bg-amber-500 text-neutral-950' :
                              project.status === 'pending_payment' ? 'bg-amber-500 text-neutral-950' :
                              'bg-neutral-600 text-neutral-100'
                            }`}>
                              {project.status?.replace('_', ' ') || 'Draft Node'}
                            </span>
                          </div>
                        </div>

                        <div className="p-10">
                          {editingProject?.id === project.id ? (
                            <div className="space-y-6 mb-8">
                              <div>
                                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-2 mb-2 block">Node Title</label>
                                <input 
                                  type="text"
                                  value={editFormData.title}
                                  onChange={(e) => setEditFormData({...editFormData, title: e.target.value})}
                                  className="w-full px-6 py-4 bg-neutral-950 border border-neutral-700 rounded-2xl font-bold text-sm text-neutral-200 focus:border-amber-400 outline-none"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-2 mb-2 block text-center">Engine Control Locked</label>
                                <div className="px-6 py-4 bg-neutral-800/50 border border-neutral-800 rounded-2xl font-bold text-xs text-neutral-400 uppercase tracking-widest text-center italic">
                                  {editFormData.domain || 'No Domain Assigned'}
                                </div>
                                <p className="text-[8px] font-bold text-neutral-400 text-center mt-2 uppercase tracking-tight">Contact Administrator to Modify Domain Protocols</p>
                              </div>
                              <div className="flex gap-4">
                                <button onClick={handleUpdateProject} className="flex-1 py-4 bg-amber-500 text-neutral-950 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-amber-400 transition-all shadow-lg shadow-amber-400/10">Save Settings</button>
                                <button onClick={() => setEditingProject(null)} className="px-6 py-4 bg-neutral-800 text-neutral-500 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-neutral-700 transition-all">Cancel</button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <h3 className="text-2xl font-black text-neutral-200 mb-3 truncate uppercase tracking-tighter italic">{project.title || project.name || 'Untitled Node'}</h3>
                              <div className="flex items-center gap-3 mb-10">
                                <div className="w-2 h-2 rounded-full bg-amber-400" />
                                <p className="text-neutral-400 text-[10px] font-black uppercase tracking-widest">Engine: {project.template || 'Enterprise Core'}</p>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-6 mb-6">
                                <div className="p-5 bg-neutral-950 rounded-3xl border border-neutral-700 group-hover:bg-neutral-900 group-hover:shadow-sm transition-all cursor-pointer" onClick={() => { setEditingProject(project); setEditFormData({ title: project.title || project.name || '', domain: project.domain || '' }); }}>
                                  <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-2 flex items-center gap-2"><Settings size={10}/> Configuration</div>
                                  <div className="text-sm font-black text-neutral-200 truncate uppercase tracking-tighter italic">{project.title || project.name || 'Untitled'}</div>
                                  <div className="text-[9px] font-bold text-amber-400 mt-1 uppercase tracking-widest truncate">{project.domain || 'Set Domain'}</div>
                                </div>
                                <div className="p-5 bg-neutral-950 rounded-3xl border border-neutral-700 group-hover:bg-neutral-900 group-hover:shadow-sm transition-all">
                                  <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-2 flex items-center gap-2"><Globe size={10}/> Metrics</div>
                                  <div className="text-sm font-black text-neutral-200 italic tracking-tighter">{project.views || 0} Reach</div>
                                  <div className="text-[9px] font-bold text-emerald-500 mt-1 uppercase tracking-widest">Live Status</div>
                                </div>
                              </div>

                              {(project.progress_status || project.latest_update) && (
                                <div className="p-6 bg-neutral-800 rounded-[2rem] text-neutral-100 mb-6 relative overflow-hidden group/intel">
                                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-3xl group-hover/intel:bg-amber-400/20 transition-all duration-700" />
                                  <div className="relative z-10 space-y-4">
                                    {project.progress_status && (
                                      <div>
                                        <div className="flex justify-between items-center mb-2">
                                          <span className="text-[9px] font-black text-amber-400 uppercase tracking-widest">Node Progress</span>
                                          <span className="text-[10px] font-black italic">{project.progress_status}</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-neutral-900/10 rounded-full overflow-hidden">
                                          <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: project.progress_status.includes('%') ? project.progress_status : '100%' }}
                                            className="h-full bg-gradient-to-r from-amber-400 to-neutral-600"
                                          />
                                        </div>
                                      </div>
                                    )}
                                    {project.latest_update && (
                                      <div>
                                        <span className="text-[9px] font-black text-neutral-500 uppercase tracking-widest block mb-1">Latest System Patch</span>
                                        <p className="text-[10px] font-bold text-neutral-500 leading-relaxed italic">"{project.latest_update}"</p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}

                              {project.recommended_modules?.length > 0 && (
                                <div className="mb-8 p-5 bg-amber-50 rounded-3xl border border-amber-100">
                                  <div className="text-[9px] font-black text-amber-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <Zap size={12} fill="currentColor" /> Recommended Upgrades
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    {project.recommended_modules.map((mod, i) => (
                                      <span key={i} className="px-3 py-1 bg-neutral-900 border border-amber-200 rounded-xl text-[8px] font-black text-amber-700 uppercase tracking-widest">
                                        {mod}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              <div className="flex gap-4">
                                {project.domain && (
                                  <a 
                                    href={`https://${project.domain}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 py-5 bg-neutral-800 text-neutral-100 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-amber-400 transition-all flex items-center justify-center gap-3 shadow-lg shadow-slate-900/10"
                                  >
                                    <Globe size={18} /> Visit Business
                                  </a>
                                )}
                                {!project.domain && (
                                  <button 
                                    onClick={handleRequestUpdate}
                                    disabled={refreshing}
                                    className="flex-1 py-5 bg-neutral-800 text-neutral-100 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-amber-400 transition-all flex items-center justify-center gap-3 shadow-lg shadow-slate-900/10 disabled:opacity-50"
                                  >
                                    <Sparkles size={18} /> {refreshing ? 'Updating...' : 'Request Update'}
                                  </button>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'membership' && (
              <motion.div 
                key="membership"
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-16"
              >
                {/* Subscription Status & Countdown */}
                {currentUser?.subscription_status === 'active' && (
                  <div className="bg-gradient-to-br from-amber-500 to-neutral-800 p-10 rounded-[3rem] text-neutral-100 shadow-xl shadow-amber-400/20 relative overflow-hidden group">
                    <div className="absolute -right-4 -bottom-4 w-64 h-64 bg-neutral-900/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000" />
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 bg-neutral-900/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-neutral-300/20">Active Subscription</span>
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        </div>
                        <h3 className="text-4xl font-black uppercase italic tracking-tighter leading-none">
                          Next Billing Cycle <br/>
                          <span className="text-neutral-400">Countdown.</span>
                        </h3>
                        <p className="text-neutral-300/70 font-medium text-lg">Your next enterprise maintenance fee is scheduled.</p>
                      </div>
                      
                      <div className="bg-neutral-900/10 backdrop-blur-xl p-8 rounded-[2.5rem] border border-neutral-300/20 text-center min-w-[240px]">
                        <div className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-neutral-400">Remaining Duration</div>
                        <div className="text-4xl font-black italic tracking-tighter mb-2">{getTimeUntilBilling() || 'Calculating...'}</div>
                        <div className="text-[10px] font-bold text-neutral-400/50 uppercase tracking-widest">
                          Ends: {currentUser?.next_billing_date ? new Date(currentUser.next_billing_date).toLocaleDateString() : 'N/A'}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Membership Management Section */}
                <div className="space-y-10">
                  <div className="space-y-2">
                    <h2 className="text-4xl font-black text-neutral-200 uppercase italic tracking-tighter leading-none">Membership Management<span className="text-amber-400">.</span></h2>
                    <p className="text-neutral-500 font-medium text-lg">Select a membership tier to unlock exclusive enterprise tools and priority infrastructure.</p>
                  </div>

                  <div className="grid lg:grid-cols-3 gap-8">
                    {Object.values(MEMBERSHIP_TIERS).map((tier) => {
                      const isCurrent = currentUser?.membership_tier === tier.id
                      const isHigher = !isCurrent && checkAccess(tier.id, currentUser?.membership_tier || 'basic')
                      const isLower = !isCurrent && !isHigher

                      return (
                        <div 
                          key={tier.id}
                          id={tier.id === 'partner' ? 'tier-partner' : undefined}
                          className={`p-10 rounded-[3.5rem] border transition-all duration-500 relative overflow-hidden flex flex-col ${
                            isCurrent 
                              ? 'bg-gradient-to-br from-neutral-800 to-neutral-800 border-neutral-600 text-neutral-100 shadow-2xl scale-105 z-10' 
                              : 'bg-neutral-900 border-neutral-800 text-neutral-200 shadow-sm hover:shadow-md'
                          }`}
                        >
                          {isCurrent && (
                            <div className="absolute top-8 right-8 flex items-center gap-2">
                              <span className="text-[8px] font-black uppercase tracking-widest text-amber-400 bg-amber-400/10 px-2 py-1 rounded-full border border-amber-400/20">Subscribed</span>
                              <CheckCircle2 className="text-amber-400" size={20} />
                            </div>
                          )}
                          
                          <div className="mb-8">
                            <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] mb-4 flex items-center gap-2 ${isCurrent ? 'text-amber-400' : 'text-neutral-400'}`}>
                              {isCurrent && <CheckCircle2 size={12} className="animate-pulse" />}
                              {tier.name} Tier
                            </h3>
                            <div className="flex items-end gap-2">
                              <span className="text-5xl font-black italic tracking-tighter">${tier.price}</span>
                              <span className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${isCurrent ? 'text-neutral-400' : 'text-neutral-500'}`}>/ Month</span>
                            </div>
                            
                            {isHigher && currentUser?.membership_tier && (
                              <div className="mt-4 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                                <div className="text-[8px] font-black text-emerald-600 uppercase tracking-widest mb-1">Upgrade Calculation</div>
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] font-bold text-neutral-500">New Tier Price:</span>
                                  <span className="text-[10px] font-black text-neutral-200">${tier.price}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] font-bold text-neutral-500">Current Tier Credit:</span>
                                  <span className="text-[10px] font-black text-neutral-200">-${MEMBERSHIP_TIERS[currentUser.membership_tier.toUpperCase()]?.price || 0}</span>
                                </div>
                                <div className="h-px bg-emerald-200 my-2" />
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] font-black text-emerald-600 uppercase">Amount Due:</span>
                                  <span className="text-sm font-black text-emerald-600">${(tier.price - (MEMBERSHIP_TIERS[currentUser.membership_tier.toUpperCase()]?.price || 0)).toFixed(2)}</span>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="space-y-4 mb-12 flex-1">
                            {tier.features.map((feature, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <div className={`mt-1 flex-shrink-0 ${isCurrent ? 'text-amber-400' : 'text-amber-400'}`}>
                                  <Zap size={12} fill="currentColor" />
                                </div>
                                <span className={`text-xs font-bold leading-relaxed ${isCurrent ? 'text-neutral-500' : 'text-neutral-400'}`}>{feature}</span>
                              </div>
                            ))}
                          </div>

                          {isCurrent ? (
                            <button disabled className="w-full py-5 bg-amber-400/20 border border-amber-400/30 text-amber-400 rounded-2xl font-black text-xs uppercase tracking-widest cursor-default flex items-center justify-center gap-2">
                              <CheckCircle2 size={14} /> Subscribed
                            </button>
                          ) : tier.id === 'partner' ? (
                            <button 
                              onClick={() => setPartnershipModalOpen(true)}
                              className="w-full py-5 bg-amber-500 text-neutral-950 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-amber-300 transition-all shadow-lg flex items-center justify-center gap-2"
                            >
                              <HeartHandshake size={16} /> Partner Now
                            </button>
                          ) : (
                            <PaystackButton
                              className="w-full py-5 bg-neutral-800 text-neutral-100 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-amber-400 transition-all shadow-lg"
                              email={currentUser.email}
                              amount={Math.round((isHigher && currentUser?.membership_tier ? (tier.price - MEMBERSHIP_TIERS[currentUser.membership_tier.toUpperCase()].price) : tier.price) * 100)} // Price in cents
                              currency="USD"
                              publicKey={import.meta.env.VITE_PAYSTACK_PUBLIC_KEY}
                              text={isHigher ? "Upgrade Now" : "Subscribe Now"}
                              onSuccess={(reference) => handleMembershipUpgrade(tier.id, reference.reference)}
                              onClose={() => {}}
                            />
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'orders' && (
              <motion.div 
                key="orders"
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-16"
              >
                <div className="space-y-10">
                  <div className="flex items-center justify-between gap-8">
                    <div className="space-y-2">
                      <h2 className="text-4xl font-black text-neutral-200 uppercase italic tracking-tighter leading-none">Financial Ledger<span className="text-amber-400">.</span></h2>
                      <p className="text-neutral-500 font-medium text-lg">Detailed history of your infrastructure investments.</p>
                    </div>
                    <button className="flex items-center gap-3 px-8 py-4 bg-neutral-900 border border-neutral-800 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-neutral-950 hover:text-amber-400 transition-all shadow-sm group">
                      <CreditCard size={18} className="text-amber-400 group-hover:scale-110 transition-transform" /> Manage Methods
                    </button>
                  </div>

                  {orders.length === 0 ? (
                  <div className="py-32 bg-neutral-900 rounded-[4rem] border border-neutral-800 flex flex-col items-center text-center px-10 relative overflow-hidden shadow-sm">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-500/5 to-transparent" />
                    <CreditCard size={80} className="text-neutral-700 mb-8" />
                    <h3 className="text-3xl font-black text-neutral-200 mb-4 uppercase italic tracking-tighter">No financial activity detected.</h3>
                    <p className="text-neutral-500 max-w-sm font-medium text-lg leading-relaxed">Your purchase history and active subscriptions will appear here once you deploy infrastructure.</p>
                  </div>
                ) : (
                  <div className="bg-neutral-900 rounded-[3rem] border border-neutral-800 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left min-w-[800px]">
                        <thead>
                          <tr className="border-b border-neutral-700 bg-neutral-800/50">
                            <th className="px-10 py-6 text-[11px] font-black text-neutral-400 uppercase tracking-[0.2em]">Transaction ID</th>
                            <th className="px-10 py-6 text-[11px] font-black text-neutral-400 uppercase tracking-[0.2em]">Infrastructure Node</th>
                            <th className="px-10 py-6 text-[11px] font-black text-neutral-400 uppercase tracking-[0.2em]">Investment</th>
                            <th className="px-10 py-6 text-[11px] font-black text-neutral-400 uppercase tracking-[0.2em]">Node Status</th>
                            <th className="px-10 py-6 text-[11px] font-black text-neutral-400 uppercase tracking-[0.2em]">Evidence</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-700">
                          {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-neutral-800/50 transition-colors group">
                              <td className="px-10 py-8 font-black text-xs uppercase tracking-widest text-neutral-400 group-hover:text-amber-400 transition-colors">#{order.order_number || String(order.id).slice(0, 8)}</td>
                              <td className="px-10 py-8">
                                <div className="font-black text-sm uppercase tracking-tighter italic text-neutral-200 group-hover:translate-x-1 transition-transform">{order.service_name || 'Enterprise Service'}</div>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-[9px] font-black px-2 py-0.5 bg-neutral-800 text-neutral-500 rounded uppercase tracking-widest">{order.plan_name}</span>
                                  {order.service_id && <span className="text-[8px] font-bold text-amber-400 uppercase tracking-widest">ID: {order.service_id}</span>}
                                </div>
                              </td>
                              <td className="px-10 py-8">
                                <div className="text-lg font-black text-neutral-200 tracking-tighter">
                                  {order.plan_name?.includes('Rent to Own') 
                                    ? formatPrice(order.full_price || order.amount * 12) 
                                    : formatPrice(order.amount || 0)}
                                </div>
                                <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-0.5">
                                  {order.plan_name?.includes('Rent to Own') 
                                    ? `${formatPrice(order.amount)}/mo x 12 Months` 
                                    : 'One-time payment'}
                                </div>
                              </td>
                              <td className="px-10 py-8">
                                <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-sm ${
                                  order.status === 'paid' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                                }`}>
                                  {order.status || 'Provisioning'}
                                </span>
                              </td>
                              <td className="px-10 py-8">
                                {order.status === 'paid' ? (
                                  <button className="p-3 bg-neutral-950 text-neutral-400 hover:text-neutral-100 hover:bg-amber-400 rounded-xl transition-all flex items-center gap-3 font-black text-[10px] uppercase tracking-widest shadow-sm">
                                    <ExternalLink size={16} /> Receipt
                                  </button>
                                ) : (
                                  <PaystackButton
                                    className="px-6 py-3 bg-amber-500 text-neutral-950 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-amber-400 transition-all shadow-lg shadow-amber-400/10"
                                    email={currentUser.email}
                                    amount={order.amount * 100} // Paystack amount is in cents
                                    currency="USD"
                                    publicKey={import.meta.env.VITE_PAYSTACK_PUBLIC_KEY}
                                    text="Pay Now"
                                    onSuccess={(reference) => handlePaymentSuccess(order.id, reference.reference)}
                                    onClose={() => {}}
                                  />
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

            {activeTab === 'tools' && (
              <motion.div 
                key="tools"
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                  <div className="space-y-2">
                    <h2 className="text-4xl font-black text-neutral-200 uppercase italic tracking-tighter leading-none">Modules<span className="text-amber-400">.</span></h2>
                    <p className="text-neutral-500 font-medium text-lg">Modular components that power your services and business operations.</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3 px-6 py-3 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-sm">
                        <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Active Tier:</div>
                        <button 
                          onClick={() => setActiveTab('membership')}
                          className="px-3 py-1 bg-neutral-800/30 text-amber-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-neutral-600 hover:bg-neutral-800/50 transition-colors"
                        >
                          {currentUser?.membership_tier && currentUser?.subscription_status === 'active' 
                            ? MEMBERSHIP_TIERS[currentUser?.membership_tier?.toUpperCase()]?.name 
                            : 'Activate Membership'}
                        </button>
                      </div>
                      <div className="flex items-center gap-3 px-6 py-3 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-sm">
                        <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Active Modules:</div>
                        <span className="px-3 py-1 bg-neutral-950 text-neutral-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-neutral-700">
                          {activatedTools.length} / {MEMBERSHIP_TIERS[currentUser?.membership_tier?.toUpperCase() || 'BASIC']?.maxModules || 4}
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={handleRequestUpdate}
                      disabled={refreshing || !currentUser?.membership_tier}
                      className="px-10 py-6 bg-neutral-800 text-neutral-100 rounded-3xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-amber-400 transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3 disabled:opacity-50 h-fit self-end"
                    >
                      <Sparkles size={16} />
                      {refreshing ? 'Updating...' : 'Request Update'}
                    </button>
                  </div>
                </div>

                {/* Filter Bar */}
                <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide pb-6 pt-2 px-2 -mx-2">
                  <button
                    onClick={() => setSelectedModuleCategory('all')}
                    className={`whitespace-nowrap px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border shrink-0 ${
                      selectedModuleCategory === 'all' 
                        ? 'bg-neutral-800 text-neutral-100 border-transparent shadow-xl shadow-slate-900/10' 
                        : 'bg-neutral-900 text-neutral-500 border-neutral-800 hover:border-amber-400/30 hover:text-amber-400'
                    }`}
                  >
                    All Modules
                  </button>
                  {SERVICES.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setSelectedModuleCategory(service.id)}
                      className={`whitespace-nowrap px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border flex items-center gap-3 shrink-0 ${
                        selectedModuleCategory === service.id 
                          ? 'bg-neutral-800 text-neutral-100 border-transparent shadow-xl shadow-slate-900/10' 
                          : 'bg-neutral-900 text-neutral-500 border-neutral-800 hover:border-amber-400/30 hover:text-amber-400'
                      }`}
                    >
                      <service.icon size={14} />
                      {service.title}
                    </button>
                  ))}
                </div>

                <div className="space-y-20">
                  {SERVICES.filter(s => selectedModuleCategory === 'all' || s.id === selectedModuleCategory).map((service) => {
                    const serviceModules = MODULES.filter(m => m.serviceId === service.id || service.moduleIds.includes(m.id))
                    if (serviceModules.length === 0) return null

                    return (
                      <div key={service.id} className="space-y-8">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-2xl ${service.color} text-neutral-100 flex items-center justify-center shadow-lg shadow-amber-400/10`}>
                            <service.icon size={24} />
                          </div>
                          <div>
                            <h3 className="text-2xl font-black text-neutral-200 uppercase italic tracking-tighter">{service.title} <span className="text-amber-400">Modules.</span></h3>
                            <p className="text-neutral-400 text-[10px] font-black uppercase tracking-widest mt-1">Specialized components for {service.title.toLowerCase()} ecosystem</p>
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {serviceModules.map((tool, i) => {
                            const hasTierAccess = checkAccess(currentUser?.membership_tier || 'basic', tool.minTier)
                            const isUnlocked = unlockedTools.includes(tool.id)
                            const isActivated = activatedTools.includes(tool.id)
                            const canActivate = hasTierAccess || isUnlocked
                            
                            const maxModules = MEMBERSHIP_TIERS[currentUser?.membership_tier?.toUpperCase() || 'BASIC']?.maxModules || 4
                            const atLimit = activatedTools.length >= maxModules && !isActivated

                            const Icon = {
                              Users, FileText, BarChart3, Box, Sparkles, Zap,
                              Shield, Wallet, Lock, TrendingUp, Briefcase, Globe, Cpu,
                              ShieldCheck, Database, Mail, RefreshCw, Repeat, Eye, Coins
                            }[tool.icon] || Box

                            return (
                              <motion.div 
                                key={`${service.id}-${tool.id}`} 
                                whileHover={canActivate ? { translateY: -4 } : {}}
                                className={`group p-8 bg-neutral-900 rounded-[2.5rem] border border-neutral-800 shadow-sm transition-all duration-300 relative overflow-hidden ${
                                  !canActivate ? 'bg-neutral-800/50' : 'cursor-pointer hover:shadow-lg hover:border-amber-400/30'
                                }`}
                              >
                                {!canActivate && (
                                  <div className="absolute top-6 right-6 z-20">
                                    <div className="px-3 py-1 bg-neutral-800 rounded-lg flex items-center justify-center text-[8px] font-black uppercase tracking-widest text-neutral-400 border border-neutral-800">
                                      {MEMBERSHIP_TIERS[tool.minTier.toUpperCase()]?.name || tool.minTier} Required
                                    </div>
                                  </div>
                                )}
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-500/5 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 ${
                                  canActivate ? 'bg-neutral-950 text-amber-400 group-hover:bg-amber-400 group-hover:text-neutral-100 group-hover:shadow-lg group-hover:shadow-amber-400/20' : 'bg-neutral-700 text-neutral-400'
                                }`}>
                                  <Icon size={28} />
                                </div>
                                
                                <div className="flex flex-wrap gap-2 mb-4">
                                  <span className={`px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border ${
                                    tool.minTier === 'basic' ? 'bg-neutral-950 text-neutral-400 border-neutral-700' :
                                    tool.minTier === 'premium' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                    'bg-neutral-800/30 text-amber-400 border-neutral-600'
                                  }`}>
                                    {MEMBERSHIP_TIERS[tool.minTier.toUpperCase()]?.name || tool.minTier}
                                  </span>
                                  {isUnlocked && !hasTierAccess && (
                                    <span className="px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100">
                                      Purchased
                                    </span>
                                  )}
                                  {isActivated && (
                                    <span className="px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest bg-neutral-800/30 text-amber-400 border border-neutral-700">
                                      Active
                                    </span>
                                  )}
                                </div>
                                
                                <h4 className="text-xl font-black uppercase italic tracking-tighter mb-4 text-neutral-200 leading-tight">{tool.name}</h4>
                                <p className="text-neutral-500 text-xs font-medium leading-relaxed mb-8 group-hover:text-neutral-400 transition-colors line-clamp-2">{tool.description}</p>
                                
                                {canActivate ? (
                                  <div className="space-y-4">
                                    <div className="flex flex-col gap-2">
                                      <button 
                                        onClick={() => {
                                          if (currentUser?.subscription_status !== 'active') {
                                            alert('You need an active membership to activate modules. Please subscribe in the Membership tab.')
                                            setActiveTab('membership')
                                            return
                                          }
                                          if (!atLimit || isActivated) {
                                            handleToolActivate(tool.id)
                                          } else {
                                            alert(`Upgrade your tier to activate more modules. Current limit: ${maxModules}`)
                                          }
                                        }}
                                        className={`w-full py-3.5 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all border ${
                                          isActivated ? 'bg-neutral-950 text-neutral-400 border-neutral-800' : 
                                          (atLimit || currentUser?.subscription_status !== 'active') ? 'bg-neutral-700 text-neutral-400 border-transparent cursor-not-allowed' :
                                          'bg-neutral-800 text-neutral-100 border-transparent hover:bg-amber-400 shadow-sm'
                                        }`}
                                      >
                                        {isActivated ? 'Deactivate' : 'Activate Module'}
                                      </button>
                                      {projects.length > 0 && isActivated && (
                                        <button className="w-full py-3 bg-neutral-900 border border-neutral-800 text-neutral-500 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-neutral-950 transition-all flex items-center justify-center gap-2">
                                          <ExternalLink size={12} /> Sync Node
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex flex-col gap-2">
                                    <button 
                                      onClick={() => setPurchasingTool(tool)}
                                      className="w-full py-3.5 bg-neutral-800 text-neutral-100 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-amber-400 transition-all"
                                    >
                                      Unlock - ${tool.prices.oneTime}
                                    </button>
                                    <button 
                                      onClick={() => setActiveTab('membership')}
                                      className="w-full py-3.5 bg-neutral-900 border border-neutral-800 text-neutral-500 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-neutral-950 transition-all"
                                    >
                                      Upgrade Tier
                                    </button>
                                  </div>
                                )}
                              </motion.div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>

                <AnimatePresence>
                  {purchasingTool && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setPurchasingTool(null)}
                        className="absolute inset-0 bg-neutral-800/60 backdrop-blur-md"
                      />
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-md bg-neutral-900 rounded-[3.5rem] p-12 shadow-2xl overflow-hidden border border-neutral-800"
                      >
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-500 to-neutral-700" />
                        
                        <div className="flex items-center justify-between mb-10">
                          <h3 className="text-3xl font-black uppercase italic tracking-tighter text-neutral-200 leading-none">Unlock<br/>{purchasingTool.name}</h3>
                          <button onClick={() => setPurchasingTool(null)} className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded-2xl text-neutral-500 transition-colors">
                            <X size={20} />
                          </button>
                        </div>
                        
                        <p className="text-neutral-500 font-medium mb-10 leading-relaxed text-sm">{purchasingTool.description}</p>
                        
                        <div className="space-y-6 mb-10">
                          <div className="p-8 rounded-[2.5rem] border-2 border-amber-400 bg-neutral-800/30/30 space-y-4 relative overflow-hidden text-center">
                            <div className="absolute top-4 right-6 px-3 py-1 bg-amber-500 text-neutral-950 text-[8px] font-black uppercase tracking-widest rounded-full">Lifetime Access</div>
                            <div className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Fixed Pricing</div>
                            <div className="text-5xl font-black italic tracking-tighter text-neutral-200">${purchasingTool?.prices?.oneTime}</div>
                            <PaystackButton
                              className="w-full py-5 bg-neutral-800 text-neutral-100 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-amber-400 transition-all shadow-lg mt-4"
                              email={currentUser.email}
                              amount={(purchasingTool?.prices?.oneTime || 0) * 100}
                              currency="USD"
                              publicKey={import.meta.env.VITE_PAYSTACK_PUBLIC_KEY}
                              text={`Purchase ${purchasingTool.name}`}
                              onSuccess={(reference) => handleToolPurchase(purchasingTool, 'oneTime', reference.reference)}
                              onClose={() => {}}
                            />
                          </div>
                        </div>
                        
                        <p className="text-[10px] text-neutral-400 font-bold uppercase text-center tracking-[0.1em]">Secure payment processed by Paystack Inc.</p>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div 
                key="settings"
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-5xl"
              >
                <div className="space-y-2 mb-16">
                  <h2 className="text-4xl font-black text-neutral-200 uppercase italic tracking-tighter leading-none">Control Center<span className="text-amber-400">.</span></h2>
                  <p className="text-neutral-500 font-medium text-lg">Configure your personal and security parameters.</p>
                </div>
                
                <div className="grid lg:grid-cols-12 gap-12">
                  <div className="lg:col-span-8 space-y-12">
                    <div className="bg-neutral-900 p-12 rounded-[3.5rem] border border-neutral-800 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/5 rounded-full blur-[100px]" />
                      <h3 className="text-[11px] font-black text-neutral-400 uppercase tracking-[0.25em] mb-12">Identity Profile</h3>
                      <div className="grid md:grid-cols-2 gap-10">
                        {[
                          { label: 'First Name', key: 'first_name' },
                          { label: 'Last Name', key: 'last_name' },
                          { label: 'Primary Email', key: 'email' },
                          { label: 'Contact Number', key: 'phone_number' }
                        ].map(field => (
                          <div key={field.label} className="space-y-3">
                            <label className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em] ml-2">{field.label}</label>
                            <input 
                              type="text"
                              value={profileFormData[field.key] || ''}
                              onChange={(e) => setProfileFormData({...profileFormData, [field.key]: e.target.value})}
                              className="w-full px-8 py-5 bg-neutral-950 border border-neutral-700 rounded-2xl font-bold text-sm text-neutral-200 focus:outline-none focus:border-amber-400 transition-colors shadow-sm"
                            />
                          </div>
                        ))}
                      </div>
                      <button 
                        onClick={handleUpdateProfile}
                        disabled={refreshing}
                        className="mt-12 px-10 py-5 bg-neutral-800 text-neutral-100 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-amber-400 transition-all shadow-lg disabled:opacity-50"
                      >
                        {refreshing ? 'Processing...' : 'Update Identity'}
                      </button>
                    </div>

                    <div className="bg-neutral-900 p-12 rounded-[3.5rem] border border-neutral-800 shadow-sm">
                      <h3 className="text-[11px] font-black text-neutral-400 uppercase tracking-[0.25em] mb-12">Defense Protocols</h3>
                      <div className="space-y-6">
                        {[
                          { title: 'Security Cipher', desc: 'Rotate your account authentication credentials.', icon: Shield, status: 'Active' },
                          { title: 'Multi-Factor Access', desc: 'Biometric and token-based protection layers.', icon: Zap, status: 'Inactive', alert: true },
                        ].map(protocol => (
                          <button key={protocol.title} className="w-full flex items-center justify-between p-8 bg-neutral-950 rounded-3xl border border-neutral-700 hover:border-amber-400/30 hover:bg-neutral-900 transition-all text-left group shadow-sm">
                            <div className="flex items-center gap-6">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-neutral-900 border border-neutral-800 ${protocol.alert ? 'text-amber-600' : 'text-amber-400'}`}>
                                <protocol.icon size={22} />
                              </div>
                              <div>
                                <div className="font-black text-sm uppercase tracking-tight italic text-neutral-200 mb-1">{protocol.title}</div>
                                <div className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest">{protocol.desc}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                protocol.alert ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                              }`}>
                                {protocol.status}
                              </span>
                              <ChevronRight size={20} className="text-neutral-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-4 space-y-12">
                    <div className="bg-rose-50 p-10 rounded-[3.5rem] border border-rose-100 shadow-sm relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-3xl group-hover:bg-rose-500/10 transition-all" />
                      <h3 className="text-2xl font-black text-neutral-200 uppercase italic tracking-tighter mb-6 relative z-10">Termination Hub</h3>
                      <p className="text-neutral-500 text-sm font-medium leading-relaxed mb-10 relative z-10">Permanently decommission your entire enterprise infrastructure and purge all data nodes.</p>
                      <button className="w-full py-5 bg-neutral-900 text-rose-600 border border-rose-200 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-rose-600 hover:text-neutral-100 transition-all shadow-sm">
                        Decommission Account
                      </button>
                    </div>

                    <div className="bg-neutral-900 p-10 rounded-[3.5rem] border border-neutral-800 shadow-sm text-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-neutral-700 rounded-[2rem] flex items-center justify-center text-neutral-100 font-black text-3xl italic mx-auto mb-8 shadow-xl shadow-amber-400/10">I</div>
                      <div className="text-[11px] font-black text-neutral-400 uppercase tracking-[0.3em] mb-2">Protocol Version</div>
                      <div className="text-xl font-black text-neutral-200 italic tracking-tighter">v4.0.2 Enterprise</div>
                      <div className="mt-8 pt-8 border-t border-neutral-700">
                        <p className="text-neutral-400 text-[10px] font-bold uppercase tracking-widest leading-relaxed">System protected by<br/>Iyonic Intelligence Core</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
      {/* Partnership Request Modal */}
      <AnimatePresence>
        {partnershipModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-neutral-800/60 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-neutral-900 rounded-[40px] shadow-2xl border border-neutral-700 p-8 md:p-12 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-amber-400 rounded-2xl flex items-center justify-center text-neutral-100 shadow-xl">
                    <HeartHandshake size={28} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-neutral-200 uppercase italic tracking-tighter leading-none">Alliance Application<span className="text-amber-400">.</span></h3>
                    <p className="text-neutral-500 font-bold text-[10px] uppercase tracking-widest mt-2">Exclusive Partner Membership</p>
                  </div>
                </div>
                <button 
                  onClick={() => setPartnershipModalOpen(false)}
                  className="p-3 hover:bg-neutral-950 rounded-2xl transition-all"
                >
                  <X size={20} className="text-neutral-400" />
                </button>
              </div>

              <form onSubmit={handlePartnershipSubmit} className="space-y-8">
                {/* Business Basic Info */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block ml-2">Business Legal Name</label>
                    <input
                      required
                      type="text"
                      className="w-full px-6 py-4 bg-neutral-950 border border-neutral-700 rounded-2xl text-sm font-bold placeholder-slate-300 focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition-all"
                      placeholder="e.g. Acme Digital Solutions"
                      value={partnershipFormData.businessName}
                      onChange={(e) => setPartnershipFormData({...partnershipFormData, businessName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block ml-2">Business Type</label>
                    <select
                      required
                      className="w-full px-6 py-4 bg-neutral-950 border border-neutral-700 rounded-2xl text-sm font-bold placeholder-slate-300 focus:outline-none focus:border-amber-400 transition-all appearance-none"
                      value={partnershipFormData.businessType || ''}
                      onChange={(e) => setPartnershipFormData({...partnershipFormData, businessType: e.target.value})}
                    >
                      <option value="">Select Type</option>
                      <option value="corporation">Corporation</option>
                      <option value="llc">LLC</option>
                      <option value="sole_proprietorship">Sole Proprietorship</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block ml-2">Business URL</label>
                  <input
                    type="url"
                    className="w-full px-6 py-4 bg-neutral-950 border border-neutral-700 rounded-2xl text-sm font-bold placeholder-slate-300 focus:outline-none focus:border-amber-400 transition-all"
                    placeholder="https://yourbusiness.com"
                    value={partnershipFormData.website}
                    onChange={(e) => setPartnershipFormData({...partnershipFormData, website: e.target.value})}
                  />
                </div>

                {/* Annual Revenue */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block ml-2">Annual Revenue (USD)</label>
                    <input
                      type="number"
                      className="w-full px-6 py-4 bg-neutral-950 border border-neutral-700 rounded-2xl text-sm font-bold placeholder-slate-300 focus:outline-none focus:border-amber-400 transition-all"
                      placeholder="e.g. 50000"
                      value={partnershipFormData.annualRevenue}
                      onChange={(e) => setPartnershipFormData({...partnershipFormData, annualRevenue: e.target.value})}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block ml-2">Currency</label>
                    <select
                      className="w-full px-6 py-4 bg-neutral-950 border border-neutral-700 rounded-2xl text-sm font-bold focus:outline-none focus:border-amber-400 transition-all appearance-none"
                      value={partnershipFormData.revenueCurrency || 'USD'}
                      onChange={(e) => setPartnershipFormData({...partnershipFormData, revenueCurrency: e.target.value})}
                    >
                      <option value="USD">USD - US Dollar</option>
                      <option value="KES">KES - Kenyan Shilling</option>
                    </select>
                  </div>
                </div>

                {/* Social Media */}
                <div className="p-6 bg-neutral-950 rounded-3xl border border-neutral-700">
                  <h4 className="text-[11px] font-black text-neutral-400 uppercase tracking-widest mb-6">Social Media Presence</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest ml-1">Facebook Page</label>
                      <input
                        type="url"
                        className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-xs font-bold placeholder-slate-300 focus:outline-none focus:border-amber-400 transition-all"
                        placeholder="https://facebook.com/yourbusiness"
                        value={partnershipFormData.socialMediaFacebook}
                        onChange={(e) => setPartnershipFormData({...partnershipFormData, socialMediaFacebook: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest ml-1">Twitter/X</label>
                      <input
                        type="url"
                        className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-xs font-bold placeholder-slate-300 focus:outline-none focus:border-amber-400 transition-all"
                        placeholder="https://twitter.com/yourbusiness"
                        value={partnershipFormData.socialMediaTwitter}
                        onChange={(e) => setPartnershipFormData({...partnershipFormData, socialMediaTwitter: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest ml-1">Instagram</label>
                      <input
                        type="url"
                        className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-xs font-bold placeholder-slate-300 focus:outline-none focus:border-amber-400 transition-all"
                        placeholder="https://instagram.com/yourbusiness"
                        value={partnershipFormData.socialMediaInstagram}
                        onChange={(e) => setPartnershipFormData({...partnershipFormData, socialMediaInstagram: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest ml-1">LinkedIn</label>
                      <input
                        type="url"
                        className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-xs font-bold placeholder-slate-300 focus:outline-none focus:border-amber-400 transition-all"
                        placeholder="https://linkedin.com/company/yourbusiness"
                        value={partnershipFormData.socialMediaLinkedin}
                        onChange={(e) => setPartnershipFormData({...partnershipFormData, socialMediaLinkedin: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                {/* Business Registration Status */}
                <div className="p-6 bg-neutral-800/30 rounded-3xl border border-neutral-700">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-neutral-500 rounded-2xl flex items-center justify-center">
                      <ShieldCheck className="text-amber-400" size={24} />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-black text-neutral-200 uppercase tracking-widest">Business Verification</h4>
                      <p className="text-[9px] font-bold text-amber-300/70">Registered businesses get priority processing</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 mb-6">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="isRegistered"
                        checked={partnershipFormData.isRegistered === true}
                        onChange={() => setPartnershipFormData({...partnershipFormData, isRegistered: true})}
                        className="w-5 h-5 text-amber-400 focus:ring-amber-400"
                      />
                      <span className="text-sm font-bold text-neutral-300">Yes, business is registered</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="isRegistered"
                        checked={partnershipFormData.isRegistered === false}
                        onChange={() => setPartnershipFormData({...partnershipFormData, isRegistered: false})}
                        className="w-5 h-5 text-amber-400 focus:ring-amber-400"
                      />
                      <span className="text-sm font-bold text-neutral-300">No, not registered</span>
                    </label>
                  </div>

                  {partnershipFormData.isRegistered ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[9px] font-bold text-neutral-300 uppercase tracking-widest ml-1">Registration Number</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 bg-neutral-900 border border-neutral-600 rounded-xl text-sm font-bold placeholder-slate-300 focus:outline-none focus:border-amber-400 transition-all"
                          placeholder="Business Registration Number"
                          value={partnershipFormData.registrationNumber}
                          onChange={(e) => setPartnershipFormData({...partnershipFormData, registrationNumber: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-bold text-neutral-300 uppercase tracking-widest ml-1">Registration Document</label>
                        <div className="border-2 border-dashed border-neutral-600 rounded-xl p-6 text-center hover:bg-neutral-800/30 transition-colors cursor-pointer">
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            className="hidden"
                            id="registrationDoc"
                            onChange={(e) => setPartnershipFormData({...partnershipFormData, registrationDocument: e.target.files[0]})}
                          />
                          <label htmlFor="registrationDoc" className="cursor-pointer">
                            {partnershipFormData.registrationDocument ? (
                              <div className="flex items-center justify-center gap-2 text-amber-300 font-bold text-sm">
                                <CheckCircle2 size={18} />
                                {partnershipFormData.registrationDocument.name}
                              </div>
                            ) : (
                              <div>
                                <p className="text-neutral-300 font-bold text-sm">Upload Registration Certificate</p>
                                <p className="text-amber-400 text-xs mt-1">PNG, JPG, or PDF (max 10MB)</p>
                              </div>
                            )}
                          </label>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-[10px] font-bold text-neutral-400/70">
                        Since your business is not registered, please upload one of the following for verification:
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[9px] font-bold text-neutral-300 uppercase tracking-widest ml-1">Bank Statement</label>
                          <div className="border-2 border-dashed border-neutral-600 rounded-xl p-4 text-center hover:bg-neutral-800/30 transition-colors cursor-pointer">
                            <input
                              type="file"
                              accept="image/*,.pdf"
                              className="hidden"
                              id="bankStatement"
                              onChange={(e) => setPartnershipFormData({...partnershipFormData, bankStatement: e.target.files[0]})}
                            />
                            <label htmlFor="bankStatement" className="cursor-pointer">
                              {partnershipFormData.bankStatement ? (
                                <div className="flex items-center justify-center gap-2 text-amber-300 font-bold text-xs">
                                  <CheckCircle2 size={16} />
                                  {partnershipFormData.bankStatement.name}
                                </div>
                              ) : (
                                <div>
                                  <p className="text-neutral-300 font-bold text-xs">Upload Bank Statement</p>
                                </div>
                              )}
                            </label>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[9px] font-bold text-neutral-300 uppercase tracking-widest ml-1">Mobile Money Statement</label>
                          <div className="border-2 border-dashed border-neutral-600 rounded-xl p-4 text-center hover:bg-neutral-800/30 transition-colors cursor-pointer">
                            <input
                              type="file"
                              accept="image/*,.pdf"
                              className="hidden"
                              id="mobileMoneyStatement"
                              onChange={(e) => setPartnershipFormData({...partnershipFormData, mobileMoneyStatement: e.target.files[0]})}
                            />
                            <label htmlFor="mobileMoneyStatement" className="cursor-pointer">
                              {partnershipFormData.mobileMoneyStatement ? (
                                <div className="flex items-center justify-center gap-2 text-amber-300 font-bold text-xs">
                                  <CheckCircle2 size={16} />
                                  {partnershipFormData.mobileMoneyStatement.name}
                                </div>
                              ) : (
                                <div>
                                  <p className="text-neutral-300 font-bold text-xs">Upload M-Pesa Statement</p>
                                </div>
                              )}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block ml-2">Operations Overview</label>
                  <textarea
                    required
                    rows={3}
                    className="w-full px-6 py-4 bg-neutral-950 border border-neutral-700 rounded-2xl text-sm font-bold placeholder-slate-300 focus:outline-none focus:border-amber-400 transition-all resize-none"
                    placeholder="Tell us about your business goals..."
                    value={partnershipFormData.description}
                    onChange={(e) => setPartnershipFormData({...partnershipFormData, description: e.target.value})}
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block ml-2">Business Credentials (ID/Tax Number)</label>
                  <input
                    required
                    type="text"
                    className="w-full px-6 py-4 bg-neutral-950 border border-neutral-700 rounded-2xl text-sm font-bold placeholder-slate-300 focus:outline-none focus:border-amber-400 transition-all"
                    placeholder="Enter Tax ID or National ID Number"
                    value={partnershipFormData.credentials}
                    onChange={(e) => setPartnershipFormData({...partnershipFormData, credentials: e.target.value})}
                  />
                </div>

                <div className="p-8 bg-neutral-800/30 rounded-3xl border border-neutral-700">
                  <div className="flex gap-4">
                    <ShieldCheck className="text-amber-400 flex-shrink-0" size={24} />
                    <div>
                      <h4 className="text-[11px] font-black text-neutral-200 uppercase tracking-widest mb-2">Alliance Terms</h4>
                      <p className="text-[10px] font-bold text-neutral-400/70 leading-relaxed">
                        By submitting, you agree to Iyonicorp's 7% revenue sharing model. Membership requires verification of business credentials. Standard approval takes 24-48 hours. Registered businesses receive priority processing.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={refreshing}
                  className="w-full py-6 bg-amber-500 text-neutral-950 rounded-[24px] font-black text-xs uppercase tracking-widest hover:bg-amber-300 transition-all shadow-xl shadow-amber-400/20 flex items-center justify-center gap-4 group"
                >
                  {refreshing ? (
                    <RefreshCw className="animate-spin" size={18} />
                  ) : (
                    <>
                      Submit Application
                      <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Partnership Success Popup */}
      <AnimatePresence>
        {partnershipSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-neutral-800/60 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-neutral-900 rounded-[4rem] p-12 md:p-16 text-center max-w-lg w-full shadow-2xl border border-neutral-700"
            >
              <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-lg shadow-emerald-500/10">
                <Clock size={48} className="animate-pulse" />
              </div>
              <h3 className="text-4xl font-black text-neutral-200 uppercase italic tracking-tighter mb-6 leading-none">Application Logged<span className="text-emerald-600">.</span></h3>
              <p className="text-neutral-500 font-medium text-lg mb-12 leading-relaxed">
                Your request is on the waitlist. Our engineering team is reviewing your credentials. You will receive an email confirmation once approved for the <span className="font-black text-neutral-200 italic">Alliance Partner</span> tier.
              </p>
              <button
                onClick={() => setPartnershipSuccess(false)}
                className="w-full py-6 bg-neutral-800 text-neutral-100 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-amber-400 transition-all shadow-xl"
              >
                Understood, Return to Deck
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default UserDashboard


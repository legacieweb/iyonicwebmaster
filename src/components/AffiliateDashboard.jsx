import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, DollarSign, TrendingUp, Copy, CheckCircle, 
  ChevronRight, ArrowLeft, ShoppingBag, PieChart, Wallet,
  Globe, Sparkles, Layout, Search, ExternalLink, RefreshCw, 
  AlertCircle, Clock, CreditCard, Menu, X
} from 'lucide-react'
import { 
  fetchAffiliateStatus, signupAffiliate, fetchAffiliateStats, 
  fetchAffiliateReferrals, fetchAffiliateEarnings,
  requestWithdrawal, fetchAffiliateWithdrawals, fetchAffiliatePayments,
  fetchPipelineLeads, updatePipelineLead
} from '../utils/api'
import { useAuth } from '../contexts/AuthContext'
import { WEBSITE_TYPES, CATALOG_ITEMS } from '../utils/constants'
import AffiliatePipeline from './AffiliatePipeline'

const TAB_TITLES = {
  overview: 'Performance',
  shop: 'Alliance Shop',
  referrals: 'Client Network',
  pipeline: 'Lead Pipeline',
  earnings: 'Treasury'
}

const AffiliateDashboard = ({ onBack }) => {
  const { currentUser } = useAuth()
  const [isAffiliate, setIsAffiliate] = useState(false)
  const [affiliateData, setAffiliateData] = useState(null)
  const [stats, setStats] = useState(null)
  const [referrals, setReferrals] = useState([])
  const [earnings, setEarnings] = useState([])
  const [withdrawals, setWithdrawals] = useState([])
  const [payments, setPayments] = useState([])
  const [pipelineLeads, setPipelineLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [signingUp, setSigningUp] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [copied, setCopied] = useState(false)
  const [toast, setToast] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [withdrawalModalOpen, setWithdrawalModalOpen] = useState(false)
  const [withdrawalForm, setWithdrawalForm] = useState({ amount: '', method: 'M-PESA', details: '' })
  const [withdrawalLoading, setWithdrawalLoading] = useState(false)

  const loadData = async () => {
    try {
      setLoading(true)
      const statusRes = await fetchAffiliateStatus()
      if (statusRes.isAffiliate) {
        setIsAffiliate(true)
        setAffiliateData(statusRes.affiliate)
        
        const [statsRes, referralsRes, earningsRes, withdrawalsRes, paymentsRes, pipelineRes] = await Promise.all([
          fetchAffiliateStats(),
          fetchAffiliateReferrals(),
          fetchAffiliateEarnings(),
          fetchAffiliateWithdrawals(),
          fetchAffiliatePayments(),
          fetchPipelineLeads().catch(err => [])
        ])
        
        setStats(statsRes)
        setReferrals(referralsRes)
        setEarnings(earningsRes)
        setWithdrawals(withdrawalsRes)
        setPayments(paymentsRes)
        setPipelineLeads(pipelineRes)
      }
    } catch (err) {
      console.error('Error loading affiliate data:', err)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleSignup = async () => {
    try {
      setSigningUp(true)
      const res = await signupAffiliate()
      setIsAffiliate(true)
      setAffiliateData(res.affiliate)
      await loadData()
    } catch (err) {
      console.error('Signup error:', err)
    } finally {
      setSigningUp(false)
    }
  }

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const copyReferralLink = () => {
    const link = `${window.location.origin}/?ref=${affiliateData.referral_code}`
    navigator.clipboard.writeText(link)
    setCopied(true)
    showToast('Referral link copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  const copyCustomLink = (path = '') => {
    const link = `${window.location.origin}${path}${path.includes('?') ? '&' : '?'}ref=${affiliateData.referral_code}`
    navigator.clipboard.writeText(link)
    showToast('Marketing link copied with your code!')
  }

  const handleWithdrawalRequest = async (e) => {
    e.preventDefault()
    if (!withdrawalForm.amount || parseFloat(withdrawalForm.amount) > parseFloat(stats?.current_balance)) return

    try {
      setWithdrawalLoading(true)
      await requestWithdrawal({
        amount: withdrawalForm.amount,
        paymentMethod: withdrawalForm.method,
        paymentDetails: withdrawalForm.details
      })
      setWithdrawalModalOpen(false)
      setWithdrawalForm({ amount: '', method: 'M-PESA', details: '' })
      loadData()
    } catch (err) {
      console.error('Withdrawal error:', err)
    } finally {
      setWithdrawalLoading(false)
    }
  }

  const handleUpdatePipelineLead = async (id, data) => {
    try {
      const updated = await updatePipelineLead(id, data)
      setPipelineLeads(prev => prev.map(l => l.id === id ? updated : l))
      return updated
    } catch (err) {
      console.error('Failed to update pipeline lead:', err)
    }
  }

  const handleAddPipelineNote = async (id, noteText) => {
    try {
      const lead = pipelineLeads.find(l => l.id === id)
      if (!lead) return
      
      const newNote = {
        text: noteText,
        author: currentUser.name || currentUser.email || 'Affiliate',
        date: new Date().toISOString()
      }
      
      const updatedNotes = [...(lead.notes || []), newNote]
      await handleUpdatePipelineLead(id, { notes: updatedNotes })
    } catch (err) {
      console.error('Failed to add note:', err)
    }
  }

  const navItems = [
    { id: 'overview', icon: PieChart, label: 'Performance' },
    { id: 'shop', icon: ShoppingBag, label: 'Shop' },
    { id: 'referrals', icon: Users, label: 'Network' },
    { id: 'pipeline', icon: TrendingUp, label: 'Pipeline' },
    { id: 'earnings', icon: Wallet, label: 'Treasury' }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="w-8 h-8 text-amber-400 animate-spin" />
          <p className="text-sm font-medium text-neutral-400">Loading infrastructure...</p>
        </div>
      </div>
    )
  }

  if (!isAffiliate) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-8 text-center">
        <div className="max-w-md">
          <AlertCircle className="w-12 h-12 text-rose-400 mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-neutral-200 mb-3">Access Restricted</h2>
          <p className="text-neutral-500 text-sm mb-8 max-w-sm mx-auto">Your account is not registered in the Alliance Program.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button 
              onClick={onBack}
              className="px-10 py-4 bg-neutral-900 text-neutral-300 rounded-xl font-medium text-xs uppercase tracking-widest hover:bg-neutral-800 transition-all border border-neutral-800"
            >
              Go Back
            </button>
            <button 
              onClick={handleSignup}
              disabled={signingUp}
              className="px-10 py-4 bg-amber-400 text-neutral-950 rounded-xl font-medium text-xs uppercase tracking-widest hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/20 disabled:opacity-70"
            >
              {signingUp ? 'Joining...' : 'Join Program'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-300 flex">
      {/* Sidebar */}
      <div className="w-72 border-r border-neutral-800 flex flex-col p-6 fixed inset-y-0 hidden lg:flex">
        <div className="mb-12">
          <div className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widener mb-2">Partner Ecosystem</div>
          <h2 className="text-2xl font-semibold text-neutral-200">Alliance</h2>
        </div>

        <nav className="space-y-1.5 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id)
                  setMobileMenuOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
                  isActive 
                    ? 'bg-neutral-800/40 text-neutral-200'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/30'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                  isActive ? 'bg-amber-400/15 text-amber-400' : 'text-neutral-400'
                }`}>
                  <Icon size={17} />
                </div>
                <span className="text-xs font-medium">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400" />
                )}
              </button>
            )
          })}
        </nav>

        <div className="pt-8 border-t border-neutral-800">
          <button 
            onClick={() => onBack()}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/30 transition-all"
          >
            <ArrowLeft size={17} />
            <span className="text-xs font-medium">Main Dashboard</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-72 flex flex-col min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-neutral-950/70 backdrop-blur-md border-b border-neutral-800 px-6 py-5 lg:py-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden w-9 h-9 flex items-center justify-center bg-neutral-800 rounded-xl text-neutral-300 hover:text-amber-400 transition-colors border border-neutral-800"
            >
              <Menu size={18} />
            </button>
            <div>
              <h1 className="text-xl lg:text-2xl font-semibold text-neutral-200">{TAB_TITLES[activeTab]}</h1>
              <div className="flex items-center gap-2 text-[10px] text-neutral-500 font-medium mt-0.5">
                <span className="text-amber-400 font-medium">{affiliateData.referral_code}</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span className="text-emerald-400">Active</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-neutral-800/30 rounded-xl border border-neutral-800">
              <Copy size={13} className="text-neutral-500" />
              <code className="text-sm font-medium text-amber-400">{affiliateData.referral_code}</code>
              <button 
                onClick={copyReferralLink}
                className="p-1 hover:bg-neutral-900 rounded-lg transition-colors text-neutral-500 hover:text-amber-400"
              >
                {copied ? <CheckCircle size={13} className="text-emerald-400" /> : <Copy size={13} />}
              </button>
            </div>
            <button 
              onClick={() => { setRefreshing(true); loadData() }}
              className={`p-2.5 bg-neutral-800/30 border border-neutral-800 rounded-xl text-neutral-400 hover:text-amber-400 hover:bg-neutral-800 transition-all ${refreshing ? 'animate-spin' : ''}`}
            >
              <RefreshCw size={16} />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div 
                key="overview"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className="space-y-12"
              >
                {/* Stat cards */}
                <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
                  {[
                    { label: 'Total Treasury', value: `$${stats?.total_earnings || '0.00'}`, icon: Wallet },
                    { label: 'Available Balance', value: `$${stats?.current_balance || '0.00'}`, icon: DollarSign },
                    { label: 'Pending Yield', value: `$${stats?.pending_earnings || '0.00'}`, icon: Clock },
                    { label: 'Network Size', value: stats?.total_referrals || '0', icon: Users }
                  ].map((stat, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex items-start gap-4"
                    >
                      <div className="w-11 h-11 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center flex-shrink-0">
                        <stat.icon size={22} />
                      </div>
                      <div>
                        <div className="text-xs text-neutral-500 font-medium uppercase tracking-wider">{stat.label}</div>
                        <div className="text-2xl font-semibold text-neutral-200 mt-0.5">{stat.value}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Bonus Callout */}
                <motion.div 
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="relative overflow-hidden rounded-[32px] p-10 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 border border-neutral-800"
                >
                  <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/15 blur-[100px] rounded-full -translate-y-1/3 translate-x-1/4" />
                  <div className="relative z-10">
                    <div className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-4">Strategic Notice</div>
                    <h3 className="text-3xl font-semibold text-neutral-200 max-w-xl leading-tight mb-5">
                      30% High-Performance Bonus and 10% Recurring Yield is now Active.
                    </h3>
                    <p className="text-neutral-400 text-sm max-w-lg leading-relaxed mb-8">
                      Your clients automatically receive a <span className="text-neutral-200 font-medium">30% discount</span> on initial infrastructure and <span className="text-neutral-200 font-medium">10% discount</span> on recurring memberships when using your link.
                    </p>
                    <button 
                      onClick={() => setActiveTab('shop')}
                      className="px-8 py-3.5 bg-neutral-800 text-neutral-200 rounded-xl font-medium text-xs uppercase tracking-widest hover:bg-amber-400 hover:text-neutral-950 transition-all inline-flex items-center gap-2 border border-neutral-700"
                    >
                      Enter Alliance Shop
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </motion.div>

                {/* Marketing Kit */}
                <div className="space-y-8">
                  <h3 className="text-xl font-semibold text-neutral-200 flex items-center gap-3">Alliance Marketing Kit</h3>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <motion.div 
                      whileHover={{ y: -3 }}
                      className="p-8 bg-neutral-900/60 border border-neutral-800 rounded-2xl transition-all"
                    >
                      <div className="w-12 h-12 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center mb-6">
                        <Globe size={22} />
                      </div>
                      <h4 className="text-sm font-medium text-neutral-200 mb-2">Main Terminal</h4>
                      <p className="text-xs text-neutral-500 mb-6">Redirect to homepage with code</p>
                      <button 
                        onClick={() => copyCustomLink('/')}
                        className="w-full py-3 bg-neutral-800 text-neutral-200 rounded-xl font-medium text-[10px] uppercase tracking-widest hover:bg-amber-400 hover:text-neutral-950 transition-all flex items-center justify-center gap-2 border border-neutral-700"
                      >
                        <Copy size={14} /> Copy Mission URL
                      </button>
                    </motion.div>

                    <motion.div 
                      whileHover={{ y: -3 }}
                      className="p-8 bg-neutral-900/60 border border-neutral-800 rounded-2xl transition-all"
                    >
                      <div className="w-12 h-12 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center mb-6">
                        <Layout size={22} />
                      </div>
                      <h4 className="text-sm font-medium text-neutral-200 mb-2">Asset Blueprints</h4>
                      <p className="text-xs text-neutral-500 mb-6">Direct access to business catalog</p>
                      <button 
                        onClick={() => copyCustomLink('/blueprints')}
                        className="w-full py-3 bg-neutral-800 text-neutral-200 rounded-xl font-medium text-[10px] uppercase tracking-widest hover:bg-amber-400 hover:text-neutral-950 transition-all flex items-center justify-center gap-2 border border-neutral-700"
                      >
                        <Copy size={14} /> Copy Blueprint Link
                      </button>
                    </motion.div>

                    <motion.div 
                      whileHover={{ y: -3 }}
                      className="p-8 bg-neutral-900/60 border border-neutral-800 rounded-2xl transition-all"
                    >
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6">
                        <Sparkles size={22} />
                      </div>
                      <h4 className="text-sm font-medium text-neutral-200 mb-2">Sector Targeted</h4>
                      <p className="text-xs text-neutral-500 mb-6">Filter catalog by specific niche</p>
                      <div className="flex flex-wrap gap-2">
                        {['Real Estate', 'E-commerce', 'Portfolio'].map(cat => (
                          <button 
                            key={cat}
                            onClick={() => copyCustomLink(`/blueprints?category=${cat}`)}
                            className="px-4 py-2 rounded-xl text-[9px] font-medium text-neutral-400 uppercase tracking-widest hover:bg-emerald-500/10 hover:text-emerald-400 transition-all border border-neutral-800"
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'shop' && (
              <motion.div 
                key="shop"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className="space-y-8"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex flex-wrap gap-2">
                    {['All', ...new Set(Object.values(CATALOG_ITEMS).flat().filter(i => i.type).map(i => i.type))].map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-5 py-2 rounded-xl text-[10px] font-medium transition-all ${
                          selectedCategory === cat 
                            ? 'bg-amber-400 text-neutral-950'
                            : 'bg-neutral-800/40 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <div className="relative w-full sm:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
                    <input 
                      type="text" 
                      placeholder="Search business models..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-2.5 bg-neutral-800/30 border border-neutral-800 rounded-xl text-neutral-200 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {Object.values(CATALOG_ITEMS).flat().filter(item => {
                    const matchesSearch = (item.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
                                       (item.type?.toLowerCase() || '').includes(searchTerm.toLowerCase());
                    const matchesCategory = selectedCategory === 'All' || item.type === selectedCategory;
                    return matchesSearch && matchesCategory;
                  }).map((item, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ y: -4 }}
                      className="group relative bg-neutral-900/60 rounded-2xl p-6 border border-neutral-800 hover:border-neutral-700 transition-all overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-neutral-800 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-neutral-700 transition-colors" />
                      
                      <div className="relative z-10">
                        <div className="aspect-video w-full rounded-xl overflow-hidden mb-6 border border-neutral-800 bg-neutral-800/20 relative">
                          <img 
                            src={item.url ? `https://s.wordpress.com/mshots/v1/${encodeURIComponent(item.url)}?w=800` : (item.image || 'https://i.imgur.com/6nGQFtj.png')} 
                            alt={item.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                            onError={(e) => { e.target.src = item.image || 'https://i.imgur.com/6nGQFtj.png' }}
                          />
                        </div>

                        <div className="flex items-start justify-between mb-5">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-xl bg-neutral-800/30 flex items-center justify-center overflow-hidden border border-neutral-800">
                              {item.url ? (
                                <img 
                                  src={`https://www.google.com/s2/favicons?sz=128&domain_url=${item.url}`} 
                                  alt="" 
                                  className="w-7 h-7 object-contain"
                                  onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                                />
                              ) : null}
                              <Globe size={24} className="text-amber-400" style={{ display: item.url ? 'none' : 'block' }} />
                            </div>
                            <div>
                              <h3 className="font-medium text-neutral-200 text-sm">{item.name}</h3>
                              <p className="text-xs text-neutral-500 mt-0.5">{item.type}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-neutral-500">Price</div>
                            <div className="text-lg font-semibold text-neutral-200">${item.price}</div>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <button 
                            onClick={() => {
                              const link = `${window.location.origin}/?ref=${affiliateData.referral_code}&type=${item.type?.toLowerCase().replace(/ /g, '-')}`
                              navigator.clipboard.writeText(link)
                              setCopied(true)
                              showToast(`${item.name} link copied!`)
                              setTimeout(() => setCopied(false), 2000)
                            }}
                            className="flex-1 py-2.5 bg-amber-400 text-neutral-950 rounded-xl font-medium text-[10px] uppercase tracking-wider hover:bg-amber-300 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-400/10"
                          >
                            <Copy size={13} />
                            Copy Link
                          </button>
                          {item.url && (
                            <a 
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2.5 bg-neutral-800/30 text-neutral-400 hover:text-amber-400 hover:bg-neutral-800 border border-neutral-800 rounded-xl transition-all flex items-center justify-center"
                              title="View Live Site"
                            >
                              <ExternalLink size={15} />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'referrals' && (
              <motion.div 
                key="referrals"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
              >
                <div className="rounded-2xl bg-neutral-900/60 border border-neutral-800 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-neutral-800/30 border-b border-neutral-800">
                          <th className="px-6 py-4 text-[10px] font-medium text-neutral-500 uppercase tracking-wider">Client</th>
                          <th className="px-6 py-4 text-[10px] font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-4 text-[10px] font-medium text-neutral-500 uppercase tracking-wider">Since</th>
                          <th className="px-6 py-4 text-[10px] font-medium text-neutral-500 uppercase tracking-wider text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {referrals.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="px-6 py-16">
                              <div className="flex flex-col items-center gap-4">
                                <Users className="w-12 h-12 text-neutral-600" />
                                <p className="text-sm text-neutral-500">Network remains inactive</p>
                              </div>
                            </td>
                          </tr>
                        ) : referrals.map((client, i) => (
                          <tr key={i} className="border-b border-neutral-800 hover:bg-neutral-800/20 transition-colors last:border-0">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-neutral-800 text-amber-400 flex items-center justify-center font-medium text-xs uppercase">
                                  {client.name?.substring(0, 2) || '??'}
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-neutral-200">{client.name}</div>
                                  <div className="text-xs text-neutral-500">{client.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider ${
                                client.subscription_status === 'active' 
                                ? 'bg-emerald-500/10 text-emerald-400' 
                                : 'bg-amber-500/10 text-amber-400'
                              }`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${client.subscription_status === 'active' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                                {client.subscription_status || 'Inactive'}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-neutral-500">
                              {new Date(client.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button className="p-2 text-neutral-500 hover:text-amber-400 transition-colors">
                                <ExternalLink size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'pipeline' && (
              <motion.div 
                key="pipeline"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
              >
                <AffiliatePipeline 
                  leads={pipelineLeads}
                  onUpdate={handleUpdatePipelineLead}
                  onAddNote={handleAddPipelineNote}
                />
              </motion.div>
            )}

            {activeTab === 'earnings' && (
              <motion.div 
                key="earnings"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className="space-y-10"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">Available for Withdrawal</div>
                    <div className="text-4xl font-semibold text-neutral-200">${stats?.current_balance || '0.00'}</div>
                  </div>
                  <button 
                    onClick={() => setWithdrawalModalOpen(true)}
                    disabled={parseFloat(stats?.current_balance) < 10}
                    className="px-8 py-3.5 bg-amber-400 text-neutral-950 rounded-xl font-medium text-xs uppercase tracking-widest hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/20 disabled:opacity-50 disabled:grayscale"
                  >
                    Request Withdrawal
                  </button>
                </div>

                {/* Revenue Stream */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-neutral-200 flex items-center gap-3">
                    <TrendingUp size={20} className="text-amber-400" />Revenue Stream
                  </h3>
                  <div className="rounded-2xl bg-neutral-900/60 border border-neutral-800 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="bg-neutral-800/30 border-b border-neutral-800">
                          <tr>
                            <th className="px-6 py-4 text-[10px] font-medium text-neutral-500 uppercase tracking-wider">Source</th>
                            <th className="px-6 py-4 text-[10px] font-medium text-neutral-500 uppercase tracking-wider">Revenue</th>
                            <th className="px-6 py-4 text-[10px] font-medium text-neutral-500 uppercase tracking-wider text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {earnings.length === 0 ? (
                            <tr>
                              <td colSpan="3" className="px-6 py-12 text-center text-sm text-neutral-500">No earnings generated yet</td>
                            </tr>
                          ) : earnings.map((entry, i) => (
                            <tr key={i} className="border-b border-neutral-800 hover:bg-neutral-800/20 transition-colors last:border-0">
                              <td className="px-6 py-4">
                                <div className="font-medium text-neutral-200 text-sm">{entry.service_name || 'System Reward'}</div>
                                <div className="text-xs text-neutral-500">Order: {entry.order_number || 'N/A'}</div>
                              </td>
                              <td className="px-6 py-4 font-semibold text-emerald-400 text-sm">
                                +${parseFloat(entry.amount).toFixed(2)}
                              </td>
                              <td className="px-6 py-4 text-right">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider ${
                                  entry.status === 'available' || entry.status === 'paid' ? 'bg-emerald-500/10 text-emerald-400' : 
                                  entry.status === 'pending' ? 'bg-amber-500/10 text-amber-400' :
                                  'bg-neutral-800 text-neutral-500'
                                }`}>
                                  {entry.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Withdrawal History & Installments side by side */}
                <div className="grid lg:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-neutral-200 flex items-center gap-3">Withdrawal History</h3>
                    <div className="rounded-2xl bg-neutral-900/60 border border-neutral-800 overflow-hidden">
                      <table className="w-full text-left">
                        <thead className="bg-neutral-800/30 border-b border-neutral-800">
                          <tr>
                            <th className="px-6 py-4 text-[10px] font-medium text-neutral-500 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-4 text-[10px] font-medium text-neutral-500 uppercase tracking-wider">Method</th>
                            <th className="px-6 py-4 text-[10px] font-medium text-neutral-500 uppercase tracking-wider text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {withdrawals.length === 0 ? (
                            <tr>
                              <td colSpan="3" className="px-6 py-12 text-center text-sm text-neutral-500">No withdrawals requested yet</td>
                            </tr>
                          ) : withdrawals.map((w, i) => (
                            <tr key={i} className="border-b border-neutral-800 hover:bg-neutral-800/20 transition-colors last:border-0">
                              <td className="px-6 py-4 font-medium text-neutral-200 text-sm">${w.amount}</td>
                              <td className="px-6 py-4 text-sm text-neutral-500">{w.payment_method}</td>
                              <td className="px-6 py-4 text-right">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider ${
                                  w.status === 'completed' || w.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' : 
                                  w.status === 'pending' ? 'bg-amber-500/10 text-amber-400' :
                                  w.status === 'rejected' ? 'bg-rose-500/10 text-rose-400' :
                                  'bg-neutral-800 text-neutral-500'
                                }`}>
                                  {w.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-neutral-200 flex items-center gap-3">
                      <CreditCard size={20} className="text-emerald-400" />Installment Tracking
                    </h3>
                    <div className="rounded-2xl bg-neutral-900/60 border border-neutral-800 overflow-hidden">
                      <table className="w-full text-left">
                        <thead className="bg-neutral-800/30 border-b border-neutral-800">
                          <tr>
                            <th className="px-6 py-4 text-[10px] font-medium text-neutral-500 uppercase tracking-wider">Client Order</th>
                            <th className="px-6 py-4 text-[10px] font-medium text-neutral-500 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-4 text-[10px] font-medium text-neutral-500 uppercase tracking-wider">Method</th>
                            <th className="px-6 py-4 text-[10px] font-medium text-neutral-500 uppercase tracking-wider text-right">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {payments.length === 0 ? (
                            <tr>
                              <td colSpan="4" className="px-6 py-12 text-center text-sm text-neutral-500">No installments recorded yet</td>
                            </tr>
                          ) : payments.map((p, i) => (
                            <tr key={i} className="border-b border-neutral-800 hover:bg-neutral-800/20 transition-colors last:border-0">
                              <td className="px-6 py-4">
                                <div className="font-medium text-neutral-200 text-sm">{p.service_name}</div>
                                <div className="text-xs text-neutral-500">Order #{p.order_number}</div>
                              </td>
                              <td className="px-6 py-4 font-medium text-neutral-200 text-sm">${parseFloat(p.amount).toFixed(2)}</td>
                              <td className="px-6 py-4 text-sm text-neutral-500 uppercase">{p.payment_method}</td>
                              <td className="px-6 py-4 text-right text-xs text-neutral-500">
                                {new Date(p.created_at).toLocaleDateString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    {/* Mobile Menu */}
    <AnimatePresence>
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[1000] lg:hidden">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="absolute inset-y-0 left-0 w-72 bg-neutral-950 p-6 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-xl font-semibold text-neutral-200">Alliance</h2>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-neutral-400 hover:text-neutral-200 transition-colors"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="space-y-1.5 flex-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id)
                      setMobileMenuOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-neutral-800/40 text-neutral-200'
                        : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/30'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isActive ? 'bg-amber-400/15 text-amber-400' : 'text-neutral-400'
                    }`}>
                      <Icon size={17} />
                    </div>
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                )
              })}
            </nav>

            <div className="pt-6 border-t border-neutral-800">
              <button 
                onClick={() => onBack()}
                className="w-full flex items-center justify-center gap-3 px-4 py-3.5 bg-neutral-800 text-neutral-300 rounded-xl font-medium text-xs uppercase tracking-widest hover:bg-neutral-700 transition-all"
              >
                <ArrowLeft size={16} />
                Main Dashboard
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[2000]"
        >
          <div className={`px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-4 border border-neutral-800 backdrop-blur-xl ${
            toast.type === 'success' ? 'bg-emerald-500/10 text-neutral-200' : 'bg-neutral-900 text-neutral-200'
          }`}>
            <CheckCircle size={18} className={toast.type === 'success' ? 'text-emerald-400' : 'text-amber-400'} />
            <span className="text-xs font-medium uppercase tracking-wider">{toast.message}</span>
          </div>
        </motion.div>
      )}

      {/* Withdrawal Modal */}
      {withdrawalModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={() => setWithdrawalModalOpen(false)}
            className="absolute inset-0 bg-neutral-950/40 backdrop-blur-xl" 
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 30 }}
            className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl p-10 shadow-2xl"
          >
            <div className="mb-10 text-center">
              <div className="w-16 h-16 bg-neutral-800 text-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Wallet size={30} />
              </div>
              <h3 className="text-2xl font-semibold text-neutral-200 mb-2">Treasury Withdrawal</h3>
              <p className="text-neutral-500 text-xs uppercase tracking-wider">Available: ${stats?.current_balance}</p>
            </div>

            <form onSubmit={handleWithdrawalRequest} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Amount (USD)</label>
                <input 
                  required
                  type="number"
                  min="10"
                  max={stats?.current_balance}
                  step="0.01"
                  value={withdrawalForm.amount}
                  onChange={(e) => setWithdrawalForm({...withdrawalForm, amount: e.target.value})}
                  placeholder="0.00"
                  className="w-full px-5 py-3.5 bg-neutral-800/30 border border-neutral-700 rounded-xl text-neutral-200 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Payment Method</label>
                <select 
                  value={withdrawalForm.method}
                  onChange={(e) => setWithdrawalForm({...withdrawalForm, method: e.target.value})}
                  className="w-full px-5 py-3.5 bg-neutral-800/30 border border-neutral-700 rounded-xl text-neutral-200 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all text-sm appearance-none"
                >
                  <option value="M-PESA">M-PESA</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="PayPal">PayPal</option>
                  <option value="Crypto">Crypto (USDT)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Payment Details</label>
                <textarea 
                  required
                  value={withdrawalForm.details}
                  onChange={(e) => setWithdrawalForm({...withdrawalForm, details: e.target.value})}
                  placeholder="Phone number, bank account, or wallet address..."
                  className="w-full px-5 py-3.5 bg-neutral-800/30 border border-neutral-700 rounded-xl text-neutral-200 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all min-h-[100px] resize-none text-sm"
                />
              </div>

              <button 
                type="submit"
                disabled={withdrawalLoading}
                className="w-full py-4 bg-neutral-800 text-neutral-200 rounded-xl font-medium text-xs uppercase tracking-wider hover:bg-amber-400 hover:text-neutral-950 transition-all border border-neutral-700 disabled:opacity-60"
              >
                {withdrawalLoading ? 'Processing...' : 'Initialize Withdrawal'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  </div>
  )
}

export default AffiliateDashboard
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, DollarSign, TrendingUp, Link as LinkIcon, Copy, CheckCircle, 
  ChevronRight, ArrowLeft, ShoppingBag, PieChart, Wallet, Calendar,
  Globe, Zap, Shield, Star, Rocket, Sparkles, Layout, MessageSquare,
  Search, Filter, ExternalLink, RefreshCw, AlertCircle, Clock, CreditCard,
  Menu, X
} from 'lucide-react'
import { 
  fetchAffiliateStatus, signupAffiliate, fetchAffiliateStats, 
  fetchAffiliateReferrals, fetchAffiliateEarnings,
  requestWithdrawal, fetchAffiliateWithdrawals, fetchAffiliatePayments
} from '../utils/api'
import { useAuth } from '../contexts/AuthContext'
import { WEBSITE_TYPES, CATALOG_ITEMS } from '../utils/constants'

const AffiliateDashboard = ({ onBack }) => {
  const { currentUser } = useAuth()
  const [isAffiliate, setIsAffiliate] = useState(false)
  const [affiliateData, setAffiliateData] = useState(null)
  const [stats, setStats] = useState(null)
  const [referrals, setReferrals] = useState([])
  const [earnings, setEarnings] = useState([])
  const [withdrawals, setWithdrawals] = useState([])
  const [payments, setPayments] = useState([])
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
        
        const [statsRes, referralsRes, earningsRes, withdrawalsRes, paymentsRes] = await Promise.all([
          fetchAffiliateStats(),
          fetchAffiliateReferrals(),
          fetchAffiliateEarnings(),
          fetchAffiliateWithdrawals(),
          fetchAffiliatePayments()
        ])
        
        setStats(statsRes)
        setReferrals(referralsRes)
        setEarnings(earningsRes)
        setWithdrawals(withdrawalsRes)
        setPayments(paymentsRes)
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

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
          <p className="text-sm font-black text-neutral-400 uppercase tracking-widest">Loading Infrastructure...</p>
        </div>
      </div>
    )
  }

  if (!isAffiliate) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-8 text-center">
        <div>
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
          <h2 className="text-xl font-black text-neutral-900 mb-2">Access Restricted</h2>
          <p className="text-neutral-500 text-sm mb-8 font-medium">Your account is not registered in the Alliance Program.</p>
          <button 
            onClick={onBack}
            className="px-10 py-5 bg-neutral-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl"
          >
            Return to Core
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <div className="w-80 border-r border-neutral-100 flex flex-col p-8 fixed h-full hidden lg:flex">
        <div className="mb-12">
          <div className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-2">Partner Ecosystem</div>
          <h2 className="text-2xl font-black text-neutral-900">Alliance</h2>
        </div>

        <nav className="space-y-2 flex-1">
          {[
            { id: 'overview', icon: PieChart, label: 'Performance' },
            { id: 'shop', icon: ShoppingBag, label: 'Alliance Shop' },
            { id: 'referrals', icon: Users, label: 'Network' },
            { id: 'earnings', icon: Wallet, label: 'Treasury' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id)
                setMobileMenuOpen(false)
              }}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${
                activeTab === item.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                : 'text-neutral-400 hover:text-neutral-900 hover:bg-neutral-50'
              }`}
            >
              <item.icon size={20} strokeWidth={activeTab === item.id ? 3 : 2} />
              <span className="text-xs font-black uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-neutral-100">
          <button 
            onClick={() => onBack()}
            className="w-full flex items-center gap-4 px-6 py-4 text-neutral-400 hover:text-blue-600 transition-all"
          >
            <ArrowLeft size={20} />
            <span className="text-[10px] font-black uppercase tracking-widest">Main Dashboard</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-80 min-w-0">
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-neutral-100 p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center justify-between w-full lg:w-auto">
            <div>
              <h1 className="text-2xl lg:text-3xl font-black text-neutral-900 mb-1">
                {activeTab === 'overview' && 'System Performance'}
                {activeTab === 'shop' && 'Alliance Storefront'}
                {activeTab === 'referrals' && 'Client Network'}
                {activeTab === 'earnings' && 'Treasury Control'}
              </h1>
              <p className="text-neutral-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                ID: <span className="text-blue-600 font-bold">{affiliateData.referral_code}</span>
                <span className="w-1 h-1 rounded-full bg-neutral-300" />
                Status: <span className="text-emerald-500">Active</span>
              </p>
            </div>
            
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-3 bg-neutral-900 text-white rounded-xl shadow-lg shadow-neutral-900/20 active:scale-95 transition-all"
            >
              <Menu size={20} />
            </button>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto no-scrollbar pb-2 md:pb-0">
            <div className="flex items-center gap-3 px-5 py-3 bg-neutral-50 rounded-xl border border-neutral-100 whitespace-nowrap">
              <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Link</span>
              <code className="text-[11px] font-bold text-blue-600">{affiliateData.referral_code}</code>
              <button 
                onClick={copyReferralLink}
                className="p-1.5 hover:bg-white rounded-lg transition-colors text-neutral-400 hover:text-blue-600"
              >
                {copied ? <CheckCircle size={14} className="text-emerald-500" /> : <Copy size={14} />}
              </button>
            </div>
            <button 
              onClick={() => { setRefreshing(true); loadData(); }}
              className={`p-3 bg-white border border-neutral-100 rounded-xl text-neutral-400 hover:text-blue-600 transition-all flex-shrink-0 ${refreshing ? 'animate-spin' : ''}`}
            >
              <RefreshCw size={18} />
            </button>
          </div>
        </header>

        <div className="p-6 lg:p-12">
          <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div className="grid md:grid-cols-4 gap-8">
                {[
                  { label: 'Total Treasury', value: `$${stats?.total_earnings || '0.00'}`, icon: Wallet, color: 'blue' },
                  { label: 'Available Balance', value: `$${stats?.current_balance || '0.00'}`, icon: DollarSign, color: 'emerald' },
                  { label: 'Pending Yield', value: `$${stats?.pending_earnings || '0.00'}`, icon: Clock, color: 'amber' },
                  { label: 'Network Size', value: stats?.total_referrals || '0', icon: Users, color: 'indigo' }
                ].map((stat, i) => (
                  <div key={i} className="p-8 rounded-[40px] border border-neutral-100 bg-white shadow-sm">
                    <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center mb-6`}>
                      <stat.icon size={24} />
                    </div>
                    <div className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-2">{stat.label}</div>
                    <div className="text-3xl font-black text-neutral-900 tracking-tight italic">{stat.value}</div>
                  </div>
                ))}
              </div>

              <div className="bg-neutral-900 rounded-[48px] p-12 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full -mr-48 -mt-48" />
                <div className="relative z-10">
                  <div className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-6">Strategic Notice</div>
                  <h3 className="text-3xl font-black mb-6 max-w-xl leading-tight">30% High-Performance Bonus and 10% Recurring Yield is now Active.</h3>
                  <p className="text-neutral-400 font-medium max-w-lg leading-relaxed mb-10">
                    Your clients automatically receive a <span className="text-white font-bold">30% discount</span> on initial infrastructure and <span className="text-white font-bold">10% discount</span> on recurring memberships when using your link.
                  </p>
                  <button 
                    onClick={() => setActiveTab('shop')}
                    className="px-10 py-5 bg-white text-neutral-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-all flex items-center gap-3"
                  >
                    Enter Alliance Shop
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'shop' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="mb-12 flex flex-col gap-8">
                <div className="flex flex-wrap gap-2">
                  {['All', ...new Set(Object.values(CATALOG_ITEMS).flat().filter(i => i.type).map(i => i.type))].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        selectedCategory === cat 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                        : 'bg-neutral-50 text-neutral-400 hover:text-neutral-900 border border-neutral-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="relative flex-1">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search Website Models..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-16 pr-8 py-5 bg-neutral-50 rounded-[24px] border border-neutral-100 focus:outline-none focus:ring-4 focus:ring-blue-500/5 text-sm font-bold"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                {Object.values(CATALOG_ITEMS).flat().filter(item => {
                  const matchesSearch = (item.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
                                       (item.type?.toLowerCase() || '').includes(searchTerm.toLowerCase());
                  const matchesCategory = selectedCategory === 'All' || item.type === selectedCategory;
                  return matchesSearch && matchesCategory;
                }).map((item, i) => (
                  <div key={i} className="group relative bg-white rounded-[40px] p-8 border border-neutral-100 hover:shadow-2xl transition-all duration-500 overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-blue-100 transition-colors" />
                    
                    <div className="relative z-10">
                      <div className="aspect-video w-full rounded-2xl overflow-hidden mb-8 border border-neutral-100 bg-neutral-50 relative group/preview">
                        <img 
                          src={item.url ? `https://s.wordpress.com/mshots/v1/${encodeURIComponent(item.url)}?w=800` : (item.image || 'https://i.imgur.com/6nGQFtj.png')} 
                          alt={item.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                          onError={(e) => { e.target.src = item.image || 'https://i.imgur.com/6nGQFtj.png' }}
                        />
                        <div className="absolute inset-0 bg-neutral-900/10 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center">
                           <div className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl shadow-xl transform translate-y-4 group-hover/preview:translate-y-0 transition-transform duration-500">
                             <span className="text-[10px] font-black text-neutral-900 uppercase tracking-widest">Live Instance</span>
                           </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      <div className="flex items-start justify-between mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-neutral-50 flex items-center justify-center overflow-hidden border border-neutral-100 group-hover:scale-110 transition-transform">
                          {item.url ? (
                            <img 
                              src={`https://www.google.com/s2/favicons?sz=128&domain_url=${item.url}`} 
                              alt="" 
                              className="w-8 h-8 object-contain"
                              onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                            />
                          ) : null}
                          <Globe size={28} className="text-blue-600" style={{ display: item.url ? 'none' : 'block' }} />
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">Price</div>
                          <div className="text-xl font-black text-neutral-900">${item.price}</div>
                        </div>
                      </div>

                      <h3 className="text-xl font-black text-neutral-900 mb-2">{item.name}</h3>
                      <p className="text-neutral-400 text-[10px] font-black uppercase tracking-widest mb-6">{item.type}</p>

                      <div className="flex gap-3">
                        <button 
                          onClick={() => {
                            const link = `${window.location.origin}/?ref=${affiliateData.referral_code}&type=${item.type?.toLowerCase().replace(/ /g, '-')}`
                            navigator.clipboard.writeText(link)
                            setCopied(true)
                            showToast(`${item.name} link copied!`)
                            setTimeout(() => setCopied(false), 2000)
                          }}
                          className="flex-1 py-4 bg-neutral-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-600 transition-all flex items-center justify-center gap-3"
                        >
                          <Copy size={14} />
                          Copy Link
                        </button>
                        <a 
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-4 bg-neutral-50 text-neutral-400 hover:text-blue-600 hover:bg-white border border-neutral-100 rounded-2xl transition-all flex items-center justify-center"
                          title="View Live Site"
                        >
                          <ExternalLink size={18} />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'referrals' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="bg-white rounded-[40px] border border-neutral-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                  <thead>
                    <tr className="bg-neutral-50 border-b border-neutral-100">
                      <th className="px-8 py-6 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Client Identity</th>
                      <th className="px-8 py-6 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Service Status</th>
                      <th className="px-8 py-6 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Acquisition Date</th>
                      <th className="px-8 py-6 text-[10px] font-black text-neutral-400 uppercase tracking-widest text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {referrals.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="px-8 py-24 text-center">
                          <div className="flex flex-col items-center gap-4">
                            <Users className="w-12 h-12 text-neutral-200" />
                            <p className="text-sm font-black text-neutral-400 uppercase tracking-widest">Network remains inactive</p>
                          </div>
                        </td>
                      </tr>
                    ) : referrals.map((client, i) => (
                      <tr key={i} className="group hover:bg-neutral-50/50 transition-colors">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xs uppercase">
                              {client.name?.substring(0, 2) || '??'}
                            </div>
                            <div>
                              <div className="text-sm font-black text-neutral-900 mb-0.5">{client.name}</div>
                              <div className="text-[11px] font-bold text-neutral-400">{client.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            client.subscription_status === 'active' 
                            ? 'bg-emerald-50 text-emerald-600' 
                            : 'bg-amber-50 text-amber-600'
                          }`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${client.subscription_status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                            {client.subscription_status || 'Inactive'}
                          </div>
                        </td>
                        <td className="px-8 py-6 text-sm font-bold text-neutral-500">
                          {new Date(client.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-8 py-6 text-right">
                          <button className="p-2 text-neutral-400 hover:text-blue-600 transition-colors">
                            <ExternalLink size={18} />
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

          {activeTab === 'earnings' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">Available for Withdrawal</div>
                  <div className="text-4xl font-black text-neutral-900 italic">${stats?.current_balance || '0.00'}</div>
                </div>
                <button 
                  onClick={() => setWithdrawalModalOpen(true)}
                  disabled={parseFloat(stats?.current_balance) < 10}
                  className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 disabled:opacity-50 disabled:grayscale"
                >
                  Request Withdrawal
                </button>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-neutral-900 flex items-center gap-3">
                    <TrendingUp className="text-blue-600" size={20} />
                    Revenue Stream
                  </h3>
                  <div className="bg-white rounded-[40px] border border-neutral-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                      <thead className="bg-neutral-50 border-b border-neutral-100">
                        <tr>
                          <th className="px-8 py-4 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Source Entity</th>
                          <th className="px-8 py-4 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Revenue</th>
                          <th className="px-8 py-4 text-[10px] font-black text-neutral-400 uppercase tracking-widest text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {earnings.length === 0 ? (
                          <tr>
                            <td colSpan="3" className="px-8 py-12 text-center text-xs font-bold text-neutral-400">No earnings generated yet</td>
                          </tr>
                        ) : earnings.map((entry, i) => (
                          <tr key={i} className="hover:bg-neutral-50/50 transition-colors">
                            <td className="px-8 py-5">
                              <div className="font-bold text-neutral-900 text-xs">{entry.service_name || 'System Reward'}</div>
                              <div className="text-[10px] text-neutral-400 font-medium">Order: {entry.order_number || 'N/A'}</div>
                            </td>
                            <td className="px-8 py-5 font-black text-emerald-600 text-xs">+${parseFloat(entry.amount).toFixed(2)}</td>
                            <td className="px-8 py-5 text-right">
                              <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                                entry.status === 'available' || entry.status === 'paid' ? 'bg-emerald-50 text-emerald-600' : 
                                entry.status === 'pending' ? 'bg-amber-50 text-amber-600' :
                                'bg-neutral-50 text-neutral-600'
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

              <div className="space-y-6">
                  <h3 className="text-xl font-black text-neutral-900 flex items-center gap-3">
                    <Clock className="text-indigo-600" size={20} />
                    Withdrawal History
                  </h3>
                  <div className="bg-white rounded-[40px] border border-neutral-100 overflow-hidden shadow-sm">
                    <table className="w-full text-left">
                      <thead className="bg-neutral-50 border-b border-neutral-100">
                        <tr>
                          <th className="px-8 py-4 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Amount</th>
                          <th className="px-8 py-4 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Method</th>
                          <th className="px-8 py-4 text-[10px] font-black text-neutral-400 uppercase tracking-widest text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {withdrawals.length === 0 ? (
                          <tr>
                            <td colSpan="3" className="px-8 py-12 text-center text-xs font-bold text-neutral-400">No withdrawals requested yet</td>
                          </tr>
                        ) : withdrawals.map((w, i) => (
                          <tr key={i} className="hover:bg-neutral-50/50 transition-colors">
                            <td className="px-8 py-5 font-black text-neutral-900 text-xs">${w.amount}</td>
                            <td className="px-8 py-5 text-xs font-bold text-neutral-600">{w.payment_method}</td>
                            <td className="px-8 py-5 text-right">
                              <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                                w.status === 'completed' || w.status === 'approved' ? 'bg-emerald-50 text-emerald-600' : 
                                w.status === 'pending' ? 'bg-blue-50 text-blue-600' :
                                w.status === 'rejected' ? 'bg-rose-50 text-rose-600' :
                                'bg-neutral-50 text-neutral-600'
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
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-black text-neutral-900 flex items-center gap-3">
                  <CreditCard className="text-emerald-600" size={20} />
                  Installment Tracking
                </h3>
                <div className="bg-white rounded-[40px] border border-neutral-100 overflow-hidden shadow-sm">
                  <table className="w-full text-left">
                    <thead className="bg-neutral-50 border-b border-neutral-100">
                      <tr>
                        <th className="px-8 py-4 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Client Order</th>
                        <th className="px-8 py-4 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Payment Amount</th>
                        <th className="px-8 py-4 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Method</th>
                        <th className="px-8 py-4 text-[10px] font-black text-neutral-400 uppercase tracking-widest text-right">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {payments.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="px-8 py-12 text-center text-xs font-bold text-neutral-400">No installments recorded yet</td>
                        </tr>
                      ) : payments.map((p, i) => (
                        <tr key={i} className="hover:bg-neutral-50/50 transition-colors">
                          <td className="px-8 py-5">
                            <div className="font-bold text-neutral-900 text-xs">{p.service_name}</div>
                            <div className="text-[10px] text-neutral-400 font-medium">Order #{p.order_number}</div>
                          </td>
                          <td className="px-8 py-5 font-black text-neutral-900 text-xs">${parseFloat(p.amount).toFixed(2)}</td>
                          <td className="px-8 py-5 text-xs font-bold text-neutral-500 uppercase">{p.payment_method}</td>
                          <td className="px-8 py-5 text-right text-[10px] font-bold text-neutral-400">
                            {new Date(p.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>

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
              className="absolute inset-y-0 left-0 w-80 bg-white p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-2xl font-black text-neutral-900 italic">Alliance</h2>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-neutral-400 hover:text-neutral-900 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="space-y-4">
                {[
                  { id: 'overview', icon: PieChart, label: 'Performance' },
                  { id: 'shop', icon: ShoppingBag, label: 'Alliance Shop' },
                  { id: 'referrals', icon: Users, label: 'Network' },
                  { id: 'earnings', icon: Wallet, label: 'Treasury' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id)
                      setMobileMenuOpen(false)
                    }}
                    className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl transition-all ${
                      activeTab === item.id 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'text-neutral-400 hover:text-neutral-900 hover:bg-neutral-50'
                    }`}
                  >
                    <item.icon size={20} />
                    <span className="text-xs font-black uppercase tracking-widest">{item.label}</span>
                  </button>
                ))}
              </nav>

              <div className="absolute bottom-8 left-8 right-8">
                <button 
                  onClick={() => onBack()}
                  className="w-full flex items-center justify-center gap-4 px-6 py-5 bg-neutral-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px]"
                >
                  <ArrowLeft size={16} />
                  Main Dashboard
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[2000]"
          >
            <div className={`px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/20 backdrop-blur-xl ${
              toast.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-neutral-900 text-white'
            }`}>
              <CheckCircle size={20} className={toast.type === 'success' ? 'text-white' : 'text-blue-500'} />
              <span className="text-xs font-black uppercase tracking-widest">{toast.message}</span>
            </div>
          </motion.div>
        )}

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
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative w-full max-w-lg bg-white rounded-[48px] p-12 shadow-2xl overflow-hidden"
            >
              <div className="mb-10 text-center">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Wallet size={32} />
                </div>
                <h3 className="text-2xl font-black text-neutral-900 mb-2">Treasury Withdrawal</h3>
                <p className="text-neutral-400 text-xs font-black uppercase tracking-widest">Available: ${stats?.current_balance}</p>
              </div>

              <form onSubmit={handleWithdrawalRequest} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Amount (USD)</label>
                  <input 
                    required
                    type="number"
                    min="10"
                    max={stats?.current_balance}
                    step="0.01"
                    value={withdrawalForm.amount}
                    onChange={(e) => setWithdrawalForm({...withdrawalForm, amount: e.target.value})}
                    placeholder="0.00"
                    className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Payment Method</label>
                  <select 
                    value={withdrawalForm.method}
                    onChange={(e) => setWithdrawalForm({...withdrawalForm, method: e.target.value})}
                    className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all appearance-none"
                  >
                    <option value="M-PESA">M-PESA</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Crypto">Crypto (USDT)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Payment Details</label>
                  <textarea 
                    required
                    value={withdrawalForm.details}
                    onChange={(e) => setWithdrawalForm({...withdrawalForm, details: e.target.value})}
                    placeholder="Phone number, Bank account, or Wallet address..."
                    className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all min-h-[100px] resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={withdrawalLoading}
                  className="w-full py-5 bg-neutral-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl disabled:opacity-50"
                >
                  {withdrawalLoading ? 'Processing Request...' : 'Initialize Withdrawal'}
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

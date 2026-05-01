import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, Trash2, Edit2, AlertCircle, Loader, ChevronDown, ChevronUp, 
  BarChart3, Code2, Settings, Users, RefreshCw, Zap, Shield, Plus, Box, Globe, Sparkles,
  ShieldOff, UserCheck, CreditCard, Timer, ToggleLeft, ToggleRight, Ban, ShieldCheck, Activity,
  Cpu, Rocket, Layout, Database, HeartHandshake, FileText, Menu as MenuIcon, X, Mail
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { 
  fetchLeads, fetchAllProjects, deleteLead, deleteProject, updateLead, updateProject,
  fetchAllUsers, deleteUser, updateUserProfile, fetchUserOrders, fetchPartnershipRequests, updatePartnershipRequest
} from '../utils/api'
import { MEMBERSHIP_TIERS } from '../utils/membership'

const AdminPanel = ({ onBack }) => {
  const { currentUser, isAdmin } = useAuth()
  const [leads, setLeads] = useState([])
  const [projects, setProjects] = useState([])
  const [users, setUsers] = useState([])
  const [orders, setOrders] = useState([])
  const [partnershipRequests, setPartnershipRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({})
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [expandedItems, setExpandedItems] = useState({})
  const [activeTab, setActiveTab] = useState('analytics')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [processing, setProcessing] = useState({})

  useEffect(() => {
    if (!isAdmin) {
      setError('Access Denied. Admin privileges required.')
      return
    }

    const loadData = async () => {
      try {
        setLoading(true)
        
        // Fetch sequentially or in smaller chunks if Neon is cold to avoid ETIMEDOUT/ECONNRESET
        const leadsData = await fetchLeads().catch(err => { if (err.response?.status === 401) return []; throw err; })
        const projectsData = await fetchAllProjects().catch(err => { if (err.response?.status === 401) return []; throw err; })
        const usersData = await fetchAllUsers().catch(err => { if (err.response?.status === 404 || err.response?.status === 401) return []; throw err; })
        const ordersData = await fetchUserOrders().catch(err => { if (err.response?.status === 401) return []; return []; })
        const partnershipData = await fetchPartnershipRequests().catch(err => { if (err.response?.status === 401) return []; return []; })
        
        setLeads(leadsData || [])
        setProjects(projectsData || [])
        setUsers(usersData || [])
        setOrders(ordersData || [])
        setPartnershipRequests(partnershipData || [])
        setError(null)
      } catch (err) {
        setError('Failed to load system data. Some services might be restricted.')
        console.error('Admin Load Error:', err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [isAdmin])

  const handleApprovePartnership = async (request) => {
    try {
      setLoading(true)
      const rUserId = request.userId || request.userid;
      // 1. Update request status
      await updatePartnershipRequest(request.id, { status: 'approved' })
      
      // 2. Update user tier
      await updateUserProfile(rUserId, { membership_tier: 'partner' })
      
      // 3. Update local state
      setPartnershipRequests(prev => prev.map(r => r.id === request.id ? { ...r, status: 'approved' } : r))
      setUsers(prev => prev.map(u => String(u.id) === String(rUserId) ? { ...u, membership_tier: 'partner' } : u))
      
      alert(`User ${request.userName} has been approved for the Alliance Partner tier.`)
    } catch (err) {
      console.error('Approval failed:', err)
      setError('Failed to approve partnership request.')
    } finally {
      setLoading(false)
    }
  }

  const handleRejectPartnership = async (requestId) => {
    if (!window.confirm('Are you sure you want to reject this application?')) return
    try {
      setLoading(true)
      await updatePartnershipRequest(requestId, { status: 'rejected' })
      setPartnershipRequests(prev => prev.map(r => r.id === requestId ? { ...r, status: 'rejected' } : r))
    } catch (err) {
      setError('Failed to reject partnership request.')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteLead = async (id) => {
    if (processing[id]) return
    try {
      setProcessing(prev => ({ ...prev, [id]: true }))
      await deleteLead(id)
      setLeads(prev => prev.filter((l) => l.id !== id))
      setDeleteConfirm(null)
    } catch (err) {
      setError('Failed to delete lead')
    } finally {
      setProcessing(prev => ({ ...prev, [id]: false }))
    }
  }

  const handleDeleteProject = async (id) => {
    if (processing[id]) return
    try {
      setProcessing(prev => ({ ...prev, [id]: true }))
      await deleteProject(id)
      setProjects(prev => prev.filter((p) => p.id !== id))
      setDeleteConfirm(null)
    } catch (err) {
      setError('Failed to delete project')
    } finally {
      setProcessing(prev => ({ ...prev, [id]: false }))
    }
  }

  const handleDeleteUser = async (id) => {
    if (processing[id]) return
    try {
      setProcessing(prev => ({ ...prev, [id]: true }))
      await deleteUser(id)
      setUsers(prev => prev.filter((u) => u.id !== id))
      setDeleteConfirm(null)
    } catch (err) {
      setError('Failed to delete user')
    } finally {
      setProcessing(prev => ({ ...prev, [id]: false }))
    }
  }

  const handleUpdateUser = async (id, data) => {
    if (processing[id]) return
    try {
      setProcessing(prev => ({ ...prev, [id]: true }))
      const updatedUser = await updateUserProfile(id, data)
      setUsers(users.map((u) => (String(u.id) === String(id) ? { ...u, ...updatedUser } : u)))
      setError(null)
    } catch (err) {
      setError('Failed to update user status')
    } finally {
      setProcessing(prev => ({ ...prev, [id]: false }))
    }
  }

  const handleEditLead = async (id) => {
    if (processing[id]) return
    try {
      setProcessing(prev => ({ ...prev, [id]: true }))
      await updateLead(id, editData[id] || {})
      setLeads(leads.map((l) => (l.id === id ? { ...l, ...editData[id] } : l)))
      setEditingId(null)
      setEditData({})
    } catch (err) {
      setError('Failed to update lead')
    } finally {
      setProcessing(prev => ({ ...prev, [id]: false }))
    }
  }

  const handleEditProject = async (id, directData = null) => {
    if (processing[id]) return
    try {
      setProcessing(prev => ({ ...prev, [id]: true }))
      const currentProject = projects.find(p => p.id === id);
      const updatedData = directData || editData[id] || {};
      
      // If URL changed, update thumbnail automatically
      if (updatedData.data?.url && updatedData.data.url !== currentProject.data?.url) {
        updatedData.thumbnail = `https://s.wordpress.com/mshots/v1/${encodeURIComponent(updatedData.data.url)}?w=1280`;
      }

      await updateProject(id, updatedData)
      setProjects(projects.map((p) => (p.id === id ? { ...p, ...updatedData } : p)))
      setEditingId(null)
      setEditData(prev => {
        const newData = { ...prev };
        delete newData[id];
        return newData;
      })
    } catch (err) {
      setError('Failed to update project')
    } finally {
      setProcessing(prev => ({ ...prev, [id]: false }))
    }
  }

  const navigateToUser = (userId) => {
    setActiveTab('users');
    setExpandedItems({ [userId]: true });
  }

  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-50 pt-20 flex items-center justify-center">
        <div className="bg-white p-12 rounded-[3rem] border border-slate-200 max-w-md text-center shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-rose-500" />
          <AlertCircle className="w-16 h-16 text-rose-500 mx-auto mb-6" />
          <h1 className="text-3xl font-black mb-4 uppercase italic tracking-tight">Access Denied</h1>
          <p className="text-slate-500 mb-10 font-medium">You do not have the required clearance level to access the central control hub.</p>
          <motion.button
            onClick={() => onBack(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-4 bg-neutral-950 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg hover:shadow-neutral-200 transition-all"
          >
            Return to Surface
          </motion.button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-500/30 overflow-hidden">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/5 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200 py-4 px-4 sm:px-8 z-50 shadow-sm flex-shrink-0">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between w-full">
          <div className="flex items-center gap-4 sm:gap-6">
            <motion.button
              onClick={() => onBack('landing')}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(0,0,0,0.05)' }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 hover:text-blue-600 transition-all border border-slate-200"
            >
              <ArrowLeft size={18} />
            </motion.button>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-black italic shadow-lg shadow-blue-500/20">A</div>
              <div className="flex flex-col">
                <span className="font-black text-lg text-slate-900 tracking-tighter leading-none uppercase italic">Admin</span>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-1">Control Center</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-4 pr-6 border-r border-slate-200">
              <div className="text-right">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Admin Session</div>
                <div className="text-sm font-bold text-slate-900">{currentUser?.email || 'Administrator'}</div>
              </div>
              <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-black border border-white/20 shadow-sm overflow-hidden uppercase">
                {currentUser?.email?.charAt(0) || 'A'}
              </div>
            </div>

            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(0,0,0,0.05)' }}
              whileTap={{ scale: 0.95 }}
              className="lg:hidden w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 hover:text-blue-600 transition-all border border-slate-200"
            >
              {isMobileMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
            </motion.button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex max-w-[1600px] mx-auto w-full relative z-10 overflow-hidden">
        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
              />
              <motion.aside
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 left-0 bottom-0 w-80 bg-white z-50 lg:hidden flex flex-col p-6 shadow-2xl border-r border-slate-200"
              >
                <div className="flex items-center gap-3 mb-10 px-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-black italic">A</div>
                  <div className="flex flex-col">
                    <span className="font-black text-lg text-slate-900 tracking-tighter leading-none uppercase italic">Admin</span>
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-1">Control Center</span>
                  </div>
                </div>

                <div className="space-y-2 flex-1">
                  {[
                    { id: 'analytics', label: 'Overview', icon: BarChart3 },
                    { id: 'partnership', label: 'Alliance Hub', icon: HeartHandshake },
                    { id: 'users', label: 'User Hub', icon: Users },
                    { id: 'marketing', label: 'Marketing Hub', icon: Activity },
                    { id: 'leads', label: 'Lead Engine', icon: Sparkles },
                    { id: 'projects', label: 'Project Matrix', icon: Box },
                  ].map((item) => {
                    const Icon = item.icon
                    const isActive = activeTab === item.id
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id)
                          setIsMobileMenuOpen(false)
                        }}
                        className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-bold text-[11px] uppercase tracking-widest transition-all duration-300 relative ${
                          isActive 
                            ? 'text-blue-700 bg-blue-50/50' 
                            : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          isActive ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-400'
                        }`}>
                          <Icon size={16} />
                        </div>
                        <span>{item.label}</span>
                      </button>
                    )
                  })}
                </div>

                <div className="mt-auto pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-3 mb-4 px-2">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-900 font-bold uppercase">
                      {currentUser?.email?.charAt(0) || 'A'}
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-xs font-bold text-slate-900 truncate">{currentUser?.email || 'Admin'}</span>
                      <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">Active Session</span>
                    </div>
                  </div>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <aside className="w-72 p-6 hidden lg:flex flex-col flex-shrink-0 h-full border-r border-slate-100 bg-white/50 backdrop-blur-sm">
          <div className="space-y-2 flex-1">
            {[
              { id: 'analytics', label: 'Overview', icon: BarChart3 },
              { id: 'partnership', label: 'Alliance Hub', icon: HeartHandshake },
              { id: 'users', label: 'User Hub', icon: Users },
              { id: 'marketing', label: 'Marketing Hub', icon: Activity },
              { id: 'leads', label: 'Lead Engine', icon: Sparkles },
              { id: 'projects', label: 'Project Matrix', icon: Box },
            ].map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl font-bold text-[11px] uppercase tracking-widest transition-all duration-300 relative group ${
                    isActive 
                      ? 'text-blue-700' 
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="sidebar-active"
                      className="absolute inset-0 bg-white border border-slate-200 rounded-2xl shadow-sm"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <div className={`relative z-10 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                    isActive ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                  }`}>
                    <Icon size={16} />
                  </div>
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
                  )}
                </button>
              )
            })}
          </div>

          <div className="pt-6 border-t border-slate-200">
            <div className="bg-neutral-950 p-6 rounded-[2rem] border border-neutral-800 relative overflow-hidden group shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-700" />
              <div className="relative z-10">
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-2">System Status</p>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                  <span className="text-xs font-bold text-white uppercase tracking-widest">Operational</span>
                </div>
                <p className="text-[10px] text-neutral-500 leading-relaxed font-medium">All infrastructure nodes are healthy and performing at peak efficiency.</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-10 custom-scrollbar">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-rose-50 border border-rose-200 p-6 rounded-2xl mb-8 flex items-start gap-4 shadow-sm"
            >
              <AlertCircle className="w-6 h-6 text-rose-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-rose-900 uppercase text-xs tracking-widest mb-1">System Alert</h3>
                <p className="text-rose-600 text-sm font-medium">{error}</p>
              </div>
            </motion.div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="relative">
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                </div>
              </div>
              <p className="mt-6 text-xs font-black text-slate-400 uppercase tracking-[0.3em] animate-pulse">Syncing Matrix...</p>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Analytics Tab */}
                  {activeTab === 'analytics' && (
                    <div className="space-y-10">
                      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                          <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-3">Enterprise Intelligence</p>
                          <h2 className="text-4xl sm:text-5xl font-black text-neutral-950 uppercase italic tracking-tighter leading-none">
                            Platform <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Overview</span>
                          </h2>
                        </div>
                        <div className="flex items-center gap-3">
                          <button onClick={() => window.location.reload()} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                            <RefreshCw size={14} />
                            Refresh Data
                          </button>
                        </div>
                      </div>
                      
                      {/* Stats Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                        {[
                          { label: 'Total Users', value: users.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-600/10' },
                          { label: 'Alliance Req', value: partnershipRequests.filter(r => r.status === 'pending').length, icon: HeartHandshake, color: 'text-emerald-600', bg: 'bg-emerald-600/10' },
                          { label: 'Total Leads', value: leads.length, icon: Sparkles, color: 'text-indigo-600', bg: 'bg-indigo-600/10' },
                          { label: 'Infrastructure', value: projects.length, icon: Box, color: 'text-amber-500', bg: 'bg-amber-500/10' },
                          { label: 'Active Status', value: '99.9%', icon: Shield, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                        ].map((stat, i) => (
                          <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm shadow-slate-200/50 group transition-all"
                          >
                            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                              <stat.icon size={24} />
                            </div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                            <p className="text-3xl font-black text-neutral-950 tracking-tighter italic">{stat.value}</p>
                          </motion.div>
                        ))}
                      </div>

                      {/* Summary Section */}
                      <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm shadow-slate-200/50">
                          <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-black text-neutral-950 uppercase italic tracking-tight">Recent Inquiries</h3>
                            <button onClick={() => setActiveTab('leads')} className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">View All Leads</button>
                          </div>
                          <div className="space-y-4">
                            {leads.slice(0, 5).map((lead) => (
                              <div key={lead.id} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:border-blue-100 hover:shadow-md transition-all group">
                                <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 bg-white rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 font-bold group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all uppercase">
                                    {lead.name?.charAt(0) || 'L'}
                                  </div>
                                  <div>
                                    <p className="font-bold text-neutral-950 text-sm">{lead.name || 'Anonymous'}</p>
                                    <p className="text-slate-500 text-[10px] font-medium tracking-wide uppercase">{lead.email}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                    {lead.created && new Date(lead.created).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            ))}
                            {leads.length === 0 && (
                              <div className="py-12 text-center">
                                <Users className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                                <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">No Recent Signals</p>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="bg-neutral-950 p-8 rounded-[2.5rem] text-white flex flex-col justify-between overflow-hidden relative">
                          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px]" />
                          <div className="relative z-10">
                            <h3 className="text-xl font-black uppercase italic tracking-tight mb-6">Quick Actions</h3>
                            <div className="space-y-4">
                              <button onClick={() => setActiveTab('users')} className="w-full flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-blue-600 transition-all group">
                                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white">
                                  <Users size={20} />
                                </div>
                                <span className="font-bold text-sm uppercase tracking-widest">Manage Users</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Partnership Tab */}
                  {activeTab === 'partnership' && (
                    <div className="space-y-16 pb-20">
                      {/* Header Section */}
                      <div className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 rounded-[3rem] p-12 md:p-16 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                              <HeartHandshake size={24} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Alliance Protocol</span>
                          </div>
                          <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none mb-6">
                            Partnership <span className="text-blue-500">Requests</span>
                          </h2>
                          <p className="text-neutral-400 font-medium text-lg max-w-xl">
                            Review and manage alliance partner applications. Approve or reject business partnerships.
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-[3rem] border border-neutral-100 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] overflow-hidden">
                        {partnershipRequests.length === 0 ? (
                          <div className="p-24 text-center">
                            <HeartHandshake className="w-20 h-20 text-neutral-200 mx-auto mb-6" />
                            <p className="text-neutral-400 font-bold uppercase tracking-widest text-sm">Zero Alliance Applications</p>
                          </div>
                        ) : (
                          <div className="divide-y divide-neutral-100">
                            {partnershipRequests.map((request) => (
                              <div key={request.id} className="p-8 md:p-12 hover:bg-neutral-50/50 transition-colors group">
                                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                                  {/* Business Info */}
                                  <div className="flex items-center gap-8">
                                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-[1.5rem] flex items-center justify-center font-black text-3xl uppercase shadow-lg shadow-blue-600/20">
                                      {request.businessName?.charAt(0) || 'B'}
                                    </div>
                                    <div>
                                      <div className="flex items-center gap-4 mb-3">
                                        <h3 className="font-black text-neutral-950 text-2xl uppercase tracking-tight italic">{request.businessName}</h3>
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm ${
                                          request.status === 'approved' 
                                            ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                                            : request.status === 'rejected'
                                            ? 'bg-rose-50 text-rose-600 border-rose-100'
                                            : 'bg-amber-50 text-amber-600 border-amber-100'
                                        }`}>
                                          {request.status || 'Pending'}
                                        </span>
                                      </div>
                                      <div className="flex flex-wrap items-center gap-6">
                                        <p className="text-neutral-500 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                                          <Users size={14} className="text-neutral-400" /> {request.userName}
                                        </p>
                                        <p className="text-neutral-500 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                                          <Layout size={14} className="text-neutral-400" /> {request.businessType}
                                        </p>
                                        {request.website && (
                                          <a href={request.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold text-xs uppercase tracking-widest hover:underline flex items-center gap-2">
                                            <Globe size={14} /> Visit Website
                                          </a>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {/* Actions */}
                                  <div className="flex items-center gap-4">
                                    <button
                                      onClick={() => toggleExpand(`request-${request.id}`)}
                                      className={`px-8 py-4 bg-neutral-50 border border-neutral-200 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-neutral-100 transition-all ${expandedItems[`request-${request.id}`] ? 'bg-neutral-200' : ''}`}
                                    >
                                      {expandedItems[`request-${request.id}`] ? 'Hide Details' : 'View Details'}
                                    </button>
                                    {(!request.status || request.status === 'pending') && (
                                      <>
                                        <button
                                          onClick={() => handleApprovePartnership(request)}
                                          className="px-8 py-4 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
                                        >
                                          Approve
                                        </button>
                                        <button
                                          onClick={() => handleRejectPartnership(request.id)}
                                          className="px-8 py-4 bg-rose-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all shadow-lg shadow-rose-500/20"
                                        >
                                          Reject
                                        </button>
                                      </>
                                    )}
                                  </div>
                                </div>

                                <AnimatePresence>
                                  {expandedItems[`request-${request.id}`] && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: 'auto' }}
                                      exit={{ opacity: 0, height: 0 }}
                                      className="overflow-hidden"
                                    >
                                      <div className="mt-12 p-10 bg-neutral-50 rounded-[2.5rem] border border-neutral-100 space-y-10">
                                        {/* Business Details Grid */}
                                        <div className="grid md:grid-cols-2 gap-8">
                                          <div className="bg-white p-8 rounded-[2rem] border border-neutral-200">
                                            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-4">Operations Overview</p>
                                            <p className="text-sm font-medium text-neutral-600 leading-relaxed">
                                              {request.description || 'No description provided'}
                                            </p>
                                          </div>
                                          <div className="bg-white p-8 rounded-[2rem] border border-neutral-200">
                                            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-4">Verification Credentials</p>
                                            <div className="flex items-center justify-between">
                                              <div>
                                                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest leading-none mb-2">Tax ID / National ID</p>
                                                <p className="text-xl font-black text-neutral-900 tracking-tighter">{request.credentials || 'Not provided'}</p>
                                              </div>
                                              <ShieldCheck className="text-blue-600" size={40} />
                                            </div>
                                          </div>
                                        </div>
                                        
                                        {/* Financial Overview */}
                                        <div className="grid md:grid-cols-2 gap-8">
                                          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-8 rounded-[2rem] border border-emerald-200">
                                            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-4">Annual Revenue</p>
                                            <p className="text-4xl font-black text-emerald-700 tracking-tighter">
                                              {request.revenue_currency || 'USD'} {request.annual_revenue ? parseFloat(request.annual_revenue).toLocaleString() : '0'}
                                            </p>
                                            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mt-2">Per Annum</p>
                                          </div>
                                          <div className="bg-white p-8 rounded-[2rem] border border-neutral-200">
                                            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-4">Business Website</p>
                                            {request.website ? (
                                              <a 
                                                href={request.website} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 text-xl font-black text-blue-600 hover:text-blue-700 transition-colors"
                                              >
                                                <Globe size={24} />
                                                {request.website}
                                              </a>
                                            ) : (
                                              <p className="text-neutral-400 font-medium">Not provided</p>
                                            )}
                                          </div>
                                        </div>
                                        
                                        {/* Uploaded Documents/Images */}
                                        {(request.registration_document_path || request.bank_statement_path || request.mobile_money_statement_path) && (
                                          <div>
                                            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-6">Uploaded Documents</p>
                                            <div className="grid md:grid-cols-3 gap-6">
                                              {request.registration_document_path && (
                                                <div className="bg-white p-6 rounded-2xl border border-neutral-200">
                                                  <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-3">Registration Document</p>
                                                  <div className="aspect-video bg-neutral-100 rounded-xl overflow-hidden">
                                                    <img 
                                                      src={request.registration_document_path} 
                                                      alt="Registration Document" 
                                                      className="w-full h-full object-cover"
                                                      onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'flex';
                                                      }}
                                                    />
                                                    <div className="w-full h-full hidden items-center justify-center text-neutral-400">
                                                      <FileText size={40} />
                                                    </div>
                                                  </div>
                                                </div>
                                              )}
                                              {request.bank_statement_path && (
                                                <div className="bg-white p-6 rounded-2xl border border-neutral-200">
                                                  <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-3">Bank Statement</p>
                                                  <div className="aspect-video bg-neutral-100 rounded-xl overflow-hidden">
                                                    <img 
                                                      src={request.bank_statement_path} 
                                                      alt="Bank Statement" 
                                                      className="w-full h-full object-cover"
                                                      onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'flex';
                                                      }}
                                                    />
                                                    <div className="w-full h-full hidden items-center justify-center text-neutral-400">
                                                      <FileText size={40} />
                                                    </div>
                                                  </div>
                                                </div>
                                              )}
                                              {request.mobile_money_statement_path && (
                                                <div className="bg-white p-6 rounded-2xl border border-neutral-200">
                                                  <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-3">Mobile Money Statement</p>
                                                  <div className="aspect-video bg-neutral-100 rounded-xl overflow-hidden">
                                                    <img 
                                                      src={request.mobile_money_statement_path} 
                                                      alt="Mobile Money Statement" 
                                                      className="w-full h-full object-cover"
                                                      onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'flex';
                                                      }}
                                                    />
                                                    <div className="w-full h-full hidden items-center justify-center text-neutral-400">
                                                      <FileText size={40} />
                                                    </div>
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Users Tab */}
                  {activeTab === 'users' && (
                    <div className="space-y-16 pb-20">
                      {/* Header Section */}
                      <div className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 rounded-[3rem] p-12 md:p-16 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center">
                              <Users size={24} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Identity Matrix</span>
                          </div>
                          <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none mb-6">
                            User <span className="text-indigo-500">Hub</span>
                          </h2>
                          <p className="text-neutral-400 font-medium text-lg max-w-xl">
                            Manage and view all registered users. Access comprehensive user details and account controls.
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-[3rem] border border-neutral-100 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] overflow-hidden">
                        {users.length === 0 ? (
                          <div className="p-24 text-center">
                            <Users className="w-16 h-16 text-slate-100 mx-auto mb-6" />
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Zero Authenticated Nodes</p>
                          </div>
                        ) : (
                          <div className="divide-y divide-slate-50">
                            {users.map((user) => (
                              <div key={user.id} className={`p-6 sm:p-8 hover:bg-slate-50/50 transition-colors group ${user.suspended ? 'opacity-60 grayscale-[0.5]' : ''}`}>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                                  <div className="flex items-center gap-5">
                                    <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center text-slate-400 font-black text-xl transition-all uppercase ${
                                      user.suspended ? 'bg-slate-200 border-slate-300' : 'bg-white border-slate-200 group-hover:bg-neutral-950 group-hover:text-white group-hover:border-neutral-950'
                                    }`}>
                                      {(user.name || user.first_name || user.email)?.charAt(0) || 'U'}
                                    </div>
                                    <div>
                                      <div className="flex items-center gap-3">
                                        <h3 className="font-black text-neutral-950 text-lg uppercase tracking-tight">{user.name || `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.email}</h3>
                                        {user.suspended && (
                                          <span className="px-2 py-0.5 bg-rose-500 text-white rounded-md text-[8px] font-black uppercase tracking-[0.1em]">Suspended</span>
                                        )}
                                      </div>
                                      <div className="flex items-center gap-3">
                                        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">{user.email} • ID: {String(user.id).substring(0, 8)}...</p>
                                        <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-[0.1em] border ${
                                          user.membership_tier === 'admin' 
                                            ? 'bg-rose-50 text-rose-600 border-rose-100' 
                                            : 'bg-blue-50 text-blue-600 border-blue-100'
                                        }`}>
                                          {MEMBERSHIP_TIERS[user.membership_tier?.toUpperCase()]?.name || user.membership_tier || 'MEMBER'}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <button
                                      onClick={() => toggleExpand(user.id)}
                                      className={`p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all ${expandedItems[user.id] ? 'bg-slate-100' : ''}`}
                                    >
                                      {expandedItems[user.id] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                    </button>
                                    <button
                                      onClick={() => handleUpdateUser(user.id, { suspended: !user.suspended })}
                                      disabled={processing[user.id]}
                                      className={`p-3 border rounded-xl transition-all ${
                                        user.suspended 
                                          ? 'bg-emerald-50 border-emerald-100 text-emerald-600 hover:bg-emerald-100' 
                                          : 'bg-rose-50 border-rose-100 text-rose-600 hover:bg-rose-100'
                                      } ${processing[user.id] ? 'opacity-50 cursor-not-allowed' : ''}`}
                                      title={user.suspended ? 'Unsuspend Account' : 'Suspend Account'}
                                    >
                                      {processing[user.id] ? <Loader size={18} className="animate-spin" /> : (user.suspended ? <UserCheck size={18} /> : <Ban size={18} />)}
                                    </button>
                                    <button
                                      onClick={() => setDeleteConfirm({ type: 'user', id: user.id })}
                                      className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-rose-600 hover:border-rose-200 transition-all"
                                      title="Delete Account Permanently"
                                    >
                                      <Trash2 size={18} />
                                    </button>
                                  </div>
                                </div>

                                <AnimatePresence>
                                  {expandedItems[user.id] && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: 'auto' }}
                                      exit={{ opacity: 0, height: 0 }}
                                      className="overflow-hidden"
                                    >
                                      <div className="mt-8 space-y-8">
                                        {/* User Profile Overview - Full Width */}
                                        <div className="bg-gradient-to-br from-neutral-950 to-neutral-800 p-8 rounded-[2.5rem] text-white">
                                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                            <div className="flex items-center gap-6">
                                              <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center text-3xl font-black uppercase border-2 border-white/20">
                                                {(user.name || user.first_name || user.email)?.charAt(0) || 'U'}
                                              </div>
                                              <div>
                                                <h3 className="text-2xl font-black uppercase tracking-tight">{user.name || `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Unnamed User'}</h3>
                                                <p className="text-white/60 font-bold text-sm uppercase tracking-widest">{user.email}</p>
                                              </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                              <div className={`px-4 py-2 rounded-xl text-xs font-black uppercase ${
                                                user.subscription_status === 'active' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                                              }`}>
                                                {user.subscription_status || 'inactive'}
                                              </div>
                                              <div className={`px-4 py-2 rounded-xl text-xs font-black uppercase ${
                                                user.membership_tier === 'admin' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                              }`}>
                                                {MEMBERSHIP_TIERS[user.membership_tier?.toUpperCase()]?.name || user.membership_tier || 'MEMBER'}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        
                                        {/* User Details Grid */}
                                        <div className="grid lg:grid-cols-3 gap-6">
                                          {/* Personal Information */}
                                          <div className="bg-white p-6 rounded-[2rem] border border-slate-200 space-y-4">
                                            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                              <Users size={16} className="text-blue-600" /> Personal Details
                                            </h4>
                                            <div className="space-y-3">
                                              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                                <span className="text-[10px] font-black text-slate-400 uppercase">Full Name</span>
                                                <span className="text-sm font-bold text-slate-900">{user.name || `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Not provided'}</span>
                                              </div>
                                              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                                <span className="text-[10px] font-black text-slate-400 uppercase">First Name</span>
                                                <span className="text-sm font-bold text-slate-900">{user.first_name || 'Not provided'}</span>
                                              </div>
                                              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                                <span className="text-[10px] font-black text-slate-400 uppercase">Last Name</span>
                                                <span className="text-sm font-bold text-slate-900">{user.last_name || 'Not provided'}</span>
                                              </div>
                                              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                                <span className="text-[10px] font-black text-slate-400 uppercase">Phone</span>
                                                <span className="text-sm font-bold text-slate-900">{user.phone_number || 'Not provided'}</span>
                                              </div>
                                              <div className="flex justify-between items-center py-2">
                                                <span className="text-[10px] font-black text-slate-400 uppercase">User ID</span>
                                                <span className="text-sm font-bold text-slate-900 font-mono">#{user.id}</span>
                                              </div>
                                            </div>
                                          </div>
                                          
                                          {/* Account Information */}
                                          <div className="bg-white p-6 rounded-[2rem] border border-slate-200 space-y-4">
                                            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                              <Shield size={16} className="text-indigo-600" /> Account Authority
                                            </h4>
                                            <div className="space-y-3">
                                              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                                <span className="text-[10px] font-black text-slate-400 uppercase">Role</span>
                                                <span className="text-sm font-bold text-slate-900 uppercase">{user.role || 'user'}</span>
                                              </div>
                                              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                                <span className="text-[10px] font-black text-slate-400 uppercase">Membership</span>
                                                <span className="text-sm font-bold text-indigo-600 uppercase">{user.membership_tier ? MEMBERSHIP_TIERS[user.membership_tier?.toUpperCase()]?.name : 'No Membership'}</span>
                                              </div>
                                              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                                <span className="text-[10px] font-black text-slate-400 uppercase">Subscription</span>
                                                <span className={`text-sm font-bold uppercase ${user.subscription_status === 'active' ? 'text-emerald-600' : 'text-slate-400'}`}>
                                                  {user.subscription_status || 'inactive'}
                                                </span>
                                              </div>
                                              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                                <span className="text-[10px] font-black text-slate-400 uppercase">Next Billing</span>
                                                <span className="text-sm font-bold text-slate-900">
                                                  {user.next_billing_date ? new Date(user.next_billing_date).toLocaleDateString() : 'N/A'}
                                                </span>
                                              </div>
                                              <div className="flex justify-between items-center py-2">
                                                <span className="text-[10px] font-black text-slate-400 uppercase">Joined</span>
                                                <span className="text-sm font-bold text-slate-900">
                                                  {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                          
                                          {/* Financial Overview */}
                                          <div className="bg-white p-6 rounded-[2rem] border border-slate-200 space-y-4">
                                            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                              <CreditCard size={16} className="text-emerald-600" /> Financial Overview
                                            </h4>
                                            <div className="space-y-3">
                                              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                                <span className="text-[10px] font-black text-slate-400 uppercase">Total Orders</span>
                                                <span className="text-sm font-bold text-slate-900">{orders.filter(o => String(o.userId || o.userid) === String(user.id)).length}</span>
                                              </div>
                                              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                                <span className="text-[10px] font-black text-slate-400 uppercase">Total Spent</span>
                                                <span className="text-sm font-bold text-emerald-600">
                                                  ${orders.filter(o => String(o.userId || o.userid) === String(user.id)).reduce((acc, o) => acc + (parseFloat(o.amount) || 0), 0).toLocaleString()}
                                                </span>
                                              </div>
                                              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                                <span className="text-[10px] font-black text-slate-400 uppercase">Active Projects</span>
                                                <span className="text-sm font-bold text-slate-900">{projects.filter(p => String(p.userId || p.userid) === String(user.id)).length}</span>
                                              </div>
                                              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                                <span className="text-[10px] font-black text-slate-400 uppercase">Live Sites</span>
                                                <span className="text-sm font-bold text-emerald-600">
                                                  {projects.filter(p => String(p.userId || p.userid) === String(user.id) && p.status === 'live').length}
                                                </span>
                                              </div>
                                              <div className="flex justify-between items-center py-2">
                                                <span className="text-[10px] font-black text-slate-400 uppercase">Unlocked Tools</span>
                                                <span className="text-sm font-bold text-blue-600">{user.unlocked_tools?.length || 0}</span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        
                                        {/* Tools & Activated Features */}
                                        <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 space-y-6">
                                          <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                            <Zap size={16} className="text-amber-500" /> Tools & Access
                                          </h4>
                                          <div className="grid md:grid-cols-2 gap-6">
                                            <div className="bg-white p-6 rounded-2xl border border-slate-200">
                                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Unlocked Tools</p>
                                              <div className="flex flex-wrap gap-2">
                                                {user.unlocked_tools && user.unlocked_tools.length > 0 ? (
                                                  user.unlocked_tools.map((tool, idx) => (
                                                    <span key={idx} className="px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase">{tool}</span>
                                                  ))
                                                ) : (
                                                  <span className="text-slate-400 text-sm">No tools unlocked</span>
                                                )}
                                              </div>
                                            </div>
                                            <div className="bg-white p-6 rounded-2xl border border-slate-200">
                                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Activated Tools</p>
                                              <div className="flex flex-wrap gap-2">
                                                {user.activated_tools && user.activated_tools.length > 0 ? (
                                                  user.activated_tools.map((tool, idx) => (
                                                    <span key={idx} className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase">{tool}</span>
                                                  ))
                                                ) : (
                                                  <span className="text-slate-400 text-sm">No tools activated</span>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        
                                        {/* User Projects & Domain Control */}
                                        <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 space-y-8">
                                          <div className="flex items-center justify-between">
                                            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                              <Globe size={16} className="text-blue-600" /> Infrastructure & Projects
                                            </h4>
                                            <span className="text-xs font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                              {projects.filter(p => String(p.userId || p.userid) === String(user.id)).length} Active
                                            </span>
                                          </div>
                                          
                                          <div className="space-y-6">
                                            <div className="space-y-4">
                                              <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                                                {projects.filter(p => String(p.userId || p.userid) === String(user.id)).map((project) => (
                                                  <div key={project.id} className="p-6 bg-white rounded-[2rem] border border-slate-200 shadow-sm space-y-6 group hover:border-blue-300 transition-all">
                                                    <div className="flex items-center justify-between">
                                                      <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 font-black group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                                                          {project.title?.charAt(0) || 'P'}
                                                        </div>
                                                        <div>
                                                          <p className="text-sm font-black text-neutral-950 uppercase tracking-tight">{project.title || 'Untitled Node'}</p>
                                                          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{project.template || 'Enterprise Core'}</p>
                                                        </div>
                                                      </div>
                                                      <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                                                        project.status === 'live' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-100 text-slate-500 border-slate-200'
                                                      }`}>
                                                        {project.status?.replace('_', ' ') || 'Offline'}
                                                      </div>
                                                    </div>

                                                    <div className="grid sm:grid-cols-2 gap-4">
                                                      <div className="space-y-2">
                                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Domain Endpoint</p>
                                                        <input 
                                                          type="text"
                                                          placeholder="example.com"
                                                          defaultValue={project.domain || ''}
                                                          onBlur={(e) => {
                                                            if (e.target.value !== project.domain) {
                                                              handleEditProject(project.id, { domain: e.target.value });
                                                            }
                                                          }}
                                                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-neutral-950 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                                        />
                                                      </div>
                                                      <div className="space-y-2">
                                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Transmission Progress</p>
                                                        <input 
                                                          type="text"
                                                          placeholder="e.g. 85% Complete"
                                                          defaultValue={project.progress_status || ''}
                                                          onBlur={(e) => {
                                                            if (e.target.value !== project.progress_status) {
                                                              handleEditProject(project.id, { progress_status: e.target.value });
                                                            }
                                                          }}
                                                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-neutral-950 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                                        />
                                                      </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Central Logic Override</p>
                                                      <select
                                                        defaultValue={project.status || 'pending_payment'}
                                                        onChange={(e) => handleEditProject(project.id, { status: e.target.value })}
                                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-[10px] font-black outline-none focus:ring-2 focus:ring-blue-500 transition-all uppercase"
                                                      >
                                                        <option value="pending_payment">PENDING PAYMENT</option>
                                                        <option value="in_development">IN DEVELOPMENT</option>
                                                        <option value="review">CLIENT REVIEW</option>
                                                        <option value="live">LIVE PRODUCTION</option>
                                                        <option value="suspended">SUSPENDED</option>
                                                      </select>
                                                    </div>

                                                    <div className="space-y-2">
                                                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Latest Modification Log</p>
                                                      <textarea 
                                                        rows="3"
                                                        placeholder="Describe latest infrastructure updates..."
                                                        defaultValue={project.latest_update || ''}
                                                        onBlur={(e) => {
                                                          if (e.target.value !== project.latest_update) {
                                                            handleEditProject(project.id, { latest_update: e.target.value });
                                                          }
                                                        }}
                                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-neutral-950 outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                                                      />
                                                    </div>
                                                  </div>
                                                ))}
                                                {projects.filter(p => String(p.userId || p.userid) === String(user.id)).length === 0 && (
                                                  <div className="py-20 text-center bg-white rounded-[3rem] border border-dashed border-slate-200">
                                                    <Box className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">No Active Nodes Detected</p>
                                                  </div>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        {/* Billing & Privilege Control */}
                                        <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 space-y-8">
                                          <div className="flex items-center justify-between">
                                            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                              <Shield size={16} className="text-indigo-600" /> Account Authority
                                            </h4>
                                            <div className="text-right flex items-center gap-4">
                                              <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase ${
                                                user.subscription_status === 'active' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-500'
                                              }`}>
                                                {user.subscription_status || 'inactive'}
                                              </div>
                                              <div>
                                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">Total Investment</p>
                                                <p className="text-sm font-black text-indigo-600 italic tracking-tighter">
                                                  ${orders.filter(o => String(o.userId || o.userid) === String(user.id)).reduce((acc, o) => acc + (parseFloat(o.amount) || 0), 0).toLocaleString()}
                                                </p>
                                              </div>
                                            </div>
                                          </div>

                                          <div className="space-y-6">
                                            <div className="grid grid-cols-2 gap-4">
                                              <div className="p-5 bg-white rounded-3xl border border-slate-100 space-y-3">
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Membership Tier</p>
                                                <select 
                                                  value={user.membership_tier || ''}
                                                  onChange={(e) => handleUpdateUser(user.id, { membership_tier: e.target.value })}
                                                  className="w-full bg-slate-50 border-none rounded-xl text-[10px] font-black px-3 py-2 outline-none uppercase"
                                                >
                                                  {Object.values(MEMBERSHIP_TIERS).map(tier => (
                                                    <option key={tier.id} value={tier.id}>{tier.name}</option>
                                                  ))}
                                                  <option value="admin">ADMIN</option>
                                                </select>
                                              </div>
                                              <div className="p-5 bg-white rounded-3xl border border-slate-100 space-y-3">
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Sync Status</p>
                                                <button 
                                                  onClick={() => handleUpdateUser(user.id, { subscription_status: user.subscription_status === 'active' ? 'inactive' : 'active' })}
                                                  className={`w-full py-2 rounded-xl text-[9px] font-black uppercase transition-all ${
                                                    user.subscription_status === 'active' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
                                                  }`}
                                                >
                                                  {user.subscription_status === 'active' ? 'Deactivate' : 'Activate'}
                                                </button>
                                              </div>
                                            </div>

                                            <div className="p-6 bg-neutral-950 rounded-[2rem] text-white">
                                              <div className="flex items-center justify-between mb-4">
                                                <span className="text-[9px] font-black uppercase tracking-widest text-indigo-400">Security Pulse</span>
                                                <ShieldCheck size={14} className="text-indigo-400" />
                                              </div>
                                              <p className="text-[10px] font-medium text-slate-400 leading-relaxed">
                                                This identity node is currently {user.suspended ? 'DECOMMISSIONED' : 'OPERATIONAL'}. All encryption protocols are active.
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Marketing Hub Tab */}
                  {activeTab === 'marketing' && (
                    <div className="space-y-8">
                      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                          <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-3">Growth Engine</p>
                          <h2 className="text-4xl sm:text-5xl font-black text-neutral-950 uppercase italic tracking-tighter leading-none">
                            Marketing <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Network</span>
                          </h2>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm shadow-slate-200/50 overflow-hidden">
                        {leads.filter(l => l.message === 'NEW MARKETING LIST SUBSCRIPTION').length === 0 ? (
                          <div className="p-24 text-center">
                            <Activity className="w-16 h-16 text-slate-100 mx-auto mb-6" />
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Zero Subscribers Detected</p>
                          </div>
                        ) : (
                          <div className="divide-y divide-slate-50">
                            {leads.filter(l => l.message === 'NEW MARKETING LIST SUBSCRIPTION').map((lead) => (
                              <div key={lead.id} className="p-6 sm:p-8 hover:bg-slate-50/50 transition-colors group">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                                  <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 bg-blue-50 rounded-2xl border border-blue-100 flex items-center justify-center text-blue-400 font-black text-xl group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all uppercase">
                                      <Mail size={24} />
                                    </div>
                                    <div>
                                      <h3 className="font-black text-neutral-950 text-lg uppercase tracking-tight">{lead.email}</h3>
                                      <div className="flex items-center gap-2 mt-1">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Active Subscriber</p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <div className="px-4 py-2 bg-slate-100 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                      {lead.created ? new Date(lead.created).toLocaleDateString() : 'Recent'}
                                    </div>
                                    <button
                                      onClick={() => setDeleteConfirm({ type: 'lead', id: lead.id })}
                                      className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-rose-600 hover:border-rose-200 transition-all shadow-sm"
                                    >
                                      <Trash2 size={18} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Leads Tab */}
                  {activeTab === 'leads' && (
                    <div className="space-y-8">
                      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                          <p className="text-[10px] font-black text-rose-600 uppercase tracking-[0.3em] mb-3">Communication Hub</p>
                          <h2 className="text-4xl sm:text-5xl font-black text-neutral-950 uppercase italic tracking-tighter leading-none">
                            Inquiry <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600">Management</span>
                          </h2>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm shadow-slate-200/50 overflow-hidden">
                        {leads.filter(l => l.message !== 'NEW MARKETING LIST SUBSCRIPTION').length === 0 ? (
                          <div className="p-24 text-center">
                            <Users className="w-16 h-16 text-slate-100 mx-auto mb-6" />
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Zero Inbound Signals</p>
                          </div>
                        ) : (
                          <div className="divide-y divide-slate-50">
                            {leads.filter(l => l.message !== 'NEW MARKETING LIST SUBSCRIPTION').map((lead) => (
                              <div key={lead.id} className="p-6 sm:p-8 hover:bg-slate-50/50 transition-colors group">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                                  <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 bg-white rounded-2xl border border-slate-200 flex items-center justify-center text-slate-400 font-black text-xl group-hover:bg-neutral-950 group-hover:text-white group-hover:border-neutral-950 transition-all uppercase">
                                      {lead.name?.charAt(0) || 'L'}
                                    </div>
                                    <div>
                                      <h3 className="font-black text-neutral-950 text-lg uppercase tracking-tight">{lead.name || 'Anonymous Inquiry'}</h3>
                                      <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">{lead.email}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <button
                                      onClick={() => toggleExpand(lead.id)}
                                      className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all"
                                    >
                                      {expandedItems[lead.id] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                    </button>
                                    <button
                                      onClick={() => {
                                        setEditingId(editingId === lead.id ? null : lead.id)
                                        setEditData({ [lead.id]: lead })
                                      }}
                                      className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-amber-600 hover:border-amber-200 transition-all"
                                    >
                                      <Edit2 size={18} />
                                    </button>
                                    <button
                                      onClick={() => setDeleteConfirm({ type: 'lead', id: lead.id })}
                                      className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-rose-600 hover:border-rose-200 transition-all"
                                    >
                                      <Trash2 size={18} />
                                    </button>
                                  </div>
                                </div>

                                <AnimatePresence>
                                  {expandedItems[lead.id] && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: 'auto' }}
                                      exit={{ opacity: 0, height: 0 }}
                                      className="overflow-hidden"
                                    >
                                      <div className="mt-8 p-8 bg-slate-50 border border-slate-100 rounded-3xl">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Transmission Content</p>
                                        <p className="text-slate-700 leading-relaxed font-medium">{lead.message}</p>
                                        {lead.created && (
                                          <div className="mt-6 pt-6 border-t border-slate-200 flex items-center gap-2">
                                            <RefreshCw size={12} className="text-slate-400" />
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                              Timestamp: {new Date(lead.created).toLocaleString()}
                                            </p>
                                          </div>
                                        )}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>

                                {editingId === lead.id && (
                                  <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-8 space-y-4"
                                  >
                                    <div className="p-8 bg-white border border-slate-200 rounded-3xl shadow-xl">
                                      <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-4">Override Identity</p>
                                      <input
                                        type="text"
                                        placeholder="Identity Name"
                                        value={editData[lead.id]?.name || ''}
                                        onChange={(e) =>
                                          setEditData({ [lead.id]: { ...editData[lead.id], name: e.target.value } })
                                        }
                                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-neutral-950 font-bold placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                      />
                                      <div className="flex gap-4 mt-6">
                                        <button
                                          disabled={processing[lead.id]}
                                          onClick={() => handleEditLead(lead.id)}
                                          className={`flex-1 px-8 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all ${
                                            processing[lead.id] ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                                          }`}
                                        >
                                          {processing[lead.id] ? (
                                            <div className="flex items-center justify-center gap-2">
                                              <Loader size={12} className="animate-spin" />
                                              Committing...
                                            </div>
                                          ) : (
                                            'Commit Changes'
                                          )}
                                        </button>
                                        <button
                                          onClick={() => setEditingId(null)}
                                          className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-200 transition-all"
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Projects Tab */}
                  {activeTab === 'projects' && (
                    <div className="space-y-8 pb-20">
                      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                          <p className="text-[10px] font-black text-amber-600 uppercase tracking-[0.3em] mb-3">Infrastructure Matrix</p>
                          <h2 className="text-4xl sm:text-5xl font-black text-neutral-950 uppercase italic tracking-tighter leading-none">
                            Node <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Administration</span>
                          </h2>
                        </div>
                      </div>

                      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm shadow-slate-200/50 overflow-hidden">
                        {projects.length === 0 ? (
                          <div className="p-24 text-center">
                            <Box className="w-16 h-16 text-slate-100 mx-auto mb-6" />
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No Active Infrastructure</p>
                          </div>
                        ) : (
                          <div className="divide-y divide-slate-50">
                            {projects.map((project) => {
                              const pUserId = project.userId || project.user_id || project.userid;
                              const projectOwner = users.find(u => String(u.id) === String(pUserId));
                              return (
                                <div key={project.id} className="p-6 sm:p-8 hover:bg-slate-50/50 transition-colors group">
                                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                                    <div className="flex items-center gap-5">
                                      <div 
                                        onClick={() => projectOwner && navigateToUser(projectOwner.id)}
                                        className="w-14 h-14 bg-white rounded-2xl border border-slate-200 flex items-center justify-center text-slate-400 font-black text-xl group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-600 transition-all uppercase cursor-pointer"
                                        title={projectOwner ? `Owner: ${projectOwner.email}` : 'No Owner found'}
                                      >
                                        {project.title?.charAt(0) || 'P'}
                                      </div>
                                      <div>
                                        <div className="flex items-center gap-3 mb-1">
                                          <h3 className="font-black text-neutral-950 text-lg uppercase tracking-tight">{project.title || 'Untitled Node'}</h3>
                                        </div>
                                        <div className="flex items-center gap-4 text-slate-500 font-bold text-xs uppercase tracking-widest">
                                          <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[8px] font-black ${
                                            project.status === 'live' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                            project.status === 'requested_customization' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' :
                                            project.status === 'pending_payment' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                            'bg-slate-100 text-slate-500 border border-slate-200'
                                          }`}><Globe size={10} /> {project.status?.replace('_', ' ') || 'Offline'}</span>
                                          {projectOwner && (
                                            <button 
                                              onClick={() => navigateToUser(projectOwner.id)}
                                              className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"
                                            >
                                              <Users size={12} /> {projectOwner.email}
                                            </button>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                      <button
                                        onClick={() => toggleExpand(project.id)}
                                        className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all flex items-center gap-2"
                                      >
                                        <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Node Owner / Diagnostics</span>
                                        {expandedItems[project.id] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                      </button>
                                      <button
                                        onClick={() => setDeleteConfirm({ type: 'project', id: project.id })}
                                        className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-rose-600 hover:border-rose-200 transition-all"
                                      >
                                        <Trash2 size={18} />
                                      </button>
                                    </div>
                                  </div>

                                  <AnimatePresence>
                                    {expandedItems[project.id] && (
                                      <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="overflow-hidden"
                                      >
                                        <div className="mt-8 grid lg:grid-cols-3 gap-8">
                                          {/* Owner Card */}
                                          <div className="lg:col-span-1 p-8 bg-slate-900 rounded-[2.5rem] text-white flex flex-col justify-between">
                                            <div>
                                              <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-6">Website Owner</p>
                                              <div className="flex items-center gap-4 mb-8">
                                                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white font-black text-xl backdrop-blur-md border border-white/10">
                                                  {projectOwner?.email?.charAt(0).toUpperCase() || 'U'}
                                                </div>
                                                <div>
                                                  <p className="text-sm font-black uppercase tracking-tight truncate max-w-[150px]">{projectOwner?.email || 'Anonymous Node'}</p>
                                                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">ID: {projectOwner?.id || 'Root'}</p>
                                                </div>
                                              </div>
                                              <div className="space-y-3">
                                                <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                                                  <span className="text-slate-500">Tier:</span>
                                                  <span className="text-blue-400">{projectOwner?.membership_tier || 'FREE'}</span>
                                                </div>
                                                <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                                                  <span className="text-slate-500">Subscription:</span>
                                                  <span className={projectOwner?.subscription_status === 'active' ? 'text-emerald-400' : 'text-rose-400'}>
                                                    {projectOwner?.subscription_status?.toUpperCase() || 'INACTIVE'}
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                            <button 
                                              onClick={() => projectOwner && navigateToUser(projectOwner.id)}
                                              className="mt-10 w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95"
                                            >
                                              Deep Core Audit
                                            </button>
                                          </div>

                                          {/* Update Functions */}
                                          <div className="lg:col-span-2 bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 space-y-6">
                                            <div className="grid md:grid-cols-2 gap-6">
                                              <div className="space-y-4">
                                                <div>
                                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Transmission Progress</p>
                                                  <input 
                                                    type="text"
                                                    placeholder="e.g. 95% Complete"
                                                    value={editData[project.id]?.progress_status ?? project.progress_status ?? ''}
                                                    onChange={(e) => setEditData(prev => ({
                                                      ...prev,
                                                      [project.id]: { ...prev[project.id], progress_status: e.target.value }
                                                    }))}
                                                    className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-neutral-950 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                                  />
                                                </div>
                                                <div>
                                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Latest Update Log</p>
                                                  <textarea 
                                                    rows="3"
                                                    placeholder="System patches deployed..."
                                                    value={editData[project.id]?.latest_update ?? project.latest_update ?? ''}
                                                    onChange={(e) => setEditData(prev => ({
                                                      ...prev,
                                                      [project.id]: { ...prev[project.id], latest_update: e.target.value }
                                                    }))}
                                                    className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-neutral-950 outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                                                  />
                                                </div>
                                              </div>

                                              <div className="space-y-4">
                                                <div>
                                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Recommended Upgrades (Comma Separated)</p>
                                                  <input 
                                                    type="text"
                                                    placeholder="AI CORE, SEO, EDGE"
                                                    value={editData[project.id]?.recommended_modules_str ?? project.recommended_modules?.join(', ') ?? ''}
                                                    onChange={(e) => setEditData(prev => ({
                                                      ...prev,
                                                      [project.id]: { ...prev[project.id], recommended_modules_str: e.target.value }
                                                    }))}
                                                    className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-neutral-950 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                                  />
                                                </div>
                                                <button
                                                  disabled={processing[project.id]}
                                                  onClick={() => {
                                                    const data = { ...editData[project.id] };
                                                    if (data.recommended_modules_str !== undefined) {
                                                      data.recommended_modules = data.recommended_modules_str.split(',').map(m => m.trim()).filter(Boolean);
                                                      delete data.recommended_modules_str;
                                                    }
                                                    handleEditProject(project.id, data);
                                                  }}
                                                  className={`w-full py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all ${
                                                    processing[project.id] ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 active:scale-95 shadow-lg shadow-blue-100'
                                                  }`}
                                                >
                                                  {processing[project.id] ? (
                                                    <div className="flex items-center justify-center gap-2">
                                                      <Loader size={12} className="animate-spin" />
                                                      Synchronizing...
                                                    </div>
                                                  ) : (
                                                    'Synchronize Diagnostic Data'
                                                  )}
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </main>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {deleteConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirm(null)}
              className="absolute inset-0 bg-neutral-950/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-2xl max-w-md w-full relative z-10"
            >
              <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-8">
                <Trash2 size={32} />
              </div>
              <h3 className="text-2xl font-black text-neutral-950 uppercase italic tracking-tight mb-4 text-center">Terminate Node?</h3>
              <p className="text-slate-500 font-medium text-center leading-relaxed mb-10">
                You are about to permanently decommission this infrastructure node. This action is irreversible and will purge all associated data.
              </p>
              <div className="flex flex-col gap-4">
                <button
                  disabled={processing[deleteConfirm.id]}
                  onClick={() => {
                    if (deleteConfirm.type === 'lead') {
                      handleDeleteLead(deleteConfirm.id)
                    } else if (deleteConfirm.type === 'user') {
                      handleDeleteUser(deleteConfirm.id)
                    } else {
                      handleDeleteProject(deleteConfirm.id)
                    }
                  }}
                  className={`w-full px-8 py-4 bg-rose-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-lg ${
                    processing[deleteConfirm.id] 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:bg-rose-700 shadow-rose-200'
                  }`}
                >
                  {processing[deleteConfirm.id] ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Decommissioning...
                    </div>
                  ) : (
                    'Confirm Termination'
                  )}
                </button>
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="w-full px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-200 transition-all"
                >
                  Abnormal Operation (Cancel)
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AdminPanel

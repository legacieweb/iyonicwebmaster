import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, Mail, Lock, User, AlertCircle, ArrowRight, Sparkles, 
  Fingerprint, Phone, ShieldCheck, Zap, Globe, RefreshCw, 
  Eye, EyeOff, ChevronRight, Layout, Star, Rocket
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { referUser } from '../utils/api'

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const { login, signup, error: authError, isLoading } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState(initialMode) // 'login', 'signup', 'forgot'
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '', 
    firstName: '', 
    lastName: '', 
    phoneNumber: '' 
  })
  const [showPassword, setShowPassword] = useState(false)
  const [localError, setLocalError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode)
      setLocalError(null)
      setSuccessMessage(null)
    }
  }, [isOpen, initialMode])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setLocalError(null)
    setSuccessMessage(null)
  }

  const validateForm = () => {
    if (!formData.email.trim()) {
      setLocalError('Email is required')
      return false
    }
    if (mode !== 'forgot' && !formData.password.trim()) {
      setLocalError('Password is required')
      return false
    }
    if (mode === 'signup' && (!formData.firstName.trim() || !formData.lastName.trim() || !formData.phoneNumber.trim())) {
      setLocalError('All fields are required for signup')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    if (mode === 'forgot') {
      setSuccessMessage('Security link dispatched to your email.')
      return
    }

    try {
      let result = mode === 'signup'
        ? await signup(formData.email.trim(), formData.password.trim(), formData.firstName.trim(), formData.lastName.trim(), formData.phoneNumber.trim())
        : await login(formData.email.trim(), formData.password.trim())
      
      if (result.success) {
        if (mode === 'signup') {
          const refCode = localStorage.getItem('iyonicorp_referral_code')
          if (refCode && result.user?.id) {
            try {
              await referUser(refCode, result.user.id)
              localStorage.removeItem('iyonicorp_referral_code')
            } catch (err) {
              console.error('Failed to link referral:', err)
            }
          }
        }

        setSuccessMessage(mode === 'signup' ? 'Welcome to the Alliance.' : 'Security cleared. Access granted.')
        setTimeout(() => {
          onClose()
          setSuccessMessage(null)
          if (result.isAdmin) {
            navigate('/admin')
          }
        }, 1500)
      } else {
        setLocalError(result.error)
      }
    } catch (err) {
      setLocalError('Neural link interrupted. Try again.')
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-0 sm:p-6 lg:p-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-950/40 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="relative w-full h-full sm:h-auto sm:max-w-6xl bg-white sm:rounded-[48px] overflow-hidden shadow-[0_48px_128px_-32px_rgba(0,0,0,0.2)] flex flex-col md:flex-row border border-neutral-100"
          >
            {/* Sidebar Section */}
            <div className="hidden md:flex md:w-[42%] bg-neutral-950 relative p-16 flex-col justify-between overflow-hidden">
              {/* Abstract Visual Elements */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full -mr-48 -mt-48" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/10 blur-[100px] rounded-full -ml-32 -mb-32" />
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                   style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 mb-12">
                  <img src="https://i.imgur.com/6nGQFtj.png" alt="Logo" className="w-8 h-8 object-contain" />
                </div>
                
                <h3 className="text-4xl lg:text-5xl font-black text-white tracking-tighter leading-[1.1] mb-8 italic uppercase">
                  Accelerate <br />
                  Digital <br />
                  <span className="text-blue-500">Evolution.</span>
                </h3>

                <div className="space-y-8 mt-12">
                  {[
                    { icon: ShieldCheck, title: 'Secure Infrastructure', desc: 'Military-grade encryption for every asset.' },
                    { icon: Zap, title: 'Instant Deployment', desc: 'Go from concept to live in milliseconds.' },
                    { icon: Globe, title: 'Global Network', desc: 'Distributed at the edge for maximum speed.' }
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + (i * 0.1) }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-blue-400">
                        <item.icon size={20} />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-1">{item.title}</h4>
                        <p className="text-neutral-500 text-xs font-medium leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="relative z-10 pt-12 border-t border-white/5">
                <p className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em]">
                  © 2026 Iyonicorp Alliance
                </p>
              </div>
            </div>

            {/* Form Section */}
            <div className="flex-1 bg-white relative flex flex-col min-h-0">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 lg:top-10 lg:right-10 w-12 h-12 flex items-center justify-center rounded-2xl text-neutral-400 hover:text-neutral-900 hover:bg-neutral-50 transition-all z-30"
              >
                <X size={24} />
              </button>

              <div className="flex-1 overflow-y-auto px-8 py-16 lg:p-24 custom-scrollbar">
                <div className="max-w-md mx-auto w-full">
                  <header className="mb-12">
                    <motion.div
                      key={mode}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <h2 className="text-4xl font-black text-neutral-900 tracking-tighter uppercase italic mb-3">
                        {mode === 'login' && 'Secure Login'}
                        {mode === 'signup' && 'Join Alliance'}
                        {mode === 'forgot' && 'Reset Access'}
                        <span className="text-blue-600">.</span>
                      </h2>
                      <p className="text-neutral-400 font-bold text-[10px] uppercase tracking-[0.2em]">
                        {mode === 'login' && 'Provide your security credentials to authenticate'}
                        {mode === 'signup' && 'Initialize your high-performance account'}
                        {mode === 'forgot' && 'Neural link verification for account recovery'}
                      </p>
                    </motion.div>
                  </header>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <AnimatePresence mode="wait">
                      {mode === 'signup' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="grid grid-cols-2 gap-4"
                        >
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">First Name</label>
                            <div className="relative group">
                              <User className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-300 group-focus-within:text-blue-600 transition-colors" size={16} />
                              <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="E.g. Elon"
                                className="w-full pl-12 pr-5 py-4 bg-neutral-50 border border-neutral-100 rounded-[20px] text-neutral-900 placeholder-neutral-300 focus:outline-none focus:border-blue-600 focus:bg-white transition-all font-bold text-sm"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Last Name</label>
                            <div className="relative group">
                              <User className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-300 group-focus-within:text-blue-600 transition-colors" size={16} />
                              <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="E.g. Musk"
                                className="w-full pl-12 pr-5 py-4 bg-neutral-50 border border-neutral-100 rounded-[20px] text-neutral-900 placeholder-neutral-300 focus:outline-none focus:border-blue-600 focus:bg-white transition-all font-bold text-sm"
                              />
                            </div>
                          </div>
                          <div className="col-span-2 space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">System Phone</label>
                            <div className="relative group">
                              <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-300 group-focus-within:text-blue-600 transition-colors" size={16} />
                              <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                placeholder="+1 (555) 000-0000"
                                className="w-full pl-12 pr-5 py-4 bg-neutral-50 border border-neutral-100 rounded-[20px] text-neutral-900 placeholder-neutral-300 focus:outline-none focus:border-blue-600 focus:bg-white transition-all font-bold text-sm"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Email Identity</label>
                      <div className="relative group">
                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-300 group-focus-within:text-blue-600 transition-colors" size={16} />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="identity@iyonicorp.com"
                          className="w-full pl-12 pr-5 py-4 bg-neutral-50 border border-neutral-100 rounded-[20px] text-neutral-900 placeholder-neutral-300 focus:outline-none focus:border-blue-600 focus:bg-white transition-all font-bold text-sm"
                        />
                      </div>
                    </div>

                    {mode !== 'forgot' && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center ml-1">
                          <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Security Key</label>
                          {mode === 'login' && (
                            <button 
                              type="button" 
                              onClick={() => setMode('forgot')}
                              className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline"
                            >
                              Lost Key?
                            </button>
                          )}
                        </div>
                        <div className="relative group">
                          <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-300 group-focus-within:text-blue-600 transition-colors" size={16} />
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full pl-12 pr-14 py-4 bg-neutral-50 border border-neutral-100 rounded-[20px] text-neutral-900 placeholder-neutral-300 focus:outline-none focus:border-blue-600 focus:bg-white transition-all font-bold text-sm"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-blue-600 transition-colors"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>
                    )}

                    <AnimatePresence>
                      {localError && (
                        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-3 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-[10px] font-black uppercase tracking-widest">
                          <AlertCircle size={14} /> {localError}
                        </motion.div>
                      )}
                      {successMessage && (
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                          <Sparkles size={14} /> {successMessage}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button
                      type="submit"
                      disabled={isLoading || successMessage}
                      className="w-full py-6 bg-neutral-950 text-white rounded-[24px] font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-4 group transition-all duration-300 shadow-2xl shadow-neutral-950/20 active:scale-95 disabled:opacity-50"
                    >
                      {isLoading ? (
                        <RefreshCw className="animate-spin" size={18} />
                      ) : (
                        <>
                          {mode === 'login' && 'Authenticate Access'}
                          {mode === 'signup' && 'Initialize Profile'}
                          {mode === 'forgot' && 'Dispatch Link'}
                          <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>

                  <footer className="mt-12 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <div className="h-px w-8 bg-neutral-100" />
                      <p className="text-[10px] font-black text-neutral-300 uppercase tracking-widest">System Protocols</p>
                      <div className="h-px w-8 bg-neutral-100" />
                    </div>
                    
                    <div className="mt-6">
                      {mode === 'login' ? (
                        <p className="text-sm font-medium text-neutral-500">
                          New to the ecosystem? {' '}
                          <button onClick={() => setMode('signup')} className="text-blue-600 font-black uppercase tracking-widest text-[11px] hover:underline">Register Identity</button>
                        </p>
                      ) : (
                        <p className="text-sm font-medium text-neutral-500">
                          Already authenticated? {' '}
                          <button onClick={() => setMode('login')} className="text-blue-600 font-black uppercase tracking-widest text-[11px] hover:underline">Return to Login</button>
                        </p>
                      )}
                    </div>
                  </footer>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default AuthModal
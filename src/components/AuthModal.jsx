import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Lock, User, AlertCircle, ArrowRight, Sparkles, Fingerprint, Phone, ShieldCheck, Zap, Globe, RefreshCw, Eye, EyeOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const { login, signup, error: authError, isLoading } = useAuth()
  const navigate = useNavigate()
  const [isSignup, setIsSignup] = useState(initialMode === 'signup')
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '', 
    firstName: '', 
    lastName: '', 
    phoneNumber: '' 
  })
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsSignup(initialMode === 'signup')
    }
  }, [isOpen, initialMode])

  const [localError, setLocalError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setLocalError(null)
    setSuccessMessage(null)
  }

  const validateForm = () => {
    if (!formData.email.trim() || !formData.password.trim()) {
      setLocalError('Required fields missing')
      return false
    }
    if (isSignup && (!formData.firstName.trim() || !formData.lastName.trim() || !formData.phoneNumber.trim())) {
      setLocalError('All fields are required')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      let result = isSignup 
        ? await signup(formData.email.trim(), formData.password.trim(), formData.firstName.trim(), formData.lastName.trim(), formData.phoneNumber.trim())
        : await login(formData.email.trim(), formData.password.trim())
      
      if (result.success) {
        setSuccessMessage(isSignup ? 'Welcome to the future.' : 'Access granted.')
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
      setLocalError('Connection error')
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-0 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-900/20 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 40 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full h-full sm:h-auto sm:max-w-5xl bg-white sm:rounded-[40px] overflow-hidden shadow-[0_32px_128px_-16px_rgba(0,0,0,0.1)] flex flex-col md:flex-row border border-neutral-100"
          >
            {/* Left Side: Branding/Info (Hidden on small mobile) */}
            <div className="hidden md:flex md:w-[40%] bg-neutral-50 relative p-12 flex-col justify-between overflow-hidden border-r border-neutral-100">
              {/* Background Orbs */}
              <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-blue-500/5 rounded-full blur-[100px]" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-500/5 rounded-full blur-[80px]" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-black italic shadow-lg shadow-blue-500/20 mb-10">I</div>
                <h3 className="text-3xl font-black text-neutral-900 tracking-tighter leading-tight mb-4 italic uppercase">
                  Accelerating digital <span className="text-blue-600">evolution.</span>
                </h3>
                <p className="text-neutral-500 font-medium text-sm leading-relaxed">
                  Join a network of elite digital creators and enterprises scaling the future of technology.
                </p>
              </div>

              <div className="relative z-10 space-y-6">
                {[
                  { icon: ShieldCheck, text: 'Military-grade encryption' },
                  { icon: Zap, text: 'Sub-millisecond latency' },
                  { icon: Globe, text: 'Global edge distribution' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-neutral-500">
                    <div className="w-8 h-8 rounded-lg bg-white border border-neutral-100 flex items-center justify-center shadow-sm">
                      <item.icon size={16} className="text-blue-600" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="flex-1 bg-white relative flex flex-col min-h-0 overflow-hidden">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 sm:top-8 sm:right-8 w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all z-30 bg-white/80 backdrop-blur-sm sm:bg-transparent"
              >
                <X size={20} />
              </button>

              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="min-h-full flex flex-col px-6 py-12 sm:p-12 md:p-16">
                  <div className="max-w-md mx-auto w-full my-auto">
                    <div className="mb-10 text-center sm:text-left">
                      <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tighter uppercase italic mb-2">
                        {isSignup ? 'Initialize Account' : 'Secure Login'}
                        <span className="text-blue-600">.</span>
                      </h2>
                      <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em]">
                        {isSignup ? 'Enter your credentials to begin evolution' : 'Provide your security key for authentication'}
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <AnimatePresence mode="wait">
                        {isSignup && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-5 overflow-hidden"
                          >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">First Name</label>
                                <div className="relative group">
                                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-cyan-600 transition-colors" size={16} />
                                  <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="John"
                                    className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 placeholder-slate-300 focus:outline-none focus:border-cyan-600 focus:bg-white transition-all font-bold text-sm shadow-sm shadow-transparent focus:shadow-cyan-500/5"
                                  />
                                </div>
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Last Name</label>
                                <div className="relative group">
                                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-cyan-600 transition-colors" size={16} />
                                  <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Doe"
                                    className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 placeholder-slate-300 focus:outline-none focus:border-cyan-600 focus:bg-white transition-all font-bold text-sm shadow-sm shadow-transparent focus:shadow-cyan-500/5"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number</label>
                              <div className="relative group">
                                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-cyan-600 transition-colors" size={16} />
                                <input
                                  required
                                  type="tel"
                                  name="phoneNumber"
                                  value={formData.phoneNumber}
                                  onChange={handleChange}
                                  placeholder="+1 (555) 000-0000"
                                  className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 placeholder-slate-300 focus:outline-none focus:border-cyan-600 focus:bg-white transition-all font-bold text-sm shadow-sm shadow-transparent focus:shadow-cyan-500/5"
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Identity</label>
                        <div className="relative group">
                          <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-cyan-600 transition-colors" size={16} />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="name@company.com"
                            className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 placeholder-slate-300 focus:outline-none focus:border-cyan-600 focus:bg-white transition-all font-bold text-sm shadow-sm shadow-transparent focus:shadow-cyan-500/5"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Security Key</label>
                        <div className="relative group">
                          <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-cyan-600 transition-colors" size={16} />
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full pl-12 pr-14 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 placeholder-slate-300 focus:outline-none focus:border-cyan-600 focus:bg-white transition-all font-bold text-sm shadow-sm shadow-transparent focus:shadow-cyan-500/5"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-600 transition-colors focus:outline-none"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>

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

                      <motion.button
                        whileHover={{ scale: 1.01, translateY: -2 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isLoading || successMessage}
                        className="relative w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-4 group transition-all duration-300 overflow-hidden shadow-xl shadow-slate-900/20 active:shadow-none disabled:opacity-50 mt-6"
                      >
                        {/* Animated gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-indigo-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <span className="relative z-10 flex items-center gap-3">
                          {isLoading ? (
                            <div className="flex items-center gap-3">
                              <RefreshCw className="animate-spin" size={16} />
                              Verifying...
                            </div>
                          ) : (
                            <>
                              {isSignup ? 'Initialize' : 'Authenticate'}
                              <motion.div
                                animate={{ x: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                              >
                                <ArrowRight size={16} />
                              </motion.div>
                            </>
                          )}
                        </span>
                        
                        {/* Outer glow on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl bg-cyan-500/30 -z-10" />
                      </motion.button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-slate-50 flex flex-col items-center gap-6">
                      <button 
                        onClick={() => setIsSignup(!isSignup)}
                        className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-black transition-all duration-300"
                      >
                        <span>{isSignup ? 'Already have access?' : 'Need an account?'}</span>
                        <span className="text-cyan-600 group-hover:underline underline-offset-4">
                          {isSignup ? 'Secure Login' : 'Initialize Signup'}
                        </span>
                      </button>
                      <div className="flex items-center gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                      </div>
                    </div>
                  </div>
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

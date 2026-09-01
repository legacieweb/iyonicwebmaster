import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, Mail, Lock, User, AlertCircle, Phone,
  Eye, EyeOff, ArrowRight, Sparkles, Check
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
      setShowPassword(false)
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
    if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      setLocalError('Please enter a valid email address')
      return false
    }
    if (mode !== 'forgot' && !formData.password.trim()) {
      setLocalError('Password is required')
      return false
    }
    if (mode === 'signup' && (!formData.firstName.trim() || !formData.lastName.trim() || !formData.phoneNumber.trim())) {
      setLocalError('All fields are required')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    if (mode === 'forgot') {
      setSuccessMessage('Password reset link sent to your email.')
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

        setSuccessMessage(mode === 'signup' ? 'Account created successfully!' : 'Login successful!')
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
      setLocalError('Connection error. Please try again.')
    }
  }

  const modes = {
    login: { title: 'Welcome back', subtitle: 'Enter your details to access your account' },
    signup: { title: 'Create account', subtitle: 'Join the Iyoni Corp investor platform' },
    forgot: { title: 'Reset password', subtitle: 'Enter your email to receive a reset link' }
  }

  const toggleMode = () => {
    const next = mode === 'login' ? 'signup' : mode === 'signup' ? 'login' : 'login'
    setMode(next)
    setLocalError(null)
    setSuccessMessage(null)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-950/60 backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-[32px] overflow-hidden shadow-2xl shadow-amber-400/10"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-amber-400/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-neutral-800 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

            <div className="relative p-8 sm:p-10">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full text-neutral-400 hover:text-amber-400 hover:bg-neutral-900 transition-all z-30 border border-neutral-800"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-10">
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400/10 to-neutral-800/30 border border-neutral-700 flex items-center justify-center">
                    <Sparkles size={24} className="text-amber-400" />
                  </div>
                  <h2 className="text-3xl font-black text-neutral-100 uppercase tracking-tight">
                    {modes[mode].title}
                  </h2>
                  <p className="text-neutral-400 text-sm font-medium max-w-xs">
                    {modes[mode].subtitle}
                  </p>
                </motion.div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <AnimatePresence mode="wait">
                  {mode === 'signup' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div className="space-y-1.5">
                        <label className="text-xs font-black uppercase tracking-widest text-neutral-500">First Name</label>
                        <TextInput
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="John"
                          icon={<User size={16} />}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-black uppercase tracking-widest text-neutral-500">Last Name</label>
                        <TextInput
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Doe"
                          icon={<User size={16} />}
                        />
                      </div>
                      <div className="col-span-2 space-y-1.5">
                        <label className="text-xs font-black uppercase tracking-widest text-neutral-500">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
                          <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="+1 (555) 000-0000"
                            className="w-full pl-11 pr-4 py-3.5 bg-neutral-800 border border-neutral-700 rounded-2xl text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-400/50 focus:bg-neutral-800/80 transition-all text-sm"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase tracking-widest text-neutral-500">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@company.com"
                      className="w-full pl-11 pr-4 py-3.5 bg-neutral-800 border border-neutral-700 rounded-2xl text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-400/50 focus:bg-neutral-800/80 transition-all text-sm"
                    />
                  </div>
                </div>

                {mode !== 'forgot' && (
                  <motion.div
                    key="password"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-1.5"
                  >
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-black uppercase tracking-widest text-neutral-500">Password</label>
                      {mode === 'login' && (
                        <button
                          type="button"
                          onClick={() => setMode('forgot')}
                          className="text-xs font-black uppercase tracking-widest text-amber-400 hover:text-amber-300 transition-colors"
                        >
                          Forgot password?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full pl-11 pr-12 py-3.5 bg-neutral-800 border border-neutral-700 rounded-2xl text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-400/50 focus:bg-neutral-800/80 transition-all text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </motion.div>
                )}

                <AnimatePresence>
                  {localError && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs font-medium"
                    >
                      <AlertCircle size={14} /> {localError}
                    </motion.div>
                  )}
                  {successMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-medium"
                    >
                      <Check size={14} /> {successMessage}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-gradient-to-r from-amber-400 to-amber-300 text-neutral-950 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:from-amber-300 hover:to-yellow-300 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-amber-400/25 active:scale-95"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-neutral-900/30 border-t-neutral-900 rounded-full animate-spin" />
                  ) : (
                    <>
                      {mode === 'login' ? 'Access Portfolio' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'}
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-neutral-500 text-sm">
                  {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
                  <button
                    onClick={toggleMode}
                    className="ml-2 font-black text-amber-400 hover:text-amber-300 transition-colors uppercase tracking-widest text-xs"
                  >
                    {mode === 'login' ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
                {mode === 'forgot' && (
                  <button
                    onClick={() => setMode('login')}
                    className="mt-4 text-xs font-black uppercase tracking-widest text-neutral-500 hover:text-neutral-300 transition-colors"
                  >
                    Back to login
                  </button>
                )}
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-neutral-700 to-amber-400" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

const TextInput = ({ name, value, onChange, placeholder, icon }) => {
  return (
    <div className="relative">
      {icon}
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-11 pr-4 py-3.5 bg-neutral-800 border border-neutral-700 rounded-2xl text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-400/50 focus:bg-neutral-800/80 transition-all text-sm"
      />
    </div>
  )
}

export default AuthModal

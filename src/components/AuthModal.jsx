import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, Mail, Lock, User, AlertCircle, Phone, 
  Eye, EyeOff, ArrowRight
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-white/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-neutral-100 p-8 sm:p-10"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-50 transition-all z-30"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-10">
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-3xl font-semibold text-neutral-900 mb-2">
                  {mode === 'login' && 'Welcome back'}
                  {mode === 'signup' && 'Create account'}
                  {mode === 'forgot' && 'Reset password'}
                </h2>
                <p className="text-neutral-500 text-sm">
                  {mode === 'login' && 'Enter your details to access your account'}
                  {mode === 'signup' && 'Join us to start building your digital presence'}
                  {mode === 'forgot' && 'Enter your email to receive a reset link'}
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
                      <label className="text-xs font-medium text-neutral-600 ml-1">First Name</label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300 group-focus-within:text-neutral-900 transition-colors" size={16} />
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="John"
                          className="w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-100 rounded-xl text-neutral-900 placeholder-neutral-300 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all text-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-neutral-600 ml-1">Last Name</label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300 group-focus-within:text-neutral-900 transition-colors" size={16} />
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Doe"
                          className="w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-100 rounded-xl text-neutral-900 placeholder-neutral-300 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all text-sm"
                        />
                      </div>
                    </div>
                    <div className="col-span-2 space-y-1.5">
                      <label className="text-xs font-medium text-neutral-600 ml-1">Phone Number</label>
                      <div className="relative group">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300 group-focus-within:text-neutral-900 transition-colors" size={16} />
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          placeholder="+1 (555) 000-0000"
                          className="w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-100 rounded-xl text-neutral-900 placeholder-neutral-300 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all text-sm"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-600 ml-1">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300 group-focus-within:text-neutral-900 transition-colors" size={16} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className="w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-100 rounded-xl text-neutral-900 placeholder-neutral-300 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all text-sm"
                  />
                </div>
              </div>

              {mode !== 'forgot' && (
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center ml-1">
                    <label className="text-xs font-medium text-neutral-600">Password</label>
                    {mode === 'login' && (
                      <button 
                        type="button" 
                        onClick={() => setMode('forgot')}
                        className="text-xs font-medium text-neutral-900 hover:underline"
                      >
                        Forgot?
                      </button>
                    )}
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300 group-focus-within:text-neutral-900 transition-colors" size={16} />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pl-11 pr-12 py-3 bg-neutral-50 border border-neutral-100 rounded-xl text-neutral-900 placeholder-neutral-300 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900 transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              )}

              <AnimatePresence>
                {localError && (
                  <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs">
                    <AlertCircle size={14} /> {localError}
                  </motion.div>
                )}
                {successMessage && (
                  <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-600 text-xs">
                    <AlertCircle size={14} className="rotate-180" /> {successMessage}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-neutral-900 text-white rounded-xl font-medium text-sm hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-neutral-200"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {mode === 'login' ? 'Sign in' : mode === 'signup' ? 'Create account' : 'Reset password'}
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-neutral-500 text-sm">
                {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
                <button
                  onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                  className="ml-2 font-semibold text-neutral-900 hover:underline"
                >
                  {mode === 'login' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
              {mode === 'forgot' && (
                <button
                  onClick={() => setMode('login')}
                  className="mt-4 text-xs font-semibold text-neutral-500 hover:text-neutral-900"
                >
                  Back to login
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default AuthModal

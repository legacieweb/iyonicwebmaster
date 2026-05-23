import { useState, useEffect, useRef } from 'react'
import { Menu as MenuIcon, X, LogOut, LayoutDashboard, ArrowRight, Sparkles, ChevronDown, User, Users } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'



const Navbar = ({ onLoginClick }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const { currentUser, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { label: 'Blueprints', href: '/#catalog' },
    { label: 'Process', href: '/#how-it-works' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'Partnership', href: '/#partnership' },
    ...(currentUser?.is_affiliate ? [{ label: 'Affiliate', href: '/affiliate' }] : []),
  ]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    setIsOpen(false)
    navigate('/')
  }

  const handleNavigate = (path, e) => {
    if (e) e.preventDefault()
    setIsOpen(false)
    
    if (path.startsWith('/#')) {
      const id = path.substring(2)
      if (location.pathname === '/') {
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        // Navigate to home with state instead of hash in URL
        navigate('/', { state: { scrollTo: id } })
      }
    } else {
      navigate(path)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleResetFilters = () => {
    // Filter functionality removed
  }

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled 
          ? 'bg-white/70 backdrop-blur-2xl border-b border-white/20 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.04)]' 
          : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-center">
          {/* Creative Logo Section */}
          <motion.a
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            href="/"
            className="flex items-center gap-4 group"
            onClick={(e) => handleNavigate('/', e)}
          >
            <img src="https://i.imgur.com/6nGQFtj.png" alt="Iyonicorp Logo" className="w-10 h-10 object-contain" />
          </motion.a>

          {/* Styled Navigation Items */}
          <div className="hidden lg:flex items-center bg-neutral-100/50 p-1.5 rounded-full border border-neutral-200/50 backdrop-blur-md">
            {navItems.map((item, i) => (
              <motion.a
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={item.label}
                href={item.href || item.path}
                onClick={(e) => handleNavigate(item.href || item.path, e)}
                className="px-6 py-2 text-xs font-black text-neutral-500 hover:text-neutral-950 transition-all relative group uppercase tracking-widest"
              >
                <span className="relative z-10">{item.label}</span>
                <motion.span 
                  className="absolute inset-0 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  layoutId="navHover"
                />
              </motion.a>
            ))}
          </div>

          {/* Action Section */}
          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 bg-white p-1.5 pr-4 rounded-full border border-neutral-100 shadow-sm hover:border-blue-500/30 transition-all"
                >
                  <div className="w-9 h-9 bg-neutral-950 rounded-full flex items-center justify-center text-white text-[11px] font-black shadow-lg">
                    {currentUser?.name?.charAt(0) || currentUser?.email?.charAt(0) || <User size={16} />}
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest leading-none mb-1">Account</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[11px] font-black text-neutral-900 uppercase tracking-tight truncate max-w-[80px]">
                        {currentUser?.name?.split(' ')[0] || currentUser?.email?.split('@')[0]}
                      </span>
                      <ChevronDown size={12} className={`text-neutral-400 transition-transform duration-300 ${userDropdownOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </motion.button>

                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-56 bg-white rounded-3xl border border-neutral-100 shadow-2xl p-2 z-[60]"
                    >
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false)
                          handleNavigate('/dashboard')
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-black text-neutral-600 hover:text-blue-600 hover:bg-blue-50 transition-all uppercase tracking-widest"
                      >
                        <LayoutDashboard size={16} />
                        Dashboard
                      </button>
                      {currentUser?.is_affiliate && (
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false)
                            handleNavigate('/affiliate')
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-black text-neutral-600 hover:text-blue-600 hover:bg-blue-50 transition-all uppercase tracking-widest"
                        >
                          <Users size={16} />
                          Affiliate Portal
                        </button>
                      )}
                      <div className="h-px bg-neutral-50 my-1 mx-2" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-black text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition-all uppercase tracking-widest"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => onLoginClick('login')}
                  className="text-xs font-black text-neutral-500 hover:text-neutral-900 transition-all uppercase tracking-widest px-4 py-2"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onLoginClick('signup')}
                  className="px-8 py-3.5 bg-blue-600 text-white rounded-2xl text-xs font-black hover:bg-blue-700 hover:-translate-y-1 active:translate-y-0 transition-all shadow-[0_10px_20px_rgba(37,99,235,0.2)] flex items-center gap-3 group uppercase tracking-widest"
                >
                  Sign Up
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Trigger */}
          <button
            className="lg:hidden w-12 h-12 flex items-center justify-center rounded-2xl bg-neutral-50 text-neutral-900 border border-neutral-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>

      {/* Modern Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden fixed inset-x-4 top-24 bg-white rounded-[32px] border border-neutral-100 shadow-2xl overflow-hidden p-8 z-50"
          >
            <div className="space-y-6">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href || item.path}
                  className="block text-2xl font-black text-neutral-900 hover:text-blue-600 transition-colors tracking-tight"
                  onClick={(e) => handleNavigate(item.href || item.path, e)}
                >
                  {item.label}
                </a>
              ))}

              <div className="pt-8 border-t border-neutral-50 flex flex-col gap-4">
                {isAuthenticated ? (
                  <>
                    <button
                      onClick={() => handleNavigate('/dashboard')}
                      className="w-full py-5 bg-neutral-50 text-neutral-900 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3"
                    >
                      <LayoutDashboard size={18} />
                      Dashboard
                    </button>
                    {currentUser?.is_affiliate && (
                      <button
                        onClick={() => handleNavigate('/affiliate')}
                        className="w-full py-5 bg-blue-50 text-blue-600 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3"
                      >
                        <Users size={18} />
                        Affiliate Portal
                      </button>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full py-5 bg-rose-50 text-rose-600 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => { onLoginClick('login'); setIsOpen(false); }}
                      className="w-full py-5 bg-neutral-50 text-neutral-900 rounded-2xl font-black uppercase tracking-widest text-sm"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => { onLoginClick('signup'); setIsOpen(false); }}
                      className="w-full py-5 bg-neutral-950 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


    </nav>
  )
}

export default Navbar

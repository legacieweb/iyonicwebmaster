import { useState, useEffect, useRef } from 'react'
import { Menu as MenuIcon, X, LogOut, LayoutDashboard, ArrowRight, Sparkles, ChevronDown, User, Users, Globe, CreditCard, Bot, ExternalLink } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'



const Navbar = ({ onLoginClick }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const navRef = useRef(null)
  const userDropdownRef = useRef(null)
  const { currentUser, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { label: 'Businesses', href: '/#businesses' },
  ]

  const productLinks = [
    { label: 'IyonicWeb', to: '/iyonicweb', icon: Globe },
    { label: 'IyonicPay', to: '/iyonicpay', icon: CreditCard },
    { label: 'IyonicBots', to: '/iyonicbots', icon: Bot },
  ]

  const developerLinks = [
    { label: 'IyonicPay API', href: 'https://pay.iyonicorp.com', icon: CreditCard },
    { label: 'IyonicBots API', href: 'https://iyonicbots.iyonicorp.com', icon: Bot },
    { label: 'IyonicWeb API', href: 'https://web.iyonicorp.com', icon: Globe },
  ]

  const secondaryLinks = [
    { label: 'Work With Iyoni', href: '/#contact', prominent: true },
    ...(currentUser?.is_affiliate ? [{ label: 'Affiliate', href: '/affiliate' }] : []),
  ]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null)
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
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
    closeDropdowns()
    
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

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name)
  }

  const closeDropdowns = () => {
    setActiveDropdown(null)
    setUserDropdownOpen(false)
  }

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled 
          ? 'bg-neutral-950/80 backdrop-blur-2xl border-b border-neutral-800 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.3)]' 
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
            <img src="corplogo.PNG" alt="Iyoni Corp Logo" className="w-10 h-10 object-contain" />
            <span className="text-neutral-200 font-black text-xl hidden sm:inline group-hover:text-amber-400 transition-colors">Iyoni Corp</span>
          </motion.a>

          {/* Styled Navigation Items */}
          <div className="hidden lg:flex items-center bg-neutral-900/30 p-1.5 rounded-full border border-neutral-800 backdrop-blur-md" ref={navRef}>
            
            {navItems.map((item, i) => (
              <motion.a
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={item.label}
                href={item.href || item.path}
                onClick={(e) => handleNavigate(item.href || item.path, e)}
                className="px-6 py-2 text-xs font-black text-neutral-400 hover:text-amber-400 transition-all relative group uppercase tracking-widest"
              >
                <span className="relative z-10 border-b-2 border-transparent group-hover:border-amber-400/40 transition-colors duration-200">{item.label}</span>
                <motion.span 
                  className="absolute inset-0 bg-neutral-800 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  layoutId="navHover"
                />
              </motion.a>
            ))}

            {/* Products Dropdown */}
            <div className="relative">
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                onClick={() => toggleDropdown('products')}
                className="px-6 py-2 text-xs font-black text-neutral-400 hover:text-amber-400 transition-all relative group uppercase tracking-widest flex items-center gap-1"
              >
                <span className="relative z-10 border-b-2 border-transparent group-hover:border-amber-400/40 transition-colors duration-200">Products</span>
                <ChevronDown size={12} className={`text-neutral-500 transition-transform ${activeDropdown === 'products' ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {activeDropdown === 'products' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 top-full mt-3 w-64 bg-neutral-950 border border-neutral-800 rounded-3xl shadow-2xl p-3 z-[60]"
                  >
                    {productLinks.map((link) => {
                      const Icon = link.icon
                      return (
                        <motion.a
                          key={link.label}
                          href={link.to}
                          onClick={(e) => handleNavigate(link.to, e)}
                          className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-black text-neutral-300 hover:text-amber-400 hover:bg-amber-50/5 transition-all group"
                        >
                          <span className="w-8 h-8 rounded-xl bg-neutral-800 flex items-center justify-center text-amber-400 border border-neutral-700">
                            <Icon size={15} />
                          </span>
                          {link.label}
                        </motion.a>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Developers / API Dropdown */}
            <div className="relative">
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (navItems.length + 1) * 0.1 }}
                onClick={() => toggleDropdown('developers')}
                className="px-6 py-2 text-xs font-black text-neutral-400 hover:text-amber-400 transition-all relative group uppercase tracking-widest flex items-center gap-1"
              >
                <span className="relative z-10 border-b-2 border-transparent group-hover:border-amber-400/40 transition-colors duration-200">Developers</span>
                <ChevronDown size={12} className={`text-neutral-500 transition-transform ${activeDropdown === 'developers' ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {activeDropdown === 'developers' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-3 w-60 bg-neutral-950 border border-neutral-800 rounded-3xl shadow-2xl p-3 z-[60]"
                  >
                    {developerLinks.map((link) => {
                      const Icon = link.icon
                      return (
                        <motion.a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-black text-neutral-300 hover:text-amber-400 hover:bg-amber-50/5 transition-all group"
                        >
                          <span className="w-8 h-8 rounded-xl bg-neutral-800 flex items-center justify-center text-amber-400 border border-neutral-700">
                            <Icon size={15} />
                          </span>
                          {link.label}
                          <ExternalLink size={12} className="ml-auto text-neutral-500 group-hover:text-amber-400" />
                        </motion.a>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {secondaryLinks.map((item, i) => (
              <motion.a
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (navItems.length + 2 + i) * 0.1 }}
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavigate(item.href, e)}
                className={
                  item.prominent
                    ? "px-4 py-2 text-xs font-black text-neutral-300 hover:text-amber-400 uppercase tracking-widest border border-neutral-800 rounded-full hover:border-amber-400/30 transition-all"
                    : "px-4 py-2 text-xs font-medium text-neutral-500 hover:text-neutral-300 transition-all"
                }
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* Action Section */}
          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="relative" ref={userDropdownRef}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 bg-neutral-800 p-1.5 pr-4 rounded-full border border-neutral-700 shadow-sm hover:border-amber-400/30 transition-all"
                >
                  <div className="w-9 h-9 bg-neutral-800 rounded-full flex items-center justify-center text-amber-400 text-[11px] font-black shadow-lg">
                    {currentUser?.name?.charAt(0) || currentUser?.email?.charAt(0) || <User size={16} />}
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest leading-none mb-1">Investor</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[11px] font-black text-neutral-200 uppercase tracking-tight truncate max-w-[80px]">
                        {currentUser?.name?.split(' ')[0] || currentUser?.email?.split('@')[0]}
                      </span>
                      <ChevronDown size={12} className={`text-neutral-500 transition-transform duration-300 ${userDropdownOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </motion.button>

                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-56 bg-neutral-950 border border-neutral-800 rounded-3xl shadow-2xl p-2 z-[60]"
                    >
                  <button
                          onClick={() => {
                            setUserDropdownOpen(false)
                            handleNavigate('/dashboard')
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-black text-neutral-400 hover:text-amber-400 hover:bg-amber-50/5 transition-all uppercase tracking-widest"
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
                           className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-black text-neutral-400 hover:text-amber-400 hover:bg-amber-50/5 transition-all uppercase tracking-widest"
                         >
                           <Users size={16} />
                           Affiliate Portal
                         </button>
                       )}
                       <div className="h-px bg-neutral-800 my-1 mx-2" />
                       <button
                         onClick={handleLogout}
                         className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-black text-neutral-400 hover:text-rose-400 hover:bg-rose-50/5 transition-all uppercase tracking-widest"
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
                  className="text-xs font-medium text-neutral-400 hover:text-neutral-200 transition-all uppercase tracking-widest px-4 py-2"
                >
                  Login
                </button>
                <button
                  onClick={() => onLoginClick('signup')}
                  className="px-8 py-3.5 bg-amber-400 text-neutral-950 rounded-2xl text-xs font-black hover:bg-amber-300 hover:-translate-y-1 active:translate-y-0 transition-all shadow-[0_10px_20px_rgba(245,158,11,0.25)] flex items-center gap-3 group uppercase tracking-widest"
                >
                  Get Started
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Trigger */}
          <button
            className="lg:hidden w-12 h-12 flex items-center justify-center rounded-2xl bg-neutral-800 text-neutral-200 border border-neutral-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden fixed inset-x-4 top-24 bg-neutral-950 rounded-[32px] border border-neutral-800 shadow-2xl overflow-hidden p-8 z-50"
          >
            <div className="space-y-6">
               {navItems.map((item) => (
                 <a
                   key={item.label}
                   href={item.href || item.path}
                   className="block text-2xl font-black text-neutral-200 hover:text-amber-400 transition-colors tracking-tight"
                   onClick={(e) => handleNavigate(item.href || item.path, e)}
                 >
                   {item.label}
                 </a>
               ))}

               <div className="pt-2 pb-1 text-xs font-black text-neutral-500 uppercase tracking-widest">Products</div>
               {productLinks.map((item) => {
                 const Icon = item.icon
                 return (
                   <a
                     key={item.label}
                     href={item.to}
                     className="flex items-center gap-3 block text-xl font-black text-neutral-300 hover:text-amber-400 transition-colors tracking-tight"
                     onClick={(e) => handleNavigate(item.to, e)}
                   >
                     <Icon size={20} />
                     {item.label}
                   </a>
                 )
               })}

               <div className="pt-2 pb-1 text-xs font-black text-neutral-500 uppercase tracking-widest">Developers / API</div>
               {developerLinks.map((item) => {
                 const Icon = item.icon
                 return (
                   <a
                     key={item.label}
                     href={item.href}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="flex items-center gap-3 block text-xl font-black text-neutral-300 hover:text-amber-400 transition-colors tracking-tight"
                   >
                     <Icon size={20} />
                     {item.label}
                     <ExternalLink size={16} className="ml-auto text-neutral-500" />
                   </a>
                 )
               })}

               {secondaryLinks.map((item) => (
                 <a
                   key={item.label}
                   href={item.href}
                   className="block text-lg font-medium text-neutral-400 hover:text-neutral-200 transition-colors tracking-tight"
                   onClick={(e) => handleNavigate(item.href, e)}
                 >
                   {item.label}
                 </a>
               ))}

              <div className="pt-8 border-t border-neutral-800 flex flex-col gap-4">
                {isAuthenticated ? (
                  <>
                      <button
                        onClick={() => handleNavigate('/dashboard')}
                        className="w-full py-5 bg-neutral-800 text-neutral-200 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3"
                      >
                        <LayoutDashboard size={18} />
                        Dashboard
                      </button>
                      {currentUser?.is_affiliate && (
                        <button
                          onClick={() => handleNavigate('/affiliate')}
                          className="w-full py-5 bg-amber-50/10 text-amber-400 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3"
                        >
                          <Users size={18} />
                          Affiliate Portal
                        </button>
                      )}
                    <button
                      onClick={handleLogout}
                      className="w-full py-5 bg-rose-50/10 text-rose-400 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                     <button
                      onClick={() => { onLoginClick('login'); setIsOpen(false); }}
                      className="w-full py-5 bg-neutral-800 text-neutral-200 rounded-2xl font-black uppercase tracking-widest text-sm"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => { onLoginClick('signup'); setIsOpen(false); }}
                      className="w-full py-5 bg-amber-400 text-neutral-950 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl"
                    >
                      Get Started
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

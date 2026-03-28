import { motion } from 'framer-motion'
import { X, Heart, ShoppingCart, Smartphone, Monitor, Tablet, Sparkles, ArrowRight, ExternalLink, Shield } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { MEMBERSHIP_TIERS, checkAccess } from '../utils/membership'

const DesignPreview = ({ item, onExit, onAddToWishlist, isWishlisted, onRequestCustomization, currentUser }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [device, setDevice] = useState(window.innerWidth < 768 ? 'mobile' : 'desktop')
  const scrollContainerRef = useRef(null)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const shouldRotate = isMobile && device === 'desktop'

  useEffect(() => {
    if (!shouldRotate || !scrollContainerRef.current) return

    const el = scrollContainerRef.current
    let startX = 0
    let startY = 0
    let initialScrollTop = 0

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
      initialScrollTop = el.scrollTop
    }

    const handleTouchMove = (e) => {
      if (!shouldRotate) return
      const deltaX = e.touches[0].clientX - startX
      // Inverted Mapping: physical horizontal swipe to vertical scroll
      el.scrollTop = initialScrollTop + deltaX
      // Prevent horizontal browser scroll
      if (Math.abs(deltaX) > 5 && e.cancelable) e.preventDefault()
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: false })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [shouldRotate])

  if (!item) return null

  const userTier = currentUser?.membership_tier || 'free'
  const hasAccess = item.minTier ? checkAccess(userTier, item.minTier) : true
  const requiredTier = item.minTier ? (MEMBERSHIP_TIERS[item.minTier.toUpperCase()]?.name || item.minTier) : null

  return (
    <div className={`fixed top-0 left-0 z-[100] bg-white flex flex-col overflow-hidden transition-all duration-500 ${
      shouldRotate 
        ? 'w-[100dvh] h-[100dvw] origin-top-left rotate-90 translate-x-[100dvw]' 
        : 'w-screen h-screen'
    }`}>
      {/* Redesigned Precision Toolbar - Always Visible */}
      <div className={`bg-white/90 backdrop-blur-xl border-b border-neutral-200 px-4 md:px-8 h-[72px] flex items-center justify-between text-neutral-900 z-[201] flex-shrink-0 ${
        shouldRotate ? 'absolute top-0 left-0 w-full' : 'relative'
      }`}>
          <div className="flex items-center gap-3 md:gap-6">
            <button 
              onClick={onExit}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-all flex items-center justify-center group active:scale-95"
              title="Exit Preview"
            >
              <X size={20} className="group-hover:rotate-90 transition-transform md:w-6 md:h-6" />
            </button>
            
            <div className="flex flex-col">
              <h2 className="font-black text-sm md:text-lg tracking-tighter uppercase italic leading-none truncate max-w-[120px] md:max-w-none">
                {item.name}
              </h2>
              <div className="flex items-center gap-1.5 mt-1">
                <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${hasAccess ? 'bg-blue-500' : 'bg-amber-500'}`} />
                <span className="text-[8px] md:text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                  {requiredTier ? `${requiredTier} Tier Required` : 'Digital Architecture Preview'}
                </span>
                {requiredTier && (
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest border ${
                    hasAccess ? 'text-emerald-500 bg-emerald-50 border-emerald-100' : 'text-amber-500 bg-amber-50 border-amber-100'
                  }`}>
                    {hasAccess ? 'Authorized' : 'Upgrade Required'}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Device Switcher - Responsive Visibility */}
          <div className="flex items-center bg-neutral-100 p-1 rounded-full border border-neutral-200 backdrop-blur-md">
            {[
              { id: 'desktop', icon: Monitor, label: 'Large' },
              { id: 'mobile', icon: Smartphone, label: 'Small' }
            ].filter(d => !isMobile || d.id === 'mobile').map((deviceType) => (
              <button
                key={deviceType.id}
                onClick={() => setDevice(deviceType.id)}
                className={`p-1.5 md:px-5 md:py-2 rounded-full transition-all flex items-center gap-2 ${
                  device === deviceType.id 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
                title={deviceType.label}
              >
                <deviceType.icon size={14} className="md:w-[16px] md:h-[16px]" />
                <span className="hidden lg:inline text-[9px] font-black uppercase tracking-wider">{deviceType.label}</span>
              </button>
            ))}
          </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={() => window.open(item.url, '_blank')}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-neutral-100 text-neutral-900 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center group"
            title="Open in New Tab"
          >
            <ExternalLink size={18} className="md:w-5 md:h-5" />
          </button>
          
          <button 
            onClick={() => hasAccess ? onRequestCustomization(item) : alert(`This design requires ${requiredTier} membership.`)}
            className={`px-5 py-2.5 md:px-8 md:py-3.5 rounded-full md:rounded-2xl font-black text-[9px] md:text-[10px] uppercase tracking-widest shadow-xl transition-all flex items-center gap-2 md:gap-3 group ${
              hasAccess 
                ? 'bg-blue-600 text-white shadow-blue-600/20 hover:bg-blue-500' 
                : 'bg-neutral-200 text-neutral-400 cursor-not-allowed shadow-none'
            }`}
          >
            <span className="hidden sm:inline">{hasAccess ? 'Details' : 'Upgrade Required'}</span>
            <span className="sm:hidden">{hasAccess ? 'Details' : 'Upgrade'}</span>
            {hasAccess ? <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /> : <Shield size={14} />}
          </button>
        </div>
      </div>

      {/* Main Preview Area */}
      <div className={`flex-1 bg-white flex flex-col relative overflow-hidden transition-all duration-500 w-full h-full ${shouldRotate ? 'items-start' : 'items-center'}`}>
        <div 
          ref={scrollContainerRef}
          className={`flex-1 w-full overflow-auto flex flex-col custom-scrollbar h-full ${
            shouldRotate 
              ? 'items-start p-0 touch-auto' 
              : `items-center ${ (device === 'desktop' && !isMobile) ? 'p-0' : 'p-4 md:p-8' }`
          }`}>
          {/* Scroll Overlay - Ensures touches are captured even on cross-origin iframes */}
          {shouldRotate && (
            <div className="absolute inset-0 z-[150] bg-transparent pointer-events-auto" />
          )}
          
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.02),transparent_70%)] pointer-events-none" />
          
          <motion.div
            key={device}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: shouldRotate ? (window.innerHeight / 1280) : 1,
              width: shouldRotate ? 1280 : (device === 'desktop' ? '100%' : device === 'tablet' ? '768px' : '375px'),
              minHeight: shouldRotate ? '10000px' : '100%',
              transformOrigin: 'top left'
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`bg-white shadow-2xl relative transition-all duration-700 border shrink-0 flex flex-col ${
              (shouldRotate || (device === 'desktop' && !isMobile)) 
                ? 'rounded-none border-0 shadow-none overflow-visible' 
                : 'rounded-[24px] md:rounded-[48px] border-neutral-100 border-[3px] md:border-[6px] overflow-hidden'
            }`}
            style={shouldRotate ? {
              width: '1280px',
              minHeight: '10000px'
            } : {}}
          >
            {/* Scrollable content */}
            <div className="w-full h-full overflow-y-auto custom-scrollbar bg-white">
              {item.url ? (
                <iframe 
                  src={item.url} 
                  title={item.name}
                  className="w-full h-full border-0"
                  style={{ minHeight: '100vh' }}
                  sandbox="allow-scripts allow-same-origin allow-forms"
                />
              ) : (
                <div className="relative group">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              )}

              {/* Only show the marketing stuff if it's an image or as a footer for the iframe */}
              <div className="p-8 md:p-20 text-center bg-white">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-neutral-900 mb-6 md:mb-8 tracking-tighter italic leading-tight">
                    Design <span className="text-blue-600">Elevated.</span>
                  </h1>
                  <p className="text-base md:text-xl text-neutral-500 font-medium max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed">
                    Experience how your future project will look and feel. Every pixel here can be tailored to match your brand's unique personality and goals.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 max-w-4xl mx-auto">
                    <div className="p-6 bg-neutral-50 rounded-3xl border border-neutral-100">
                      <div className="text-3xl md:text-4xl font-black text-blue-600 mb-1 italic tracking-tighter">99+</div>
                      <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Global Awards</div>
                    </div>
                    <div className="p-6 bg-neutral-50 rounded-3xl border border-neutral-100">
                      <div className="text-3xl md:text-4xl font-black text-indigo-600 mb-1 italic tracking-tighter">500+</div>
                      <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Active Users</div>
                    </div>
                    <div className="p-6 bg-neutral-50 rounded-3xl border border-neutral-100">
                      <div className="text-3xl md:text-4xl font-black text-purple-600 mb-1 italic tracking-tighter">100%</div>
                      <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Custom Built</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default DesignPreview

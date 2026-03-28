import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronLeft, Monitor, Tablet, Smartphone, 
  ExternalLink, Sparkles, Layout, Shield, 
  ArrowRight, Globe, Zap, MousePointer2, X, Lock
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { MEMBERSHIP_TIERS, checkAccess } from '../utils/membership'

const TemplateViewer = ({ template, onBack }) => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [deviceMode, setDeviceMode] = useState(window.innerWidth < 768 ? 'mobile' : 'desktop')
  const iframeRef = useRef(null)
  const navigate = useNavigate()
  const { isAuthenticated, currentUser, toggleAuthModal } = useAuth()

  const userTier = currentUser?.membership_tier || 'free'
  const hasAccess = template?.minTier ? checkAccess(userTier, template.minTier) : true
  const requiredTierData = template?.minTier ? (MEMBERSHIP_TIERS[template.minTier.toUpperCase()]) : null

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      setInnerWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const scale = (isMobile && deviceMode !== 'mobile')
    ? (deviceMode === 'desktop' ? (innerWidth / 1440) : (innerWidth / 768))
    : 1

  const scrollContainerRef = useRef(null)

  const deviceWidths = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px'
  }

  const renderBlocksPreview = () => {
    const pages = Array.isArray(template?.pages) ? template.pages : []
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');
            
            body {
              font-family: 'Plus Jakarta Sans', sans-serif;
              background: white;
              color: #0f172a;
              overflow-x: hidden;
              margin: 0;
              padding: 0;
            }

            .custom-scrollbar::-webkit-scrollbar {
              width: 6px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: rgba(0,0,0,0.1);
              border-radius: 10px;
            }
          </style>
        </head>
        <body class="custom-scrollbar">
          ${pages[0]?.code || '<div class="py-20 px-8 text-center">No content available</div>'}
        </body>
      </html>
    `

    // Ensure iframeRef is available before trying to render
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document
      doc.open()
      doc.write(html)
      doc.close()
    } else {
      // If iframeRef is not available yet, try again after a short delay
      setTimeout(renderBlocksPreview, 50)
    }
  }

  useEffect(() => {
    if (template && !template.url) {
      // Ensure we wait for DOM to be updated
      const timeoutId = setTimeout(() => {
        renderBlocksPreview()
      }, 200)
      return () => clearTimeout(timeoutId)
    }
  }, [template, deviceMode])

  const handleRequestCustomization = () => {
    if (!isAuthenticated) {
      toggleAuthModal('signup')
      return
    }

    if (!currentUser?.membership_tier || currentUser?.subscription_status !== 'active') {
      alert('You need an active membership to select and deploy templates. Please subscribe to a plan first.')
      navigate('/', { state: { scrollTo: 'pricing' } })
      return
    }

    if (!hasAccess) {
      alert(`This blueprint requires ${requiredTierData?.name || template.minTier} membership. Please upgrade in the billing section.`)
      return
    }

    navigate('/dashboard', { state: { tab: 'partner' } })
  }

  if (!template) return null

  return (
    <div className="fixed top-0 left-0 z-[100] bg-white flex flex-col font-sans overflow-hidden w-[100dvw] h-[100dvh]">
      {/* Precision Header - Glass-morphic Enterprise Look */}
      <header className="bg-white/80 backdrop-blur-2xl border-b border-slate-100 h-[72px] px-4 md:px-10 flex items-center justify-between z-[201] flex-shrink-0 relative">
        <div className="flex items-center gap-4 md:gap-8">
          <button 
            onClick={() => onBack()}
            className="group flex items-center justify-center w-10 h-10 rounded-2xl bg-slate-50 hover:bg-slate-900 text-slate-400 hover:text-white transition-all active:scale-95 duration-300"
            title="Return to Base"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
          
          <div className="flex flex-col">
            <h1 className="text-base md:text-xl font-black text-slate-900 uppercase italic tracking-tighter leading-none truncate max-w-[150px] md:max-w-none">
              {template.name}
            </h1>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Architecture Node</span>
            </div>
          </div>
        </div>

        {/* Device Toggles - Visible on Desktop */}
        {!isMobile && (
          <div className="flex items-center bg-slate-50 p-1.5 rounded-[20px] border border-slate-100 shadow-inner">
            {[
              { mode: 'desktop', icon: Monitor, label: 'Desktop' },
              { mode: 'tablet', icon: Tablet, label: 'Tablet' },
              { mode: 'mobile', icon: Smartphone, label: 'Mobile' }
            ].map((device) => (
              <button
                key={device.mode}
                onClick={() => setDeviceMode(device.mode)}
                className={`px-5 py-2 rounded-2xl transition-all flex items-center gap-3 ${
                  deviceMode === device.mode 
                    ? 'bg-white text-blue-600 shadow-sm border border-slate-100' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
                title={device.label}
              >
                <device.icon size={16} />
                <span className="hidden lg:inline text-[10px] font-black uppercase tracking-widest">{device.label}</span>
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3 md:gap-5">
          <button 
            onClick={handleRequestCustomization}
            className={`px-6 py-3.5 md:px-10 md:py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl flex items-center gap-3 group overflow-hidden relative ${
              !isAuthenticated || !currentUser?.membership_tier || currentUser?.subscription_status !== 'active' || !hasAccess
                ? 'bg-slate-100 text-slate-400 border border-slate-200'
                : 'bg-slate-900 text-white hover:bg-blue-600 shadow-slate-900/10'
            }`}
          >
            <span className="relative z-10 hidden sm:inline">
              {!isAuthenticated || !currentUser?.membership_tier || currentUser?.subscription_status !== 'active' ? 'Initialize Design' : hasAccess ? 'Initialize Design' : 'Upgrade Required'}
            </span>
            <span className="relative z-10 sm:hidden">
              {!isAuthenticated || !currentUser?.membership_tier || currentUser?.subscription_status !== 'active' ? 'Launch' : hasAccess ? 'Launch' : 'Upgrade'}
            </span>
            {!isAuthenticated || !currentUser?.membership_tier || currentUser?.subscription_status !== 'active' ? <Lock size={16} className="relative z-10" /> : hasAccess ? <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" /> : <Shield size={16} className="relative z-10" />}
            {isAuthenticated && currentUser?.membership_tier && currentUser?.subscription_status === 'active' && hasAccess && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </button>
        </div>
      </header>

      <main className="flex-1 relative bg-white overflow-hidden flex flex-col w-full h-full items-center">
        <div 
          ref={scrollContainerRef}
          className={`flex-1 w-full overflow-auto flex flex-col custom-scrollbar h-full items-center transition-all duration-500 ${
            (deviceMode === 'desktop' && !isMobile) ? 'p-0' : 'p-0 md:p-0 lg:p-0'
          } ${deviceMode === 'desktop' ? 'bg-white' : 'bg-slate-50/50'}`}
        >
          {/* Main Preview Container */}
          <motion.div
            layout
            initial={false}
            animate={{ 
              width: deviceWidths[deviceMode],
              height: '100%',
              minHeight: '100%',
              scale: scale,
              transformOrigin: (isMobile && deviceMode !== 'mobile') ? 'top left' : 'top center'
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`bg-white relative flex flex-col shrink-0 transition-all ${
              (deviceMode === 'desktop' && !isMobile)
                ? 'border-0 shadow-none' 
                : 'border-x border-slate-100 shadow-[0_0_50px_-12px_rgba(0,0,0,0.05)]'
            }`}
            style={{
              width: deviceWidths[deviceMode],
              height: '100%'
            }}
          >
            <div className="flex-1 w-full relative h-full overflow-hidden">
              <iframe
                key={`${template.id}-${deviceMode}`}
                ref={iframeRef}
                src={template.url || "about:blank"}
                title="Template Preview"
                className="w-full h-full border-none block"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                scrolling="yes"
              />
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

export default TemplateViewer

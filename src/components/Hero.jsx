import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView } from 'framer-motion'
import { useRef, useEffect, useMemo } from 'react'
import AnimatedCTA from './AnimatedCTA'
import { Play, Sparkles, Star, ShieldCheck, Zap, Globe, Cpu, Activity, Server, Layout, MousePointer2 } from 'lucide-react'

const Hero = ({ onGetStarted }) => {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.1 })
  const { scrollY } = useScroll()
  
  // Mouse movement for interactive background
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth mouse movement using spring - reduced stiffness for better performance
  const springConfig = { damping: 30, stiffness: 100 }
  const smoothMouseX = useSpring(mouseX, springConfig)
  const smoothMouseY = useSpring(mouseY, springConfig)

  // Interactive parallax effects based on mouse
  const rotateX = useTransform(smoothMouseY, [-300, 300], [5, -5])
  const rotateY = useTransform(smoothMouseX, [-300, 300], [-5, 5])

  useEffect(() => {
    if (!isInView) return

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      mouseX.set(clientX - innerWidth / 2)
      mouseY.set(clientY - innerHeight / 2)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY, isInView])

  // Scroll parallax effects - only if in view
  const y1 = useTransform(scrollY, [0, 500], [0, 100])
  const y2 = useTransform(scrollY, [0, 500], [0, -80])
  
  // Memoize static elements or simplified versions
  const gridBackground = useMemo(() => (
    <div className="absolute inset-0" style={{ maskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)' }}>
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} 
      />
    </div>
  ), [])

  return (
    <section 
      ref={containerRef}
      id="hero" 
      className="relative min-h-screen flex items-center overflow-hidden bg-white pt-20 pb-20"
    >
      {/* Background Image for Mobile */}
      <div className="absolute inset-0 lg:hidden z-0">
        <img 
          src="https://i.imgur.com/6nGQFtj.png" 
          alt="Hero Background" 
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white" />
      </div>

      {/* Innovative Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Animated Gradient Mesh - Simplified */}
        <div className="absolute inset-0 opacity-30">
          <motion.div 
            style={{ 
              x: useTransform(smoothMouseX, [-500, 500], [-10, 10]), 
              y: useTransform(smoothMouseY, [-500, 500], [-10, 10]) 
            }}
            className="absolute top-[-5%] left-[-5%] w-[110%] h-[110%] bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.05)_0%,transparent_50%)]" 
          />
        </div>

        {gridBackground}
        
        {/* Floating Elements - Reduced blur and movement */}
        <motion.div style={{ y: y1 }} className="absolute top-[15%] right-[20%] w-64 h-64 bg-blue-100/20 rounded-full blur-[80px]" />
        <motion.div style={{ y: y2 }} className="absolute bottom-[15%] left-[15%] w-64 h-64 bg-indigo-100/20 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Kinetic Typography */}
          <div className="lg:col-span-7 relative">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-neutral-50 border border-neutral-200/50 rounded-full mb-10 shadow-sm"
            >
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-600">Infrastructure For The Next Era</span>
            </motion.div>

            <div className="relative mb-12">
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                className="text-5xl sm:text-6xl md:text-7xl font-black leading-[0.9] tracking-tighter text-neutral-950 uppercase"
              >
                <div className="overflow-hidden">
                  <motion.span 
                    initial={{ y: "100%" }}
                    animate={isInView ? { y: 0 } : {}}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="block"
                  >
                    Architecting
                  </motion.span>
                </div>
                <div className="overflow-hidden">
                  <motion.span 
                    initial={{ y: "100%" }}
                    animate={isInView ? { y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="block text-blue-600 italic font-light"
                  >
                    Digital
                  </motion.span>
                </div>
                <div className="overflow-hidden">
                  <motion.span 
                    initial={{ y: "100%" }}
                    animate={isInView ? { y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="block bg-clip-text text-transparent bg-gradient-to-r from-neutral-950 to-neutral-600"
                  >
                    Ecosystems.
                  </motion.span>
                </div>
              </motion.h1>
            </div>

            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-neutral-500 mb-14 leading-tight max-w-xl font-medium"
            >
              We don't just build software. We engineer <span className="text-neutral-900 font-bold">modular foundations</span> for global-scale innovation.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-6"
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-500" />
                <AnimatedCTA onClick={onGetStarted} className="relative !h-16 !text-[11px] !bg-neutral-950 !text-white" />
              </div>

              <motion.a 
                href="https://www.youtube.com/@iyonicorp"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-10 py-5 bg-white border border-neutral-200 text-neutral-950 rounded-2xl font-bold text-[11px] uppercase tracking-[0.2em] overflow-hidden transition-all hover:border-neutral-950 hover:shadow-xl cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Play size={12} fill="currentColor" />
                  The Blueprint
                </span>
                <div className="absolute inset-0 bg-neutral-50 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </motion.a>
            </motion.div>
          </div>

          {/* Right Column: Optimized Image Composition */}
          <div className="hidden lg:block lg:col-span-5 relative mt-20 lg:mt-0" style={{ perspective: '1200px' }}>
            <motion.div
              style={{ 
                rotateX, 
                rotateY,
                transformStyle: "preserve-3d"
              }}
              className="relative z-10"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-[40px] md:rounded-[60px] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] bg-neutral-50 p-2 border border-neutral-200"
              >
                <div className="relative group aspect-[4/5] overflow-hidden rounded-[34px] md:rounded-[54px]">
                  <img 
                    src="https://i.imgur.com/6nGQFtj.png" 
                    alt="Infrastructure Preview" 
                    className="w-full h-full object-cover opacity-90 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { useRef, useEffect } from 'react'
import AnimatedCTA from './AnimatedCTA'
import { Play, Sparkles, Star, ShieldCheck, Zap, Globe, Cpu, Activity, Server, Layout, MousePointer2 } from 'lucide-react'

const Hero = ({ onGetStarted }) => {
  const containerRef = useRef(null)
  const { scrollY } = useScroll()
  
  // Mouse movement for interactive background
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth mouse movement using spring
  const springConfig = { damping: 25, stiffness: 150 }
  const smoothMouseX = useSpring(mouseX, springConfig)
  const smoothMouseY = useSpring(mouseY, springConfig)

  // Interactive parallax effects based on mouse
  const rotateX = useTransform(smoothMouseY, [-300, 300], [10, -10])
  const rotateY = useTransform(smoothMouseX, [-300, 300], [-10, 10])

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      mouseX.set(clientX - innerWidth / 2)
      mouseY.set(clientY - innerHeight / 2)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  // Scroll parallax effects
  const y1 = useTransform(scrollY, [0, 500], [0, 200])
  const y2 = useTransform(scrollY, [0, 500], [0, -150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 500], [1, 0.95])

  // Magnetic Button Effect
  const ctaX = useMotionValue(0)
  const ctaY = useMotionValue(0)
  const smoothCtaX = useSpring(ctaX, { damping: 20, stiffness: 300 })
  const smoothCtaY = useSpring(ctaY, { damping: 20, stiffness: 300 })

  const handleCtaMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e
    const { left, top, width, height } = currentTarget.getBoundingClientRect()
    const centerX = left + width / 2
    const centerY = top + height / 2
    ctaX.set((clientX - centerX) * 0.4)
    ctaY.set((clientY - centerY) * 0.4)
  }

  const handleCtaMouseLeave = () => {
    ctaX.set(0)
    ctaY.set(0)
  }

  return (
    <section 
      ref={containerRef}
      id="hero" 
      className="relative min-h-screen flex items-center overflow-hidden bg-neutral-50 pt-20 pb-20"
    >
      {/* Innovative Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Animated Gradient Mesh */}
        <div className="absolute inset-0 opacity-40">
          <motion.div 
            style={{ x: useTransform(smoothMouseX, [-500, 500], [-20, 20]), y: useTransform(smoothMouseY, [-500, 500], [-20, 20]) }}
            className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.08)_0%,transparent_50%)]" 
          />
          <motion.div 
            style={{ x: useTransform(smoothMouseX, [-500, 500], [20, -20]), y: useTransform(smoothMouseY, [-500, 500], [20, -20]) }}
            className="absolute bottom-[-10%] right-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.08)_0%,transparent_50%)]" 
          />
        </div>

        {/* Dynamic Grid System */}
        <div className="absolute inset-0" style={{ maskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)' }}>
          <div 
            className="absolute inset-0 opacity-[0.03]" 
            style={{ 
              backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
              backgroundSize: '40px 40px' 
            }} 
          />
          <motion.div 
            style={{ 
              x: useTransform(smoothMouseX, [-1000, 1000], [-50, 50]),
              y: useTransform(smoothMouseY, [-1000, 1000], [-50, 50]),
              backgroundImage: 'linear-gradient(#000 2px, transparent 2px), linear-gradient(90deg, #000 2px, transparent 2px)', 
              backgroundSize: '120px 120px'
            }}
            className="absolute inset-0 opacity-[0.05]"
          />
        </div>
        
        {/* Floating Elements */}
        <motion.div style={{ y: y1 }} className="absolute top-[10%] right-[15%] w-96 h-96 bg-blue-100/30 rounded-full blur-[120px]" />
        <motion.div style={{ y: y2 }} className="absolute bottom-[10%] left-[10%] w-80 h-80 bg-indigo-100/30 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Kinetic Typography */}
          <div className="lg:col-span-7 relative">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 backdrop-blur-md border border-neutral-200/50 rounded-full mb-10 shadow-sm"
            >
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-600">Infrastructure For The Next Era</span>
            </motion.div>

            <div className="relative mb-12">
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-5xl sm:text-6xl md:text-7xl font-black leading-[0.9] tracking-tighter text-neutral-950 uppercase"
              >
                <div className="overflow-hidden">
                  <motion.span 
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="block"
                  >
                    Architecting
                  </motion.span>
                </div>
                <div className="overflow-hidden">
                  <motion.span 
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="block text-blue-600 italic font-light"
                  >
                    Digital
                  </motion.span>
                </div>
                <div className="overflow-hidden">
                  <motion.span 
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="block bg-clip-text text-transparent bg-gradient-to-r from-neutral-950 to-neutral-600"
                  >
                    Ecosystems.
                  </motion.span>
                </div>
              </motion.h1>
              
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute -left-8 top-1/2 w-4 h-[200%] bg-blue-600/5 origin-top hidden xl:block"
              />
            </div>

            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-neutral-500 mb-14 leading-tight max-w-xl font-medium"
            >
              We don't just build software. We engineer <span className="text-neutral-900">modular foundations</span> for global-scale innovation.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-6"
            >
              <motion.div 
                style={{ x: smoothCtaX, y: smoothCtaY }}
                onMouseMove={handleCtaMouseMove}
                onMouseLeave={handleCtaMouseLeave}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
                <AnimatedCTA onClick={onGetStarted} className="relative !h-16 !text-[11px]" />
              </motion.div>

              <motion.a 
                href="https://www.youtube.com/@iyonicorp"
                target="_blank"
                rel="noopener noreferrer"
                style={{ x: smoothCtaX, y: smoothCtaY }}
                onMouseMove={handleCtaMouseMove}
                onMouseLeave={handleCtaMouseLeave}
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

          {/* Right Column: 3D-Tilt Image Composition */}
          <div className="lg:col-span-5 relative mt-20 lg:mt-0" style={{ perspective: '1000px' }}>
            <motion.div
              style={{ 
                rotateX, 
                rotateY,
                transformStyle: "preserve-3d"
              }}
              className="relative z-10"
            >
              {/* Main Visual Container */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-[40px] md:rounded-[60px] overflow-hidden shadow-[0_80px_120px_-30px_rgba(0,0,0,0.3)] bg-neutral-950 p-2 border border-white/10"
              >
                <div className="relative group aspect-[4/5] overflow-hidden rounded-[34px] md:rounded-[54px]">
                  <img 
                    src="https://i.imgur.com/4FgNg4S.png" 
                    alt="Infrastructure Preview" 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
                </div>
                
                {/* Floating Glassmorphism Data Cards */}
                <motion.div 
                  style={{ transform: "translateZ(50px)" }}
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-12 -right-4 md:-right-8 bg-white/90 backdrop-blur-3xl p-6 rounded-3xl shadow-2xl border border-white/50 min-w-[240px] z-20"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                      <Activity size={24} />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Real-time Traffic</div>
                      <div className="text-2xl font-black text-neutral-950 tabular-nums">1.2k <span className="text-sm font-medium text-neutral-400">req/s</span></div>
                    </div>
                  </div>
                  <div className="flex gap-1 h-8 items-end">
                    {[40, 70, 45, 90, 65, 80, 50, 95, 70, 85].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ 
                          duration: 1, 
                          repeat: Infinity, 
                          repeatType: "reverse", 
                          delay: i * 0.1 
                        }}
                        className="flex-1 bg-blue-600/20 rounded-t-sm"
                      />
                    ))}
                  </div>
                </motion.div>

                <motion.div 
                  style={{ transform: "translateZ(80px)" }}
                  animate={{ y: [0, 25, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-12 -left-4 md:-left-8 bg-neutral-900/95 backdrop-blur-3xl p-6 rounded-3xl shadow-2xl border border-white/10 text-white min-w-[220px] z-20"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex -space-x-3">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="w-9 h-9 rounded-full border-2 border-neutral-900 bg-neutral-800 flex items-center justify-center overflow-hidden">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="avatar" />
                        </div>
                      ))}
                    </div>
                    <div className="h-8 w-[1px] bg-white/10" />
                    <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest leading-none">
                      Trusted by <br /> <span className="text-white">500+ Devs</span>
                    </div>
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="text-4xl font-black italic tracking-tighter">4.9</div>
                    <div className="flex gap-0.5 mb-1.5">
                      {[1, 2, 3, 4, 5].map(i => <Star key={i} size={10} className="text-blue-500 fill-blue-500" />)}
                    </div>
                  </div>
                </motion.div>

                {/* Perspective Badge */}
                <motion.div 
                  style={{ transform: "translateZ(100px)" }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest shadow-2xl border border-blue-400/50 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Layout size={12} />
                  Live Preview
                </motion.div>
              </motion.div>

              {/* Advanced Decorative Accents */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600 rounded-full blur-[120px] opacity-20 -z-10 animate-pulse" />
              <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-indigo-600 rounded-full blur-[140px] opacity-20 -z-10 animate-pulse delay-1000" />
            </motion.div>
            
            {/* Background floating icon */}
            <motion.div
              animate={{ 
                y: [0, -30, 0],
                rotate: [0, 15, 0]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute -top-10 left-10 text-neutral-200/50 hidden xl:block"
            >
              <Cpu size={80} strokeWidth={1} />
            </motion.div>
          </div>
          
        </div>
      </div>

    </section>
  )
}

export default Hero

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Play, Sparkles, Zap, Shield, Globe, ArrowRight, Activity, Cpu, Code } from 'lucide-react'

const Hero = ({ onGetStarted }) => {
  const containerRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 200])
  const y2 = useTransform(scrollY, [0, 500], [0, -150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      id="hero" 
      className="relative min-h-[110vh] flex items-center justify-center overflow-hidden bg-[#fafafa]"
    >
      {/* Dynamic Background Layer */}
      <div className="absolute inset-0 z-0">
        {/* Full Page Logo Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <motion.img 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ duration: 2 }}
            src="https://i.imgur.com/6nGQFtj.png" 
            alt="" 
            className="w-[120%] h-[120%] object-contain grayscale opacity-10 blur-sm"
          />
        </div>

        {/* Interactive Radial Gradient */}
        <div 
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(37, 99, 235, 0.06), transparent 80%)`
          }}
        />
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ 
            backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
            backgroundSize: '40px 40px' 
          }} 
        />

        {/* Floating Decorative Elements */}
        <motion.div 
          style={{ y: y1, opacity }}
          className="absolute top-20 left-[10%] w-64 h-64 bg-blue-100/20 blur-3xl rounded-full"
        />
        <motion.div 
          style={{ y: y2, opacity }}
          className="absolute bottom-20 right-[15%] w-96 h-96 bg-indigo-100/20 blur-3xl rounded-full"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 pt-20">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Content */}
          <div className="lg:col-span-8 flex flex-col items-start text-left">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 px-4 py-2 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-neutral-100 rounded-2xl mb-8"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-neutral-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="" className="w-full h-full object-cover grayscale" />
                  </div>
                ))}
              </div>
              <div className="h-4 w-px bg-neutral-200 mx-1" />
              <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                Trusted by 500+ Innovators
              </span>
            </motion.div>

            <div className="relative mb-10 w-full">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[11rem] font-black leading-[0.8] tracking-tighter text-neutral-950 uppercase"
              >
                Next <br />
                <span className="text-blue-600 inline-flex items-center">
                  Level
                  <motion.div
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="ml-4 hidden md:block"
                  >
                    <Sparkles className="w-20 h-20 text-blue-200" />
                  </motion.div>
                </span> <br />
                Digital.
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -right-12 top-1/2 -translate-y-1/2 hidden xl:block"
              >
                <div className="bg-white p-6 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-neutral-100 backdrop-blur-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                      <Activity size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Performance</p>
                      <p className="text-lg font-black text-neutral-950">99.9% Score</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {[40, 70, 45, 90, 65, 80].map((h, i) => (
                      <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: h/2 }}
                        transition={{ delay: 1 + (i*0.1), duration: 1 }}
                        className="w-1.5 bg-blue-100 rounded-full self-end"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-neutral-500 mb-12 max-w-xl font-medium leading-relaxed text-left"
            >
              We don't just build websites. We architect <span className="text-neutral-950 font-bold italic underline decoration-blue-500/30 decoration-4 underline-offset-4">high-velocity systems</span> that dominate your industry.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <button 
                onClick={onGetStarted}
                className="px-10 py-6 bg-neutral-950 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-blue-600 transition-all flex items-center justify-center gap-4 group relative overflow-hidden"
              >
                <span className="relative z-10">Start Your Engine</span>
                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <a 
                href="https://www.youtube.com/@iyonicorp"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-6 bg-white border border-neutral-200 text-neutral-950 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:border-neutral-950 transition-all flex items-center justify-center gap-4 group"
              >
                <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-950 group-hover:text-white transition-colors">
                  <Play size={14} fill="currentColor" />
                </div>
                View Showreel
              </a>
            </motion.div>
          </div>

          {/* Side Visual / Stats Panel */}
          <div className="lg:col-span-4 hidden lg:flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-8 bg-white rounded-[3rem] border border-neutral-100 shadow-[0_30px_60px_rgba(0,0,0,0.03)] relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Cpu size={120} />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                  <Zap size={24} />
                </div>
                <h3 className="text-2xl font-black text-neutral-950 mb-2 uppercase italic">Extreme Velocity</h3>
                <p className="text-sm text-neutral-500 font-medium leading-relaxed">
                  Optimized infrastructure achieving sub-100ms response times globally.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="p-8 bg-neutral-950 rounded-[3rem] text-white shadow-[0_30px_60px_rgba(0,0,0,0.1)] relative overflow-hidden group"
            >
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Code size={120} />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
                  <Shield size={24} />
                </div>
                <h3 className="text-2xl font-black mb-2 uppercase italic text-white">Hardened Security</h3>
                <p className="text-sm text-white/60 font-medium leading-relaxed">
                  Enterprise-grade protection with multi-layered encryption by default.
                </p>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Bottom Trust Ticker */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-24 pt-10 border-t border-neutral-200/50 flex flex-wrap justify-between items-center gap-8"
        >
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">Infrastructure</span>
            <div className="flex gap-6">
              <span className="text-xs font-black text-neutral-950 uppercase italic tracking-tighter">AWS Edge</span>
              <span className="text-xs font-black text-neutral-950 uppercase italic tracking-tighter">Vercel Turbo</span>
              <span className="text-xs font-black text-neutral-950 uppercase italic tracking-tighter">Cloudflare</span>
            </div>
          </div>
          
          <div className="flex items-center gap-12">
             {[
                { label: '99.9% Uptime', icon: Shield },
                { label: 'Global Edge', icon: Globe }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <item.icon size={16} className="text-blue-600" />
                  <span className="text-[10px] font-black text-neutral-950 uppercase tracking-[0.2em]">{item.label}</span>
                </div>
              ))}
          </div>
        </motion.div>
      </div>

    </section>
  )
}

export default Hero

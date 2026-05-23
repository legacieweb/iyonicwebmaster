import { motion } from 'framer-motion'
import { ArrowRight, Play, Sparkles, Shield, Zap, Globe, Cpu, Database, Activity } from 'lucide-react'
import { useRef } from 'react'

const Hero = ({ onGetStarted, onSignUp }) => {
  const containerRef = useRef(null)

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#fafafa] selection:bg-blue-600 selection:text-white pt-32 lg:pt-40 pb-20"
    >
      {/* Advanced Background Layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Static Mesh Gradients */}
        <div className="absolute inset-0 opacity-60">
          <div className="absolute -top-[20%] -left-[10%] w-[80%] h-[80%] bg-blue-400/15 rounded-full blur-[160px]" />
          <div className="absolute top-[10%] -right-[20%] w-[70%] h-[70%] bg-purple-400/15 rounded-full blur-[140px]" />
          <div className="absolute -bottom-[20%] left-[20%] w-[75%] h-[75%] bg-emerald-400/15 rounded-full blur-[180px]" />
        </div>

        {/* Grid & Noise Pattern */}
        <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none" style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }} />
        <div className="absolute inset-0" style={{ 
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.04) 1px, transparent 0)`,
          backgroundSize: '40px 40px' 
        }} />
        
        {/* Static Particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-32 bg-gradient-to-b from-transparent via-blue-500/30 to-transparent hidden lg:block opacity-20"
            style={{ 
              left: `${(i * 9) % 100}%`, 
              top: `${(i * 13) % 100}%` 
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-[2560px] mx-auto relative z-10 px-6 lg:px-24">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-16 lg:gap-20 xl:gap-32">
          
          {/* Left Content Column */}
          <div className="w-full lg:w-1/2 xl:w-[55%] text-left">
            {/* Live Status Badge */}
            <div className="inline-flex items-center gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white/80 border border-neutral-200 shadow-xl mb-8 sm:mb-10 group cursor-default backdrop-blur-md">
              <div className="relative w-2 h-2 sm:w-2.5 sm:h-2.5">
                <div className="relative w-full h-full bg-emerald-500 rounded-full" />
              </div>
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-neutral-500">
                System Status: <span className="text-emerald-600">Active</span>
              </span>
              <div className="w-px h-3 sm:h-4 bg-neutral-200 mx-1 sm:mx-2" />
              <Sparkles size={12} className="text-blue-600" />
            </div>

            {/* Headline */}
            <div className="relative mb-6 sm:mb-8">
              <h1 className="text-5xl sm:text-7xl md:text-8xl xl:text-9xl 2xl:text-[11rem] font-black tracking-tighter text-neutral-950 leading-[0.8] uppercase flex flex-col">
                <span className="relative inline-block pb-2 sm:pb-4">
                  Next Gen
                </span>
                <span className="relative inline-block italic text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-2 sm:py-4 drop-shadow-2xl">
                  Systems
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg sm:text-xl md:text-2xl xl:text-3xl text-neutral-500 max-w-2xl mb-10 sm:mb-12 font-medium leading-tight">
              We engineer high-performance digital infrastructure for visionary brands who demand 
              <span className="text-neutral-950 px-2 font-black italic">absolute scale</span> 
              and technical supremacy.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <button 
                onClick={onGetStarted}
                className="group relative w-full sm:w-auto px-8 sm:px-10 py-5 sm:py-6 bg-neutral-950 text-white rounded-2xl sm:rounded-[2rem] font-black text-[10px] sm:text-xs uppercase tracking-[0.3em] overflow-hidden transition-all hover:shadow-[0_20px_60px_rgba(37,99,235,0.3)] hover:-translate-y-1 active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 flex items-center justify-center gap-3 sm:gap-4">
                  Initialize Project
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </span>
              </button>

              <a 
                href="https://www.youtube.com/@iyonicorp"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-4 sm:gap-5 px-8 sm:px-10 py-5 sm:py-6 rounded-2xl sm:rounded-[2rem] border-2 border-neutral-200 bg-white hover:bg-neutral-50 hover:border-neutral-950 transition-all active:scale-95 shadow-xl w-full sm:w-auto"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-neutral-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Play size={12} fill="currentColor" />
                </div>
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-neutral-600 group-hover:text-neutral-950">
                  Systems Archive
                </span>
              </a>
            </div>
          </div>

          {/* Right Visual Column */}
          <div className="relative w-full lg:w-1/2 xl:w-[45%] flex justify-center lg:justify-end mt-12 lg:mt-0">
            <div className="relative w-full max-w-[650px] aspect-square">
              {/* Main Visual Card */}
              <div className="absolute inset-0 rounded-[40px] sm:rounded-[64px] bg-white border border-neutral-200 shadow-[0_60px_100px_rgba(0,0,0,0.08)] p-6 sm:p-12 overflow-hidden backdrop-blur-xl bg-white/70">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8 sm:mb-12">
                    <div className="flex gap-2 sm:gap-3">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-rose-400/50" />
                      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-amber-400/50" />
                      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-emerald-400/50" />
                    </div>
                    <div className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-neutral-100 text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-neutral-400">
                      Live Environment
                    </div>
                  </div>
                  
                  {/* System UI Mockup */}
                  <div className="flex-1 space-y-6 sm:space-y-10">
                    <div className="h-32 sm:h-48 bg-neutral-900 rounded-[24px] sm:rounded-[40px] border border-white/10 p-4 sm:p-8 flex flex-col justify-between relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative z-10 flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-1">Throughput</span>
                          <span className="text-xl sm:text-2xl font-black text-white">4.8 GB/s</span>
                        </div>
                        <Activity size={18} className="text-blue-500" />
                      </div>
                      <div className="relative z-10 flex items-end gap-1 sm:gap-1.5 h-10 sm:h-16">
                        {[...Array(15)].map((_, i) => (
                          <motion.div
                            key={i}
                            animate={{ height: [`${[20, 50, 35, 60, 30][i % 5]}%`, `${[40, 70, 55, 80, 50][i % 5]}%`, `${[20, 50, 35, 60, 30][i % 5]}%`] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.05 }}
                            className="flex-1 bg-gradient-to-t from-blue-600 to-indigo-400 rounded-t-sm"
                          />
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:gap-6">
                      {[
                        { label: 'Latency', value: '0.8ms', icon: <Cpu size={16} /> },
                        { label: 'Uptime', value: '99.99%', icon: <Globe size={16} /> },
                        { label: 'Nodes', value: '1,024', icon: <Database size={16} /> },
                        { label: 'Security', value: 'Hardened', icon: <Shield size={16} /> }
                      ].map((stat, i) => (
                        <div key={i} className="p-4 sm:p-6 bg-neutral-50 rounded-[24px] sm:rounded-[32px] border border-neutral-100">
                          <div className="flex items-center gap-2 sm:gap-3 mb-2 text-neutral-400">
                            {stat.icon}
                            <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</span>
                          </div>
                          <div className="text-lg sm:text-2xl font-black text-neutral-950 tracking-tighter">{stat.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* External Floating Orbs */}
              <div className="absolute -top-8 -left-8 sm:-top-16 sm:-left-16 w-16 h-16 sm:w-32 sm:h-32 bg-white border border-neutral-200 rounded-2xl sm:rounded-[3rem] shadow-2xl flex items-center justify-center p-4 sm:p-8 z-20">
                <Globe className="text-blue-600" size={24} />
              </div>

              <div className="absolute -bottom-6 -right-6 sm:-bottom-12 sm:-right-12 px-6 py-4 sm:px-10 sm:py-8 bg-neutral-950 text-white rounded-2xl sm:rounded-[3rem] shadow-2xl flex items-center gap-3 sm:gap-6 z-20">
                <Zap size={20} className="text-blue-500" />
                <div>
                  <div className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-blue-400">Scale</div>
                  <div className="text-xl sm:text-3xl font-black italic">+840%</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  )
}

export default Hero

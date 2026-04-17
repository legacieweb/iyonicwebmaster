import { useRef, useEffect } from 'react'
import AnimatedCTA from './AnimatedCTA'
import { Play } from 'lucide-react'

const Hero = ({ onGetStarted }) => {
  const containerRef = useRef(null)

  return (
    <section 
      ref={containerRef}
      id="hero" 
      className="relative min-h-screen flex items-center overflow-hidden bg-white pt-20 pb-20"
    >
      <div className="absolute inset-0 lg:hidden z-0">
        <img 
          src="https://i.imgur.com/6nGQFtj.png" 
          alt="Hero Background" 
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white" />
      </div>

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-[-5%] left-[-5%] w-[110%] h-[110%] bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.05)_0%,transparent_50%)]" />
        </div>
        
        <div className="absolute top-[15%] right-[20%] w-64 h-64 bg-blue-100/20 rounded-full blur-[80px]" />
        <div className="absolute bottom-[15%] left-[15%] w-64 h-64 bg-indigo-100/20 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-7 relative">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-neutral-50 border border-neutral-200/50 rounded-full mb-10 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-blue-600" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-600">Infrastructure For The Next Era</span>
            </div>

            <div className="relative mb-12">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-[0.9] tracking-tighter text-neutral-950 uppercase">
                <div className="overflow-hidden">
                  <span className="block">
                    Architecting
                  </span>
                </div>
                <div className="overflow-hidden">
                  <span className="block text-blue-600 italic font-light">
                    Digital
                  </span>
                </div>
                <div className="overflow-hidden">
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-neutral-950 to-neutral-600">
                    Ecosystems.
                  </span>
                </div>
              </h1>
            </div>

            <p className="text-xl md:text-2xl text-neutral-500 mb-14 leading-tight max-w-xl font-medium">
              We don't just build software. We engineer <span className="text-neutral-900 font-bold">modular foundations</span> for global-scale innovation.
            </p>

            <div className="flex flex-wrap gap-6">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-500" />
                <AnimatedCTA onClick={onGetStarted} className="relative !h-16 !text-[11px] !bg-neutral-950 !text-white" />
              </div>

              <a 
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
              </a>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-5 relative mt-20 lg:mt-0">
            <div className="relative z-10">
              <div className="relative rounded-[40px] md:rounded-[60px] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] bg-neutral-50 p-2 border border-neutral-200">
                <div className="relative group aspect-[4/5] overflow-hidden rounded-[34px] md:rounded-[54px]">
                  <img 
                    src="https://i.imgur.com/6nGQFtj.png" 
                    alt="Infrastructure Preview" 
                    className="w-full h-full object-cover opacity-90 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent" />
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
import { motion } from 'framer-motion'
import { ArrowRight, Globe, CreditCard, Bot } from 'lucide-react'
import { BRAND_CONTENT } from '../utils/constants'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 }
  }
}

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 }
}

const Hero = ({ onExploreBusinesses, onExploreIyonicWeb }) => {
  const handleSecondaryClick = () => {
    if (onExploreIyonicWeb) {
      onExploreIyonicWeb()
    } else {
      window.open('https://web.iyonicorp.com', '_blank')
    }
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center bg-[#0a0a0f] pt-16 pb-24 overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-neutral-900/40 rounded-full blur-[160px]" />
        <svg
          className="absolute top-0 right-0 w-[420px] h-[420px] opacity-[0.03] -translate-y-1/3 translate-x-1/4"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M200 0C310.457 0 400 89.543 400 200C400 310.457 310.457 400 200 400C89.543 400 0 310.457 0 200C0 89.543 89.543 0 200 0Z"
            stroke="hsl(47 91% 62%)"
            strokeWidth="1"
            opacity="0.15"
          />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center"
        >
          <motion.div variants={item} className="lg:col-span-6 lg:col-start-1 space-y-10">
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/50 border border-neutral-800 text-[10px] font-medium tracking-wider text-neutral-400"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Digital Businesses & Technology</span>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-neutral-100 leading-[1.05] tracking-tight"
            >
              Own a Business. Build a Business. Grow a Business.
            </motion.h1>

            <motion.p
              variants={item}
              className="text-lg text-neutral-400 max-w-xl leading-relaxed"
            >
              {BRAND_CONTENT.heroDescription}
            </motion.p>

             <motion.div
                variants={item}
                className="flex flex-col sm:flex-row items-start gap-4 pt-4"
              >
                <button
                  onClick={onExploreBusinesses}
                  className="group w-full sm:w-auto px-10 py-4 bg-amber-400 text-neutral-950 rounded-2xl font-black text-xs uppercase tracking-wider transition-all duration-200 hover:bg-amber-300 hover:shadow-[0_20px_50px_rgba(245,158,11,0.3)] flex items-center justify-center gap-3"
                >
                  Explore Businesses
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>

                <button
                  onClick={handleSecondaryClick}
                  className="group w-full sm:w-auto px-6 py-4 text-neutral-300 font-medium text-sm rounded-2xl border border-neutral-800 hover:border-neutral-700 hover:text-neutral-100 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  Explore IyonicWeb
                </button>

                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    const el = document.getElementById('contact')
                    if (el) el.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="group w-full sm:w-auto px-6 py-4 text-neutral-300 font-medium text-sm rounded-2xl border border-neutral-800 hover:border-amber-400/30 hover:text-amber-400 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  Work With Iyoni
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>
              </motion.div>

             <motion.div
               variants={item}
               className="flex items-center gap-2 pt-1"
             >
               <a
                 href="#iyonicweb"
                 onClick={(e) => {
                   e.preventDefault()
                   const el = document.getElementById('iyonicweb')
                   if (el) el.scrollIntoView({ behavior: 'smooth' })
                 }}
                 className="text-sm text-neutral-500 hover:text-amber-400 transition-colors"
               >
                 Explore Iyoni Technology
               </a>
               <ArrowRight size={14} className="text-neutral-600" />
             </motion.div>
           </motion.div>

           <motion.div variants={item} className="lg:col-span-6 lg:col-start-7">
             <div className="relative">
               <div className="relative bg-neutral-900 border border-neutral-800 rounded-[32px] p-2 shadow-inner">
                 <div className="aspect-[4/3] bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 rounded-[24px] flex items-center justify-center overflow-hidden relative">
                   <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(rgba(161,161,170,0.3)_1px,transparent_1px)] [background-size:24px_24px]" />

                   <motion.div
                     initial={{ opacity: 0, y: 8 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.4 }}
                     className="relative z-10 w-full max-w-sm mx-auto text-center"
                   >
                     <div className="space-y-8">
                       <div className="flex items-center justify-center gap-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                         <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-widest">
                           Iyonic Platform
                         </span>
                       </div>

                       {/* IyonicWeb — dominant central platform */}
                       <motion.div
                         initial={{ opacity: 0, scale: 0.9 }}
                         animate={{ opacity: 1, scale: 1 }}
                         transition={{ delay: 0.5, type: 'spring', stiffness: 300 }}
                         className="relative mx-auto"
                       >
                         <div className="relative w-52 h-52 mx-auto bg-gradient-to-br from-amber-400/5 via-neutral-900 to-neutral-950 border-2 border-amber-400/30 rounded-[28px] flex flex-col items-center justify-center shadow-2xl shadow-amber-400/10">
                           <div className="absolute -inset-1 bg-gradient-to-r from-amber-400/10 to-transparent rounded-[30px] blur-xl -z-10" />
                           <div className="w-20 h-20 rounded-3xl bg-amber-400 flex items-center justify-center text-neutral-950 shadow-2xl shadow-amber-400/30 mb-4">
                             <Globe size={32} />
                           </div>
                           <div className="text-xl font-black text-neutral-200">IyonicWeb</div>
                           <div className="text-[10px] text-amber-400 uppercase tracking-widest mt-1">
                             Central Platform
                           </div>
                         </div>

                         {/* Connected layers — smaller, below IyonicWeb */}
                         <div className="absolute -bottom-10 left-0 right-0 flex justify-center gap-12">
                           <motion.div
                             initial={{ opacity: 0, y: 8 }}
                             animate={{ opacity: 1, y: 0 }}
                             transition={{ delay: 0.6 }}
                             className="flex flex-col items-center"
                           >
                             <div className="w-14 h-14 rounded-xl bg-neutral-800/50 border border-neutral-700 flex items-center justify-center text-amber-400">
                               <CreditCard size={20} />
                             </div>
                             <span className="text-[10px] font-medium text-neutral-500 uppercase tracking-wider mt-2">
                               IyonicPay
                             </span>
                             <span className="text-[9px] text-neutral-600">Connected</span>
                           </motion.div>

                           <motion.div
                             initial={{ opacity: 0, y: 8 }}
                             animate={{ opacity: 1, y: 0 }}
                             transition={{ delay: 0.7 }}
                             className="flex flex-col items-center"
                           >
                             <div className="w-14 h-14 rounded-xl bg-neutral-800/50 border border-neutral-700 flex items-center justify-center text-amber-400">
                               <Bot size={20} />
                             </div>
                             <span className="text-[10px] font-medium text-neutral-500 uppercase tracking-wider mt-2">
                               IyonicBots
                             </span>
                             <span className="text-[9px] text-neutral-600">Connected</span>
                           </motion.div>
                         </div>
                       </motion.div>

                       <motion.div
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{ delay: 0.8 }}
                         className="text-[11px] text-neutral-500"
                       >
                         Built by Iyoni Corp
                       </motion.div>
                     </div>
                   </motion.div>
                 </div>
               </div>
             </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    )
  }

  export default Hero

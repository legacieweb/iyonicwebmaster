import { motion } from 'framer-motion'
import { ShoppingBag, ArrowRight, Zap, Layout, Globe, ShieldCheck, Sparkles } from 'lucide-react'
import { SHOPRIGHT_CONTENT, SHOPRIGHT_FEATURES } from '../utils/constants'

const ShopRight = ({ onViewDetails }) => {
  return (
    <section className="py-24 bg-neutral-950 relative overflow-hidden" id="shopright">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-neutral-900/30 rounded-full blur-[140px]" />
        <div className="absolute bottom-[15%] right-[10%] w-[400px] h-[400px] bg-amber-400/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 left-12 w-px h-56 bg-gradient-to-b from-amber-400/30 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left: headline + features + CTA */}
          <div className="lg:col-span-6 space-y-10">
            {/* Micro Badge */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/50 border border-neutral-800 text-[10px] font-black text-neutral-400 uppercase tracking-widest"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              {SHOPRIGHT_CONTENT.subtitle}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-neutral-100 tracking-tight leading-[1.05]"
            >
              {SHOPRIGHT_CONTENT.title.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="relative inline-block text-amber-400">
                {SHOPRIGHT_CONTENT.title.split(' ').slice(-1)}
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-400/40 rounded-full" />
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-neutral-400 max-w-xl leading-relaxed"
            >
              {SHOPRIGHT_CONTENT.description}
            </motion.p>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="grid grid-cols-2 gap-4 pt-4"
            >
              {SHOPRIGHT_FEATURES.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-neutral-800/50 border border-neutral-700 flex items-center justify-center text-amber-400">
                    <feature.icon size={18} />
                  </div>
                  <span className="text-neutral-300 font-medium text-sm">{feature.text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA + Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-6 pt-4"
            >
              <button
                onClick={onViewDetails}
                className="group px-10 py-4 bg-amber-400 text-neutral-950 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-200 hover:bg-amber-300 hover:shadow-[0_20px_50px_rgba(245,158,11,0.3)] flex items-center gap-3"
              >
                View Holding Details
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>

              <div className="flex -space-x-3 items-center">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-neutral-800 bg-neutral-800 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
                <span className="pl-4 text-[10px] font-black text-neutral-500 uppercase tracking-widest">
                  Trusted by 2.5k+ Partners
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right: visual showcase */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative z-10 bg-neutral-900/40 border border-neutral-800 rounded-[40px] p-2 shadow-inner"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 rounded-[32px] flex flex-col items-center justify-center text-center p-12 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px]" />
                <ShoppingBag size={72} className="text-amber-400/10 mx-auto mb-6" />
                <div className="relative z-10">
                  <div className="text-2xl font-black text-neutral-200 uppercase italic tracking-tighter mb-3">
                    Portfolio Operations
                  </div>
                  <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full mb-6" />
                  <div className="space-y-3">
                    <div className="w-48 h-2 bg-neutral-600 mx-auto rounded-full" />
                    <div className="w-32 h-2 bg-neutral-700 mx-auto rounded-full opacity-50" />
                  </div>
                </div>

                {/* Floating metric badges */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-6 right-6 px-4 py-2 bg-neutral-950/60 backdrop-blur-md border border-neutral-800 rounded-xl flex items-center gap-2"
                >
                  <Sparkles size={14} className="text-amber-400" />
                  <span className="text-xs font-black text-neutral-300 uppercase tracking-widest">Live Systems</span>
                </motion.div>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute bottom-6 left-6 px-4 py-2 bg-neutral-950/60 backdrop-blur-md border border-neutral-800 rounded-xl flex items-center gap-2"
                >
                  <Zap size={14} className="text-amber-400" />
                  <span className="text-xs font-black text-neutral-300 uppercase tracking-widest">99.9% Uptime</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ShopRight

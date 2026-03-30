import { motion } from 'framer-motion'
import { ShoppingBag, ArrowRight, Zap, Globe, Layout, ShieldCheck } from 'lucide-react'

const ShopRight = ({ onViewDetails }) => {
  return (
    <section className="py-24 bg-white overflow-hidden relative" id="shopright">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
              <ShoppingBag size={14} />
              New Launch: ShopRight
            </div>
            
            <h2 className="text-5xl lg:text-7xl font-black text-neutral-900 mb-8 tracking-tighter leading-none italic">
              ShopRight <span className="text-blue-600">by Iyonicorp.</span>
            </h2>
            
            <p className="text-xl text-neutral-600 mb-12 font-medium leading-relaxed max-w-xl">
              The ultimate merchant ecosystem. Sell products, manage inventory, and track performance with a precision-engineered online store that reflects your brand's excellence.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-12">
              {[
                { icon: Layout, text: 'Custom Storefronts' },
                { icon: Zap, text: 'Instant Performance' },
                { icon: Globe, text: 'Global Reach' },
                { icon: ShieldCheck, text: 'Secure Transactions' }
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-neutral-700">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                    <feature.icon size={16} />
                  </div>
                  <span className="text-sm font-bold uppercase tracking-widest">{feature.text}</span>
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onViewDetails}
              className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-4 group shadow-xl hover:bg-blue-700 transition-colors"
            >
              View Details
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative z-10 bg-white p-2 rounded-[48px] shadow-2xl border border-neutral-100">
              <div className="bg-neutral-50 rounded-[40px] overflow-hidden aspect-[4/3] flex items-center justify-center relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/5 via-transparent to-transparent opacity-50" />
                <div className="relative text-center p-12">
                  <ShoppingBag size={80} className="mx-auto text-blue-600 mb-8 animate-bounce" />
                  <div className="text-2xl font-black text-neutral-900 uppercase italic tracking-tighter mb-4">Merchant Dashboard</div>
                  <div className="w-32 h-1 bg-blue-600 mx-auto rounded-full mb-8" />
                  <div className="space-y-3">
                    <div className="w-48 h-2 bg-blue-600/10 mx-auto rounded-full" />
                    <div className="w-32 h-2 bg-blue-600/10 mx-auto rounded-full opacity-50" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 bg-blue-600 p-8 rounded-[32px] shadow-2xl z-20"
            >
              <Zap size={32} className="text-white" />
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-10 -left-10 bg-white border border-neutral-100 p-8 rounded-[32px] shadow-2xl z-20"
            >
              <div className="text-blue-600 font-black text-2xl tracking-tighter italic">99.9%</div>
              <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Uptime Guaranteed</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ShopRight

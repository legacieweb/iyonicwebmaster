import { motion } from 'framer-motion'
import { ArrowRight, Globe } from 'lucide-react'
import { TECH_ECOSYSTEM } from '../utils/constants'

const IyonicWebSection = () => {
  return (
    <section id="iyonicweb" className="py-24 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 lg:col-start-1">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-neutral-100 tracking-tight leading-[1.05] mb-6"
            >
              Build Your Business With IyonicWeb
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-neutral-400 max-w-xl leading-relaxed mb-10"
            >
              Launch your business on IyoniWeb - the unified platform that connects IyoniPay checkout, subscriptions and payouts with IyoniBots AI automation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="https://web.iyonicorp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 px-10 py-4 bg-amber-400 text-neutral-950 rounded-2xl font-black text-xs uppercase tracking-wider transition-all duration-200 hover:bg-amber-300 hover:shadow-[0_20px_50px_rgba(245,158,11,0.3)]"
              >
                Explore IyonicWeb
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-12 flex items-center gap-8"
            >
              <div className="flex items-center gap-4">
                {TECH_ECOSYSTEM.map((tech, i) => (
                  <div key={tech.name} className="flex flex-col items-center">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-neutral-950 ${
                        i === 0
                          ? 'bg-amber-400'
                          : i === 1
                          ? 'bg-neutral-800 text-neutral-300 border border-neutral-700'
                          : 'bg-neutral-800 text-neutral-300 border border-neutral-700'
                      }`}
                    >
                      <Globe size={24} />
                    </div>
                    <span className="text-[10px] font-medium text-neutral-500 uppercase tracking-wider mt-2">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>

              <div className="hidden sm:block w-16 h-px bg-neutral-800" />

              <div className="text-xs text-neutral-500">
                Built by <span className="text-neutral-300">Iyoni Corp</span>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-neutral-900 border border-neutral-800 rounded-[32px] p-2 shadow-inner">
                <div className="aspect-[4/3] bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 rounded-[24px] flex items-center justify-center overflow-hidden relative">
                  <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(rgba(161,161,170,0.3)_1px,transparent_1px)] [background-size:24px_24px]" />

                  <div className="relative z-10 flex items-center justify-center gap-12">
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-amber-400 flex items-center justify-center text-neutral-950 shadow-2xl shadow-amber-400/20 mb-3">
                        <Globe size={28} />
                      </div>
                      <span className="text-sm font-medium text-neutral-200">IyonicWeb</span>
                      <span className="text-[10px] text-neutral-500 uppercase tracking-wider">
                        Business Platform
                      </span>
                    </motion.div>

                    <ArrowRight size={20} className="text-neutral-600" />

                    <motion.div
                      animate={{ y: [0, 4, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-300 shadow-xl mb-3">
                        <Globe size={28} />
                      </div>
                      <span className="text-sm font-medium text-neutral-200">IyonicBots</span>
                      <span className="text-[10px] text-neutral-500 uppercase tracking-wider">
                        AI & Automation
                      </span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default IyonicWebSection


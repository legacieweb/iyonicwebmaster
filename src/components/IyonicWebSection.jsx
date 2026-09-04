import { motion } from 'framer-motion'
import { ArrowRight, Globe, CreditCard, Bot } from 'lucide-react'
import { TECH_ECOSYSTEM, IYONICWEB_PRODUCT } from '../utils/constants'

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
              {IYONICWEB_PRODUCT.description}
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
                {TECH_ECOSYSTEM.map((tech, i) => {
                  const icons = [Globe, CreditCard, Bot]
                  const Icon = icons[i] || Globe
                  const isPrimary = i === 0
                  return (
                    <div key={tech.name} className="flex flex-col items-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 300 }}
                        className={`rounded-2xl flex items-center justify-center transition-all ${
                          isPrimary
                            ? 'w-18 h-18 bg-amber-400 text-neutral-950 shadow-2xl shadow-amber-400/30 border-2 border-amber-400/20'
                            : 'w-14 h-14 bg-neutral-800 text-neutral-300 border border-neutral-700'
                        }`}
                      >
                        <Icon size={isPrimary ? 28 : 20} />
                      </motion.div>
                      <span className={`text-[10px] font-medium uppercase tracking-wider mt-2 ${
                        isPrimary ? 'text-neutral-200' : 'text-neutral-500'
                      }`}>
                        {tech.name}
                      </span>
                      <span className="text-[9px] text-neutral-600">
                        {tech.description}
                      </span>
                    </div>
                  )
                })}
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

                  <div className="relative z-10 w-full max-w-sm text-center">
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="space-y-8"
                    >
                      {/* IyonicWeb — dominant central platform */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, type: 'spring', stiffness: 300 }}
                        className="relative mx-auto"
                      >
                        <div className="relative w-56 h-56 mx-auto bg-gradient-to-br from-amber-400/10 via-neutral-900 to-neutral-950 border-2 border-amber-400/30 rounded-[28px] flex flex-col items-center justify-center shadow-2xl shadow-amber-400/10">
                          <div className="absolute -inset-1 bg-gradient-to-r from-amber-400/10 to-transparent rounded-[30px] blur-xl -z-10" />
                          <div className="w-24 h-24 rounded-3xl bg-amber-400 flex items-center justify-center text-neutral-950 shadow-2xl shadow-amber-400/30 mb-4">
                            <Globe size={40} />
                          </div>
                          <div className="text-2xl font-black text-neutral-200">IyonicWeb</div>
                          <div className="text-[10px] text-amber-400 uppercase tracking-widest mt-1">
                            Central Business Platform
                          </div>
                        </div>

                        {/* Connected layers — smaller, orbiting */}
                        <div className="absolute -bottom-6 left-0 right-0 flex justify-center gap-16">
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
                            <span className="text-[9px] text-neutral-600">Payments</span>
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
                            <span className="text-[9px] text-neutral-600">AI & Automation</span>
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


import { motion } from 'framer-motion'
import { ArrowRight, CreditCard, Shield, Globe, DollarSign, TrendingUp } from 'lucide-react'
import { IYONICPAY_PRODUCT } from '../utils/constants'

const IyonicPaySection = () => {
  return (
    <section id="iyonicpay" className="py-24 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 lg:col-start-1">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-neutral-100 tracking-tight leading-[1.05] mb-6"
            >
              Get Paid With IyonicPay
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-neutral-400 max-w-xl leading-relaxed mb-10"
            >
              {IYONICPAY_PRODUCT.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <a
                href={IYONICPAY_PRODUCT.externalHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 px-10 py-4 bg-amber-400 text-neutral-950 rounded-2xl font-black text-xs uppercase tracking-wider transition-all duration-200 hover:bg-amber-300 hover:shadow-[0_20px_50px_rgba(245,158,11,0.3)]"
              >
                Explore IyonicPay
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-8"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-amber-400 border border-neutral-700 flex-shrink-0">
                  <CreditCard size={18} />
                </div>
                <div>
                  <div className="text-sm font-medium text-neutral-200 mb-1">Checkout & Invoicing</div>
                  <div className="text-xs text-neutral-500">Integrated payment flows for commerce and subscriptions.</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-amber-400 border border-neutral-700 flex-shrink-0">
                  <Shield size={18} />
                </div>
                <div>
                  <div className="text-sm font-medium text-neutral-200 mb-1">Secure Processing</div>
                  <div className="text-xs text-neutral-500">Encrypted infrastructure built for global commerce.</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-amber-400 border border-neutral-700 flex-shrink-0">
                  <Globe size={18} />
                </div>
                <div>
                  <div className="text-sm font-medium text-neutral-200 mb-1">Ecosystem Integration</div>
                  <div className="text-xs text-neutral-500">Connects with IyonicWeb and IyonicBots natively.</div>
                </div>
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

                  <div className="relative z-10 w-full max-w-sm">
                    <div className="bg-neutral-950/60 border border-neutral-800 rounded-[20px] p-6 space-y-5">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-400 border border-neutral-700">
                            <CreditCard size={20} />
                          </div>
                          <div className="text-left">
                            <div className="text-sm font-medium text-neutral-200">IyonicPay</div>
                            <div className="text-[10px] text-neutral-500 uppercase tracking-wider">Payment Dashboard</div>
                          </div>
                        </div>
                        <div className="text-[10px] text-neutral-500 uppercase tracking-wider">
                          Real-time
                        </div>
                      </div>

                      {/* Balance */}
                      <div className="bg-neutral-900/40 border border-neutral-800 rounded-[16px] p-4">
                        <div className="text-[10px] text-neutral-500 uppercase tracking-wider mb-2">
                          Total Balance
                        </div>
                        <div className="flex items-baseline gap-2">
                          <div className="text-2xl font-black text-neutral-200">$42,890.74</div>
                          <div className="flex items-center gap-1 text-amber-400 text-xs">
                            <TrendingUp size={10} />
                            +12%
                          </div>
                        </div>
                      </div>

                      {/* Features list */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-neutral-800">
                          <span className="text-xs text-neutral-500">Checkout</span>
                          <span className="text-xs text-neutral-400">Live</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-neutral-800">
                          <span className="text-xs text-neutral-500">Subscriptions</span>
                          <span className="text-xs text-neutral-400">Live</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-neutral-800">
                          <span className="text-xs text-neutral-500">Invoicing</span>
                          <span className="text-xs text-neutral-400">Live</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-xs text-neutral-500">Payouts</span>
                          <span className="text-xs text-neutral-400">Coming soon</span>
                        </div>
                      </div>

                      {/* Quick action */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2 text-xs text-neutral-500">
                          <DollarSign size={12} />
                          <span>Connected to IyonicWeb</span>
                        </div>
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      </div>
                    </div>
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

export default IyonicPaySection

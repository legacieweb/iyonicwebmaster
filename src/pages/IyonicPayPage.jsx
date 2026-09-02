import { motion } from 'framer-motion'
import { ArrowRight, ArrowLeft, CreditCard, ShoppingCart, Wallet, Package, Database, Globe, Zap } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'
import { IYONICPAY_PRODUCT } from '../utils/constants'

const PAYFLOW_STEPS = [
  { label: 'Customer', icon: Globe, sub: 'Visits an IyonicWeb business' },
  { label: 'Checkout', icon: ShoppingCart, sub: 'Selects products or a subscription' },
  { label: 'IyonicPay', icon: CreditCard, sub: 'Processes the payment securely' },
  { label: 'Payment', icon: Wallet, sub: 'Funds move to the business wallet' },
  { label: 'Order / Business Data', icon: Database, sub: 'Order & transaction data recorded' }
]

const IyonicPaySection = () => {
  usePageMeta(
    'IyonicPay | Payment Technology by Iyoni Corp',
    "IyonicPay is Iyoni Corp's payment technology for the Iyonic ecosystem. Connects checkout, invoicing, and business data across IyonicWeb and IyonicBots."
  )
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200">
      <section className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-amber-400 transition-colors mb-12 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Iyoni Corp
          </motion.button>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-[10px] font-black text-amber-400 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                Technology
              </span>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-medium text-neutral-100 tracking-tight leading-[1.05]">
                Payments With IyonicPay
              </h1>

              <p className="text-lg text-neutral-400 max-w-xl leading-relaxed">
                {IYONICPAY_PRODUCT.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a
                  href={IYONICPAY_PRODUCT.externalHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 px-10 py-4 bg-amber-400 text-neutral-950 rounded-2xl font-black text-xs uppercase tracking-wider transition-all duration-200 hover:bg-amber-300 hover:shadow-[0_20px_50px_rgba(245,158,11,0.3)]"
                >
                  Explore IyonicPay
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>

              <div className="pt-6">
                <a
                  href={IYONICPAY_PRODUCT.externalHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-amber-400 transition-colors"
                >
                  IyonicPay API
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </a>
                <div className="text-xs text-neutral-600 mt-1">
                  Connect checkout, subscriptions, and payouts to websites, apps, and SaaS platforms.
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative"
            >
              <div className="relative bg-neutral-900 border border-neutral-800 rounded-[32px] p-2 shadow-inner">
                <div className="aspect-[4/3] bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 rounded-[24px] flex items-center justify-center overflow-hidden relative">
                  <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(rgba(161,161,170,0.3)_1px,transparent_1px)] [background-size:24px_24px]" />

                  <div className="relative z-10 w-full max-w-md">
                    <div className="flex items-center justify-center gap-4 mb-10">
                      <div className="w-16 h-16 rounded-2xl bg-amber-400/10 flex items-center justify-center text-amber-400 border border-neutral-700">
                        <CreditCard size={28} />
                      </div>
                      <ArrowRight size={20} className="text-neutral-600" />
                      <div className="w-16 h-16 rounded-2xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-300">
                        <Zap size={28} />
                      </div>
                    </div>

                    <div className="text-center text-xs text-neutral-500 uppercase tracking-wider">
                      Payment infrastructure for the Iyonic ecosystem
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-5xl font-medium text-neutral-100 tracking-tight leading-[1.05] mb-6">
              How IyonicPay Works
            </h2>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              Integrated into every IyonicWeb business and connected to IyonicBots automation, handling checkout, invoicing, and business data flow.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-8 items-start">
            {PAYFLOW_STEPS.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400 mb-5 shadow-xl">
                    <Icon size={24} />
                  </div>
                  <div className="mb-2">
                    <div className="text-xs font-black text-neutral-500 uppercase tracking-wider mb-1">Step {i + 1}</div>
                    <h3 className="text-lg font-medium text-neutral-200">{step.label}</h3>
                  </div>
                  <p className="text-xs text-neutral-500 leading-relaxed">{step.sub}</p>
                  {i < PAYFLOW_STEPS.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-px bg-neutral-800" />
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-3 gap-8"
          >
            {[
              { icon: CreditCard, title: 'Checkout & Invoicing', desc: 'Integrated payment flows for commerce and subscriptions.' },
              { icon: Database, title: 'Payment Records', desc: 'Transaction data flows into the business order & customer systems.' },
              { icon: Globe, title: 'Ecosystem Integration', desc: 'Connects natively with IyonicWeb stores and IyonicBots automation.' }
            ].map((feat, i) => {
              const Icon = feat.icon
              return (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-neutral-800/50 flex items-center justify-center text-amber-400 border border-neutral-700 flex-shrink-0">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-neutral-200 mb-1">{feat.title}</h3>
                    <p className="text-xs text-neutral-500 leading-relaxed">{feat.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default IyonicPaySection

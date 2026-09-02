import { motion } from 'framer-motion'
import { ArrowRight, ArrowLeft, Globe, ShoppingCart, Package, Users, CreditCard, Bot, BarChart3, Database, ShieldCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import usePageMeta, { DEFAULT_TITLE, DEFAULT_DESCRIPTION } from '../hooks/usePageMeta'
import { TECH_ECOSYSTEM, IYONICWEB_PRODUCT } from '../utils/constants'

const IYONICWEB_ECOSYSTEM = [
  { label: 'Business Website', icon: Globe },
  { label: 'Commerce', icon: ShoppingCart },
  { label: 'Orders', icon: Package },
  { label: 'Customers', icon: Users },
  { label: 'Analytics', icon: BarChart3 },
  { label: 'Database', icon: Database }
]

const IyonicWebPage = () => {
  usePageMeta(
    'IyonicWeb | Business Platform by Iyoni Corp',
    'IyonicWeb is Iyoni Corp\'s business platform for launching and operating online businesses. Built-in commerce, payments (IyonicPay), AI (IyonicBots), and analytics in one place.'
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
                Build Your Business With IyonicWeb
              </h1>

              <p className="text-lg text-neutral-400 max-w-xl leading-relaxed">
                {IYONICWEB_PRODUCT.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a
                  href={IYONICWEB_PRODUCT.externalHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 px-10 py-4 bg-amber-400 text-neutral-950 rounded-2xl font-black text-xs uppercase tracking-wider transition-all duration-200 hover:bg-amber-300 hover:shadow-[0_20px_50px_rgba(245,158,11,0.3)]"
                >
                  Explore IyonicWeb
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#how-it-works"
                  className="group inline-flex items-center justify-center gap-3 px-10 py-4 border border-neutral-800 text-neutral-300 rounded-2xl font-black text-xs uppercase tracking-wider hover:border-amber-400 hover:text-amber-400 transition-all"
                >
                  See How It Works
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </a>
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

                  <div className="relative z-10 flex items-center justify-center">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-24 h-24 rounded-3xl bg-amber-400 flex items-center justify-center text-neutral-950 shadow-2xl shadow-amber-400/20 mb-6">
                        <Globe size={40} />
                      </div>
                      <div className="text-3xl font-medium text-neutral-200 mb-2">{IYONICWEB_PRODUCT.name}</div>
                      <div className="text-[10px] text-neutral-500 uppercase tracking-wider">
                        {IYONICWEB_PRODUCT.tagline}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-neutral-800" id="how-it-works">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-5xl font-medium text-neutral-100 tracking-tight leading-[1.05] mb-6">
              The IyonicWeb Ecosystem
            </h2>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              One platform. Built-in commerce, payments, AI, and analytics so you can launch and run a business from a single place.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              {IYONICWEB_ECOSYSTEM.map((node, i) => {
                const Icon = node.icon
                return (
                  <motion.div
                    key={node.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-5"
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-amber-400/10 text-amber-400 border border-neutral-800 flex-shrink-0`}>
                      <Icon size={22} />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-neutral-200">{node.label}</div>
                      <div className="text-xs text-neutral-500 uppercase tracking-wider">Core capability</div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative bg-neutral-900/50 border border-neutral-800 rounded-[32px] p-8"
              >
                <h3 className="text-xl font-black text-neutral-200 uppercase tracking-tight mb-6">Connected Products</h3>
                <div className="grid grid-cols-3 gap-6 text-center">
                  {TECH_ECOSYSTEM.map((tech, i) => {
                    const Icon = [Globe, CreditCard, Bot][i] || Globe
                    const isPrimary = i === 0
                    return (
                      <div key={tech.name}>
                        <div
                          className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-2 ${
                            isPrimary ? 'bg-amber-400 text-neutral-950' : 'bg-neutral-800 border border-neutral-700 text-neutral-300'
                          }`}
                        >
                          <Icon size={22} />
                        </div>
                        <div className="text-sm font-medium text-neutral-200">{tech.name}</div>
                        <div className="text-[10px] text-neutral-500 uppercase tracking-wider">{tech.description}</div>
                      </div>
                    )
                  })}
                </div>
                <div className="mt-6 text-center">
                  <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-neutral-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    Built by Iyoni Corp
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-800/50 flex items-center justify-center text-amber-400 border border-neutral-700 flex-shrink-0">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <div className="text-sm font-medium text-neutral-200 mb-1">Secure Infrastructure</div>
                  <div className="text-xs text-neutral-500">Cloud-native, auto-scaling infrastructure with enterprise-grade security.</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default IyonicWebPage

import { motion } from 'framer-motion'
import { ArrowRight, Bot, MessageSquare, TrendingUp, LifeBuoy, Zap, Clock } from 'lucide-react'
import { IYONICBOTS_CAPABILITIES } from '../utils/constants'

const iconMap = {
  conversations: MessageSquare,
  'product-questions': MessageSquare,
  'lead-generation': TrendingUp,
  support: LifeBuoy,
  automation: Zap
}

const IyonicBotsSection = () => {
  return (
    <section id="iyonicbots" className="py-24 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 lg:col-start-1">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-neutral-100 tracking-tight leading-[1.05] mb-6"
            >
              Your Business, Powered by AI
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-neutral-400 max-w-xl leading-relaxed mb-10"
            >
              IyonicBots delivers AI-powered automation across the Iyonic platform. Each business on IyonicWeb can integrate AI assistants, chatbots, and workflow automation to handle customer interactions and daily operations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <a
                href="https://iyonicbots.iyonicorp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 px-10 py-4 bg-amber-400 text-neutral-950 rounded-2xl font-black text-xs uppercase tracking-wider transition-all duration-200 hover:bg-amber-300 hover:shadow-[0_20px_50px_rgba(245,158,11,0.3)]"
              >
                Explore IyonicBots
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>

            <div className="space-y-6">
              {IYONICBOTS_CAPABILITIES.map((cap, i) => {
                const Icon = iconMap[cap.id] || Bot
                return (
                  <motion.div
                    key={cap.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="flex items-start gap-4 group"
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center border flex-shrink-0 ${
                        cap.exists
                          ? 'bg-amber-400/10 border-neutral-700 text-amber-400'
                          : 'bg-neutral-800/30 border-neutral-700 text-neutral-500'
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-medium text-neutral-200">{cap.title}</h3>
                        {!cap.exists && (
                          <span className="text-[9px] font-medium text-neutral-500 uppercase tracking-wider bg-neutral-800 px-2 py-0.5 rounded-full">
                            Planned
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-neutral-400 leading-relaxed">
                        {cap.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
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
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-20 h-20 mx-auto rounded-3xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-8"
                    >
                      <Bot size={36} />
                    </motion.div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                        <span className="text-xs text-neutral-500 uppercase tracking-wider">AI Online</span>
                      </div>
                      <div className="text-2xl font-medium text-neutral-200 mb-4">
                        Custom AI Assistant
                      </div>
                      <div className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
                        AI assistants trained on your docs, products, and customer data. Available as chatbots on every Iyonic business.
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

export default IyonicBotsSection

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { WHY_IYONI_CONTENT } from '../utils/constants'

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

const WhyIyoni = () => {
  return (
    <section id="why-iyoni" className="py-24 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 lg:col-start-1">
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/50 border border-neutral-800 text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em] mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              {WHY_IYONI_CONTENT.subtitle}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-neutral-100 tracking-tight leading-[1.05] mb-6"
            >
              {WHY_IYONI_CONTENT.title.split('. ').slice(0, -1).join('. ')}
              {' '}
              <span className="relative inline-block text-amber-400">
                {WHY_IYONI_CONTENT.title.split('. ').slice(-1).join('. ')}
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-400/40 rounded-full" />
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-neutral-400 max-w-xl leading-relaxed mb-10"
            >
              {WHY_IYONI_CONTENT.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
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
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-neutral-900/50 border border-neutral-800 rounded-[32px] p-2 shadow-inner">
                <div className="aspect-[16/9] bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 rounded-[24px] flex items-center justify-center overflow-hidden relative">
                  <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(rgba(161,161,170,0.3)_1px,transparent_1px)] [background-size:24px_24px]" />

                  <div className="relative z-10 w-full max-w-3xl">
                    <div className="flex items-center justify-between gap-4 mb-8">
                      {WHY_IYONI_CONTENT.layers.map((layer, i) => {
                        const Icon = layer.icon
                        const isPrimary = i === 0
                        return (
                          <motion.div
                            key={layer.name}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + i * 0.08 }}
                            className="flex flex-col items-center text-center"
                          >
                            <div
                              className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-3 transition-all duration-500 ${
                                isPrimary
                                  ? 'bg-amber-400 text-neutral-950 shadow-2xl shadow-amber-400/20'
                                  : 'bg-neutral-800 border border-neutral-700 text-neutral-300'
                              }`}
                            >
                              <Icon size={24} />
                            </div>
                            <div className="text-sm font-black text-neutral-200">{layer.name}</div>
                            <div className="text-[10px] text-neutral-500 uppercase tracking-wider mt-1">
                              {layer.tagline}
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>

                    <div className="space-y-4 text-center">
                      <div className="text-xs text-neutral-500 uppercase tracking-widest">
                        Connected Products
                      </div>
                      <div className="flex justify-center">
                        <ArrowRight size={14} className="text-neutral-600" />
                      </div>
                      <p className="text-xs text-neutral-600 max-w-md mx-auto leading-relaxed">
                        IyonicWeb is the central platform. IyonicPay and IyonicBots connect natively — no APIs to wire, no data to sync, no tools to stitch together.
                      </p>
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

export default WhyIyoni

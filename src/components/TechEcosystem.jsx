import { motion } from 'framer-motion'
import { Globe, CreditCard, Bot } from 'lucide-react'
import { TECH_ECOSYSTEM } from '../utils/constants'

const iconMap = {
  IyonicWeb: Globe,
  IyonicPay: CreditCard,
  IyonicBots: Bot
}

const TechEcosystem = () => {
  return (
    <section id="tech-ecosystem" className="py-24 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium text-neutral-100 tracking-tight leading-[1.05] mb-6">
            Technology Ecosystem
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Three connected products built by Iyoni Corp to create, operate, and scale digital businesses.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="w-px h-full bg-neutral-800" />
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
            {TECH_ECOSYSTEM.map((tech, index) => {
              const Icon = iconMap[tech.name]
              return (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="relative z-10 w-20 h-20 rounded-[24px] bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400 shadow-xl mb-8">
                    <Icon size={32} />
                  </div>

                  <h3 className="text-2xl font-medium text-neutral-200 mb-3">{tech.name}</h3>
                  <p className="text-sm text-neutral-500 uppercase tracking-wider">
                    {tech.description}
                  </p>

                  {index < TECH_ECOSYSTEM.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-px bg-neutral-800 -z-0" />
                  )}
                </motion.div>
              )
            })}
          </div>

          <div className="hidden md:block absolute top-10 left-0 right-0 flex justify-center">
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-px h-20 bg-neutral-800" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-20 text-center"
          >
            <div className="relative inline-flex items-center gap-4 px-6 py-3 bg-neutral-900 border border-neutral-800 rounded-[24px]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-xs text-neutral-500 uppercase tracking-wider">Integrated</span>
              </div>
              <div className="w-12 h-px bg-neutral-800" />
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-500 uppercase tracking-wider">Built by</span>
                <span className="text-xs font-medium text-neutral-200">Iyoni Corp</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default TechEcosystem

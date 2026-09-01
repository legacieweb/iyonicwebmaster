import { motion } from 'framer-motion'
import { ArrowRight, Lightbulb, Rocket, TrendingUp, BarChart3, Package } from 'lucide-react'
import { HOW_IYONI_BUILDS, HOW_IYONI_BUILDS_DESCRIPTION } from '../utils/constants'

const stepIcons = [Lightbulb, Rocket, TrendingUp, BarChart3, Package]

const HowIyoniBuilds = () => {
  return (
    <section id="how-iyoni-builds" className="py-32 bg-neutral-950 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-400/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-neutral-800 rounded-full blur-[140px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 border border-neutral-800 text-amber-400 text-[11px] font-black uppercase tracking-widest mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Our Process
          </motion.div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl font-medium text-neutral-100 tracking-tight leading-[0.95] mb-6">
            How Iyoni Builds
          </h2>
          <p className="text-neutral-400 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
            {HOW_IYONI_BUILDS_DESCRIPTION}
          </p>
        </motion.div>

        {/* Horizontal Stepper (Desktop) */}
        <div className="hidden sm:block mb-24">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
              {HOW_IYONI_BUILDS.map((step, index) => {
                const Icon = stepIcons[index] || Lightbulb
                const isLast = index === HOW_IYONI_BUILDS.length - 1
                return (
                  <div key={step.title} className="flex items-center">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-neutral-900 border-2 border-neutral-800 flex items-center justify-center text-amber-400 shadow-xl relative z-10">
                        <Icon size={24} />
                      </div>
                      <div className="mt-4 text-center">
                        <div className="text-xs font-black text-neutral-600 uppercase tracking-widest">
                          Step {index + 1}
                        </div>
                        <div className="text-sm font-medium text-neutral-200 mt-1">
                          {step.title}
                        </div>
                      </div>
                    </motion.div>
                    {!isLast && (
                      <div className="w-12 h-px bg-neutral-800" />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Step Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {HOW_IYONI_BUILDS.map((step, index) => {
            const Icon = stepIcons[index] || Lightbulb
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group bg-neutral-900/70 backdrop-blur-xl rounded-[28px] p-8 border border-neutral-800 transition-all duration-300 hover:border-neutral-700"
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-neutral-800/30 flex items-center justify-center text-amber-400 border border-neutral-800 flex-shrink-0">
                    <Icon size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-black text-neutral-600 uppercase tracking-widest">
                        Step {index + 1}
                      </span>
                      <span className="text-xs font-medium text-neutral-700">·</span>
                      <span className="text-xs font-medium text-neutral-400">
                        {step.title}
                      </span>
                    </div>
                    <p className="text-neutral-400 text-sm font-medium leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <p className="text-neutral-400 mb-8">Ready to start?</p>
          <a
            href="#businesses"
            onClick={(e) => {
              e.preventDefault()
              const el = document.getElementById('businesses')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 rounded-2xl font-black text-xs uppercase tracking-wider shadow-xl shadow-amber-400/20 hover:shadow-amber-400/30 transition-shadow"
          >
            Explore Businesses
            <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default HowIyoniBuilds

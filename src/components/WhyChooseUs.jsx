import { WHY_CHOOSE_US_CONTENT, WHY_CHOOSE_US_FEATURES } from '../utils/constants'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const titleParts = WHY_CHOOSE_US_CONTENT.title.split('. ').filter(Boolean)

const WhyChooseUs = () => {
  return (
    <section id="why-choose-us" className="py-24 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/50 border border-neutral-800 text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em] mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            {WHY_CHOOSE_US_CONTENT.subtitle}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-5xl font-medium text-neutral-100 tracking-tight leading-[1.05] mb-6"
          >
            {titleParts.slice(0, -1).join('. ')}
            {titleParts.length > 1 && ' '}
            <span className="relative inline-block text-amber-400">
              {titleParts.slice(-1).join('. ')}
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-400/40 rounded-full" />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed"
          >
            {WHY_CHOOSE_US_CONTENT.description}
          </motion.p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 -inset-x-4 -z-10 h-px bg-neutral-800" />
          <div className="hidden lg:flex justify-center items-center gap-2 absolute top-8 left-1/2 -translate-x-1/2 -z-10">
            {[0, 1, 2].map((i) => (
              <div key={i} className="w-10 h-px bg-neutral-700" />
            ))}
            <ArrowRight size={14} className="text-neutral-600" />
            {[0, 1, 2].map((i) => (
              <div key={i} className="w-10 h-px bg-neutral-700" />
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {WHY_CHOOSE_US_FEATURES.map((feature, i) => {
              const Icon = feature.icon
              const isLast = i === WHY_CHOOSE_US_FEATURES.length - 1
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  className="relative flex flex-col items-center text-center gap-4 p-8 rounded-[28px] bg-neutral-900/50 border border-neutral-800 group"
                >
                  <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-[10px] font-black text-neutral-500 uppercase">
                    {i + 1}
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-neutral-800/50 text-amber-400 flex items-center justify-center border border-neutral-700 group-hover:bg-amber-400 group-hover:text-neutral-950 transition-all duration-500">
                    <Icon size={26} />
                  </div>
                  <h4 className="font-black text-neutral-200 text-xl group-hover:text-amber-400 transition-colors">{feature.title}</h4>
                  <p className="text-sm text-neutral-500 leading-relaxed">{feature.description}</p>

                  {!isLast && (
                    <div className="hidden lg:block absolute top-7 -right-4 w-6 h-px bg-neutral-700 group-hover:bg-neutral-600 transition-colors" />
                  )}
                  {!isLast && (
                    <div className="hidden lg:block absolute top-6 -right-2 text-neutral-600">
                      <ArrowRight size={12} />
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs

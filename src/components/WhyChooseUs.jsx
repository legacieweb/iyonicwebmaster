import { WHY_CHOOSE_US_CONTENT, WHY_CHOOSE_US_FEATURES } from '../utils/constants'
import { motion } from 'framer-motion'

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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {WHY_CHOOSE_US_FEATURES.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.06 }}
                className="flex flex-col items-center text-center gap-4 p-8 rounded-[28px] bg-neutral-900/50 border border-neutral-800 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-neutral-800/50 text-amber-400 flex items-center justify-center border border-neutral-700 group-hover:bg-amber-400 group-hover:text-neutral-950 transition-all duration-500">
                  <Icon size={26} />
                </div>
                <h4 className="font-black text-neutral-200 text-xl group-hover:text-amber-400 transition-colors">{feature.title}</h4>
                <p className="text-sm text-neutral-500 leading-relaxed">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs

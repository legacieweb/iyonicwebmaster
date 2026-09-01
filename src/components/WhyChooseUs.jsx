import { WHY_CHOOSE_US_CONTENT, WHY_CHOOSE_US_FEATURES, WHY_CHOOSE_US_METRICS } from '../utils/constants'
import { motion } from 'framer-motion'

const WhyChooseUs = () => {
  return (
    <section id="why-choose-us" className="py-24 bg-neutral-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
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
              className="text-4xl md:text-5xl font-medium text-neutral-100 tracking-tight leading-[1.05] mb-8"
            >
              {WHY_CHOOSE_US_CONTENT.title.split(',')[0]},{' '}
              <span className="relative inline-block text-amber-400">
                {WHY_CHOOSE_US_CONTENT.title.split(',')[1].trim()}
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-400/40 rounded-full" />
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-neutral-400 mb-12 leading-relaxed"
            >
              {WHY_CHOOSE_US_CONTENT.description}
            </motion.p>

            <div className="grid sm:grid-cols-2 gap-8">
              {WHY_CHOOSE_US_FEATURES.map((feature, i) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.06 }}
                    className="flex gap-4 group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-neutral-800/50 text-amber-400 flex items-center justify-center border border-neutral-700 group-hover:bg-amber-400 group-hover:text-neutral-950 transition-all duration-500">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-black text-neutral-200 mb-1 group-hover:text-amber-400 transition-colors">{feature.title}</h4>
                      <p className="text-sm text-neutral-500 leading-relaxed">{feature.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="relative"
          >
            <div className="bg-neutral-900/50 border border-neutral-800 p-12 rounded-[40px] shadow-xl relative overflow-hidden">
              <h3 className="text-2xl font-black text-neutral-200 mb-8 text-center">Performance Metrics</h3>
              <div className="space-y-8">
                {WHY_CHOOSE_US_METRICS.map((metric, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">{metric.label}</span>
                      <span className="text-xl font-black text-neutral-200">{metric.value}</span>
                    </div>
                    <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-400 to-neutral-700 rounded-full"
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            </div>

            <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-400/5 rounded-full blur-3xl opacity-50" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs

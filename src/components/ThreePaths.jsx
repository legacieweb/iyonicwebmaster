import { motion } from 'framer-motion'
import { ArrowRight, ShoppingCart, Layout, Sparkles } from 'lucide-react'
import { THREE_PATHS } from '../utils/constants'

const iconMap = {
  buy: ShoppingCart,
  build: Layout,
  work: Sparkles
}

const ThreePaths = () => {
  return (
    <section id="three-paths" className="py-24 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium text-neutral-100 tracking-tight leading-[1.05]">
            Your Path Forward
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {THREE_PATHS.map((path, index) => {
            const Icon = iconMap[path.id] || Sparkles
            return (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex flex-col p-10 bg-neutral-900 border border-neutral-800 rounded-[32px] transition-all duration-500 ${
                  path.isSecondary
                    ? 'md:opacity-60 md:hover:opacity-100 group'
                    : 'hover:border-neutral-700 hover:shadow-xl hover:shadow-black/20'
                }`}
              >
                {path.isSecondary ? (
                  <div className="w-12 h-12 rounded-[24px] bg-neutral-800 flex items-center justify-center text-neutral-400 mb-8 group-hover:bg-amber-400/10 group-hover:text-amber-400 transition-all" />
                ) : (
                  <div className="w-12 h-12 rounded-[24px] bg-amber-400/10 flex items-center justify-center text-amber-400 mb-8">
                    <Icon size={24} />
                  </div>
                )}

                <h3
                  className={`text-2xl font-medium mb-4 ${
                    path.isSecondary
                      ? 'text-neutral-400 group-hover:text-neutral-200'
                      : 'text-neutral-200'
                  }`}
                >
                  {path.title}
                </h3>

                <p
                  className={`text-neutral-400 leading-relaxed mb-8 flex-1 ${
                    path.isSecondary ? 'group-hover:text-neutral-300' : ''
                  }`}
                >
                  {path.description}
                </p>

                <a
                  href={path.href}
                  onClick={(e) => {
                    if (path.href.startsWith('#')) {
                      e.preventDefault()
                      const el = document.getElementById(path.href.substring(1))
                      if (el) el.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                  className={`inline-flex items-center gap-2 text-sm font-medium transition-all ${
                    path.isSecondary
                      ? 'text-neutral-500 group-hover:text-amber-400'
                      : 'text-neutral-300 hover:text-amber-400'
                  } ${
                    path.isSecondary ? 'group-hover:translate-x-1' : 'group-hover:translate-x-1'
                  }`}
                >
                  {path.cta}
                  <ArrowRight size={14} />
                </a>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ThreePaths

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const FinalCTA = ({ onExploreBusinesses, onStartIyonicWeb }) => {
  const handleSecondary = () => {
    if (onStartIyonicWeb) {
      onStartIyonicWeb()
    } else {
      window.open('https://web.iyonicorp.com', '_blank')
    }
  }

  return (
    <section id="final-cta" className="py-24 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-neutral-100 tracking-tight leading-[1.05] mb-8">
            Ready to Build What's Next?
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={onExploreBusinesses}
              className="group w-full sm:w-auto px-10 py-4 bg-amber-400 text-neutral-950 rounded-2xl font-black text-xs uppercase tracking-wider transition-all duration-200 hover:bg-amber-300 hover:shadow-[0_20px_50px_rgba(245,158,11,0.3)] flex items-center justify-center gap-3"
            >
              Explore Businesses
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={handleSecondary}
              className="group w-full sm:w-auto px-10 py-4 border border-neutral-800 text-neutral-200 rounded-2xl font-medium text-sm transition-all duration-200 hover:border-neutral-700 hover:bg-neutral-900 flex items-center justify-center gap-3"
            >
              Start With IyonicWeb
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default FinalCTA

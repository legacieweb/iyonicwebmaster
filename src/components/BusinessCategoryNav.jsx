import { motion } from 'framer-motion'

const BusinessCategoryNav = ({ filters, activeFilter, setActiveFilter, align = 'center' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1, duration: 0.6 }}
      className={`flex flex-wrap gap-3 ${align === 'center' ? 'justify-center' : 'justify-start'}`}
    >
      {filters.map((filter) => {
        const isActive = activeFilter === filter
        return (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 ${
              isActive
                ? 'bg-amber-400 text-neutral-950 shadow-xl shadow-amber-400/25'
                : 'bg-neutral-900/50 border border-neutral-800 text-neutral-500 hover:text-neutral-200 hover:border-neutral-700'
            }`}
          >
            {filter}
          </button>
        )
      })}
    </motion.div>
  )
}

export default BusinessCategoryNav

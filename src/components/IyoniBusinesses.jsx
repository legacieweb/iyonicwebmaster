import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { CATALOG_ITEMS, EXCLUDED_BUSINESS_NAMES, formatPrice } from '../utils/constants'

const IyoniBusinesses = () => {
  const navigate = useNavigate()
  const allItems = Object.values(CATALOG_ITEMS).flat()

  const businessItems = allItems.filter((item) => {
    return !EXCLUDED_BUSINESS_NAMES.includes(item.name)
  })

  const displayItems = businessItems.slice(0, 12)

  return (
    <section id="businesses" className="py-24 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium text-neutral-100 tracking-tight leading-[1.05] mb-6">
            Digital Businesses
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl leading-relaxed">
            We create and develop digital businesses that can be owned, operated, or acquired. Each holding is fully operational, revenue-generating, and built on the Iyonic platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group bg-neutral-900 border border-neutral-800 rounded-[24px] overflow-hidden transition-all duration-300 hover:border-neutral-700 hover:shadow-xl hover:shadow-black/20"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-800">
                {item.url ? (
                  <img
                    src={`https://s.wordpress.com/mshots/v1/${encodeURIComponent(item.url)}?w=800`}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = item.image
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-500">
                    <span className="text-xs">No preview available</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-medium text-neutral-200 group-hover:text-amber-400 transition-colors truncate">
                    {item.name}
                  </h3>
                  <span className="text-[10px] font-medium text-neutral-500 uppercase tracking-wider bg-neutral-800 px-3 py-1 rounded-full">
                    Live
                  </span>
                </div>

                <p className="text-sm text-neutral-300 mb-1">
                  {item.type || 'Business'}
                </p>

                <p className="text-sm text-neutral-400 leading-relaxed mb-6 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-xs text-neutral-500 uppercase tracking-wider">
                      Valuation
                    </span>
                    <div className="text-lg font-medium text-neutral-200">
                      {formatPrice(item.price)}
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/business/${item.id}`, { state: { business: item, from: '/#businesses' } })}
                    className="group/btn inline-flex items-center gap-2 px-6 py-3 bg-neutral-800 border border-neutral-700 rounded-2xl text-sm font-medium text-neutral-300 hover:bg-amber-400 hover:text-neutral-950 transition-all"
                    title="View Business Details"
                  >
                    View Business
                    <ArrowRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="text-center mt-16"
      >
        <motion.button
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/businesses')}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-amber-400/20 hover:shadow-amber-400/30 transition-shadow"
        >
          View More Businesses
          <ArrowRight size={14} />
        </motion.button>
      </motion.div>
    </div>
  </section>
  )
}

export default IyoniBusinesses

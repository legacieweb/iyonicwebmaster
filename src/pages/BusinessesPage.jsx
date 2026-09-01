import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { CATALOG_ITEMS, EXCLUDED_BUSINESS_NAMES, formatPrice } from '../utils/constants'

const BusinessesPage = () => {
  const navigate = useNavigate()
  const allItems = Object.values(CATALOG_ITEMS).flat()

  const businessItems = allItems.filter((item) => {
    return !EXCLUDED_BUSINESS_NAMES.includes(item.name)
  })

  const handleBack = () => {
    const from = window.history.state?.usr?.from
    if (from) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-12"
        >
          <motion.button
            whileHover={{ x: -2 }}
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-amber-400 transition-colors"
          >
            <ArrowLeft size={16} />
            Back
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-medium text-neutral-100 tracking-tight leading-[0.95] mb-6">
            Portfolio Businesses
          </h1>
          <p className="text-neutral-400 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
            Every business in our portfolio is fully operational, revenue-generating, and ready for acquisition.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {businessItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03, duration: 0.5 }}
              className="group bg-neutral-900/70 backdrop-blur-xl border border-neutral-800 rounded-[28px] overflow-hidden transition-all duration-300 hover:border-neutral-700 hover:shadow-xl hover:shadow-amber-400/5"
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
                  <motion.button
                    whileHover={{ x: 2 }}
                    onClick={() => navigate(`/business/${item.id}`)}
                    className="group/btn inline-flex items-center gap-2 px-6 py-3 bg-neutral-800 border border-neutral-700 rounded-2xl text-sm font-medium text-neutral-300 hover:bg-amber-400 hover:text-neutral-950 transition-all"
                    title="View Business Details"
                  >
                    View Business
                    <ArrowRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BusinessesPage

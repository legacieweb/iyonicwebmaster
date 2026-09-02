import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ALL_BUSINESSES, getBusinessFilters, getBusinessCategory, getBusinessStatus } from '../utils/constants'
import BusinessCategoryNav from './BusinessCategoryNav'
import BusinessCard from './BusinessCard'

const HOME_DISPLAY_LIMIT = 8

const IyoniBusinesses = () => {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('All Businesses')

  const filters = useMemo(() => getBusinessFilters(), [])

  const filtered = useMemo(() => {
    return ALL_BUSINESSES.filter((item) => {
      if (activeFilter === 'All Businesses') return true
      if (item.category === activeFilter || item.type === activeFilter) return true
      return getBusinessCategory(item) === activeFilter || getBusinessStatus(item) === activeFilter
    })
  }, [activeFilter])

  const displayItems = filtered.slice(0, HOME_DISPLAY_LIMIT)

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
            We create and develop digital businesses that can be owned, operated, or acquired. Each asset is a turnkey business built on the Iyonic platform.
          </p>
        </motion.div>

        <BusinessCategoryNav filters={filters} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

        {displayItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-neutral-500"
          >
            No businesses match the selected filter.
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {displayItems.map((item, index) => (
              <BusinessCard key={item.id} business={item} from="/#businesses" index={index} />
            ))}
          </div>
        )}

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
            View All Businesses
            <ArrowRight size={14} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default IyoniBusinesses

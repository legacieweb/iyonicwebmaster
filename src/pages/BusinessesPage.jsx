import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ALL_BUSINESSES, getBusinessFilters, getBusinessCategory, getBusinessStatus } from '../utils/constants'
import BusinessCategoryNav from '../components/BusinessCategoryNav'
import BusinessCard from '../components/BusinessCard'

const BusinessesPage = () => {
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
            Digital Businesses
          </h1>
          <p className="text-neutral-400 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
            Browse Iyoni Corp's portfolio of digital businesses and business assets available for acquisition. Each is a turnkey operation built on the Iyonic platform.
          </p>
        </motion.div>

        <BusinessCategoryNav filters={filters} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-neutral-500 mt-12"
          >
            No businesses match the selected filter.
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {filtered.map((item, index) => (
              <BusinessCard key={item.id} business={item} from="/businesses" index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BusinessesPage

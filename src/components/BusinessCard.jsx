import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ShoppingBag } from 'lucide-react'
import { getBusinessCategory, getBusinessStatus, getBusinessClassification, formatPrice } from '../utils/constants'

const statusColors = {
  Available: 'text-emerald-400',
  Operating: 'text-amber-400',
  'Coming Soon': 'text-neutral-500',
  Sold: 'text-neutral-500'
}

const classificationColors = {
  'Ready-to-Launch Business': 'bg-amber-400/10 text-amber-400',
  'Operating Business': 'bg-emerald-400/10 text-emerald-400',
  'Website Asset': 'bg-neutral-400/10 text-neutral-300',
  'Digital Product': 'bg-neutral-400/10 text-neutral-300',
  'Software Business': 'bg-purple-400/10 text-purple-300',
  'Coming Soon': 'bg-neutral-500/10 text-neutral-500'
}

const BusinessCard = ({ business, from = '/', index = 0 }) => {
  const navigate = useNavigate()
  const status = getBusinessStatus(business)
  const classification = getBusinessClassification(business)
  const category = getBusinessCategory(business)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group bg-neutral-900 border border-neutral-800 rounded-[24px] overflow-hidden transition-all duration-300 hover:border-neutral-700 hover:shadow-xl hover:shadow-black/20"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-800">
        {business.url ? (
          <img
            src={`https://s.wordpress.com/mshots/v1/${encodeURIComponent(business.url)}?w=800`}
            alt={business.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.target.src = business.image
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-500">
            <ShoppingBag size={40} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="p-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-medium text-neutral-200 group-hover:text-amber-400 transition-colors truncate">
            {business.name}
          </h3>
          <span className={`text-[10px] font-medium uppercase tracking-wider ${statusColors[status] || 'text-neutral-500'}`}>
            {status}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-[10px] font-medium text-neutral-500 uppercase tracking-wider bg-neutral-800 px-3 py-1 rounded-full">
            {category}
          </span>
          <span className={`text-[10px] font-medium uppercase tracking-wider px-3 py-1 rounded-full ${classificationColors[classification] || 'bg-neutral-800 text-neutral-500'}`}>
            {classification}
          </span>
        </div>

        <p className="text-sm text-neutral-400 leading-relaxed mb-6 line-clamp-2">
          {business.description}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-neutral-500 uppercase tracking-wider">
              Valuation
            </span>
            <div className="text-lg font-medium text-neutral-200">
              {formatPrice(business.price)}
            </div>
          </div>
          <button
            onClick={() => navigate(`/business/${business.id}`, { state: { business, from } })}
            className="group/btn inline-flex items-center gap-2 px-6 py-3 bg-neutral-800 border border-neutral-700 rounded-2xl text-sm font-medium text-neutral-300 hover:bg-amber-400 hover:text-neutral-950 transition-all"
            title="View Business Details"
          >
            View Business
            <ArrowRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default BusinessCard

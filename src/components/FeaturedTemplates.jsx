import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Eye, Loader, AlertCircle, Code2, ArrowRight } from 'lucide-react'
import { fetchTemplates } from '../utils/api'

const FeaturedTemplates = ({ onBrowseTemplates }) => {
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        setLoading(true)
        const data = await fetchTemplates()
        // Loosen filters to ensure designs appear if the strict criteria aren't met
        let featured = data.filter(t => t.deployed && t.status === 'published')
        if (featured.length === 0) featured = data.slice(0, 3)
        else featured = featured.slice(0, 3)
        
        setTemplates(featured)
        setError(null)
      } catch (err) {
        setError(null)
        setTemplates([])
      } finally {
        setLoading(false)
      }
    }

    loadTemplates()
  }, [])

  if (loading) {
    return (
      <section className="section-padding">
        <div className="max-w-7xl mx-auto flex justify-center">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
            <Loader className="w-8 h-8 text-cyan-400" />
          </motion.div>
        </div>
      </section>
    )
  }

  if (templates.length === 0) {
    return null
  }

  return (
    <section className="py-24 bg-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-[10px] font-black mb-6 tracking-[0.2em] uppercase">
            <Code2 size={14} />
            The Showcase
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-neutral-950 mb-8 leading-[0.9] tracking-tighter uppercase italic">
            Featured <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Digital Blueprints.</span>
          </h2>
          <p className="text-neutral-500 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            High-performance frameworks designed for scale, precision, and absolute conversion.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden bg-neutral-100 border border-neutral-200/50 transition-all duration-700 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] group-hover:-translate-y-4">
                {/* Image container */}
                <div className="w-full h-full relative">
                  <img 
                    src={template.url ? `https://s.wordpress.com/mshots/v1/${encodeURIComponent(template.url)}?w=1280` : (template.image || 'https://i.imgur.com/6nGQFtj.png')} 
                    alt={template.name} 
                    className={`w-full h-full ${template.url ? 'object-cover' : 'object-contain'} transition-transform duration-1000 group-hover:scale-110`}
                    loading="lazy"
                  />
                  {/* Overlay shadow for text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Tags */}
                <div className="absolute top-6 left-6 flex flex-wrap gap-2 z-10">
                  {template.url && (
                    <div className="px-4 py-2 bg-white/90 backdrop-blur-md text-neutral-900 text-[9px] font-black uppercase tracking-widest rounded-2xl shadow-xl flex items-center gap-2 border border-white/20">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
                      Live Build
                    </div>
                  )}
                  <div className="px-4 py-2 bg-neutral-950/80 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest rounded-2xl shadow-xl border border-white/10">
                    {(template.pages || []).length} Pages
                  </div>
                </div>

                {/* Hover Content */}
                <div className="absolute inset-x-0 bottom-0 p-8 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <motion.button
                    onClick={() => onBrowseTemplates?.(template)}
                    className="w-full py-5 bg-white text-neutral-950 rounded-[20px] font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl hover:bg-blue-600 hover:text-white transition-all duration-300"
                  >
                    Explore Engine
                    <ArrowRight size={16} />
                  </motion.button>
                </div>
              </div>

              {/* Outside Content */}
              <div className="mt-8 px-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-bold text-neutral-950 tracking-tight group-hover:text-blue-600 transition-colors">{template.name}</h3>
                    {template.minTier && (
                      <span className={`w-fit text-[9px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-full ${
                        template.minTier === 'basic' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                        template.minTier === 'premium' ? 'bg-purple-50 text-purple-600 border border-purple-100' :
                        template.minTier === 'premium_plus' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' :
                        'bg-rose-50 text-rose-600 border border-rose-100'
                      }`}>
                        {template.minTier.replace('_', ' ')}
                      </span>
                    )}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-neutral-50 border border-neutral-100 flex items-center justify-center text-neutral-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                    <Eye size={16} />
                  </div>
                </div>
                <p className="text-neutral-500 text-sm font-medium leading-relaxed line-clamp-2">
                  {template.description || 'Precision engineered interface with high-velocity performance.'}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <button
            onClick={onBrowseTemplates}
            className="px-12 py-6 bg-neutral-950 text-white rounded-[32px] font-black text-xs uppercase tracking-[0.3em] flex items-center gap-4 hover:bg-blue-600 transition-all duration-500 shadow-2xl group"
          >
            Browse Full Marketplace
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ArrowRight size={16} />
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedTemplates

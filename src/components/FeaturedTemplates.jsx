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
        const deployedTemplates = data.filter(t => t.deployed && t.status === 'published').slice(0, 3)
        setTemplates(deployedTemplates)
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
    <section className="section-padding bg-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Featured <span className="gradient-text">Templates</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Choose from our professionally designed templates and customize them to match your brand
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group glass-dark rounded-2xl border border-white/10 overflow-hidden card-hover"
            >
              {/* Template Preview */}
              <div className="h-56 relative overflow-hidden bg-white/5 flex items-center justify-center">
                {/* Background Logo Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center p-12 opacity-5">
                  <img src="https://i.imgur.com/6nGQFtj.png" alt="Iyonicorp" className="w-full h-full object-contain" />
                </div>
                
                <img 
                  src={template.url ? `https://s.wordpress.com/mshots/v1/${encodeURIComponent(template.url)}?w=1280` : (template.image || 'https://i.imgur.com/6nGQFtj.png')} 
                  alt={template.name} 
                  className={`w-full h-full ${template.url ? 'object-cover' : 'object-contain'} transition-transform duration-700 group-hover:scale-110`}
                  loading="lazy"
                />
                
                {template.url && (
                  <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                    <div className="px-3 py-1 bg-indigo-600/90 backdrop-blur-sm text-white text-[8px] font-black uppercase tracking-widest rounded-full shadow-lg flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-indigo-300 rounded-full animate-pulse" />
                      Live Prototype
                    </div>
                  </div>
                )}
                
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Eye className="w-12 h-12 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-xl font-bold mb-3 line-clamp-2">{template.name}</h3>
                <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                  {template.description || 'Professional template with modern design'}
                </p>

                <div className="flex items-center justify-between mb-6 text-xs">
                  <span className="text-gray-500">{(template.pages || []).length} pages</span>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full">Published</span>
                </div>

                <motion.button
                  onClick={onBrowseTemplates}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:shadow-lg hover:shadow-indigo-500/50 rounded-xl font-semibold transition-all"
                >
                  <Eye size={18} />
                  View Template
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Browse All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <motion.button
            onClick={onBrowseTemplates}
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(99, 102, 241, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-cyan-500/50 rounded-xl font-semibold flex items-center gap-3 transition-all duration-300 text-lg"
          >
            Browse All Templates
            <ArrowRight size={20} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedTemplates

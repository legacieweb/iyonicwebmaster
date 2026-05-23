import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { ArrowLeft, Code2, Loader, AlertCircle, Eye, Sparkles, Star, Users, Search, Layout, ArrowRight } from 'lucide-react'
import { fetchTemplates } from '../utils/api'
import { WEBSITE_TYPES } from '../utils/constants'

const DeployedTemplates = ({ onBack, onSelectTemplate }) => {
  const location = useLocation()
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const updateFiltersFromUrl = () => {
    const params = new URLSearchParams(location.search)
    let typeId = params.get('type')

    if (!typeId && window.location.hash.includes('?')) {
      const hashSearch = window.location.hash.split('?')[1]
      const hashParams = new URLSearchParams(hashSearch)
      typeId = hashParams.get('type')
    }

    if (typeId) {
      const typeObj = WEBSITE_TYPES.find(t => t.id === typeId)
      const searchVal = typeObj ? typeObj.name : typeId
      
      // If the search value matches an existing category, select it
      // Note: categories might not be loaded yet, so we handle it in useEffect too
      if (searchVal) {
        setSearchTerm(searchVal)
      }
    }
  }

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        setLoading(true)
        const data = await fetchTemplates()
        const deployedTemplates = data.filter(t => t.deployed && t.status === 'published')
        setTemplates(deployedTemplates)
        setError(null)
      } catch (err) {
        setError('Failed to load templates: ' + err.message)
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadTemplates()
  }, [])

  useEffect(() => {
    updateFiltersFromUrl()
  }, [location.search, templates])

  const categories = useMemo(() => 
    ['all', ...new Set(templates.map(t => t.category).filter(Boolean))],
    [templates]
  )

  // Extra useEffect to sync category if search matches
  useEffect(() => {
    if (searchTerm && categories.length > 1) {
      const matchedCat = categories.find(c => c.toLowerCase() === searchTerm.toLowerCase())
      if (matchedCat) {
        setSelectedCategory(matchedCat)
        setSearchTerm('') // Clear search term if we matched a category for cleaner UI
      }
    }
  }, [searchTerm, categories])
  
  const filteredTemplates = useMemo(() => {
    const term = searchTerm.toLowerCase().trim()
    return templates.filter(template => {
      const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
      
      if (!term) return matchesCategory

      const matchesSearch = 
        template.name.toLowerCase().includes(term) ||
        template.description?.toLowerCase().includes(term) ||
        template.category?.toLowerCase().includes(term) ||
        (template.type && template.type.toLowerCase().includes(term))
        
      return matchesCategory && matchesSearch
    })
  }, [templates, searchTerm, selectedCategory])

  const templateGradients = [
    'from-blue-600 to-indigo-600',
    'from-indigo-600 to-purple-600',
    'from-purple-600 to-pink-600',
    'from-emerald-600 to-teal-600',
    'from-orange-600 to-amber-600',
  ]

  const getGradient = (index) => templateGradients[index % templateGradients.length]

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-slate-100 border-t-blue-600 rounded-full"
        />
        <p className="mt-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] animate-pulse">Scanning Grid...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-500/30">
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.03),transparent_50%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 relative z-10">
        <motion.button
          onClick={() => onBack('landing')}
          className="flex items-center gap-3 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-blue-600 transition-all shadow-sm mb-12 group"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">Back to Surface</span>
        </motion.button>

        {/* Header Section */}
        <div className="grid lg:grid-cols-12 gap-12 items-end mb-20">
          <div className="lg:col-span-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-50 rounded-full border border-blue-100">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="text-[8px] font-black text-blue-600 uppercase tracking-[0.2em]">Premium Design Repository</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-neutral-950 uppercase italic tracking-tighter leading-[0.9]">
                Choose Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Digital Standard</span>
              </h1>
              <p className="text-slate-500 text-lg md:text-xl max-w-2xl font-medium leading-relaxed">
                Experience the next generation of web architecture. Fully customizable, performance-optimized, and secure by design.
              </p>
            </motion.div>
          </div>
          
          <div className="lg:col-span-4">
            <div className="bg-neutral-950 p-8 rounded-[2.5rem] border border-neutral-800 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={10} className="text-blue-400 fill-blue-400" />
                  ))}
                </div>
                <p className="text-white font-black italic uppercase tracking-tight text-lg mb-2">Enterprise Ready</p>
                <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed">Join 500+ innovators scaling their digital presence with Iyonic templates.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16 space-y-8 bg-white p-8 sm:p-10 rounded-[3rem] border border-slate-100 shadow-sm"
        >
          <div className="relative group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Query the repository (e.g., Corporate, Portfolio, E-commerce...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-8 py-6 bg-slate-50 border border-slate-200 rounded-2xl text-neutral-950 font-bold placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
            />
          </div>

          {categories.length > 1 && (
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                    selectedCategory === cat
                      ? 'bg-neutral-950 text-white shadow-xl shadow-slate-200'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Results Area */}
        {filteredTemplates.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-center py-32 bg-white rounded-[3rem] border border-slate-100 shadow-sm"
          >
            <Layout className="w-20 h-20 text-slate-100 mx-auto mb-8" />
            <h3 className="text-2xl font-black text-neutral-950 uppercase italic tracking-tight mb-2">No Matches Found</h3>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Modify your search parameters and try again</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group h-full"
              >
                <div className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden hover:border-blue-100 transition-all h-full flex flex-col hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] duration-500">
                  {/* Visual Node */}
                  <div className="h-64 relative overflow-hidden bg-slate-100 flex items-center justify-center">
                    {/* Background Logo Placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center p-16 opacity-5">
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
                        <div className="px-3 py-1 bg-blue-600/90 backdrop-blur-sm text-white text-[8px] font-black uppercase tracking-widest rounded-full shadow-lg flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse" />
                          Deployed Node
                        </div>
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-neutral-950/20 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onSelectTemplate(template)}
                        className="px-8 py-4 bg-white text-neutral-950 font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-2xl flex items-center gap-3"
                      >
                        <Eye size={16} />
                        Live Preview
                      </motion.button>
                    </div>
                    
                    {/* Animated Overlay */}
                    <div className="absolute top-0 right-0 p-6">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white">
                        <Code2 size={20} />
                      </div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                      <Layout size={120} className="text-white" />
                    </div>
                  </div>

                  {/* Intelligence Area */}
                  <div className="p-8 sm:p-10 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[8px] font-black uppercase tracking-[0.2em] rounded-md border border-blue-100">
                        {template.category || 'Architecture'}
                      </span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-slate-200" />)}
                      </div>
                    </div>

                    <h3 className="text-2xl font-black text-neutral-950 uppercase italic tracking-tight mb-3 group-hover:text-blue-600 transition-colors">
                      {template.name}
                    </h3>
                    
                    <p className="text-slate-500 font-medium text-sm mb-8 flex-1 line-clamp-3 leading-relaxed">
                      {template.description || 'Enterprise-grade digital blueprint engineered for extreme performance and aesthetic precision.'}
                    </p>

                    <div className="flex items-center justify-between py-6 border-t border-slate-50 mb-8">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                          <Users size={14} />
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{template.pages?.length || 0} Nodes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star size={14} className="text-amber-400 fill-amber-400" />
                        <span className="text-[10px] font-black text-neutral-950 uppercase tracking-widest italic">The Standard</span>
                      </div>
                    </div>

                    <motion.button
                      onClick={() => onSelectTemplate(template)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-3 py-5 bg-neutral-950 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all hover:shadow-xl hover:shadow-slate-200"
                    >
                      Initialize Design
                      <ArrowRight size={16} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DeployedTemplates

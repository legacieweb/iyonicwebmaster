import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, ArrowRight, Plus, Eye, Loader } from 'lucide-react'
import { fetchTemplates } from '../utils/api'

const Portfolio = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true)
        const data = await fetchTemplates()
        // Loosen filters to ensure designs appear
        let items = data.filter(t => t.deployed && t.status === 'published')
        if (items.length === 0) items = data.slice(0, 5)
        else items = items.slice(0, 5)

        const portfolioItems = items.map((t, index) => ({
            id: t.id,
            title: t.name,
            description: t.description || 'Precision engineered digital infrastructure.',
            image: t.url 
              ? `https://s.wordpress.com/mshots/v1/${encodeURIComponent(t.url)}?w=1280` 
              : (t.image || 'https://i.imgur.com/6nGQFtj.png'),
            category: t.category || 'Web Development',
            size: index === 0 || index === 4 ? 'large' : 'small',
            url: t.url
          }))
        setProjects(portfolioItems)
      } catch (err) {
        console.error('Error loading portfolio:', err)
      } finally {
        setLoading(false)
      }
    }
    loadProjects()
  }, [])

  if (loading) {
    return (
      <div className="py-24 flex justify-center bg-white">
        <Loader className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    )
  }

  if (projects.length === 0) return null

  return (
    <section id="portfolio" className="py-24 bg-white overflow-hidden relative">
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-indigo-50/50 rounded-full blur-[140px] -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-600 text-[10px] font-black mb-6 tracking-[0.2em] uppercase"
            >
              The Archive
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-7xl font-black text-neutral-950 leading-[0.9] tracking-tighter uppercase italic"
            >
              Selected <br />
              <span className="text-neutral-400">Masterpieces.</span>
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <button className="group flex items-center gap-4 px-8 py-4 bg-neutral-50 hover:bg-neutral-950 hover:text-white border border-neutral-200 rounded-[20px] transition-all duration-500 font-black text-[10px] uppercase tracking-widest">
              View All Case Studies
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 auto-rows-[350px]">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-[48px] bg-neutral-100 border border-neutral-200/50 shadow-sm transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 ${
                project.size === 'large' ? 'md:col-span-2' : ''
              }`}
            >
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              
              {/* Premium Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10">
                <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-4 py-1.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white text-[9px] font-black uppercase tracking-widest">
                      {project.category}
                    </span>
                    <div className="h-px flex-1 bg-white/20" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-4 tracking-tight uppercase italic">{project.title}</h3>
                  <p className="text-white/60 text-sm mb-8 max-w-md font-medium leading-relaxed">{project.description}</p>
                  
                  <a 
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-4 text-white font-black text-[10px] uppercase tracking-[0.2em] group/btn"
                  >
                    Explore Project
                    <div className="w-12 h-12 rounded-2xl bg-white text-neutral-950 flex items-center justify-center group-hover/btn:bg-blue-600 group-hover/btn:text-white transition-all">
                      <ExternalLink size={20} />
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio

import { motion } from 'framer-motion'
import { ExternalLink, ArrowRight, Plus } from 'lucide-react'

const Portfolio = () => {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Next-gen shopping experience with real-time inventory.',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
      category: 'Web Development',
      size: 'large'
    },
    {
      title: 'AI Chatbot System',
      description: 'Intelligent customer support with NLP.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
      category: 'AI Development',
      size: 'small'
    },
    {
      title: 'Marketing Automation',
      description: 'Data-driven campaign management.',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
      category: 'Marketing',
      size: 'small'
    },
    {
      title: 'Payment Gateway',
      description: 'Secure multi-currency processing.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      category: 'FinTech',
      size: 'small'
    },
    {
      title: 'Business Automation',
      description: 'Streamlined enterprise workflows.',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
      category: 'Automation',
      size: 'large'
    }
  ]

  return (
    <section id="portfolio" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block text-sm font-bold text-blue-600 tracking-wider uppercase mb-4"
            >
              Our Portfolio
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-neutral-900"
            >
              Selected <span className="text-neutral-400">Works</span>
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <button className="group flex items-center gap-2 font-bold text-neutral-900 hover:text-blue-600 transition-colors">
              View All Projects
              <div className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <ArrowRight size={18} />
              </div>
            </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[300px]">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-[32px] bg-neutral-100 ${
                project.size === 'large' ? 'md:col-span-2' : ''
              }`}
            >
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-medium mb-3">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-white/70 text-sm mb-6 max-w-md">{project.description}</p>
                  
                  <button className="w-12 h-12 rounded-full bg-white text-neutral-900 flex items-center justify-center hover:scale-110 transition-transform">
                    <ExternalLink size={20} />
                  </button>
                </div>
              </div>
              
              {/* Quick info visible without hover (mobile focus) */}
              <div className="absolute top-6 right-6 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
                  <Plus size={20} />
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

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Search, Star, Users, Zap } from 'lucide-react'

const TemplateGallery = ({ onBack, onSelectTemplate }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const templates = [
    {
      id: 1,
      name: 'Modern Business',
      category: 'business',
      description: 'Professional business website with services, team, and portfolio sections',
      rating: 4.8,
      users: 2300,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426',
      url: 'https://vercel.com',
      features: ['Responsive', 'SEO Optimized', 'Contact Form'],
      minTier: 'basic'
    },
    {
      id: 2,
      name: 'Creative Portfolio',
      category: 'portfolio',
      description: 'Showcase your work with a beautiful portfolio template',
      rating: 4.9,
      users: 1800,
      image: 'https://images.unsplash.com/photo-1522542550221-31fd19255a7a?auto=format&fit=crop&q=80&w=2426',
      url: 'https://supabase.com',
      features: ['Gallery Layout', 'Smooth Animations', 'Project Filter'],
      minTier: 'basic'
    },
    {
      id: 3,
      name: 'E-commerce Store',
      category: 'ecommerce',
      description: 'Full-featured online store with product listings and cart',
      rating: 4.7,
      users: 3100,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2426',
      url: 'https://shopify.com',
      features: ['Product Showcase', 'Cart System', 'Payment Ready'],
      minTier: 'premium'
    },
    {
      id: 4,
      name: 'Landing Page Pro',
      category: 'landing',
      description: 'High-converting landing page template for your campaigns',
      rating: 4.9,
      users: 2900,
      image: 'https://images.unsplash.com/photo-1551288049-bbda022b868e?auto=format&fit=crop&q=80&w=2426',
      url: 'https://framer.com',
      features: ['CTA Optimized', 'Fast Loading', 'Mobile First'],
      minTier: 'basic'
    },
    {
      id: 5,
      name: 'Agency Website',
      category: 'business',
      description: 'Professional agency template with case studies and testimonials',
      rating: 4.8,
      users: 2100,
      image: 'https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&q=80&w=2426',
      url: 'https://webflow.com',
      features: ['Case Studies', 'Testimonials', 'Team Profiles'],
      minTier: 'premium'
    },
    {
      id: 6,
      name: 'Blog & Content',
      category: 'landing',
      description: 'Beautiful blog template with article management and comments',
      rating: 4.6,
      users: 1600,
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=2426',
      url: 'https://medium.com',
      features: ['Blog Posts', 'Categories', 'Social Share'],
      minTier: 'basic'
    },
    {
      id: 7,
      name: 'SaaS Landing',
      category: 'landing',
      description: 'Modern SaaS product landing page with pricing and features',
      rating: 4.9,
      users: 3500,
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=2426',
      url: 'https://linear.app',
      features: ['Pricing Table', 'Feature Grid', 'Demo CTA'],
      minTier: 'premium_plus'
    },
    {
      id: 8,
      name: 'E-learning Platform',
      category: 'ecommerce',
      description: 'Online course and educational platform template',
      rating: 4.7,
      users: 1400,
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=2426',
      url: 'https://coursera.org',
      features: ['Course Display', 'Student Portal', 'Progress Tracking'],
      minTier: 'premium_plus'
    },
    {
      id: 9,
      name: 'Restaurant Menu',
      category: 'business',
      description: 'Elegant restaurant website with menu and reservations',
      rating: 4.8,
      users: 890,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2426',
      url: 'https://opentable.com',
      features: ['Menu Display', 'Reservations', 'Photo Gallery'],
      minTier: 'premium'
    },
  ]

  const categories = ['all', 'business', 'portfolio', 'ecommerce', 'landing']

  const filteredTemplates = templates.filter((template) => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-dark pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-12">
        <motion.button
          onClick={() => onBack?.('landing')}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 transition-colors"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft size={20} />
          Back to Home
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold mb-2">
            Choose Your <span className="gradient-text">Perfect Template</span>
          </h1>
          <p className="text-gray-400 text-lg">Pick from our collection of professionally designed templates</p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template, idx) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="glass-dark rounded-2xl overflow-hidden hover:border-cyan-400/50 border border-white/10 transition-all group cursor-pointer"
            >
              {/* Template Preview */}
              <div className="h-48 relative overflow-hidden bg-white/5 flex items-center justify-center">
                {/* Background Logo Placeholder */}
                {!template.url && (
                  <div className="absolute inset-0 flex items-center justify-center p-8 opacity-5">
                    <img src="https://i.imgur.com/6nGQFtj.png" alt="Iyonicorp" className="w-full h-full object-contain" />
                  </div>
                )}
                
                <img 
                  src={template.url ? `https://s.wordpress.com/mshots/v1/${encodeURIComponent(template.url)}?w=1280` : template.image} 
                  alt={template.name} 
                  className={`w-full h-full ${template.url ? 'object-cover' : 'object-contain'} transition-transform duration-700 group-hover:scale-110`}
                  loading="lazy"
                />
                
                {template.url && (
                  <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                    <div className="px-3 py-1 bg-cyan-600/90 backdrop-blur-sm text-white text-[8px] font-black uppercase tracking-widest rounded-full shadow-lg flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse" />
                      Live Architecture
                    </div>
                  </div>
                )}
                
                <motion.div
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onSelectTemplate?.(template.id)}
                    className="opacity-0 group-hover:opacity-100 bg-white/20 backdrop-blur-sm px-8 py-3 rounded-lg font-semibold text-white border border-white/30 transition-all"
                  >
                    Use This Template
                  </motion.button>
                </motion.div>
              </div>

              {/* Template Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">{template.name}</h3>
                  {template.minTier && (
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded ${
                      template.minTier === 'basic' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' :
                      template.minTier === 'premium' ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30' :
                      template.minTier === 'premium_plus' ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' :
                      'bg-rose-600/20 text-rose-400 border border-rose-500/30'
                    }`}>
                      {template.minTier.replace('_', ' ')}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">{template.description}</p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {template.features.slice(0, 2).map((feature, i) => (
                    <span
                      key={i}
                      className="text-xs bg-cyan-600/20 text-cyan-400 px-2 py-1 rounded border border-cyan-500/30"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star size={16} fill="currentColor" />
                    <span className="font-medium">{template.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400">
                    <Users size={16} />
                    <span>{template.users.toLocaleString()}</span>
                  </div>
                </div>

                {/* CTA */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSelectTemplate?.(template.id)}
                  className="w-full mt-4 bg-gradient-to-r from-cyan-600 to-blue-600 py-2 rounded-lg font-semibold hover:shadow-glow transition-all"
                >
                  Preview & Use
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Zap className="w-16 h-16 text-gray-400 mx-auto mb-4 opacity-50" />
            <p className="text-gray-400 text-lg">No templates match your search</p>
            <p className="text-gray-500">Try different keywords or categories</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default TemplateGallery

import { motion } from 'framer-motion'
import { ArrowRight, Calendar, User, Tag } from 'lucide-react'

const Blog = ({ onBack }) => {
  const posts = [
    {
      title: "The Future of Web Design in 2025",
      excerpt: "Exploring how AI and spatial computing are reshaping the digital landscape.",
      author: "Alex Rivers",
      date: "Mar 10, 2024",
      category: "Design",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Optimizing React for Extreme Performance",
      excerpt: "Deep dive into memoization, virtualization, and the new React Forget compiler.",
      author: "Sarah Chen",
      date: "Mar 08, 2024",
      category: "Development",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Building Scalable AI Infrastructure",
      excerpt: "How to integrate LLMs into your existing tech stack without breaking the bank.",
      author: "Marcus Thorne",
      date: "Mar 05, 2024",
      category: "AI",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
    }
  ]

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-black text-neutral-950 tracking-tighter mb-8"
            >
              The Journal<span className="text-blue-600">.</span>
            </motion.h1>
            <p className="text-xl text-neutral-500 max-w-xl font-medium leading-relaxed">
              Insights, thoughts, and technical deep-dives from our team of creators and engineers.
            </p>
          </div>
          <motion.button
            whileHover={{ x: 5 }}
            onClick={() => onBack('landing')}
            className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-neutral-400 hover:text-neutral-950 transition-colors"
          >
            Back to Home <ArrowRight size={16} />
          </motion.button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.map((post, index) => (
            <motion.article 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-[32px] mb-8 shadow-2xl transition-transform group-hover:scale-[1.02] duration-500">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-neutral-950">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-6 mb-4 text-[10px] font-black uppercase tracking-widest text-neutral-400">
                <span className="flex items-center gap-2"><Calendar size={12} className="text-blue-600" /> {post.date}</span>
                <span className="flex items-center gap-2"><User size={12} className="text-purple-600" /> {post.author}</span>
              </div>

              <h2 className="text-2xl font-black text-neutral-950 mb-4 group-hover:text-blue-600 transition-colors tracking-tight leading-tight">
                {post.title}
              </h2>
              
              <p className="text-neutral-500 font-medium mb-8 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest group-hover:gap-5 transition-all">
                Read Article <ArrowRight size={14} className="text-blue-600" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blog

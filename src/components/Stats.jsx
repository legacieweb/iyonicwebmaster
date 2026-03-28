import { motion } from 'framer-motion'
import { Users, Trophy, Zap, Target, TrendingUp, Globe, Award, Clock } from 'lucide-react'

const Stats = () => {
  const stats = [
    {
      value: '200+',
      label: 'Global Clients',
      icon: Users,
      color: 'text-blue-500'
    },
    {
      value: '350+',
      label: 'Projects Delivered',
      icon: Trophy,
      color: 'text-purple-500'
    },
    {
      value: '98%',
      label: 'Success Rate',
      icon: TrendingUp,
      color: 'text-emerald-500'
    },
    {
      value: '24/7',
      label: 'Expert Support',
      icon: Clock,
      color: 'text-amber-500'
    },
  ]

  return (
    <section id="stats" className="py-24 bg-neutral-900 text-white overflow-hidden relative">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-4 gap-12">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center lg:items-start text-center lg:text-left"
              >
                <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 ${stat.color}`}>
                  <Icon size={24} />
                </div>
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 100, delay: i * 0.1 + 0.2 }}
                  className="text-5xl md:text-6xl font-bold mb-2 tracking-tighter"
                >
                  {stat.value}
                </motion.div>
                <div className="text-neutral-400 font-medium uppercase tracking-widest text-sm">
                  {stat.label}
                </div>
              </motion.div>
            )
          })}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-20 pt-12 border-t border-white/5 flex flex-wrap justify-center gap-x-16 gap-y-8"
        >
          {[
            { label: 'Avg ROI Increase', value: '150%' },
            { label: 'User Reach', value: '2.5M+' },
            { label: 'Uptime', value: '99.9%' },
            { label: 'Conversion Boost', value: '45%' }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="text-neutral-500 text-sm font-medium uppercase tracking-wider">{item.label}:</span>
              <span className="text-white font-bold">{item.value}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Stats

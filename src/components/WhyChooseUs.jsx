import { motion } from 'framer-motion'
import { Shield, Rocket, Zap, Heart, Award, Target, CheckCircle, Clock, Users, Headphones } from 'lucide-react'

const WhyChooseUs = () => {
  const features = [
    {
      icon: Shield,
      title: 'Security First',
      description: 'Enterprise-grade protocols with 24/7 monitoring and compliance.',
      color: 'blue'
    },
    {
      icon: Rocket,
      title: 'Fast Delivery',
      description: 'Agile methodology ensures rapid deployment without compromises.',
      color: 'purple'
    },
    {
      icon: Zap,
      title: 'Modern Stack',
      description: 'Leveraging the latest frameworks for future-proof solutions.',
      color: 'indigo'
    },
    {
      icon: Heart,
      title: 'Client Centric',
      description: 'Your success is our priority. We work as your dedicated partner.',
      color: 'rose'
    }
  ]

  const metrics = [
    { label: 'Uptime Guarantee', value: '99.9%' },
    { label: 'Project Success', value: '100%' },
    { label: 'Client Retention', value: '95%' },
    { label: 'Support Response', value: '< 2h' },
  ]

  return (
    <section id="why-choose-us" className="py-24 bg-neutral-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-sm font-bold text-blue-600 tracking-wider uppercase mb-4">
              Why Iyonicorp
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-8 leading-tight">
              We don't just build, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">we empower</span>
            </h2>
            <p className="text-lg text-neutral-500 mb-12 leading-relaxed">
              Choosing the right partner is the difference between a project that just exists and one that thrives. We bring a decade of expertise and a relentless focus on your ROI.
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              {features.map((feature, i) => {
                const Icon = feature.icon
                return (
                  <div key={i} className="flex gap-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${
                      feature.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                      feature.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                      feature.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' :
                      'bg-rose-50 text-rose-600'
                    }`}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-900 mb-1">{feature.title}</h4>
                      <p className="text-sm text-neutral-500 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white p-12 rounded-[40px] shadow-2xl shadow-blue-500/5 border border-neutral-100 relative z-10">
              <h3 className="text-2xl font-bold text-neutral-900 mb-8 text-center">Performance Metrics</h3>
              <div className="space-y-8">
                {metrics.map((metric, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-sm font-bold text-neutral-400 uppercase tracking-wider">{metric.label}</span>
                      <span className="text-xl font-bold text-neutral-900">{metric.value}</span>
                    </div>
                    <div className="h-2 bg-neutral-50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: i * 0.2 }}
                        className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Background elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-100 rounded-full blur-3xl opacity-50 -z-0" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-50 -z-0" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs

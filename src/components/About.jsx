import { motion } from 'framer-motion'
import { Target, Rocket, Award, Heart, ArrowLeft, CheckCircle, Shield, Zap, Sparkles, Users, Globe, Trophy } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const About = () => {
  const navigate = useNavigate()
  const values = [
    {
      icon: Target,
      title: 'Precision Engineering',
      description: 'We believe that excellence lies in the details. Every line of code and every pixel is crafted with meticulous attention to ensure a flawless final product.',
      color: 'blue'
    },
    {
      icon: Rocket,
      title: 'Forward Innovation',
      description: 'The digital landscape is constantly evolving. We stay ahead of the curve by embracing emerging technologies like AI and advanced automation to solve tomorrow\'s challenges.',
      color: 'purple'
    },
    {
      icon: Shield,
      title: 'Uncompromising Trust',
      description: 'Security and reliability are not features; they are foundational. We build resilient systems that protect your brand and your users at every touchpoint.',
      color: 'indigo'
    },
    {
      icon: Zap,
      title: 'Extreme Performance',
      description: 'Speed is the baseline of user experience. Our architectures are designed for high-velocity delivery, ensuring lightning-fast interactions and superior conversion rates.',
      color: 'amber'
    },
  ]

  const milestones = [
    { year: '2014', event: 'Founded with a vision to democratize high-end tech.' },
    { year: '2016', event: 'Expanded into specialized AI and automation solutions.' },
    { year: '2019', event: 'Reached a milestone of 100+ global project deliveries.' },
    { year: '2022', event: 'Launched our proprietary design-to-code framework.' },
    { year: '2024', event: 'Setting the new standard in digital craftsmanship.' }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-neutral-950 text-white">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-12 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-sm uppercase tracking-[0.2em]">Back to Home</span>
          </motion.button>

          <div className="max-w-3xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-600/20 rounded-full text-blue-400 text-xs font-black mb-8 tracking-widest uppercase"
            >
              <Sparkles size={14} className="animate-pulse" />
              The Iyonicorp Standard
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter uppercase italic"
            >
              Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Craftsmanship</span> <br /> 
              at Scale.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-neutral-400 leading-relaxed font-medium"
            >
              We don't just build projects; we engineer experiences that define industries. At Iyonicorp, we bridge the gap between artistic vision and technical precision.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7"
            >
              <div className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-4">Our Journey</div>
              <h2 className="text-4xl md:text-5xl font-black text-neutral-950 mb-8 leading-tight uppercase italic tracking-tighter">
                The Story Behind <br />
                <span className="text-neutral-400">The Vision.</span>
              </h2>
              <div className="space-y-6 text-lg text-neutral-500 font-medium leading-relaxed max-w-2xl">
                <p>
                  Founded in 2014, Iyonicorp began as a small collective of designers and engineers frustrated by the status quo. We saw a market filled with generic solutions and decided to build something different: a studio that prioritizes depth over surface, and performance over promises.
                </p>
                <p>
                  Over the last decade, we've transformed from a boutique agency into a global digital powerhouse. Our growth hasn't been fueled by aggressive marketing, but by the relentless pursuit of excellence in every project we touch.
                </p>
                <p>
                  Today, we serve ambitious brands across five continents, delivering everything from high-conversion landing pages to complex AI-driven financial ecosystems. Our story is one of continuous evolution, driven by the belief that digital technology, when crafted with care, has the power to change everything.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-5 relative"
            >
              <div className="bg-neutral-950 p-1 rounded-[48px] shadow-2xl overflow-hidden aspect-[4/5]">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2426" 
                  alt="Team collaboration" 
                  className="w-full h-full object-cover rounded-[44px] grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-600 rounded-full blur-[80px] opacity-30 animate-pulse" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Iyonicorp Section */}
      <section className="py-24 bg-neutral-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="inline-block text-sm font-bold text-blue-600 tracking-wider uppercase mb-4">
              Why Choose Us
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-neutral-950 mb-6 uppercase italic tracking-tighter">
              The Iyonicorp <span className="text-blue-600">Edge.</span>
            </h2>
            <p className="text-neutral-500 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
              We don't just meet expectations; we redefine them. Here's why the world's most ambitious brands trust us with their digital future.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-12 bg-white rounded-[48px] border border-neutral-100 shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8">
                <Users size={32} />
              </div>
              <h3 className="text-2xl font-black text-neutral-950 mb-6 uppercase tracking-tighter">Human-Centric Engineering</h3>
              <p className="text-neutral-500 leading-relaxed font-medium text-lg">
                We believe tech should serve people, not the other way around. Every decision we make—from UI layouts to database structures—is filtered through the lens of human experience.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-12 bg-neutral-950 text-white rounded-[48px] shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] group-hover:bg-blue-600/20 transition-colors" />
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-8 relative z-10">
                <Globe size={32} />
              </div>
              <h3 className="text-2xl font-black mb-6 uppercase tracking-tighter relative z-10">Global Standards</h3>
              <p className="text-neutral-400 leading-relaxed font-medium text-lg relative z-10">
                Our team spans multiple time zones, bringing a truly global perspective to your project. We build for scalability, ensuring your brand resonates in every corner of the world.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-12 bg-white rounded-[48px] border border-neutral-100 shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-8">
                <Trophy size={32} />
              </div>
              <h3 className="text-2xl font-black text-neutral-950 mb-6 uppercase tracking-tighter">Proven Success</h3>
              <p className="text-neutral-500 leading-relaxed font-medium text-lg">
                With a 98% success rate across over 350 projects, we have the battle-tested experience to navigate any digital challenge. Your success is our primary metric.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-12 bg-white rounded-[48px] border border-neutral-100 shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-8">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-2xl font-black text-neutral-950 mb-6 uppercase tracking-tighter">Zero-Risk Partnership</h3>
              <p className="text-neutral-500 leading-relaxed font-medium text-lg">
                Our unique partnership models, including zero-upfront investment for selected brands, demonstrate our total commitment to your growth. We win only when you do.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => {
              const Icon = value.icon
              return (
                <div key={i} className="group">
                  <div className={`w-12 h-12 rounded-2xl mb-6 flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3 ${
                    value.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                    value.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                    value.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' :
                    'bg-amber-50 text-amber-600'
                  }`}>
                    <Icon size={24} />
                  </div>
                  <h4 className="text-xl font-bold text-neutral-900 mb-4 uppercase tracking-tighter">{value.title}</h4>
                  <p className="text-neutral-500 text-sm leading-relaxed font-medium">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 bg-neutral-950 relative overflow-hidden text-white">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600 rounded-full blur-[150px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tighter uppercase italic">
            Ready to build <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">The Exceptional?</span>
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="px-12 py-6 bg-white text-neutral-900 rounded-full font-black text-lg hover:bg-blue-50 transition-all shadow-2xl"
          >
            Start Your Journey
          </motion.button>
        </div>
      </section>
    </div>
  )
}

export default About

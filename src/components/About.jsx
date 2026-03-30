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
    { year: '2024 March', event: 'Founded by Bonface Murimi with a vision to revolutionize digital ecosystems.' },
    { year: '2024 June', event: 'Expanded into specialized AI and automation solutions.' },
    { year: '2024 Sept', event: 'Reached a milestone of 50+ successful project deliveries.' },
    { year: '2025 Jan', event: 'Launched our proprietary design-to-code framework.' },
    { year: '2026', event: 'Setting the new global standard in digital craftsmanship.' }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-white text-neutral-950">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50 rounded-full blur-[160px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-[140px] translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-blue-600 transition-colors mb-16 group bg-neutral-50 px-6 py-2 rounded-full border border-neutral-100 shadow-sm"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-[10px] uppercase tracking-[0.2em]">Return to Home</span>
          </motion.button>

          <div className="max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600/5 border border-blue-600/10 rounded-full text-blue-600 text-[10px] font-black mb-10 tracking-[0.3em] uppercase"
            >
              <Sparkles size={14} className="animate-pulse" />
              Established March 2024
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-7xl md:text-9xl font-black mb-12 leading-[0.85] tracking-tighter uppercase italic"
            >
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">Architects</span> <br /> 
              of Digital.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-3xl text-neutral-500 leading-relaxed font-medium max-w-3xl mx-auto tracking-tight"
            >
              Founded by <span className="text-neutral-950 font-black italic">Bonface Murimi</span>, Iyonicorp is a precision engineering studio dedicated to building the infrastructure of the next era.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Bento Story Section */}
      <section className="py-32 bg-neutral-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Main Story Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-8 bg-white p-12 md:p-16 rounded-[48px] border border-neutral-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mb-8">Our DNA</div>
                <h2 className="text-4xl md:text-6xl font-black text-neutral-950 mb-10 leading-[0.9] tracking-tighter uppercase italic">
                  Beyond <br />
                  <span className="text-neutral-400">The Surface.</span>
                </h2>
                <div className="space-y-8 text-xl text-neutral-500 font-medium leading-relaxed max-w-2xl">
                  <p>
                    In March 2024, Iyonicorp emerged from a fundamental realization: the digital world was suffering from a deficit of depth. We didn't want to just build "more" software; we wanted to build software that lasts.
                  </p>
                  <p>
                    Bonface Murimi envisioned a studio where technical precision meets artistic audacity. A place where every line of code is treated as a foundational brick in a global ecosystem.
                  </p>
                </div>
              </div>
              <div className="mt-16 pt-8 border-t border-neutral-100 flex items-center gap-6">
                <div className="w-12 h-12 bg-neutral-950 rounded-2xl flex items-center justify-center text-white shadow-xl">
                  <Target size={24} />
                </div>
                <div>
                  <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Global Headquarters</div>
                  <div className="text-sm font-bold text-neutral-950">Silicon Valley Standards, Global Reach</div>
                </div>
              </div>
            </motion.div>

            {/* Side Metric Card */}
            <div className="lg:col-span-4 grid gap-8">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-blue-600 p-12 rounded-[48px] text-white flex flex-col justify-center shadow-2xl shadow-blue-500/20"
              >
                <div className="text-7xl font-black mb-2 tracking-tighter italic">2024</div>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80">Year Founded</div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-neutral-950 p-12 rounded-[48px] text-white flex flex-col justify-center"
              >
                <div className="text-5xl font-black mb-4 tracking-tighter italic">Bonface Murimi</div>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">Founder & CEO</div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Excellence Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {values.map((value, i) => {
              const Icon = value.icon
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group"
                >
                  <div className={`w-16 h-16 rounded-[24px] mb-8 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-sm border border-neutral-100 ${
                    value.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                    value.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                    value.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' :
                    'bg-amber-50 text-amber-600'
                  }`}>
                    <Icon size={28} />
                  </div>
                  <h4 className="text-2xl font-black text-neutral-950 mb-6 uppercase tracking-tighter italic">{value.title}</h4>
                  <p className="text-neutral-500 text-lg leading-relaxed font-medium">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-40 bg-white relative overflow-hidden border-t border-neutral-100">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100 rounded-full blur-[150px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-8xl font-black mb-12 leading-tight tracking-tighter uppercase italic">
              Ready to build <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">The Exceptional?</span>
            </h2>
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="px-16 py-8 bg-blue-600 text-white rounded-[32px] font-black text-xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/30 uppercase tracking-[0.2em]"
            >
              Start Your Journey
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About

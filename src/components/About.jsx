import { motion } from 'framer-motion'
import { Target, Award, Heart, ArrowLeft, CheckCircle, Shield, Briefcase, Sparkles, Users, Globe, Trophy } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const About = () => {
  const navigate = useNavigate()
  const values = [
    {
      icon: Target,
      title: 'Strategic Acquisition',
      description: 'We identify and acquire undervalued operational businesses with strong fundamentals. Each holding undergoes rigorous due diligence before entering our portfolio.',
      color: 'blue'
    },
    {
      icon: Shield,
      title: 'Institutional Integrity',
      description: 'Transparency, compliance, and fiduciary responsibility govern every acquisition. We maintain the highest standards of corporate governance across our portfolio.',
      color: 'indigo'
    },
    {
      icon: Award,
      title: 'Operational Excellence',
      description: 'Acquired businesses retain their local management teams while benefiting from centralized infrastructure, scaling capital, and institutional support.',
      color: 'amber'
    },
    {
      icon: Briefcase,
      title: 'Value Creation',
      description: 'We deploy strategic capital and operational expertise to unlock long-term value across our holdings, driving sustainable growth and profitability.',
      color: 'purple'
    },
  ]

  const milestones = [
    { year: '2024 Mar', event: 'Iyoni Corp established as corporate holding entity.' },
    { year: '2024 Jun', event: 'Completed first strategic business acquisition.' },
    { year: '2024 Sep', event: 'Expanded portfolio to 15 operational holdings across 3 sectors.' },
    { year: '2025 Jan', event: 'Launched institutional investor partnership program.' },
    { year: '2026', event: 'Managing a diversified portfolio of 70+ operational businesses.' }
  ]

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200">
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-neutral-950 text-neutral-200">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-400/5 rounded-full blur-[160px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-neutral-900 rounded-full blur-[140px] translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-neutral-500 hover:text-amber-400 transition-colors mb-16 group bg-neutral-900 px-6 py-2 rounded-full border border-neutral-800 shadow-sm"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-black text-[10px] uppercase tracking-[0.2em]">Return to Portfolio</span>
          </motion.button>

          <div className="max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900/50 border border-neutral-800 rounded-full text-amber-400 text-[10px] font-black mb-10 tracking-[0.3em] uppercase"
            >
              <Briefcase size={14} className="animate-pulse" />
              Portfolio Company Since 2024
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-7xl md:text-9xl font-black mb-12 leading-[0.85] tracking-tighter uppercase italic"
            >
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-neutral-300 to-neutral-200">Portfolio</span> <br /> 
              Managers.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-3xl text-neutral-400 leading-relaxed font-medium max-w-3xl mx-auto tracking-tight"
            >
              Founded by <span className="text-neutral-200 font-black italic">Bonface Murimi</span>, Iyoni Corp is a corporate holding company that acquires and operates turnkey businesses for institutional and private investors.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Bento Story Section */}
      <section className="py-32 bg-neutral-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Main Story Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-8 bg-neutral-900 p-12 md:p-16 rounded-[48px] border border-neutral-800 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="text-[10px] font-black text-amber-400 uppercase tracking-[0.4em] mb-8">Corporate Philosophy</div>
                <h2 className="text-4xl md:text-6xl font-black text-neutral-200 mb-10 leading-[0.9] tracking-tighter uppercase italic">
                  Beyond <br />
                  <span className="text-neutral-500">The Valuation.</span>
                </h2>
                <div className="space-y-8 text-xl text-neutral-400 font-medium leading-relaxed max-w-2xl">
                  <p>
                    In March 2024, Iyoni Corp was established with a fundamental vision: to create a diversified portfolio of fully-operational businesses available for institutional acquisition.
                  </p>
                  <p>
                    Bonface Murimi envisioned a holding company where rigorous business evaluation meets strategic capital deployment. Each operating company is selected for its revenue-generating potential, operational stability, and scalability prospects.
                  </p>
                </div>
              </div>
              <div className="mt-16 pt-8 border-t border-neutral-800 flex items-center gap-6">
                <div className="w-12 h-12 bg-neutral-950 rounded-2xl flex items-center justify-center text-amber-400 shadow-xl">
                  <Target size={24} />
                </div>
                <div>
                  <div className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Global Portfolio</div>
                  <div className="text-sm font-bold text-neutral-200">Institutional Standards, Global Reach</div>
                </div>
              </div>
            </motion.div>

            {/* Side Metric Card */}
            <div className="lg:col-span-4 grid gap-8">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-amber-400 p-12 rounded-[48px] text-neutral-950 flex flex-col justify-center shadow-2xl shadow-amber-400/20"
              >
                <div className="text-7xl font-black mb-2 tracking-tighter italic">2024</div>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80">Year Established</div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-neutral-900 p-12 rounded-[48px] text-neutral-200 flex flex-col justify-center border border-neutral-800"
              >
                <div className="text-5xl font-black mb-4 tracking-tighter italic">Bonface Murimi</div>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-400">Founder & CEO</div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Excellence Section */}
      <section className="py-32 bg-neutral-950">
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
                  <div className={`w-16 h-16 rounded-[24px] mb-8 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-sm border border-neutral-800 ${
                    value.color === 'blue' ? 'bg-amber-400/10 text-amber-400' :
                    value.color === 'purple' ? 'bg-amber-400/10 text-amber-400' :
                    value.color === 'indigo' ? 'bg-neutral-800 text-neutral-300' :
                    'bg-amber-400/10 text-amber-400'
                  }`}>
                    <Icon size={28} />
                  </div>
                  <h4 className="text-2xl font-black text-neutral-200 mb-6 uppercase tracking-tighter italic">{value.title}</h4>
                  <p className="text-neutral-400 text-lg leading-relaxed font-medium">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-32 bg-neutral-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-400/3 rounded-full blur-[160px] translate-y-1/2 translate-x-1/2" />
        
        <div className="max-w-4xl mx-auto px-6 relative">
          <h2 className="text-4xl md:text-6xl font-black text-neutral-200 mb-20 text-center uppercase italic tracking-tighter">
            Portfolio <span className="text-amber-400">Timeline</span>
          </h2>
          
          <div className="space-y-4">
            {milestones.map((milestone, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-neutral-900/50 border border-neutral-800 rounded-[24px] p-8 flex items-center gap-8 group hover:border-amber-400/30 transition-all"
              >
                <div className="w-20 h-20 bg-amber-400/10 border border-amber-400/20 rounded-2xl flex items-center justify-center text-amber-400 font-black text-xl">
                  {milestone.year}
                </div>
                <p className="text-neutral-300 font-medium">{milestone.event}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-40 bg-neutral-950 relative overflow-hidden border-t border-neutral-800">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-400/5 rounded-full blur-[150px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-8xl font-black mb-12 leading-tight tracking-tighter uppercase italic">
              Ready to <br />
              <span className="text-amber-400">Acquire?</span>
            </h2>
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="px-16 py-8 bg-amber-400 text-neutral-950 rounded-[32px] font-black text-xl hover:bg-amber-300 transition-all shadow-2xl shadow-amber-400/30 uppercase tracking-[0.2em]"
            >
              Request Acquisition Brief
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About

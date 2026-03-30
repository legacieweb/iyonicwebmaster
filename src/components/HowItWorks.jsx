import { motion } from 'framer-motion'
import { Lightbulb, Code, Sparkles, Zap, CheckCircle, Target, ArrowRight, Rocket } from 'lucide-react'

const HowItWorks = () => {
  const steps = [
    {
      title: 'Discovery',
      description: 'We dive deep into your brand, audience, and goals to build a solid strategic foundation.',
      icon: Lightbulb,
      color: 'blue'
    },
    {
      title: 'Planning',
      description: 'Mapping out the user journey and technical architecture with precision and foresight.',
      icon: Target,
      color: 'purple'
    },
    {
      title: 'Development',
      description: 'Bringing designs to life with clean, scalable code and agile development practices.',
      icon: Code,
      color: 'indigo'
    },
    {
      title: 'Launch',
      description: 'Meticulous testing and seamless deployment to ensure a perfect first impression.',
      icon: Rocket,
      color: 'emerald'
    }
  ]

  return (
    <section id="how-it-works" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-bold text-blue-600 tracking-wider uppercase mb-4"
          >
            The Process
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6"
          >
            How we bring <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">ideas to life</span>
          </motion.h2>
        </div>

        <div className="relative">
          {/* Connection Line (Desktop) */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-neutral-100 -translate-y-1/2 hidden lg:block" />

          <div className="grid lg:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className={`w-20 h-20 rounded-full bg-white border-4 border-neutral-50 shadow-xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-blue-50 transition-all duration-300 relative`}>
                    <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg ${
                      step.color === 'blue' ? 'bg-blue-600' :
                      step.color === 'purple' ? 'bg-purple-600' :
                      step.color === 'indigo' ? 'bg-indigo-600' :
                      'bg-emerald-600'
                    }`}>
                      0{index + 1}
                    </div>
                    <Icon size={32} className={`${
                      step.color === 'blue' ? 'text-blue-600' :
                      step.color === 'purple' ? 'text-purple-600' :
                      step.color === 'indigo' ? 'text-indigo-600' :
                      'text-emerald-600'
                    }`} />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-neutral-900">{step.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed max-w-[200px] mx-auto">
                    {step.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-[64px] blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-700" />
          <div className="relative bg-white border border-neutral-100 p-12 md:p-24 rounded-[64px] overflow-hidden flex flex-col items-center text-center shadow-xl">
            {/* Visual Accents */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10 max-w-3xl">
              <motion.div 
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center text-white mb-10 mx-auto shadow-2xl shadow-blue-500/20"
              >
                <Rocket size={40} />
              </motion.div>
              
              <h3 className="text-5xl md:text-7xl font-black text-neutral-950 mb-8 leading-[1.1] tracking-tight">
                Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 uppercase tracking-tighter">Ascend?</span>
              </h3>
              
              <p className="text-xl md:text-2xl text-neutral-500 mb-12 leading-relaxed font-medium">
                Join <span className="text-blue-600 font-bold">200+ global brands</span> who have scaled their digital impact through our precision-engineered process. Your transformation starts with a single click.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button className="group w-full sm:w-auto px-12 py-6 bg-blue-600 text-white rounded-full font-black text-xl hover:bg-blue-700 hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95">
                  Launch Your Project
                  <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform duration-300" />
                </button>
                <button className="w-full sm:w-auto px-12 py-6 bg-transparent border-2 border-neutral-200 text-neutral-900 rounded-full font-black text-xl hover:bg-neutral-50 hover:border-neutral-300 transition-all flex items-center justify-center gap-3 active:scale-95">
                  Explore Results
                </button>
              </div>

              <div className="mt-16 pt-16 border-t border-white/5 flex flex-wrap justify-center gap-12 grayscale opacity-30">
                <div className="text-2xl font-black tracking-tighter text-white">FORBES</div>
                <div className="text-2xl font-black tracking-tighter text-white">WIRED</div>
                <div className="text-2xl font-black tracking-tighter text-white">TECHCRUNCH</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HowItWorks

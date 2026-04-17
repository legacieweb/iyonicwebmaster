import { Lightbulb, Code, Layout, Rocket } from 'lucide-react'

const HowItWorks = () => {
  const steps = [
    {
      title: 'Consultation',
      description: 'We discuss your requirements, goals, and vision to understand the project scope.',
      icon: Lightbulb,
      color: 'blue'
    },
    {
      title: 'Design',
      description: 'We create wireframes and mockups based on your requirements and brand identity.',
      icon: Layout,
      color: 'purple'
    },
    {
      title: 'Development',
      description: 'We build your website with clean, scalable code using modern frameworks.',
      icon: Code,
      color: 'indigo'
    },
    {
      title: 'Launch',
      description: 'We deploy your website and ensure everything works perfectly.',
      icon: Rocket,
      color: 'emerald'
    }
  ]

  return (
    <section id="how-it-works" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="inline-block text-sm font-bold text-blue-600 tracking-wider uppercase mb-4">
            Web Development Process
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            How we build <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">websites</span>
          </h2>
        </div>

        <div className="relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-neutral-100 -translate-y-1/2 hidden lg:block" />

          <div className="grid lg:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center"
                >
                  <div className={`w-20 h-20 rounded-full bg-white border-4 border-neutral-50 shadow-xl flex items-center justify-center mb-8 relative`}>
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
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
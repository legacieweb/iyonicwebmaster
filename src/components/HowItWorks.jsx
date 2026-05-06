import { HOW_IT_WORKS_STEPS } from '../utils/constants'

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.05)_0%,transparent_50%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="inline-block text-sm font-bold text-blue-600 tracking-[0.3em] uppercase mb-4">
              The Blueprint
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-neutral-950 leading-none uppercase italic tracking-tighter">
              Web Development <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Process
              </span>
            </h2>
          </div>
          <p className="text-neutral-500 max-w-sm font-medium border-l-2 border-blue-600 pl-6 py-2">
            A precision-engineered methodology designed to scale your vision from concept to production.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {HOW_IT_WORKS_STEPS.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={index}
                className="group relative p-8 bg-neutral-50 rounded-[2.5rem] border border-neutral-100 hover:border-blue-500/30 hover:bg-white hover:shadow-2xl transition-all duration-500"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg ${
                    step.color === 'blue' ? 'bg-blue-600 text-white' :
                    step.color === 'purple' ? 'bg-purple-600 text-white' :
                    step.color === 'indigo' ? 'bg-indigo-600 text-white' :
                    'bg-emerald-600 text-white'
                  }`}>
                    <Icon size={28} />
                  </div>
                  <span className="text-4xl font-black text-neutral-200 group-hover:text-blue-500/10 transition-colors duration-500 italic">
                    0{index + 1}
                  </span>
                </div>
                
                <h3 className="text-xl font-black mb-4 text-neutral-900 uppercase tracking-tight">{step.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed font-medium">
                  {step.description}
                </p>

                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500 group-hover:w-full rounded-b-[2.5rem]" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
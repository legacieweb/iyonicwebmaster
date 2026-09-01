import { HOW_IT_WORKS_STEPS } from '../utils/constants'

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-neutral-950 overflow-hidden relative">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.05)_0%,transparent_50%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/50 border border-neutral-800 text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Acquisition Protocol
            </span>
            <h2 className="text-4xl md:text-6xl font-medium text-neutral-100 tracking-tight leading-[1.05]">
              Investment{' '}
              <span className="relative inline-block text-amber-400">
                Framework
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-400/40 rounded-full" />
              </span>
            </h2>
          </div>
          <p className="text-neutral-400 max-w-sm font-medium border-l-2 border-amber-400 pl-6 py-2">
            A systematic acquisition methodology designed to evaluate, structure, and execute business transfers with precision and transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {HOW_IT_WORKS_STEPS.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={index}
                className="group relative p-8 bg-neutral-900/50 border border-neutral-800 rounded-[2.5rem] hover:border-amber-400/30 hover:shadow-2xl transition-all duration-500"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg ${
                    step.color === 'blue' ? 'bg-amber-400 text-neutral-950' :
                    step.color === 'purple' ? 'bg-amber-400/20 text-amber-400' :
                    step.color === 'indigo' ? 'bg-neutral-800 text-amber-400' :
                    'bg-neutral-800 text-amber-400'
                  }`}>
                    <Icon size={28} />
                  </div>
                  <span className="text-4xl font-black text-neutral-500 group-hover:text-amber-400/10 transition-colors duration-500 italic">
                    0{index + 1}
                  </span>
                </div>
                
                <h3 className="text-xl font-black mb-4 text-neutral-200 uppercase tracking-tight">{step.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed font-medium">
                  {step.description}
                </p>

                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-amber-400 to-neutral-400 transition-all duration-500 group-hover:w-full rounded-b-[2.5rem]" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks

import { PARTNERSHIP_CONTENT, PARTNERSHIP_STEPS } from '../utils/constants'
import { ArrowRight, ShieldCheck, HeartHandshake, Briefcase } from 'lucide-react'

const Partnership = ({ onLearnMore }) => {
  return (
    <section id="partnership" className="py-24 md:py-40 bg-neutral-950 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 lg:gap-12 mb-20 lg:mb-32 border-b border-neutral-800 pb-16 lg:pb-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-amber-400 mb-6 lg:mb-10 font-black uppercase tracking-[0.3em] lg:tracking-[0.4em] text-[8px] lg:text-[10px]">
              <HeartHandshake size={14} className="md:w-4 md:h-4" />
              {PARTNERSHIP_CONTENT.subtitle}
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-neutral-100 tracking-tight leading-[1.05] mb-8 lg:mb-10">
              {PARTNERSHIP_CONTENT.title.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="relative inline-block text-amber-400">
                {PARTNERSHIP_CONTENT.title.split(' ').slice(-1)}
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-400/40 rounded-full" />
              </span>
            </h2>
            <p className="text-lg md:text-2xl text-neutral-400 font-medium leading-relaxed max-w-2xl">
              {PARTNERSHIP_CONTENT.description}
            </p>
          </div>
          <div className="flex flex-row lg:flex-col items-center gap-4 lg:gap-6">
            <div className="w-16 h-16 lg:w-24 lg:h-24 bg-amber-400 rounded-[24px] lg:rounded-[32px] flex items-center justify-center text-neutral-950 shadow-2xl shadow-amber-400/20">
              <ShieldCheck size={28} className="lg:w-[40px] lg:h-[40px]" />
            </div>
            <span className="text-[8px] lg:text-[10px] font-black uppercase tracking-[0.2em] lg:tracking-[0.3em] text-amber-400">Verified Partner</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-12 mb-20 lg:mb-32">
          {PARTNERSHIP_STEPS.map((step, i) => (
            <div
              key={i}
              className="group p-8 lg:p-12 bg-neutral-900 rounded-[32px] lg:rounded-[48px] border border-neutral-800 hover:bg-neutral-800/50 hover:border-amber-400/20 hover:shadow-2xl transition-all duration-700"
            >
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-neutral-800 rounded-2xl lg:rounded-3xl flex items-center justify-center text-amber-400 shadow-sm mb-8 lg:mb-10 group-hover:bg-amber-400 group-hover:text-neutral-950 transition-all duration-700">
                <step.icon size={24} className="lg:w-[28px] lg:h-[28px]" />
              </div>
              <h4 className="text-2xl lg:text-3xl font-black text-neutral-200 mb-4 lg:mb-6 tracking-tighter uppercase italic">{step.title}</h4>
              <p className="text-base lg:text-lg text-neutral-400 font-medium leading-relaxed mb-8 lg:mb-10">
                {step.description}
              </p>
              <div className="flex items-center gap-4 text-[8px] lg:text-[10px] font-black uppercase tracking-widest text-neutral-500 group-hover:text-amber-400 transition-colors">
                Benefit 0{i + 1} <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        <div className="relative bg-neutral-900 border border-neutral-800 shadow-xl rounded-[40px] lg:rounded-[64px] p-8 md:p-16 lg:p-24 overflow-hidden group text-center">
          <div className="absolute top-0 right-0 p-12 text-amber-400/5 group-hover:text-amber-400/10 transition-colors hidden md:block">
            <Briefcase size={240} />
          </div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-5xl lg:text-7xl font-medium text-neutral-100 leading-[1.05] mb-6 lg:mb-10 tracking-tight">
              Claim Your{' '}
              <span className="relative inline-block text-amber-400">
                Spot.
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-400/40 rounded-full" />
              </span>
            </h3>
            <p className="text-lg lg:text-xl text-neutral-400 font-medium leading-relaxed mb-8 lg:mb-12">
              Join the Iyoni Corp investor network today. Access our complete portfolio, institutional due diligence, and acquisition structuring support.
            </p>
            <button 
              onClick={onLearnMore}
              className="group w-full sm:w-auto px-8 lg:px-16 py-6 lg:py-8 bg-amber-400 text-neutral-950 rounded-[24px] lg:rounded-[32px] font-black text-[10px] lg:text-xs uppercase tracking-[0.2em] lg:tracking-[0.3em] hover:bg-amber-300 transition-all shadow-2xl inline-flex items-center justify-center gap-4 lg:gap-6"
            >
              Explore Partnership Details
              <ArrowRight size={18} className="lg:w-[20px] lg:h-[20px] group-hover:rotate-12 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Partnership

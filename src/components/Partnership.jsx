import { Sparkles, Zap, ArrowRight, Rocket, MousePointer2, ShieldCheck, HeartHandshake, Globe, Wallet, Clock, CreditCard } from 'lucide-react'

const Partnership = ({ onLearnMore }) => {
  const steps = [
    {
      icon: Rocket,
      title: 'Zero Upfront',
      description: 'We build your high-conversion storefront with zero initial investment. We only win when you win.',
      color: 'blue'
    },
    {
      icon: Zap,
      title: '30s Settlement',
      description: 'Get paid instantly. Sales are settled to your mobile money wallet within 30 seconds of purchase.',
      color: 'indigo'
    },
    {
      icon: HeartHandshake,
      title: '7% All-In',
      description: 'One flat fee covers everything: hosting, maintenance, transactions, and ongoing support.',
      color: 'purple'
    }
  ]

  return (
    <section id="partnership" className="py-24 md:py-40 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 lg:gap-12 mb-20 lg:mb-32 border-b border-neutral-100 pb-16 lg:pb-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-blue-600 mb-6 lg:mb-10 font-black uppercase tracking-[0.3em] lg:tracking-[0.4em] text-[8px] lg:text-[10px]">
              <HeartHandshake size={14} className="md:w-4 md:h-4" />
              E-commerce Alliance
            </div>
            <h2 className="text-5xl sm:text-7xl lg:text-9xl font-black text-neutral-950 mb-8 lg:mb-10 leading-[0.9] lg:leading-[0.85] tracking-tighter uppercase italic">
              The 7% <br />
              <span className="text-blue-600">Standard.</span>
            </h2>
            <p className="text-lg md:text-2xl text-neutral-500 font-medium leading-relaxed max-w-2xl">
              We've eliminated the barriers to digital commerce. No upfront costs, no maintenance fees—just a single 7% performance fee that settles in 30 seconds.
            </p>
          </div>
          <div className="flex flex-row lg:flex-col items-center gap-4 lg:gap-6">
            <div className="w-16 h-16 lg:w-24 lg:h-24 bg-blue-600 rounded-[24px] lg:rounded-[32px] flex items-center justify-center text-white shadow-2xl shadow-blue-500/20">
              <ShieldCheck size={28} className="lg:w-[40px] lg:h-[40px]" />
            </div>
            <span className="text-[8px] lg:text-[10px] font-black uppercase tracking-[0.2em] lg:tracking-[0.3em] text-blue-600">Verified Partnership</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-12 mb-20 lg:mb-32">
          {steps.map((step, i) => (
            <div
              key={i}
              className="group p-8 lg:p-12 bg-neutral-50 rounded-[32px] lg:rounded-[48px] border border-neutral-100 hover:bg-white hover:border-blue-600/20 hover:shadow-2xl transition-all duration-700"
            >
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white rounded-2xl lg:rounded-3xl flex items-center justify-center text-neutral-950 shadow-sm mb-8 lg:mb-10 group-hover:bg-blue-600 group-hover:text-white transition-all duration-700">
                <step.icon size={24} className="lg:w-[28px] lg:h-[28px]" />
              </div>
              <h4 className="text-2xl lg:text-3xl font-black text-neutral-950 mb-4 lg:mb-6 tracking-tighter uppercase italic">{step.title}</h4>
              <p className="text-base lg:text-lg text-neutral-500 font-medium leading-relaxed mb-8 lg:mb-10">
                {step.description}
              </p>
              <div className="flex items-center gap-4 text-[8px] lg:text-[10px] font-black uppercase tracking-widest text-neutral-400 group-hover:text-blue-600 transition-colors">
                Benefit 0{i + 1} <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        <div className="relative bg-white border border-neutral-100 shadow-xl rounded-[40px] lg:rounded-[64px] p-8 md:p-16 lg:p-24 overflow-hidden group text-center">
          <div className="absolute top-0 right-0 p-12 text-blue-600/5 group-hover:text-blue-600/10 transition-colors hidden md:block">
            <Rocket size={240} />
          </div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-5xl lg:text-7xl font-black text-neutral-950 mb-6 lg:mb-10 leading-tight tracking-tighter uppercase italic">
              Claim Your <span className="text-blue-600">Spot.</span>
            </h3>
            <p className="text-lg lg:text-xl text-neutral-500 font-medium leading-relaxed mb-8 lg:mb-12">
              Join the Iyonicorp E-commerce Alliance today. Get your premium store, instant payouts, and zero maintenance stress.
            </p>
            <button 
              onClick={onLearnMore}
              className="group w-full sm:w-auto px-8 lg:px-16 py-6 lg:py-8 bg-blue-600 text-white rounded-[24px] lg:rounded-[32px] font-black text-[10px] lg:text-xs uppercase tracking-[0.2em] lg:tracking-[0.3em] hover:bg-blue-700 transition-all shadow-2xl inline-flex items-center justify-center gap-4 lg:gap-6"
            >
              Explore Alliance Details
              <MousePointer2 size={18} className="lg:w-[20px] lg:h-[20px] group-hover:rotate-12 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Partnership
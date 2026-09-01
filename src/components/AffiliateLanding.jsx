import { motion } from 'framer-motion'
import { 
  Rocket, Zap, Shield, TrendingUp, Users, Wallet, 
  CheckCircle, ArrowRight, Globe, Star, Sparkles,
  PieChart, ShoppingBag, Percent
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const AffiliateLanding = ({ onJoinClick }) => {
  const { isAuthenticated } = useAuth()

  const benefits = [
    {
      icon: TrendingUp,
      title: "30% Acquisition Bonus",
      description: "Earn a massive 30% commission on every initial business or digital infrastructure sale through your link."
    },
    {
      icon: Zap,
      title: "10% Recurring Yield",
      description: "Get 10% monthly commission for the lifetime of every client's membership. Build true passive income."
    },
    {
      icon: Shield,
      title: "Client Advantage",
      description: "Your clients get 30% off their setup and 10% off memberships. It's a win-win deal they can't refuse."
    }
  ]

  const features = [
    {
      icon: PieChart,
      title: "Real-time Analytics",
      description: "Track every click, lead, and conversion with our advanced partner dashboard."
    },
    {
      icon: Wallet,
      title: "Automated Payouts",
      description: "Reliable treasury management with instant tracking of your available balance."
    },
    {
      icon: ShoppingBag,
      title: "Alliance Shop",
      description: "Generate custom deal links for specific services and business models."
    },
    {
      icon: Users,
      title: "Network Management",
      description: "Monitor your growing client network and their project statuses."
    }
  ]

  return (
    <div className="bg-neutral-950 min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full">
          <div className="absolute top-10 right-10 w-64 h-64 bg-amber-400/5 blur-[100px] rounded-full" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-400/5 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-800/50 border border-neutral-700 mb-8"
          >
            <Sparkles size={16} className="text-amber-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">The Alliance Program</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black text-neutral-900 mb-8 tracking-tight italic"
          >
            Scale Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-neutral-700">Influence.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-neutral-500 font-medium max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Partner with Iyonicorp to provide world-class digital infrastructure to your network while building a high-performance recurring revenue stream.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <button
              onClick={onJoinClick}
              className="px-12 py-6 bg-amber-400 text-neutral-950 rounded-[24px] font-black text-sm uppercase tracking-widest shadow-2xl shadow-amber-400/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3"
            >
              <Rocket size={18} />
              Become a Partner
            </button>
            <div className="flex items-center gap-3 px-8 py-6 rounded-[24px] border border-neutral-100 bg-neutral-50/50">
              <div className="flex -space-x-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-neutral-200" />
                ))}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Join 500+ Active Partners</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Commission Breakdown */}
      <section className="py-24 px-6 bg-neutral-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-amber-400/10 blur-[150px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-white mb-6 italic tracking-tight">The Commission Engine</h2>
            <p className="text-neutral-400 font-medium">Industry-leading yields for high-performance partners.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-10 rounded-[48px] bg-neutral-800/30 border border-neutral-700 hover:border-amber-400/50 transition-colors group"
              >
                <div className="w-16 h-16 rounded-2xl bg-neutral-800/50 text-amber-400 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <benefit.icon size={32} />
                </div>
                <h3 className="text-2xl font-black text-white mb-4 italic">{benefit.title}</h3>
                <p className="text-neutral-400 font-medium leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview / Features */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="text-[10px] font-black text-amber-400 uppercase tracking-[0.3em] mb-4">Command Center</div>
              <h2 className="text-5xl font-black text-neutral-900 mb-8 italic tracking-tight leading-tight">
                Full Control Over Your <br />
                <span className="text-amber-400">Digital Empire.</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-8">
                {features.map((feature, index) => (
                  <div key={index} className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-neutral-800/50 text-amber-400 flex items-center justify-center">
                      <feature.icon size={20} />
                    </div>
                    <h4 className="font-black text-neutral-900 text-sm uppercase tracking-widest">{feature.title}</h4>
                    <p className="text-neutral-500 text-sm font-medium leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/20 to-neutral-800/20 blur-[100px] rounded-[60px]" />
              <div className="relative bg-neutral-900 rounded-[48px] border border-neutral-800 shadow-2xl overflow-hidden aspect-[4/3] p-8">
                {/* Mock UI */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <div className="h-4 w-32 bg-neutral-100 rounded-full" />
                </div>
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="h-24 bg-neutral-800/50 rounded-3xl p-4">
                    <div className="h-2 w-12 bg-neutral-600 rounded-full mb-2" />
                    <div className="h-6 w-20 bg-amber-400 rounded-lg" />
                  </div>
                  <div className="h-24 bg-emerald-50 rounded-3xl p-4">
                    <div className="h-2 w-12 bg-emerald-200 rounded-full mb-2" />
                    <div className="h-6 w-20 bg-emerald-600 rounded-lg" />
                  </div>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center gap-4 p-4 border border-neutral-50 rounded-2xl">
                      <div className="w-10 h-10 rounded-xl bg-neutral-100" />
                      <div className="flex-1 space-y-2">
                        <div className="h-2 w-1/3 bg-neutral-200 rounded-full" />
                        <div className="h-2 w-1/2 bg-neutral-100 rounded-full" />
                      </div>
                      <div className="h-6 w-16 bg-neutral-800/50 rounded-lg" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-amber-500 text-neutral-950 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
           <div className="absolute top-0 right-0 w-96 h-96 bg-neutral-800/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-neutral-800/20 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-8 italic tracking-tight">Ready to activate your Alliance account?</h2>
           <p className="text-neutral-400 text-lg font-medium mb-12">
            Join the most rewarding partner ecosystem in the digital infrastructure space. Instant activation, no setup fees.
          </p>
          <button
            onClick={onJoinClick}
            className="px-12 py-6 bg-neutral-950 text-amber-400 rounded-[24px] font-black text-sm uppercase tracking-widest shadow-2xl border border-neutral-800 hover:scale-[1.05] active:scale-95 transition-all flex items-center gap-3 mx-auto"
          >
            Get Started Now
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  )
}

export default AffiliateLanding

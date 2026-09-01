import { motion } from 'framer-motion'
import { Cookie, Settings, BarChart, Bell, Zap, Info } from 'lucide-react'

const CookiePolicy = ({ onBack }) => {
  const sections = [
    {
      title: "Essential",
      icon: Zap,
      content: "Strictly necessary cookies that enable core functionality — authentication, security, and load balancing. These cannot be disabled without breaking the service."
    },
    {
      title: "Analytical",
      icon: BarChart,
      content: "Cookies that help us understand how visitors interact with our platform, so we can measure performance and improve the user experience."
    },
    {
      title: "Functional",
      icon: Settings,
      content: "These remember your preferences — such as language, region, or theme — to deliver a personalized experience across sessions."
    },
    {
      title: "Marketing",
      icon: Bell,
      content: "Cookies used by our advertising partners to build a profile of your interests and serve advertisements relevant to you."
    }
  ]

  return (
    <div className="pt-32 pb-24 min-h-screen bg-neutral-950 text-neutral-200">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 text-center"
        >
          <div className="w-20 h-20 bg-amber-400/10 rounded-[32px] flex items-center justify-center mx-auto mb-10 border border-neutral-800">
            <Cookie size={40} className="text-amber-400" />
          </div>
          <h1 className="text-5xl md:text-7xl font-medium text-neutral-100 tracking-tight leading-[1.05] mb-8">
            Cookie Policy<span className="text-amber-400">.</span>
          </h1>
          <p className="text-xl text-neutral-400 font-medium leading-relaxed max-w-2xl mx-auto">
            Last updated: August 29, 2026. How we use cookies and similar technologies to enhance your digital experience.
          </p>
        </motion.div>

        <div className="space-y-12">
          {sections.map((section, index) => {
            const Icon = section.icon
            return (
              <motion.section 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-10 bg-neutral-900/50 border border-neutral-800 rounded-[40px] group hover:border-amber-400/30 transition-all duration-500"
              >
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-12 h-12 bg-neutral-800/50 rounded-2xl flex items-center justify-center text-amber-400 group-hover:bg-amber-400 group-hover:text-neutral-950 transition-all duration-500 border border-neutral-700">
                    <Icon size={24} />
                  </div>
                  <h2 className="text-2xl font-black text-neutral-200 tracking-tight uppercase text-sm">{section.title}</h2>
                </div>
                <p className="text-lg text-neutral-400 font-medium leading-relaxed">
                  {section.content}
                </p>
              </motion.section>
            )
          })}

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-20 flex flex-col items-center text-center gap-12 bg-amber-400 p-16 rounded-[64px] text-white"
          >
            <div className="p-8 bg-white/10 rounded-3xl backdrop-blur-md">
              <Info className="text-white" size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-black mb-6 tracking-tight uppercase italic">Control Your Data.</h3>
              <p className="text-neutral-300 font-medium leading-relaxed max-w-md mb-10">
                You can manage your cookie preferences at any time through your browser settings or our built-in privacy tools.
              </p>
              <button className="px-12 py-6 bg-white text-neutral-950 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-neutral-50 transition-all shadow-2xl">
                Manage Preferences
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <p className="text-neutral-400 font-medium leading-relaxed">
              Questions about this Cookie Policy? Contact our Data Protection Officer at{' '}
              <strong className="text-neutral-200">privacy@iyonicorp.com</strong>.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default CookiePolicy

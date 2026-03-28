import { motion } from 'framer-motion'
import { Cookie, Settings, BarChart, Bell, Zap, Info } from 'lucide-react'

const CookiePolicy = ({ onBack }) => {
  const cookies = [
    {
      type: "Essential",
      icon: <Zap size={20} />,
      content: "These are necessary for the website to function. They can't be turned off."
    },
    {
      type: "Analytical",
      icon: <BarChart size={20} />,
      content: "These help us understand how visitors use our site, so we can improve it."
    },
    {
      type: "Functional",
      icon: <Settings size={20} />,
      content: "These remember your choices, like your language or region preferences."
    },
    {
      type: "Marketing",
      icon: <Bell size={20} />,
      content: "These are used to deliver advertisements more relevant to you."
    }
  ]

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-32 flex items-center gap-12 border-b border-neutral-100 pb-20"
        >
          <div className="w-32 h-32 bg-neutral-950 rounded-[48px] flex items-center justify-center flex-shrink-0 shadow-2xl">
            <Cookie className="text-white" size={64} />
          </div>
          <div>
            <h1 className="text-7xl font-black text-neutral-950 tracking-tighter mb-8 uppercase italic">
              Cookies<span className="text-blue-600">.</span>
            </h1>
            <p className="text-xl text-neutral-500 font-medium leading-relaxed max-w-2xl">
              Understanding how we use small data packets to enhance your digital experience.
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-32">
          {cookies.map((cookie, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="p-10 bg-neutral-50 rounded-[40px] border border-neutral-100 hover:shadow-2xl transition-all group"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-neutral-950 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                  {cookie.icon}
                </div>
                <h3 className="text-xl font-black text-neutral-950 uppercase italic tracking-widest text-xs">{cookie.type}</h3>
              </div>
              <p className="text-lg text-neutral-500 font-medium leading-relaxed font-bold tracking-tight">
                {cookie.content}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-blue-600 p-16 rounded-[64px] text-white flex flex-col lg:flex-row items-center justify-between gap-16 relative overflow-hidden"
        >
          <div className="absolute -top-10 -left-10 text-white/10">
            <Info size={200} />
          </div>
          <div className="max-w-xl relative z-10">
            <h2 className="text-4xl font-black mb-10 tracking-tighter uppercase italic">Control Your Data.</h2>
            <p className="text-blue-100 text-lg font-medium leading-relaxed mb-10">You can manage your cookie preferences at any time through your browser settings or our built-in privacy tools.</p>
          </div>
          <button className="px-12 py-6 bg-white text-neutral-950 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-neutral-50 transition-all shadow-2xl relative z-10">
            Manage Preferences
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default CookiePolicy

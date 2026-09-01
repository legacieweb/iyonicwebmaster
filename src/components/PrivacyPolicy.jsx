import { motion } from 'framer-motion'
import { Shield, Eye, Lock, Globe } from 'lucide-react'

const PrivacyPolicy = ({ onBack }) => {
  const sections = [
    {
      title: "Information Collection",
      icon: Eye,
      content: "We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support."
    },
    {
      title: "Data Security",
      icon: Lock,
      content: "We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or alteration."
    },
    {
      title: "Cookies & Tracking",
      icon: Globe,
      content: "We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content."
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
            <Shield size={40} className="text-amber-400" />
          </div>
          <h1 className="text-5xl md:text-7xl font-medium text-neutral-100 tracking-tight leading-[1.05] mb-8">
            Privacy Policy<span className="text-amber-400">.</span>
          </h1>
          <p className="text-xl text-neutral-400 font-medium leading-relaxed max-w-2xl mx-auto">
            Last updated: March 05, 2024. Your privacy is our priority. This document explains how we handle your data.
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
            className="mt-20"
          >
            <h3 className="text-2xl font-black text-neutral-200 mb-8 uppercase tracking-widest text-sm">Full Disclosure</h3>
            <p className="text-neutral-400 font-medium leading-relaxed mb-8">
              At Iyonicorp, we believe in radical transparency. We do not sell your personal data to third parties. We only share information with partners who help us provide our services, and only to the extent necessary.
            </p>
            <p className="text-neutral-400 font-medium leading-relaxed">
              If you have any questions about our privacy practices, please contact our Data Protection Officer at <strong className="text-neutral-200">privacy@iyonicorp.com</strong>.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy

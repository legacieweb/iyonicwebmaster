import { motion } from 'framer-motion'
import { Shield, Eye, Lock, Globe, Server, UserCheck } from 'lucide-react'

const PrivacyPolicy = ({ onBack }) => {
  const sections = [
    {
      title: "Information Collection",
      icon: <Eye size={24} />,
      content: "We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support."
    },
    {
      title: "Data Security",
      icon: <Lock size={24} />,
      content: "We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or alteration."
    },
    {
      title: "Cookies & Tracking",
      icon: <Globe size={24} />,
      content: "We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content."
    }
  ]

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 text-center"
        >
          <div className="w-20 h-20 bg-blue-600/10 rounded-[32px] flex items-center justify-center mx-auto mb-10">
            <Shield className="text-blue-600" size={40} />
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-neutral-950 tracking-tighter mb-8 uppercase italic">
            Privacy Policy<span className="text-blue-600">.</span>
          </h1>
          <p className="text-xl text-neutral-500 font-medium leading-relaxed max-w-2xl mx-auto">
            Last updated: March 05, 2024. Your privacy is our priority. This document explains how we handle your data.
          </p>
        </motion.div>

        <div className="space-y-12">
          {sections.map((section, index) => (
            <motion.section 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-10 bg-neutral-50 rounded-[40px] border border-neutral-100 group hover:border-blue-600/20 transition-all duration-500"
            >
              <div className="flex items-center gap-6 mb-8">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-neutral-950 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-black text-neutral-950 tracking-tight uppercase tracking-widest text-sm">{section.title}</h2>
              </div>
              <p className="text-lg text-neutral-500 font-medium leading-relaxed">
                {section.content}
              </p>
            </motion.section>
          ))}
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="prose prose-neutral max-w-none mt-20 p-10"
          >
            <h3 className="text-2xl font-black text-neutral-950 mb-8 uppercase italic tracking-widest text-sm">Full Disclosure</h3>
            <p className="text-neutral-500 font-medium leading-relaxed mb-8">
              At Iyonicorp, we believe in radical transparency. We do not sell your personal data to third parties. We only share information with partners who help us provide our services, and only to the extent necessary.
            </p>
            <p className="text-neutral-500 font-medium leading-relaxed">
              If you have any questions about our privacy practices, please contact our Data Protection Officer at <strong>privacy@iyonicorp.com</strong>.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy

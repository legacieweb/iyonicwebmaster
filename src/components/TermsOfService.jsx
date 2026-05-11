import { motion } from 'framer-motion'
import { FileText, CheckCircle, Scale, AlertTriangle, HelpCircle } from 'lucide-react'

const TermsOfService = ({ onBack }) => {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing or using Iyonicorp services, you agree to be bound by these Terms of Service and all applicable laws and regulations."
    },
    {
      title: "2. Service Usage",
      content: "You agree to use our services only for lawful purposes and in accordance with our community guidelines. Any misuse may result in account termination."
    },
    {
      title: "3. Intellectual Property",
      content: "All content, software, and technology used in our services are the property of Iyonicorp and are protected by international copyright laws."
    },
    {
      title: "4. Limitation of Liability",
      content: "Iyonicorp shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service."
    }
  ]

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white text-neutral-900">
      <div className="max-w-4xl mx-auto px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-32 text-center"
        >
          <div className="w-24 h-24 bg-neutral-950 rounded-[32px] flex items-center justify-center mx-auto mb-12 shadow-2xl">
            <FileText className="text-white" size={40} />
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-10 uppercase italic leading-[0.9]">
            Terms<span className="text-blue-600">.</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-500 font-medium leading-relaxed max-w-2xl mx-auto">
            The legal framework for our relationship. Please read carefully to understand your rights and obligations.
          </p>
        </motion.div>

        <div className="grid gap-12 md:gap-16">
          {sections.map((section, index) => (
            <motion.section 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative p-10 md:p-12 bg-neutral-50 rounded-[40px] md:rounded-[48px] border border-neutral-100 hover:shadow-xl transition-all group overflow-hidden"
            >
              <h2 className="text-sm font-black mb-6 tracking-[0.2em] text-neutral-950 uppercase italic">{section.title}</h2>
              <p className="text-lg text-neutral-500 font-medium leading-relaxed relative z-10">
                {section.content}
              </p>
              <div className="absolute top-12 right-12 text-neutral-200 opacity-20 group-hover:scale-110 transition-transform duration-700">
                <Scale size={64} />
              </div>
            </motion.section>
          ))}
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-20 flex flex-col items-center text-center gap-12 bg-blue-600 p-16 rounded-[64px] text-white"
          >
            <div className="p-8 bg-white/10 rounded-3xl backdrop-blur-md">
              <HelpCircle className="text-white" size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-black mb-6 tracking-tight uppercase italic tracking-widest text-sm">Have Questions?</h3>
              <p className="text-blue-100 font-medium leading-relaxed max-w-md">
                Our legal team is here to help you navigate these terms. Reach out to us at <strong className="text-white">legal@iyonicorp.com</strong>.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default TermsOfService

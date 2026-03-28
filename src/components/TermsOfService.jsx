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
    <div className="pt-32 pb-24 min-h-screen bg-neutral-950 text-white">
      <div className="max-w-4xl mx-auto px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-32 text-center"
        >
          <div className="w-24 h-24 bg-white/10 rounded-[40px] flex items-center justify-center mx-auto mb-12 border border-white/10">
            <FileText className="text-white" size={48} />
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-10 uppercase italic">
            Terms<span className="text-blue-600">.</span>
          </h1>
          <p className="text-xl text-neutral-400 font-medium leading-relaxed max-w-2xl mx-auto">
            The legal framework for our relationship. Please read carefully to understand your rights and obligations.
          </p>
        </motion.div>

        <div className="grid gap-16">
          {sections.map((section, index) => (
            <motion.section 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative p-12 bg-white/5 rounded-[48px] border border-white/5 hover:bg-white/10 transition-colors"
            >
              <h2 className="text-2xl font-black mb-6 tracking-tight text-white uppercase italic tracking-[0.2em] text-sm">{section.title}</h2>
              <p className="text-lg text-neutral-400 font-medium leading-relaxed">
                {section.content}
              </p>
              <div className="absolute top-12 right-12 text-white/5">
                <Scale size={64} />
              </div>
            </motion.section>
          ))}
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-20 flex flex-col items-center text-center gap-12"
          >
            <div className="p-8 bg-blue-600 rounded-[32px] shadow-[0_20px_40px_rgba(37,99,235,0.2)]">
              <HelpCircle className="text-white" size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-black mb-6 tracking-tight uppercase italic tracking-widest text-sm">Have Questions?</h3>
              <p className="text-neutral-400 font-medium leading-relaxed max-w-md">
                Our legal team is here to help you navigate these terms. Reach out to us at <strong>legal@iyonicorp.com</strong>.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default TermsOfService

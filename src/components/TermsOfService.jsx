import { motion } from 'framer-motion'
import { FileText, CheckCircle, Scale, AlertTriangle, Shield, Globe, HelpCircle } from 'lucide-react'

const TermsOfService = ({ onBack }) => {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      icon: Scale,
      content: "By accessing or using Iyonicorp services, you agree to be bound by these Terms of Service and all applicable laws and regulations."
    },
    {
      title: "2. Service Usage",
      icon: CheckCircle,
      content: "You agree to use our services only for lawful purposes and in accordance with our policies. Misuse may result in account suspension or termination."
    },
    {
      title: "3. Intellectual Property",
      icon: Shield,
      content: "All content, software, and technology provided through Iyonicorp platforms remain the exclusive property of Iyonicorp and are protected by international copyright laws."
    },
    {
      title: "4. Limitation of Liability",
      icon: AlertTriangle,
      content: "Iyonicorp shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the service, except where liability cannot be excluded under applicable law."
    },
    {
      title: "5. Term & Termination",
      icon: Globe,
      content: "These Terms remain in effect until terminated. We may suspend or terminate access without liability if you breach these Terms or engage in prohibited conduct."
    },
    {
      title: "6. Governing Law",
      icon: Scale,
      content: "These Terms are governed by the laws of the jurisdiction in which Iyonicorp operates, without regard to conflict of law principles."
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
            <FileText size={40} className="text-amber-400" />
          </div>
          <h1 className="text-5xl md:text-7xl font-medium text-neutral-100 tracking-tight leading-[1.05] mb-8">
            Terms of Service<span className="text-amber-400">.</span>
          </h1>
          <p className="text-xl text-neutral-400 font-medium leading-relaxed max-w-2xl mx-auto">
            Last updated: August 29, 2026. The legal framework for our relationship. Read carefully to understand your rights and obligations.
          </p>
        </motion.div>

        <div className="space-y-12">
          {sections.map((section, index) => {
            const Icon = section.icon
            return (
              <motion.section 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative p-10 md:p-12 bg-neutral-900/50 border border-neutral-800 rounded-[40px] md:rounded-[48px] group hover:border-amber-400/30 transition-all duration-500 overflow-hidden"
              >
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-12 h-12 bg-neutral-800/50 rounded-2xl flex items-center justify-center text-amber-400 group-hover:bg-amber-400 group-hover:text-neutral-950 transition-all duration-500 border border-neutral-700">
                    <Icon size={24} />
                  </div>
                  <h2 className="text-2xl font-black text-neutral-200 tracking-tight uppercase text-sm">{section.title}</h2>
                </div>
                <p className="text-lg text-neutral-400 font-medium leading-relaxed relative z-10">
                  {section.content}
                </p>
              </motion.section>
            )
          })}

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-20 flex flex-col items-center text-center gap-12 bg-amber-400 p-16 rounded-[64px] text-white"
          >
            <div className="p-8 bg-white/10 rounded-3xl backdrop-blur-md">
              <HelpCircle className="text-white" size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-black mb-6 tracking-tight uppercase italic">Have Questions?</h3>
              <p className="text-neutral-300 font-medium leading-relaxed max-w-md">
                Our legal team is here to help you navigate these terms. Reach out to us at{' '}
                <strong className="text-white">legal@iyonicorp.com</strong>.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default TermsOfService

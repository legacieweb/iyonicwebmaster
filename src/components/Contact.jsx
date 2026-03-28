import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react'
import { submitLead } from '../utils/api'

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email us',
      value: 'hello@iyonicorp.com',
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      icon: Phone,
      label: 'Call us',
      value: '+1 (555) 000-0000',
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      icon: MapPin,
      label: 'Visit us',
      value: 'San Francisco, CA',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSubmitStatus(null)

    try {
      await submitLead(formData)
      setSubmitStatus({ type: 'success', message: 'Message sent successfully!' })
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-sm font-bold text-blue-600 tracking-wider uppercase mb-4">
              Get in Touch
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-8 leading-tight">
              Let's build something <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">exceptional</span> together
            </h2>
            <p className="text-lg text-neutral-500 mb-12 leading-relaxed max-w-lg">
              Have a vision? We have the expertise to bring it to life. Reach out and let's start a conversation about your next big project.
            </p>

            <div className="space-y-8">
              {contactInfo.map((info, i) => {
                const Icon = info.icon
                return (
                  <div key={i} className="flex items-center gap-6 group">
                    <div className={`w-14 h-14 rounded-2xl ${info.bg} ${info.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-1">{info.label}</div>
                      <div className="text-xl font-bold text-neutral-900">{info.value}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-neutral-50 p-8 md:p-12 rounded-[40px] border border-neutral-100">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-neutral-900 px-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 bg-white border border-neutral-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-600 transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-neutral-900 px-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 bg-white border border-neutral-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-600 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-neutral-900 px-1">Your Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-6 py-4 bg-white border border-neutral-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-600 transition-all resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <AnimatePresence>
                  {submitStatus && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-2xl flex items-center gap-3 ${
                        submitStatus.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {submitStatus.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                      <span className="text-sm font-bold">{submitStatus.message}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 bg-neutral-900 text-white rounded-2xl font-bold hover:bg-neutral-800 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50 group"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                  {!loading && <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                </button>
              </form>
            </div>
            
            {/* Decorative background circle */}
            <div className="absolute -z-10 -bottom-10 -right-10 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact

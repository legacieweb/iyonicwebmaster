import { useState } from 'react'
import { CONTACT_CONTENT, CONTACT_INFO } from '../utils/constants'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { submitLead } from '../utils/api'

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

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
    <section id="contact" className="py-24 bg-neutral-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/50 border border-neutral-800 text-[10px] font-black text-neutral-400 uppercase tracking-wider mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              {CONTACT_CONTENT.subtitle}
            </span>
            <h2 className="text-4xl md:text-5xl font-medium text-neutral-100 tracking-tight leading-[1.05] mb-8">
              {CONTACT_CONTENT.title.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="relative inline-block text-amber-400">
                {CONTACT_CONTENT.title.split(' ').slice(-1)}
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-400/40 rounded-full" />
              </span>
            </h2>
            <p className="text-lg text-neutral-400 mb-12 leading-relaxed max-w-lg">
              {CONTACT_CONTENT.description}
            </p>

            <div className="space-y-8">
              {CONTACT_INFO.map((info, i) => {
                const Icon = info.icon
                return (
                  <div key={i} className="flex items-center gap-6 group">
                    <div className={`w-14 h-14 rounded-2xl ${info.bg} ${info.color} flex items-center justify-center group-hover:scale-110 transition-transform border border-neutral-700`}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <div className="text-sm font-black text-neutral-500 uppercase tracking-widest mb-1">{info.label}</div>
                      <div className="text-xl font-black text-neutral-200">{info.value}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="relative">
            <div className="bg-neutral-900/50 p-8 md:p-12 rounded-[40px] border border-neutral-800">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-black text-neutral-400 px-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 bg-neutral-950 border border-neutral-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-400/5 focus:border-amber-400 transition-all text-neutral-200 placeholder-neutral-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black text-neutral-400 px-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 bg-neutral-950 border border-neutral-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-400/5 focus:border-amber-400 transition-all text-neutral-200 placeholder-neutral-500"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-black text-neutral-400 px-1">Your Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-6 py-4 bg-neutral-950 border border-neutral-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-400/5 focus:border-amber-400 transition-all text-neutral-200 placeholder-neutral-500 resize-none"
                    placeholder="Describe your acquisition interest, target sector, or investment parameters..."
                  />
                </div>

                {submitStatus && (
                  <div
                    className={`p-4 rounded-2xl flex items-center gap-3 ${
                      submitStatus.type === 'success' ? 'bg-amber-50/10 text-amber-400 border border-amber-400/20' : 'bg-rose-50/10 text-rose-400 border border-rose-400/20'
                    }`}
                  >
                    {submitStatus.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                    <span className="text-sm font-black">{submitStatus.message}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 bg-amber-400 text-neutral-950 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-amber-300 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50 group shadow-xl shadow-amber-400/20"
                >
                  {loading ? 'Sending...' : 'Request Acquisition Brief'}
                  {!loading && <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                </button>
              </form>
            </div>
            
            <div className="absolute -z-10 -bottom-10 -right-10 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl opacity-50" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact

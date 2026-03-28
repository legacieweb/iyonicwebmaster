import { Linkedin, Twitter, Mail, ArrowRight, Instagram, Sparkles, MapPin, Phone, CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { submitLead } from '../utils/api'

const TikTokIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
  </svg>
)

const YoutubeIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
    <path d="m10 15 5-3-5-3"/>
  </svg>
)

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email) return
    
    setIsSubmitting(true)
    try {
      await submitLead({
        name: 'Newsletter Subscriber',
        email: email,
        message: 'NEW MARKETING LIST SUBSCRIPTION'
      })
      setIsSuccess(true)
      setEmail('')
      setTimeout(() => setIsSuccess(false), 5000)
    } catch (error) {
      console.error('Subscription error:', error)
      alert('Failed to subscribe. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/iyonicorp', label: 'Twitter' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/iyonicorp', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/iyonicorp', label: 'Instagram' },
    { icon: TikTokIcon, href: 'https://www.tiktok.com/@iyonicorp', label: 'TikTok' },
    { icon: YoutubeIcon, href: 'https://www.youtube.com/@iyonicorp', label: 'YouTube' },
  ]

  const footerSections = [
    {
      title: 'Studio',
      links: [
        { name: 'About Us', id: 'about' },
        { name: 'Process', id: 'how-it-works' },
        { name: 'Careers', id: 'careers' },
      ]
    },
    {
      title: 'Expertise',
      links: [
        { name: 'Web Development', id: 'services' },
        { name: 'Mobile Apps', id: 'services' },
        { name: 'AI Solutions', id: 'services' },
        { name: 'Digital Strategy', id: 'services' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', id: 'blog' },
        { name: 'Case Studies', id: 'case-studies' },
        { name: 'Documentation', id: 'documentation' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', id: 'privacy-policy' },
        { name: 'Terms of Service', id: 'terms-of-service' },
        { name: 'Cookie Policy', id: 'cookie-policy' },
      ]
    }
  ]

  const handleLinkClick = (e, id) => {
    e.preventDefault()
    
    if (['how-it-works', 'services', 'pricing'].includes(id)) {
      if (location.pathname === '/') {
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        // Navigate to home with state instead of hash in URL
        navigate('/', { state: { scrollTo: id } })
      }
    } else {
      navigate(`/${id}`)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-neutral-950 text-neutral-400 pt-32 pb-16 overflow-hidden relative border-t border-white/5">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 mb-24">
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 mb-10 cursor-pointer group"
              onClick={() => navigate('/')}
            >
              <div className="w-14 h-14 flex items-center justify-center transform -rotate-6 transition-transform group-hover:rotate-0 duration-500">
                <img src="https://i.imgur.com/CBdKlA5.png" alt="Iyonicorp Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-3xl font-black text-white tracking-tighter group-hover:text-blue-500 transition-colors">Iyonicorp</span>
            </motion.div>
            
            <p className="text-xl text-neutral-500 mb-12 max-w-md leading-relaxed font-medium">
              We transform ambitious ideas into exceptional digital experiences through code, design, and innovation.
            </p>

            <div className="flex gap-4">
              {socialLinks.map((link, index) => {
                const Icon = link.icon
                return (
                  <motion.a
                    whileHover={{ y: -5, scale: 1.1 }}
                    key={index}
                    href={link.href}
                    className="w-14 h-14 bg-white/5 hover:bg-white/10 text-white rounded-2xl flex items-center justify-center transition-all border border-white/5"
                    title={link.label}
                  >
                    <Icon size={22} />
                  </motion.a>
                )
              })}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white/5 p-10 md:p-16 rounded-[48px] border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-white/10 group-hover:text-blue-500/20 transition-colors">
                <Sparkles size={120} />
              </div>
              <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Join the Inner Circle.</h3>
              <p className="text-neutral-400 mb-10 text-lg font-medium">Unlock exclusive digital insights and engineering breakthroughs.</p>
              
              <div className="relative max-w-md">
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-4 p-6 bg-blue-600/20 border border-blue-500/30 rounded-3xl text-blue-400 font-black text-xs uppercase tracking-widest"
                    >
                      <CheckCircle2 size={24} className="text-blue-500" />
                      Vision received. Welcome aboard.
                    </motion.div>
                  ) : (
                    <motion.form 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col sm:flex-row gap-4" 
                      onSubmit={handleSubscribe}
                    >
                      <div className="relative flex-1">
                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-600" size={18} />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="w-full pl-16 pr-6 py-6 bg-white/5 border border-white/10 rounded-3xl text-white placeholder-neutral-600 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm font-bold shadow-inner"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-10 py-6 bg-white text-neutral-950 rounded-3xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-500 hover:text-white transition-all flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(255,255,255,0.05)] active:scale-95 disabled:opacity-50"
                      >
                        {isSubmitting ? 'Syncing...' : 'Join Now'}
                        <ArrowRight size={16} />
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-24">
          {footerSections.map((section, i) => (
            <div key={i}>
              <h4 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-10 opacity-50">{section.title}</h4>
              <ul className="space-y-6">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <a 
                      href="#" 
                      onClick={(e) => handleLinkClick(e, link.id)}
                      className="text-sm font-bold hover:text-white transition-all hover:translate-x-2 inline-block text-neutral-500"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          <div className="col-span-2 lg:col-span-1">
            <h4 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-10 opacity-50">Headquarters</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-blue-500 flex-shrink-0 group-hover:bg-blue-500/20 transition-colors">
                  <MapPin size={18} />
                </div>
                <p className="text-sm font-bold text-neutral-500 leading-relaxed">
                  123 Design Tower,<br />San Francisco, CA 94103
                </p>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-purple-500 flex-shrink-0 group-hover:bg-purple-500/20 transition-colors">
                  <Mail size={18} />
                </div>
                <p className="text-sm font-bold text-neutral-500">hello@iyonicorp.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <p className="text-xs font-black text-neutral-700 uppercase tracking-[0.2em]">
            © {currentYear} Iyonicorp. Defined by Innovation.
          </p>
          <div className="flex items-center gap-8">
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              <span className="text-[10px] font-black text-neutral-600 uppercase tracking-widest">Systems Operational</span>
            </div>
            <div className="h-4 w-[1px] bg-white/10" />
            <span className="text-[10px] font-black text-neutral-600 uppercase tracking-widest">Built with precision</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

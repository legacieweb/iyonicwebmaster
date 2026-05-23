import { Linkedin, Twitter, Mail, ArrowRight, Instagram, Sparkles, MapPin, CheckCircle2, Youtube, Facebook, Music } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { submitLead } from '../utils/api'

const PinterestIcon = ({ size = 18, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
  </svg>
)

const TikTokIcon = ({ size = 18, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M12.525.02c1.31 0 2.591.21 3.793.627.085.03.17.07.25.114.05.025.1.056.145.088.761.543 1.375 1.25 1.787 2.083.411.834.618 1.756.618 2.73 0 .044-.002.088-.005.132.062.003.123.004.185.004 1.231 0 2.403-.311 3.428-.86.13-.07.258-.145.38-.23.23-.16.447-.336.65-.526.04-.037.082-.073.122-.11.085-.078.167-.16.247-.245l.044-.047c.105-.114.204-.233.298-.356.13-.17.25-.347.362-.53.1-.16.19-.328.27-.502.043-.095.083-.19.12-.289.04-.112.077-.225.109-.34.03-.11.058-.222.08-.336.023-.113.041-.227.054-.342.01-.1.02-.2.025-.3.003-.04.004-.082.004-.123V0h-3.376v.117c0 .16-.013.318-.038.473-.04.24-.117.472-.228.69-.112.217-.258.42-.435.6-.176.182-.38.338-.6.467-.184.108-.383.195-.59.26-.247.078-.507.118-.776.118-.088 0-.175-.004-.262-.012l-.168-.024V0h-3.52v17.474c0 .354-.035.7-.104 1.033-.06.29-.16.57-.294.832-.136.262-.313.5-.525.711-.212.213-.454.39-.72.531-.264.14-.549.245-.845.312-.338.077-.69.117-1.051.117-.36 0-.71-.04-1.047-.117-.296-.067-.581-.172-.846-.312-.266-.14-.508-.318-.72-.531-.212-.212-.389-.45-.525-.711a4.673 4.673 0 0 1-.398-1.865c0-.354.035-.701.104-1.034.06-.29.16-.569.294-.832.136-.261.313-.499.525-.71.212-.213.454-.39.72-.531.265-.14.55-.245.846-.312.337-.077.687-.117 1.047-.117.26 0 .515.02.763.06.31.05.607.15.886.302.138.075.27.164.394.266.112.09.215.191.309.298l.044.053c.125.146.236.304.331.472.014.025.027.05.04.076.126.24.221.498.283.77.037.16.06.327.07.497.007.111.011.223.011.336h3.52V0h-3.52z"/>
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
    } finally {
      setIsSubmitting(false)
    }
  }

  const footerSections = [
    {
      title: 'Navigation',
      links: [
        { name: 'Blueprints', id: 'catalog' },
        { name: 'Process', id: 'how-it-works' },
        { name: 'Pricing', id: 'pricing' },
        { name: 'Partnership', id: 'partnership' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', id: 'about' },
        { name: 'Blog', id: 'blog' },
        { name: 'Careers', id: 'careers' },
        { name: 'Case Studies', id: 'case-studies' },
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
    if (['catalog', 'pricing', 'partnership', 'how-it-works'].includes(id)) {
      if (location.pathname === '/') {
        const element = document.getElementById(id)
        if (element) element.scrollIntoView({ behavior: 'smooth' })
      } else {
        navigate('/', { state: { scrollTo: id } })
      }
    } else {
      navigate(`/${id}`)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <footer className="relative bg-[#fafafa] pt-32 pb-12 overflow-hidden border-t border-neutral-200/60">
      {/* Background Grand Text */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none select-none overflow-hidden opacity-[0.02]">
        <h2 className="text-[20vw] font-black italic tracking-tighter leading-none -ml-4">IYONICORP</h2>
      </div>

      <div className="container-minimal relative z-10 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-32">
          
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center gap-4 mb-10 cursor-pointer group"
              onClick={() => navigate('/')}
            >
              <img src="https://i.imgur.com/6nGQFtj.png" alt="Logo" className="w-12 h-12 grayscale group-hover:grayscale-0 transition-all duration-500" />
              <span className="text-3xl font-black italic tracking-tighter text-neutral-950 uppercase">Iyonicorp</span>
            </motion.div>
            
            <p className="text-xl text-neutral-500 mb-12 max-w-md leading-tight font-medium">
              We architect high-performance digital infrastructure for innovators who demand <span className="text-neutral-900">precision and scale</span>.
            </p>

            <div className="flex gap-4">
              {[
                { icon: Twitter, href: 'https://twitter.com/iyonicorp' },
                { icon: Linkedin, href: 'https://www.linkedin.com/company/iyonicorp' },
                { icon: Facebook, href: 'https://facebook.com/iyonicweb' },
                { icon: TikTokIcon, href: 'https://tiktok.com/@iyonicorp' },
                { icon: PinterestIcon, href: 'https://pinterest.com/iyonicorp' },
                { icon: Youtube, href: 'https://youtube.com/@iyonicorp' }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4 }}
                  className="w-12 h-12 bg-white border border-neutral-200 rounded-xl flex items-center justify-center text-neutral-400 hover:text-neutral-950 hover:border-neutral-950 transition-all shadow-sm"
                >
                  <social.icon size={18} strokeWidth={2.5} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-7">
            <div className="relative p-10 md:p-14 bg-white border border-neutral-200 rounded-[40px] shadow-2xl shadow-neutral-200/50 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 mb-6 text-blue-600">
                  <Sparkles size={16} />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Stay Synchronized</span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-black italic tracking-tighter text-neutral-950 mb-4 uppercase">Join the Inner Circle</h3>
                <p className="text-neutral-500 mb-10 text-lg font-medium">Get exclusive engineering breakthroughs and digital insights.</p>
                
                {isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-4 p-6 bg-emerald-50 border border-emerald-500/10 rounded-2xl text-emerald-600 font-bold"
                  >
                    <CheckCircle2 size={24} />
                    Welcome aboard. Vision received.
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="flex-1 px-8 py-5 bg-neutral-50 border border-neutral-200 rounded-2xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-950 transition-all font-bold text-sm"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-10 py-5 bg-neutral-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-neutral-950/20 disabled:opacity-50 flex items-center justify-center gap-3"
                    >
                      {isSubmitting ? 'Syncing...' : 'Join Now'}
                      <ArrowRight size={16} />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-32">
          {footerSections.map((section, i) => (
            <div key={i}>
              <h4 className="text-[10px] font-black text-neutral-950 uppercase tracking-[0.4em] mb-10 opacity-30">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <a 
                      href="#" 
                      onClick={(e) => handleLinkClick(e, link.id)}
                      className="text-sm font-bold text-neutral-500 hover:text-neutral-950 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-[10px] font-black text-neutral-950 uppercase tracking-[0.4em] mb-10 opacity-30">Location</h4>
            <div className="flex items-start gap-4">
              <div className="mt-1 text-neutral-950">
                <MapPin size={16} />
              </div>
              <p className="text-sm font-bold text-neutral-500 leading-relaxed">
                Nairobi Central Business District,<br />Kenya
              </p>
            </div>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="text-[10px] font-black text-neutral-950 uppercase tracking-[0.4em] mb-10 opacity-30">Contact</h4>
            <div className="flex items-center gap-4">
              <div className="text-neutral-950">
                <Mail size={16} />
              </div>
              <p className="text-sm font-bold text-neutral-500">hello@iyonicorp.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-neutral-200/60 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em]">
            © {currentYear} Iyonicorp. All Rights Reserved.
          </p>
          
          <div className="flex items-center gap-8 text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em]">
            <a href="#" onClick={(e) => handleLinkClick(e, 'privacy-policy')} className="hover:text-neutral-950 transition-colors">Privacy</a>
            <a href="#" onClick={(e) => handleLinkClick(e, 'terms-of-service')} className="hover:text-neutral-950 transition-colors">Terms</a>
            <div className="flex items-center gap-2 text-emerald-500">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              Systems Online
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

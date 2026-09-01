import { Linkedin, Twitter, Mail, ArrowRight, Instagram, Sparkles, MapPin, CheckCircle2, Youtube, Facebook, Music, Zap, Users } from 'lucide-react'
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
    <path d="M12.525.02c1.31 0 2.591.21 3.793.627.085.03.17.07.25.114.05.025.1.056.145.088.761.543 1.375 1.25 1.787 2.083.411.834.618 1.756.618 2.73 0 .044-.002.088-.005.132.062.003.123.004.185.004 1.231 0 2.403-.311 3.428-.86.13-.07.258-.145.38-.23.23-.16.447-.336.65-.526.04-.037.082-.073.122-.11.085-.078.167-.16.247-.245l.044-.047c.105-.114.204-.233.298-.356.13-.17.25-.347.362-.53.1-.16.19-.328.27-.502.043-.095.083-.19.12-.289.04-.112.077-.225.109-.34.03-.11.058-.222.08-.336.023-.113.041-.227.054-.342.01-.1.02-.2.025-.3.003-.04.004-.082.004-.123V0h-3.376v.117c0 .16-.013.318-.038.473-.04.24-.117.472-.228.69-.112.217-.258.42-.435.6-.176.182-.38.338-.6.467-.184.108-.383.195-.59.26-.247.078-.507.118-.776.118-.088 0-.175-.004-.262-.012l-.168-.024V0h-3.52v17.474c0 .354-.035.7-.104 1.033-.06.29-.16.57-.294.832-.136.262-.313.5-.525.711-.212.213-.454.39-.72.531-.264.14-.549.245-.845.312-.338.077-.69.117-1.051.117-.36 0-.71-.04-1.047-.117-.296-.067-.581-.172-.846-.312-.266-.14-.508-.318-.72-.531-.212-.212-.389-.45-.525-.711a4.673 4.673 0 0 1-.398-1.865c0-.354.035-.701.104-1.034.06-.29.16-.569.294-.832.136-.261.313-.499.525-.71.212-.213.454-.39.72-.531.265-.14.55-.245.846-.312.337-.077.687-.117 1.047-.117.26 0 .515.02 763.06.06.31.05.607.15.886.302.138.075.27.164.394.266.112.09.215.191.309.298l.044.053c.125.146.236.304.331.472.014.025.027.05.04.076.126.24.221.498.283.77.037.16.06.327.07.497.007.111.011.223.011.336h3.52V0h-3.52z"/>
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
        name: 'Iyoni Corp Updates Subscriber',
        email: email,
        message: 'IYONI CORP NEWSLETTER SUBSCRIPTION'
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
      title: 'Businesses',
      links: [
        { name: 'Digital Businesses', id: 'businesses' },
        { name: 'Business Sectors', id: 'iyonicweb' },
      ]
    },
    {
      title: 'Products',
      links: [
        { name: 'IyonicWeb', id: 'iyonicweb' },
        { name: 'IyonicPay', id: 'iyonicpay' },
        { name: 'IyonicBots', id: 'iyonicbots' },
        { name: 'Technology Ecosystem', id: 'tech-ecosystem' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Iyoni Corp', id: 'about' },
        { name: 'Case Studies', id: 'case-studies' },
        { name: 'Leadership', id: 'leadership' },
        { name: 'Careers', id: 'careers' },
      ]
    },
    {
      title: 'Account',
      links: [
        { name: 'Dashboard', id: 'dashboard' },
        { name: 'Affiliate Program', id: 'affiliate' },
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
    if (['businesses', 'iyonicweb', 'iyonicpay', 'iyonicbots', 'how-iyoni-builds', 'tech-ecosystem', 'contact', 'about', 'leadership', 'careers', 'case-studies'].includes(id)) {
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
    <footer className="bg-neutral-950 text-neutral-300 border-t border-neutral-800">
      <div className="container-minimal px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/50 border border-neutral-800 text-[10px] font-black text-neutral-400 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Live Portfolio
          </span>
        </motion.div>

        {/* Top CTA Row: Affiliate + Newsletter (Corporate Theme) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="text-xl font-black text-neutral-200">Partner Program</h3>
                <p className="text-sm text-neutral-500 mt-2 max-w-md">Refer entrepreneurs to IyonicWeb and earn recurring revenue.</p>
              </div>

              <div>
                <button
                  onClick={() => navigate('/affiliate')}
                  className="inline-flex items-center gap-3 px-5 py-2 rounded-lg bg-amber-400 text-neutral-950 text-sm font-black hover:bg-amber-300 transition shadow-xl shadow-amber-400/20"
                >
                  Become a Partner
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800"
          >
            <h3 className="text-xl font-black text-neutral-200">Updates</h3>
            <p className="text-sm text-neutral-500 mt-2 mb-4">Product news, business launches, and platform updates.</p>

            {isSuccess ? (
              <div className="inline-flex items-center gap-3 p-3 rounded-lg bg-amber-50/10 text-amber-400 font-black">
                <CheckCircle2 size={18} />
                Subscribed — thank you!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <label htmlFor="footer-email" className="sr-only">Email</label>
                <input
                  id="footer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="flex-1 px-4 py-3 border border-neutral-700 rounded-lg bg-neutral-950 text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-3 rounded-lg bg-neutral-800 text-neutral-200 text-sm font-black hover:bg-neutral-700 disabled:opacity-60 border border-neutral-700"
                >
                  {isSubmitting ? 'Sending...' : 'Subscribe'}
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Main footer grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-12">
              <div className="lg:col-span-4">
            <div className="flex items-center gap-4 mb-6 cursor-pointer" onClick={() => navigate('/') }>
              <img src="corplogo.PNG" alt="Iyoni Corp logo" className="w-12 h-12" />
              <div>
                <div className="text-lg font-black text-neutral-200">Iyoni Corp</div>
                <div className="text-xs text-neutral-500 uppercase tracking-wide">Digital Businesses &amp; Technology</div>
              </div>
            </div>

            <p className="text-sm text-neutral-500 mb-6 max-w-sm">Iyoni Corp creates digital businesses and technology products that help entrepreneurs build, operate, and grow online.</p>

            <div className="flex gap-3">
              {[
                { icon: Twitter, href: 'https://twitter.com/iyonicorp', label: 'Twitter' },
                { icon: Linkedin, href: 'https://www.linkedin.com/company/iyonicorp', label: 'LinkedIn' },
                { icon: Facebook, href: 'https://facebook.com/iyonicweb', label: 'Facebook' },
                { icon: TikTokIcon, href: 'https://tiktok.com/@iyonicorp', label: 'TikTok' },
                { icon: PinterestIcon, href: 'https://pinterest.com/iyonicorp', label: 'Pinterest' },
                { icon: Youtube, href: 'https://youtube.com/@iyonicorp', label: 'YouTube' }
              ].map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="w-9 h-9 flex items-center justify-center border border-neutral-800 rounded-md text-neutral-500 hover:text-amber-400 hover:border-amber-400/30 hover:bg-neutral-800 transition">
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerSections.map((section, i) => (
              <div key={i}>
                <h4 className="text-xs font-black text-neutral-500 uppercase tracking-wide mb-4">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" onClick={(e) => handleLinkClick(e, link.id)} className="text-sm text-neutral-400 hover:text-amber-400 transition">{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact / Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pb-8 border-b border-neutral-800 mb-8">
          <div className="flex items-start gap-4">
            <div className="mt-1 text-neutral-500"><MapPin size={18} /></div>
            <div>
              <div className="text-xs font-black text-neutral-500 uppercase mb-1">Location</div>
              <div className="text-sm text-neutral-400">Nairobi Central, Business District, Kenya</div>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="mt-1 text-neutral-500"><Mail size={18} /></div>
            <div>
              <div className="text-xs font-black text-neutral-500 uppercase mb-1">Email</div>
              <a href="mailto:hello@iyonicorp.com" className="text-sm text-neutral-400 hover:text-amber-400">hello@iyonicorp.com</a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6">
          <div className="text-xs text-neutral-500">© {currentYear} Iyoni Corp. All rights reserved.</div>
          <div className="flex gap-4 text-xs">
            <a href="#" onClick={(e) => handleLinkClick(e, 'privacy-policy')} className="text-neutral-500 hover:text-amber-400">Privacy</a>
            <a href="#" onClick={(e) => handleLinkClick(e, 'terms-of-service')} className="text-neutral-500 hover:text-amber-400">Terms</a>
            <a href="#" onClick={(e) => handleLinkClick(e, 'cookie-policy')} className="text-neutral-500 hover:text-amber-400">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

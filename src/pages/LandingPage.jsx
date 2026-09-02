import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Hero from '../components/Hero'
import ThreePaths from '../components/ThreePaths'
import IyoniBusinesses from '../components/IyoniBusinesses'
import IyonicWebSection from '../components/IyonicWebSection'
import IyonicPaySection from '../components/IyonicPaySection'
import IyonicBotsSection from '../components/IyonicBotsSection'
import HowIyoniBuilds from '../components/HowIyoniBuilds'
import TechEcosystem from '../components/TechEcosystem'
import WhyChooseUs from '../components/WhyChooseUs'
import FinalCTA from '../components/FinalCTA'
import Contact from '../components/Contact'

const LandingPage = () => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const targetId = location.state?.scrollTo || (location.hash ? location.hash.substring(1) : null)
    if (targetId) {
      const el = document.getElementById(targetId)
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' })
          if (!location.hash) {
            navigate('/', { replace: true, state: {} })
          }
        }, 100)
      }
    }
  }, [location.hash, location.state, navigate])

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200">
      <Hero
        onExploreBusinesses={() => {
          const el = document.getElementById('businesses')
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }}
        onExploreIyonicWeb={() => {
          window.open('https://web.iyonicorp.com', '_blank')
        }}
      />
      <ThreePaths />
      <IyoniBusinesses />
      <IyonicWebSection />
      <IyonicPaySection />
      <IyonicBotsSection />
      <HowIyoniBuilds />
      <TechEcosystem />
      <WhyChooseUs />
      <FinalCTA
        onExploreBusinesses={() => {
          const el = document.getElementById('businesses')
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }}
        onStartIyonicWeb={() => {
          window.open('https://web.iyonicorp.com', '_blank')
        }}
      />
      <Contact />
    </div>
  )
}

export default LandingPage

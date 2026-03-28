import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Services from '../components/Services'
import HowItWorks from '../components/HowItWorks'
import Partnership from '../components/Partnership'
import WhyChooseUs from '../components/WhyChooseUs'
import Pricing from '../components/Pricing'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import ShopRight from '../components/ShopRight'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { SERVICES, PRICING_DATA } from '../utils/constants'

const LandingPage = ({ onLoginClick }) => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Scroll to target if provided in state or hash
    const targetId = location.state?.scrollTo || (location.hash ? location.hash.substring(1) : null)
    
    if (targetId) {
      const el = document.getElementById(targetId)
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' })
          // Clean up the URL: remove hash and clear state to prevent scrolling again on back/refresh
          const cleanPath = location.pathname === '/' ? '/' : location.pathname
          navigate(cleanPath, { replace: true, state: {} })
        }, 100)
      }
    }
  }, [location.hash, location.state, navigate, location.pathname])

  const handleViewChange = (view, data = null) => {
    if (view === 'service-detail' && data) {
      navigate(`/services/${data}`)
    } else if (view === 'partnership-detail') {
      navigate('/partnership')
    } else if (view === 'catalog' && data) {
      if (typeof data === 'object') {
        navigate('/catalog', { state: { plan: data } })
      } else {
        navigate(`/catalog/${data}`)
      }
    } else if (view === 'shopright-details') {
      navigate('/shopright')
    } else {
      navigate(`/${view}`)
    }
  }

  const { isAuthenticated, toggleAuthModal } = useAuth()

  const handlePlanClick = (plan) => {
    if (isAuthenticated) {
      navigate('/dashboard', { state: { tab: 'membership' } })
    } else {
      // If not logged in, show login modal first or go to catalog
      toggleAuthModal('signup')
      // Optional: Save plan in localStorage to redirect after login
      localStorage.setItem('pending_membership', plan.id)
    }
  }

  return (
    <>
      <Hero onGetStarted={() => {
        const el = document.getElementById('services')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }} onSignUp={() => onLoginClick('signup')} />
      <Services onServiceClick={(serviceId) => navigate(`/services/${serviceId}`)} />
      <HowItWorks />
      <Partnership onLearnMore={() => navigate('/partnership')} />
      <WhyChooseUs />
      <Pricing 
        onPlanClick={handlePlanClick}
      />
      <ShopRight onViewDetails={() => navigate('/shopright')} />
      <Contact />
    </>
  )
}

export default LandingPage

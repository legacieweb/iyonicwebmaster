import { useEffect, useState } from 'react'
import { HashRouter as Router, Routes, Route, Navigate, Outlet, useLocation, useParams, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AuthModal from './components/AuthModal'
import ScrollToTop from './components/ScrollToTop'
import { checkAPIStatus, saveProject, saveOrder } from './utils/api'
import { useAuth } from './contexts/AuthContext'

// Pages
import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'
import AdminPage from './pages/AdminPage'

// Lazy load or import other views as components for now to keep it simple
import About from './components/About'
import PartnershipDetail from './components/PartnershipDetail'
import ShopRightDetails from './components/ShopRightDetails'
import ServiceDetail from './components/ServiceDetail'
import ServiceCatalog from './components/ServiceCatalog'
import DesignPreview from './components/DesignPreview'
import WebsiteEditor from './components/WebsiteEditor'
import WebBuilder from './components/WebBuilder'
import Store from './components/Store'
import DeployedTemplates from './components/DeployedTemplates'
import TemplateViewer from './components/TemplateViewer'
import Blog from './components/Blog'
import CaseStudies from './components/CaseStudies'
import Documentation from './components/Documentation'
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsOfService from './components/TermsOfService'
import CookiePolicy from './components/CookiePolicy'
import Careers from './components/Careers'
import { SERVICES, PRICING_DATA } from './utils/constants'

// Layout for pages with Navbar and Footer
const MainLayout = ({ onLoginClick }) => {
  const { isAuthenticated, isAdmin } = useAuth()
  const location = useLocation()
  
  // Hide navbar/footer on specific routes if needed
  const hideNavFooter = ['/builder', '/edit-project', '/view-template'].some(path => location.pathname.startsWith(path))

  return (
    <>
      {!hideNavFooter && (
        <Navbar 
          onLoginClick={onLoginClick} 
          onDashboardClick={() => {}} // Handled by routing now
        />
      )}
      <main>
        <Outlet />
      </main>
      {!hideNavFooter && <Footer onPageChange={() => {}} />}
    </>
  )
}

function App() {
  const [apiOnline, setApiOnline] = useState(true)
  const [checked, setChecked] = useState(false)
  const { isAuthModalOpen, authModalMode, toggleAuthModal, closeAuthModal } = useAuth()

  useEffect(() => {
    const checkStatus = async () => {
      const status = await checkAPIStatus()
      setApiOnline(status)
      setChecked(true)
    }

    checkStatus()
    const interval = setInterval(checkStatus, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Router>
      <AppContent 
        isAuthModalOpen={isAuthModalOpen}
        authModalMode={authModalMode}
        toggleAuthModal={toggleAuthModal}
        closeAuthModal={closeAuthModal}
      />
    </Router>
  )
}

function AppContent({ isAuthModalOpen, authModalMode, toggleAuthModal, closeAuthModal }) {
  const { isAuthenticated, currentUser } = useAuth()
  const navigate = useNavigate()

  // Handle pending selection or redirects after login
  useEffect(() => {
    if (isAuthenticated && currentUser) {
      // 1. Check for explicit auth redirect (e.g. from Partner Now)
      const authRedirect = localStorage.getItem('auth_redirect')
      if (authRedirect) {
        try {
          const { path, state } = JSON.parse(authRedirect)
          localStorage.removeItem('auth_redirect')
          navigate(path, { state })
          return
        } catch (e) {
          localStorage.removeItem('auth_redirect')
        }
      }

      // 2. Handle pending selection
      const pendingSelection = localStorage.getItem('pending_selection')
      if (pendingSelection) {
        localStorage.removeItem('pending_selection')
        navigate('/dashboard')
      }
    }
  }, [isAuthenticated, currentUser, navigate])

  return (
    <div className="bg-white text-gray-900 overflow-hidden">
      <ScrollToTop />
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={closeAuthModal} 
        initialMode={authModalMode}
      />

      <Routes>
        {/* Routes WITH Navbar and Footer */}
        <Route element={<MainLayout onLoginClick={(mode) => toggleAuthModal(mode)} />}>
          <Route path="/" element={<LandingPage onLoginClick={(mode) => toggleAuthModal(mode)} />} />
          <Route path="/about" element={<About onBack={() => {}} />} />
          <Route path="/partnership" element={<PartnershipDetail onBack={() => {}} />} />
          <Route path="/shopright" element={<ShopRightDetails onBack={() => {}} />} />
          <Route path="/blog" element={<Blog onBack={() => {}} />} />
          <Route path="/case-studies" element={<CaseStudies onBack={() => {}} />} />
          <Route path="/documentation" element={<Documentation onBack={() => {}} />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy onBack={() => {}} />} />
          <Route path="/terms-of-service" element={<TermsOfService onBack={() => {}} />} />
          <Route path="/cookie-policy" element={<CookiePolicy onBack={() => {}} />} />
          <Route path="/careers" element={<Careers onBack={() => {}} />} />
          
          {/* Dynamic Routes */}
          <Route path="/services/:serviceId" element={<ServiceDetailWrapper />} />
          <Route path="/catalog/:serviceId" element={<ServiceCatalogWrapper />} />
          <Route path="/catalog" element={<ServiceCatalogWrapper />} />
        </Route>

        {/* Routes WITHOUT standard Navbar/Footer (handled internally) */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/store" element={<Store onBack={() => {}} />} />
        <Route path="/deployed-templates" element={<DeployedTemplates onBack={() => {}} />} />
        
        {/* Specialized views */}
        <Route path="/edit-project" element={<WebsiteEditorWrapper />} />
        <Route path="/builder/:templateId" element={<WebBuilderWrapper />} />
        <Route path="/view-template" element={<TemplateViewerWrapper />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

// Wrappers to handle params from URL
const ServiceDetailWrapper = () => {
  const { serviceId } = useParams()
  const navigate = useNavigate()
  
  // Web Development is now the homepage
  if (serviceId === 'web-development') return <Navigate to="/" replace />
  
  const service = SERVICES.find(s => s.id === serviceId)
  if (!service) return <Navigate to="/" replace />
  return (
    <ServiceDetail 
      service={service} 
      pricingPlans={PRICING_DATA[serviceId] || []} 
      onBack={() => navigate(-1)} 
      onViewCatalog={(plan) => navigate(`/catalog/${serviceId}`, { state: { plan } })}
    />
  )
}

const ServiceCatalogWrapper = () => {
  const { serviceId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [plan, setPlan] = useState(() => {
    const saved = sessionStorage.getItem('current_plan')
    return location.state?.plan || (saved ? JSON.parse(saved) : null)
  })

  useEffect(() => {
    if (location.state?.plan) {
      sessionStorage.setItem('current_plan', JSON.stringify(location.state.plan))
      setPlan(location.state.plan)
    }
  }, [location.state?.plan])

  return (
    <ServiceCatalog 
      serviceId={plan?.name || serviceId} 
      onBack={() => navigate(-1)} 
      onPreview={(template) => navigate('/view-template', { state: { template } })}
    />
  )
}

const WebsiteEditorWrapper = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [project, setProject] = useState(() => {
    const saved = sessionStorage.getItem('current_project')
    return location.state?.project || (saved ? JSON.parse(saved) : null)
  })

  useEffect(() => {
    if (location.state?.project) {
      sessionStorage.setItem('current_project', JSON.stringify(location.state.project))
      setProject(location.state.project)
    }
  }, [location.state?.project])

  if (!project) return <Navigate to="/dashboard" replace />
  return <WebsiteEditor website={project} onBack={() => navigate('/dashboard')} />
}

const WebBuilderWrapper = () => {
  const { templateId } = useParams()
  const navigate = useNavigate()
  return <WebBuilder templateId={templateId} onBack={() => navigate(-1)} />
}

const TemplateViewerWrapper = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [template, setTemplate] = useState(() => {
    // Prioritize location state if navigating directly, then fallback to localStorage
    if (location.state?.template) return location.state.template
    const saved = localStorage.getItem('current_template')
    return saved ? JSON.parse(saved) : null
  })

  useEffect(() => {
    if (location.state?.template) {
      localStorage.setItem('current_template', JSON.stringify(location.state.template))
      setTemplate(location.state.template)
    } else if (!template) {
      // If no state and no template in state, check localStorage again
      const saved = localStorage.getItem('current_template')
      if (saved) setTemplate(JSON.parse(saved))
    }
  }, [location.state?.template, template])

  if (!template) return <Navigate to="/deployed-templates" replace />
  return <TemplateViewer template={template} onBack={() => navigate(-1)} />
}

// Helper imports for wrappers
// (Removed as they are at the top)

export default App

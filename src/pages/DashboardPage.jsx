import { useNavigate, useLocation } from 'react-router-dom'
import UserDashboard from '../components/UserDashboard'
import { useAuth } from '../contexts/AuthContext'
import { useEffect } from 'react'

const DashboardPage = () => {
  const navigate = useNavigate()
  const { isAuthenticated, isAdmin, isLoading } = useAuth()
  const location = useLocation()
  
  const dashboardTab = location.state?.tab || 'overview'
  const dashboardServiceId = location.state?.serviceId || null

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        navigate('/')
      } else if (isAdmin) {
        navigate('/admin')
      }
    }
  }, [isAuthenticated, isAdmin, isLoading, navigate])

  const handleBack = (view) => {
    if (view === 'landing' || view === false) {
      navigate('/')
    } else {
      navigate(`/${view}`)
    }
  }

  const handleEditProject = (project) => {
    navigate('/edit-project', { state: { project } })
  }

  const handleSelectTemplate = (serviceId) => {
    navigate(`/services/${serviceId || 'web-development'}`)
  }

  if (isLoading || !isAuthenticated || isAdmin) return null

  return (
    <UserDashboard 
      initialTab={dashboardTab}
      initialServiceId={dashboardServiceId}
      onBack={handleBack}
      onSelectTemplate={handleSelectTemplate}
      onEditProject={handleEditProject}
    />
  )
}

export default DashboardPage

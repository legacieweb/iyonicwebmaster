import { useNavigate } from 'react-router-dom'
import AdminPanel from '../components/AdminPanel'
import { useAuth } from '../contexts/AuthContext'
import { useEffect } from 'react'

const AdminPage = () => {
  const navigate = useNavigate()
  const { isAuthenticated, isAdmin, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        navigate('/')
      } else if (!isAdmin) {
        navigate('/dashboard')
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

  if (isLoading || !isAuthenticated || !isAdmin) return null

  return (
    <AdminPanel onBack={handleBack} />
  )
}

export default AdminPage

import { useNavigate } from 'react-router-dom'
import AffiliateDashboard from '../components/AffiliateDashboard'
import AffiliateLanding from '../components/AffiliateLanding'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useAuth } from '../contexts/AuthContext'
import { useEffect, useState } from 'react'
import { fetchAffiliateStatus, signupAffiliate } from '../utils/api'
import { RefreshCw } from 'lucide-react'

const AffiliatePage = () => {
  const navigate = useNavigate()
  const { isAuthenticated, isLoading, toggleAuthModal, currentUser } = useAuth()
  const [isAffiliate, setIsAffiliate] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)
  const [joining, setJoining] = useState(false)

  const checkStatus = async () => {
    if (isAuthenticated) {
      try {
        const res = await fetchAffiliateStatus()
        setIsAffiliate(res.isAffiliate)
        
        // Auto-join if pending
        if (!res.isAffiliate && localStorage.getItem('pending_affiliate_join') === 'true') {
          handleJoin()
        } else {
          localStorage.removeItem('pending_affiliate_join')
        }
      } catch (err) {
        console.error('Status check failed:', err)
      }
    }
    setCheckingStatus(false)
  }

  useEffect(() => {
    checkStatus()
  }, [isAuthenticated])

  const handleJoin = async () => {
    if (!isAuthenticated) {
      localStorage.setItem('pending_affiliate_join', 'true')
      toggleAuthModal('signup')
      return
    }

    try {
      setJoining(true)
      await signupAffiliate()
      setIsAffiliate(true)
      localStorage.removeItem('pending_affiliate_join')
    } catch (err) {
      console.error('Failed to join affiliate program:', err)
    } finally {
      setJoining(false)
    }
  }

  if (isLoading || checkingStatus || joining) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
          <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
            {joining ? 'Initializing Alliance Account...' : 'Authenticating...'}
          </p>
        </div>
      </div>
    )
  }

  if (isAuthenticated && isAffiliate) {
    return (
      <AffiliateDashboard 
        onBack={() => navigate('/dashboard')} 
      />
    )
  }

  return (
    <>
      <Navbar onLoginClick={(mode) => toggleAuthModal(mode)} />
      <AffiliateLanding onJoinClick={handleJoin} />
      <Footer onPageChange={() => {}} />
    </>
  )
}

export default AffiliatePage

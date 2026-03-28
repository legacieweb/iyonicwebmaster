import { createContext, useContext, useState, useEffect } from 'react'
import { login as apiLogin, signup as apiSignup, fetchUserProfile } from '../utils/api'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authModalMode, setAuthModalMode] = useState('login')

  const toggleAuthModal = (mode = 'login') => {
    setAuthModalMode(mode)
    setIsAuthModalOpen(true)
  }

  const closeAuthModal = () => setIsAuthModalOpen(false)

  useEffect(() => {
    const storedUser = localStorage.getItem('iyonicorp_user')
    const storedToken = localStorage.getItem('iyonicorp_token')
    
    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setCurrentUser({
          ...parsedUser,
          token: storedToken,
        })
        
        // Immediately trigger a background refresh to get live data
        // Skip for mock admin since they aren't in the database
        const adminEmail = import.meta.env.VITE_ADMIN_EMAIL
        if (parsedUser.email !== adminEmail) {
          fetchUserProfile(parsedUser.id).then(updatedUser => {
            if (updatedUser.suspended) {
              logout()
              return
            }
            const userData = {
              ...updatedUser,
              name: updatedUser.first_name ? `${updatedUser.first_name} ${updatedUser.last_name}` : updatedUser.email.split('@')[0],
              membership_tier: updatedUser.membership_tier || null,
              unlocked_tools: updatedUser.unlocked_tools || [],
              activated_tools: updatedUser.activated_tools || [],
            }
            localStorage.setItem('iyonicorp_user', JSON.stringify(userData))
            setCurrentUser(prev => ({
              ...prev,
              ...userData
            }))
          }).catch(err => {
            console.error('Background user refresh failed:', err)
            if (err.response?.status === 401 || err.response?.status === 404) {
              logout()
            }
          })
        }
      } catch (err) {
        localStorage.removeItem('iyonicorp_user')
        localStorage.removeItem('iyonicorp_token')
      }
    }
    setIsLoading(false)

    // Set up a periodic check for account status (every 2 minutes)
    const statusCheckInterval = setInterval(() => {
      const storedUser = localStorage.getItem('iyonicorp_user')
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser)
          // Skip for mock admin
          if (user.email !== import.meta.env.VITE_ADMIN_EMAIL) {
            refreshUser().catch(err => {
              console.error('Periodic status check failed:', err)
            })
          }
        } catch (e) {
          // Ignore
        }
      }
    }, 120000)

    return () => clearInterval(statusCheckInterval)
  }, [])

  const refreshUser = async () => {
    if (!currentUser?.id) return null
    // Skip for mock admin
    if (currentUser.email === import.meta.env.VITE_ADMIN_EMAIL) return currentUser
    try {
      const updatedUser = await fetchUserProfile(currentUser.id)
      
      if (updatedUser.suspended) {
        logout()
        return null
      }

      const userData = {
        ...updatedUser,
        name: updatedUser.first_name ? `${updatedUser.first_name} ${updatedUser.last_name}` : updatedUser.email.split('@')[0],
        membership_tier: updatedUser.membership_tier || null,
        unlocked_tools: updatedUser.unlocked_tools || [],
        activated_tools: updatedUser.activated_tools || [],
      }
      
      localStorage.setItem('iyonicorp_user', JSON.stringify(userData))
      setCurrentUser(prev => ({
        ...prev,
        ...userData
      }))
      return userData
    } catch (err) {
      console.error('Failed to refresh user data:', err)
      if (err.response?.status === 401 || err.response?.status === 404) {
        logout()
      }
      throw err
    }
  }

  const login = async (email, password) => {
    try {
      setError(null)
      setIsLoading(true)
      
      // Admin check from .env
      const adminEmail = import.meta.env.VITE_ADMIN_EMAIL
      const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD

      if (email?.toLowerCase() === adminEmail?.toLowerCase() && password === adminPassword) {
        const userData = {
          id: 'admin-id',
          email: adminEmail,
          first_name: 'Admin',
          last_name: 'User',
          membership_tier: 'admin',
          name: 'Admin User',
        }
        const token = 'admin-mock-token'
        
        localStorage.setItem('iyonicorp_token', token)
        localStorage.setItem('iyonicorp_user', JSON.stringify(userData))
        
        setCurrentUser({
          ...userData,
          token,
        })
        
        return { success: true, isAdmin: true, user: userData, token }
      }
      
      const data = await apiLogin(email, password)

      if (data.user.suspended) {
        return { success: false, error: 'Account suspended' }
      }

      const userData = {
        id: data.user.id,
        email: data.user.email,
        first_name: data.user.first_name,
        last_name: data.user.last_name,
        phone_number: data.user.phone_number,
        membership_tier: data.user.membership_tier || null,
        unlocked_tools: data.user.unlocked_tools || [],
        activated_tools: data.user.activated_tools || [],
        name: data.user.first_name ? `${data.user.first_name} ${data.user.last_name}` : email.split('@')[0],
      }

      localStorage.setItem('iyonicorp_token', data.token)
      localStorage.setItem('iyonicorp_user', JSON.stringify(userData))

      setCurrentUser({
        ...userData,
        token: data.token,
      })

      return { success: true, user: userData, token: data.token }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Login failed'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (email, password, firstName, lastName, phoneNumber) => {
    try {
      setError(null)
      setIsLoading(true)

      const userDataInput = {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
      }

      await apiSignup(userDataInput)
      
      // Auto-login after successful signup to get the token
      return await login(email, password)
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Sign-up failed'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('iyonicorp_user')
    localStorage.removeItem('iyonicorp_token')
    setCurrentUser(null)
    setError(null)
  }

  const isAdmin = currentUser?.email === import.meta.env.VITE_ADMIN_EMAIL

  const value = {
    currentUser,
    isLoading,
    error,
    login,
    signup,
    logout,
    isAdmin,
    isAuthenticated: !!currentUser,
    refreshUser,
    isAuthModalOpen,
    authModalMode,
    toggleAuthModal,
    closeAuthModal,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

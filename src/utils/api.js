import axios from 'axios'

export const API_BASE_URL = import.meta.env.PROD 
  ? 'https://iyonicwebmaster.onrender.com'
  : ''

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

const getAuthHeader = () => {
  const token = localStorage.getItem('iyonicorp_token')
  if (token) {
    return { Authorization: `Bearer ${token}` }
  }
  return {}
}

export const fetchProjects = async () => {
  try {
    const response = await apiClient.get('/api/projects')
    return response.data || []
  } catch (error) {
    console.error('Error fetching projects:', error)
    return null
  }
}

export const submitLead = async (data) => {
  try {
    const response = await apiClient.post('/api/leads', {
      name: data.name,
      email: data.email,
      message: data.message,
    })
    return response.data
  } catch (error) {
    console.error('Error submitting lead:', error)
    throw error
  }
}

export const checkAPIStatus = async () => {
  try {
    const response = await apiClient.get('/api/projects', {
      timeout: 5000,
    })
    return true
  } catch (error) {
    return false
  }
}

export const saveOrder = async (orderData) => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.post('/api/orders', orderData, { headers })
    return response.data
  } catch (error) {
    console.error('Error saving order:', error)
    throw error
  }
}

export const updateUserProfile = async (userId, data) => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.patch(`/api/users/${userId}`, data, { headers })
    return response.data
  } catch (error) {
    console.error('Error updating user profile:', error)
    throw error
  }
}

export const updateOrder = async (orderId, data) => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.patch(`/api/orders/${orderId}`, data, { headers })
    return response.data
  } catch (error) {
    console.error('Error updating order:', error)
    throw error
  }
}

export const fetchUserProfile = async (userId) => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.get(`/api/users/${userId}`, { headers })
    return response.data
  } catch (error) {
    console.error('Error fetching user profile:', error)
    throw error
  }
}

export const fetchUserOrders = async (userId) => {
  try {
    const headers = getAuthHeader()
    const options = { headers }
    
    if (userId) {
      options.params = { userId }
    }
    
    const response = await apiClient.get('/api/orders', options)
    return response.data || []
  } catch (error) {
    console.error('Error fetching user orders:', error.response?.data || error)
    return []
  }
}

export const fetchLeads = async () => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.get('/api/leads', { headers })
    return response.data || []
  } catch (error) {
    if (error.response?.status === 401) return []
    console.error('Error fetching leads:', error)
    return []
  }
}

export const fetchAllProjects = async () => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.get('/api/projects', { headers })
    return response.data || []
  } catch (error) {
    if (error.response?.status === 401) return []
    console.error('Error fetching all projects:', error)
    return []
  }
}

export const deleteLead = async (id) => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.delete(`/api/leads/${id}`, { headers })
    return response.data
  } catch (error) {
    if (error.response?.status === 404) {
      return { success: true, message: 'Already deleted' }
    }
    console.error('Error deleting lead:', error)
    throw error
  }
}

export const deleteProject = async (id) => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.delete(`/api/projects/${id}`, { headers })
    return response.data
  } catch (error) {
    if (error.response?.status === 404) {
      return { success: true, message: 'Already deleted' }
    }
    console.error('Error deleting project:', error)
    throw error
  }
}

export const updateLead = async (id, data) => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.patch(`/api/leads/${id}`, data, { headers })
    return response.data
  } catch (error) {
    console.error('Error updating lead:', error)
    throw error
  }
}

export const updateProject = async (id, data) => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.patch(`/api/projects/${id}`, data, { headers })
    return response.data
  } catch (error) {
    console.error('Error updating project:', error)
    throw error
  }
}

export const createSupportTicket = async (data) => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.post('/api/support-tickets', data, { headers })
    return response.data
  } catch (error) {
    console.error('Error creating support ticket:', error)
    throw error
  }
}

export const saveProject = async (data) => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.post('/api/projects', data, { headers })
    return response.data
  } catch (error) {
    console.error('Error saving project:', error)
    throw error
  }
}

export const updateProjectData = async (id, data) => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.patch(`/api/projects/${id}`, data, { headers })
    return response.data
  } catch (error) {
    console.error('Error updating project:', error)
    throw error
  }
}

export const fetchUserProjects = async (userId) => {
  try {
    const headers = getAuthHeader()
    const options = { headers }
    
    if (userId) {
      options.params = { userId }
    }
    
    const response = await apiClient.get('/api/projects', options)
    const projects = (response.data || []).map(p => ({
      ...p,
      name: p.title || p.name
    }))

    return projects
  } catch (error) {
    console.error('Error fetching user projects:', error.response?.data || error)
    return []
  }
}

export const deleteProjectRecord = async (id) => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.delete(`/api/projects/${id}`, { headers })
    return response.data
  } catch (error) {
    console.error('Error deleting project:', error)
    throw error
  }
}

export const saveTemplate = async (templateData) => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.post('/api/templates', templateData, { headers })
    return response.data
  } catch (error) {
    console.error('Error saving template:', error)
    throw error
  }
}

export const updateTemplate = async (id, templateData) => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.patch(`/api/templates/${id}`, templateData, { headers })
    return response.data
  } catch (error) {
    console.error('Error updating template:', error)
    throw error
  }
}

export const deleteTemplate = async (id) => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.delete(`/api/templates/${id}`, { headers })
    return response.data
  } catch (error) {
    console.error('Error deleting template:', error)
    throw error
  }
}

export const fetchTemplates = async () => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.get('/api/templates', { headers })
    return response.data || []
  } catch (error) {
    console.error('Error fetching templates:', error)
    return []
  }
}

export const deployTemplate = async (templateId) => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.patch(`/api/templates/${templateId}`, 
      { deployed: true, status: 'published' }, 
      { headers }
    )
    return response.data
  } catch (error) {
    console.error('Error deploying template:', error)
    throw error
  }
}

export const fetchAllUsers = async () => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.get('/api/users', { headers })
    return response.data || []
  } catch (error) {
    if (error.response?.status === 401 || error.response?.status === 404) return []
    console.error('Error fetching all users:', error)
    return []
  }
}

export const deleteUser = async (id) => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.delete(`/api/users/${id}`, { headers })
    return response.data
  } catch (error) {
    if (error.response?.status === 404) {
      return { success: true, message: 'Already deleted' }
    }
    console.error('Error deleting user:', error)
    throw error
  }
}

export const login = async (email, password) => {
  try {
    const response = await apiClient.post('/api/auth/login', { email, password })
    if (response.data.token) {
      localStorage.setItem('iyonicorp_token', response.data.token)
      localStorage.setItem('iyonicorp_user', JSON.stringify(response.data.user))
    }
    return response.data
  } catch (error) {
    console.error('Login error:', error)
    throw error
  }
}

export const signup = async (userData) => {
  try {
    const response = await apiClient.post('/api/auth/signup', userData)
    return response.data
  } catch (error) {
    console.error('Signup error:', error)
    throw error
  }
}

// Partnership Tier APIs
export const submitPartnershipRequest = async (data) => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.post('/api/partnership-requests', data, { headers })
    return response.data
  } catch (error) {
    console.error('Error submitting partnership request:', error)
    throw error
  }
}

export const fetchPartnershipRequests = async () => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.get('/api/partnership-requests', { headers })
    return response.data || []
  } catch (error) {
    console.error('Error fetching partnership requests:', error)
    return []
  }
}

export const updatePartnershipRequest = async (requestId, data) => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.patch(`/api/partnership-requests/${requestId}`, data, { headers })
    return response.data
  } catch (error) {
    console.error('Error updating partnership request:', error)
    throw error
  }
}

// File upload for partnership documents
export const uploadPartnershipDocument = async (file) => {
  try {
    const headers = getAuthHeader()
    const formData = new FormData()
    formData.append('document', file)
    
    const response = await apiClient.post('/api/partnership-upload', formData, {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error uploading document:', error)
    throw error
  }
}

// Affiliate APIs
export const fetchAffiliateStatus = async () => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.get('/api/affiliate/status', { headers })
    return response.data
  } catch (error) {
    console.error('Error fetching affiliate status:', error)
    return { isAffiliate: false }
  }
}

export const signupAffiliate = async () => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.post('/api/affiliate/signup', {}, { headers })
    return response.data
  } catch (error) {
    console.error('Error signing up as affiliate:', error)
    throw error
  }
}

export const fetchAffiliateStats = async () => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.get('/api/affiliate/stats', { headers })
    return response.data
  } catch (error) {
    console.error('Error fetching affiliate stats:', error)
    return null
  }
}

export const fetchAffiliateReferrals = async () => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.get('/api/affiliate/referrals', { headers })
    return response.data || []
  } catch (error) {
    console.error('Error fetching affiliate referrals:', error)
    return []
  }
}

export const fetchAffiliateEarnings = async () => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.get('/api/affiliate/earnings', { headers })
    return response.data || []
  } catch (error) {
    console.error('Error fetching affiliate earnings:', error)
    return []
  }
}

export const referUser = async (referralCode, userId) => {
  try {
    const response = await apiClient.post('/api/affiliate/refer', { referralCode, userId })
    return response.data
  } catch (error) {
    console.error('Error referring user:', error)
    throw error
  }
}

// Admin Affiliate APIs
export const fetchAllAffiliates = async () => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.get('/api/admin/affiliates', { headers })
    return response.data || []
  } catch (error) {
    console.error('Error fetching all affiliates:', error)
    return []
  }
}

export const fetchAllEarnings = async () => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.get('/api/admin/earnings', { headers })
    return response.data || []
  } catch (error) {
    console.error('Error fetching all earnings:', error)
    return []
  }
}

export const updateEarningStatus = async (earningId, status) => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.patch(`/api/admin/earnings/${earningId}`, { status }, { headers })
    return response.data
  } catch (error) {
    console.error('Error updating earning status:', error)
    throw error
  }
}

export const requestWithdrawal = async (withdrawalData) => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.post('/api/affiliate/withdraw', withdrawalData, { headers })
    return response.data
  } catch (error) {
    console.error('Error requesting withdrawal:', error)
    throw error
  }
}

export const fetchAffiliateWithdrawals = async () => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.get('/api/affiliate/withdrawals', { headers })
    return response.data || []
  } catch (error) {
    console.error('Error fetching affiliate withdrawals:', error)
    return []
  }
}

export const fetchAllWithdrawals = async () => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.get('/api/admin/withdrawals', { headers })
    return response.data || []
  } catch (error) {
    console.error('Error fetching all withdrawals:', error)
    return []
  }
}

export const updateWithdrawalStatus = async (id, data) => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.patch(`/api/admin/withdrawals/${id}`, data, { headers })
    return response.data
  } catch (error) {
    console.error('Error updating withdrawal status:', error)
    throw error
  }
}

export const fetchPayments = async (orderId) => {
  try {
    const headers = getAuthHeader()
    const url = orderId ? `/api/payments?orderId=${orderId}` : '/api/payments';
    const response = await apiClient.get(url, { headers })
    return response.data || []
  } catch (error) {
    console.error('Error fetching payments:', error)
    return []
  }
}

export const recordPayment = async (paymentData) => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.post('/api/payments', paymentData, { headers })
    return response.data
  } catch (error) {
    console.error('Error recording payment:', error)
    throw error
  }
}

export const fetchAffiliatePayments = async () => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.get('/api/affiliate/payments', { headers })
    return response.data || []
  } catch (error) {
    console.error('Error fetching affiliate payments:', error)
    return []
  }
}

import axios from 'axios'

export const API_BASE_URL = import.meta.env.PROD 
  ? 'https://iyonicwebmaster.onrender.com'
  : ''

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
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
    const response = await apiClient.get('https://iyonicwebmaster.onrender.com/api/projects')
    return response.data || []
  } catch (error) {
    console.error('Error fetching projects:', error)
    return null
  }
}

export const submitLead = async (data) => {
  try {
    const response = await apiClient.post('https://iyonicwebmaster.onrender.com/api/leads', {
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
    const response = await apiClient.get('https://iyonicwebmaster.onrender.com/api/projects', {
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
    const response = await apiClient.post('https://iyonicwebmaster.onrender.com/api/orders', orderData, { headers })
    return response.data
  } catch (error) {
    console.error('Error saving order:', error)
    throw error
  }
}

export const updateUserProfile = async (userId, data) => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.patch(`https://iyonicwebmaster.onrender.com/api/users/${userId}`, data, { headers })
    return response.data
  } catch (error) {
    console.error('Error updating user profile:', error)
    throw error
  }
}

export const updateOrder = async (orderId, data) => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.patch(`https://iyonicwebmaster.onrender.com/api/orders/${orderId}`, data, { headers })
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
    
    const response = await apiClient.get('https://iyonicwebmaster.onrender.com/api/orders', options)
    return response.data || []
  } catch (error) {
    console.error('Error fetching user orders:', error.response?.data || error)
    return []
  }
}

export const fetchLeads = async () => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.get('https://iyonicwebmaster.onrender.com/api/leads', { headers })
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
    const response = await apiClient.get('https://iyonicwebmaster.onrender.com/api/projects', { headers })
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
    const response = await apiClient.delete(`https://iyonicwebmaster.onrender.com/api/leads/${id}`, { headers })
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
    const response = await apiClient.delete(`https://iyonicwebmaster.onrender.com/api/projects/${id}`, { headers })
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
    const response = await apiClient.patch(`https://iyonicwebmaster.onrender.com/api/leads/${id}`, data, { headers })
    return response.data
  } catch (error) {
    console.error('Error updating lead:', error)
    throw error
  }
}

export const updateProject = async (id, data) => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.patch(`https://iyonicwebmaster.onrender.com/api/projects/${id}`, data, { headers })
    return response.data
  } catch (error) {
    console.error('Error updating project:', error)
    throw error
  }
}

export const createSupportTicket = async (data) => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.post('https://iyonicwebmaster.onrender.com/api/support-tickets', data, { headers })
    return response.data
  } catch (error) {
    console.error('Error creating support ticket:', error)
    throw error
  }
}

export const saveProject = async (data) => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.post('https://iyonicwebmaster.onrender.com/api/projects', data, { headers })
    return response.data
  } catch (error) {
    console.error('Error saving project:', error)
    throw error
  }
}

export const updateProjectData = async (id, data) => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.patch(`https://iyonicwebmaster.onrender.com/api/projects/${id}`, data, { headers })
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
    
    const response = await apiClient.get('https://iyonicwebmaster.onrender.com/api/projects', options)
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
    const response = await apiClient.delete(`https://iyonicwebmaster.onrender.com/api/projects/${id}`, { headers })
    return response.data
  } catch (error) {
    console.error('Error deleting project:', error)
    throw error
  }
}

export const saveTemplate = async (templateData) => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.post('https://iyonicwebmaster.onrender.com/api/templates', templateData, { headers })
    return response.data
  } catch (error) {
    console.error('Error saving template:', error)
    throw error
  }
}

export const updateTemplate = async (id, templateData) => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.patch(`https://iyonicwebmaster.onrender.com/api/templates/${id}`, templateData, { headers })
    return response.data
  } catch (error) {
    console.error('Error updating template:', error)
    throw error
  }
}

export const deleteTemplate = async (id) => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.delete(`https://iyonicwebmaster.onrender.com/api/templates/${id}`, { headers })
    return response.data
  } catch (error) {
    console.error('Error deleting template:', error)
    throw error
  }
}

export const fetchTemplates = async () => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.get('https://iyonicwebmaster.onrender.com/api/templates', { headers })
    return response.data || []
  } catch (error) {
    console.error('Error fetching templates:', error)
    return []
  }
}

export const deployTemplate = async (templateId) => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.patch(`https://iyonicwebmaster.onrender.com/api/templates/${templateId}`, 
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
    const response = await apiClient.get('https://iyonicwebmaster.onrender.com/api/users', { headers })
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
    const response = await apiClient.delete(`https://iyonicwebmaster.onrender.com/api/users/${id}`, { headers })
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
    const response = await apiClient.post('https://iyonicwebmaster.onrender.com/api/auth/login', { email, password })
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
    const response = await apiClient.post('https://iyonicwebmaster.onrender.com/api/auth/signup', userData)
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
    const response = await apiClient.post('https://iyonicwebmaster.onrender.com/api/partnership-requests', data, { headers })
    return response.data
  } catch (error) {
    console.error('Error submitting partnership request:', error)
    throw error
  }
}

export const fetchPartnershipRequests = async () => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.get('https://iyonicwebmaster.onrender.com/api/partnership-requests', { headers })
    return response.data || []
  } catch (error) {
    console.error('Error fetching partnership requests:', error)
    return []
  }
}

export const updatePartnershipRequest = async (requestId, data) => {
  try {
    const headers = getAuthHeader()
    const response = await apiClient.patch(`https://iyonicwebmaster.onrender.com/api/partnership-requests/${requestId}`, data, { headers })
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
    
    const response = await apiClient.post('https://iyonicwebmaster.onrender.com/api/partnership-upload', formData, {
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

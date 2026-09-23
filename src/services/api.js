import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('agropredict-token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('agropredict-token')
      localStorage.removeItem('agropredict-user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  getMe: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'),
}

export const profileAPI = {
  get: () => api.get('/profile'),
  update: (data) => api.put('/profile', data),
  changePassword: (data) => api.put('/profile/password', data),
}

export const mlAPI = {
  recommendCrop: (data) => api.post('/crop/recommend', data),
  recommendIrrigation: (data) => api.post('/irrigation/recommend', data),
  detectDisease: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/disease/predict', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
}

export const reportsAPI = {
  history: () => api.get('/reports/history'),
  generate: (data = {}) => api.post('/reports/generate', data),
  get: (id) => api.get(`/reports/${id}`),
  update: (id, data) => api.put(`/reports/${id}`, data),
  remove: (id) => api.delete(`/reports/${id}`),
  view: (id) => api.get(`/reports/${id}/view`, { responseType: 'blob' }),
  download: (id) => api.get(`/reports/${id}/download`, { responseType: 'blob' }),
  send: (id) => api.post(`/reports/${id}/send`),
}

export const notificationsAPI = {
  list: () => api.get('/notifications'),
  send: (data) => api.post('/notifications/send', data),
  markRead: (id) => api.patch(`/notifications/${id}/read`),
}

export const chatAPI = {
  send: (message, context = {}) => api.post('/chat', { message, context }),
}

export const weatherAPI = {
  status: () => api.get('/weather'),
  searchPlaces: (query) => api.get('/weather/places', { params: { query } }),
  current: (city = 'Indore') => api.get('/weather/current', { params: { city } }),
  forecast: (city = 'Indore') => api.get('/weather/forecast', { params: { city } }),
}

export const profitAPI = {
  predict: (data) => api.post('/profit/predict', data),
}

export default api

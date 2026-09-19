import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI, profileAPI } from '@/services/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('agropredict-user')
    return saved ? JSON.parse(saved) : null
  })
  const [loading, setLoading] = useState(false)
  const [initializing, setInitializing] = useState(true)

  const isAuthenticated = !!user

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('agropredict-token')
      if (token) {
        try {
          const res = await authAPI.getMe()
          setUser(res.data)
          localStorage.setItem('agropredict-user', JSON.stringify(res.data))
        } catch (error) {
          localStorage.removeItem('agropredict-token')
          localStorage.removeItem('agropredict-user')
          setUser(null)
        }
      }
      setInitializing(false)
    }
    checkAuth()
  }, [])

  const login = async (email, password) => {
    setLoading(true)
    try {
      const res = await authAPI.login({ email, password })
      const { access_token, user: userData } = res.data
      localStorage.setItem('agropredict-token', access_token)
      localStorage.setItem('agropredict-user', JSON.stringify(userData))
      setUser(userData)
      return userData
    } catch (error) {
      throw new Error(error.response?.data?.detail || error.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const register = async (formData) => {
    setLoading(true)
    try {
      const payload = {
        fullName: formData.fullName || formData.name,
        email: formData.email,
        mobileNumber: formData.mobileNumber || formData.phone,
        password: formData.password,
        state: formData.state || '',
        district: formData.district || '',
        village: formData.village || '',
        preferredLanguage: formData.preferredLanguage || formData.language || 'English',
        accountType: formData.accountType || 'Farmer',
      }

      const res = await authAPI.register(payload)
      const { access_token, user: userData } = res.data
      localStorage.setItem('agropredict-token', access_token)
      localStorage.setItem('agropredict-user', JSON.stringify(userData))
      setUser(userData)
      return userData
    } catch (error) {
      throw new Error(error.response?.data?.detail || error.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    authAPI.logout().catch(() => {})
    setUser(null)
    localStorage.removeItem('agropredict-token')
    localStorage.removeItem('agropredict-user')
  }

  const updateProfile = async (updates) => {
    setLoading(true)
    try {
      const res = await profileAPI.update(updates)
      const updated = res.data
      setUser(updated)
      localStorage.setItem('agropredict-user', JSON.stringify(updated))
      return updated
    } catch (error) {
      throw new Error(error.response?.data?.detail || error.response?.data?.message || 'Profile update failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{
      user, isAuthenticated, loading, initializing, login, register, logout, updateProfile
    }}>
      {!initializing ? children : <div className="flex h-screen items-center justify-center"><div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div></div>}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

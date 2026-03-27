import axios from "axios"

const TOKEN_KEY = "act_dashboard_access_token"

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)

  if (token) {
    config.headers.Authorization = `Bearer${token}`
  }

  return config
})

export const setAccessToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token)
  }
}

export const getAccessToken = () => localStorage.getItem(TOKEN_KEY)

export const clearAccessToken = () => {
  localStorage.removeItem(TOKEN_KEY)
}

export default api

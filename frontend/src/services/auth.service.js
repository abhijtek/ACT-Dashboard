import api, { clearAccessToken, getAccessToken, setAccessToken } from "../api/api.js"

const getResponseData = (response) => response?.data?.data

const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Something went wrong"

const authService = {
  async login(credentials) {
    try {
      const data = getResponseData(await api.post("/api/v1/auth/login", credentials))

      if (data?.accessToken) {
        setAccessToken(data.accessToken)
      }

      return data
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  },

  async signup(payload) {
    try {
      return getResponseData(await api.post("/api/v1/auth/register", payload))
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  },

  async getCurrentUser() {
    try {
      return getResponseData(await api.post("/api/v1/auth/current-user"))
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  },

  async logout() {
    try {
      const data = getResponseData(await api.post("/api/v1/auth/logout"))
      clearAccessToken()
      return data
    } catch (error) {
      clearAccessToken()
      throw new Error(getErrorMessage(error))
    }
  },

  clearSession() {
    clearAccessToken()
  },

  hasToken() {
    return Boolean(getAccessToken())
  },
}

export default authService

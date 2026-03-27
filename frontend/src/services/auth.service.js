import api from "../api/api.js"

const getResponseData = (response) => response?.data?.data

const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Something went wrong"

const authService = {
  async login(credentials) {
    try {
      return getResponseData(await api.post("/api/v1/auth/login", credentials))
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
      return getResponseData(await api.post("/api/v1/auth/logout"))
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  },
}

export default authService

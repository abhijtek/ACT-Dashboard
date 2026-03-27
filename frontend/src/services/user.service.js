import api from "../api/api.js"

const getResponseData = (response) => response?.data?.data

const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Something went wrong"

const userService = {
  async getUserData() {
    try {
      return getResponseData(await api.get("/api/v1/auth/data"))
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  },
}

export default userService

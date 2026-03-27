import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  status: false,
  userData: null,
  initialized: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true
      state.userData = action.payload.userData
      state.initialized = true
    },
    logout: (state) => {
      state.status = false
      state.userData = null
      state.initialized = true
    },
    setUser: (state, action) => {
      state.status = Boolean(action.payload.userData)
      state.userData = action.payload.userData
      state.initialized = true
    },
    authChecked: (state) => {
      state.initialized = true
    },
  },
})

export const { login, logout, setUser, authChecked } = authSlice.actions
export default authSlice.reducer

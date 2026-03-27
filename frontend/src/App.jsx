import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { useDispatch } from "react-redux"

import "./App.css"
import Header from "./components/Header.jsx"
import authService from "./services/auth.service.js"
import { authChecked, login, logout } from "./store/authSlice.js"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const checkUser = async () => {
      if (!authService.hasToken()) {
        dispatch(authChecked())
        return
      }

      try {
        const userData = await authService.getCurrentUser()
        dispatch(login({ userData }))
      } catch (error) {
        authService.clearSession()
        dispatch(logout())
      }
    }

    checkUser()
  }, [dispatch])

  return (
    <div className="app-shell">
      <Header />
      <main className="page-shell">
        <Outlet />
      </main>
    </div>
  )
}

export default App

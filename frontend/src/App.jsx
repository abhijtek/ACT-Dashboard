import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { useDispatch } from "react-redux"

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
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Header />
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}

export default App

import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { useDispatch } from "react-redux"

import Header from "./components/Header.jsx"
import authService from "./services/auth.service.js"
import { authChecked, login, logout } from "./store/authSlice.js"

function App() {
  const dispatch = useDispatch()
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("act-theme")
    return savedTheme === "dark" ? "dark" : "light"
  })

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .catch(() => {
        dispatch(logout())
      })
      .finally(() => {
        dispatch(authChecked())
      })
  }, [dispatch])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
    localStorage.setItem("act-theme", theme)
  }, [theme])

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <Header theme={theme} setTheme={setTheme} />
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}

export default App

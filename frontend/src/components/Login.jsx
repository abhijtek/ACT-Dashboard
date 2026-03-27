import { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import Button from "./Button.jsx"
import Logo from "../Logo.jsx"
import authService from "../services/auth.service.js"
import { login as authLogin } from "../store/authSlice.js"

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authStatus = useSelector((state) => state.auth.status)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (authStatus) {
    return <Navigate to="/" replace />
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
    setFieldErrors((current) => ({ ...current, [name]: "" }))
  }

  const validateForm = () => {
    const nextErrors = {}

    if (!emailPattern.test(formData.email)) {
      nextErrors.email = "Enter a valid email address"
    }

    if (formData.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters long"
    }

    return nextErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError("")
    const nextErrors = validateForm()

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors)
      return
    }

    setIsSubmitting(true)

    try {
      await authService.login(formData)
      const userData = await authService.getCurrentUser()
      dispatch(authLogin({ userData }))
      navigate("/")
    } catch (err) {
      const message = "Invalid credentials"
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col items-center text-center">
        <Logo width={90} />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Sign in
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Access your workspace and continue where you left off.</p>
      </div>

      {error ? <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-500/15 dark:text-red-300">{error}</p> : null}

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="login-email">
            Email
          </label>
          <input
            id="login-email"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-blue-500/30"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {fieldErrors.email ? <p className="text-sm text-red-600 dark:text-red-300">{fieldErrors.email}</p> : null}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="login-password">
            Password
          </label>
          <input
            id="login-password"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-blue-500/30"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {fieldErrors.password ? <p className="text-sm text-red-600 dark:text-red-300">{fieldErrors.password}</p> : null}
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
        Do not have an account?{" "}
        <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-700">
          Sign up
        </Link>
      </p>
    </section>
  )
}

export default Login

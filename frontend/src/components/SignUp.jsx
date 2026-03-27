import { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import Button from "./Button.jsx"
import Logo from "../Logo.jsx"
import authService from "../services/auth.service.js"
import { login } from "../store/authSlice.js"

function SignUp() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authStatus = useSelector((state) => state.auth.status)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (authStatus) {
    return <Navigate to="/" replace />
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError("")
    setIsSubmitting(true)

    try {
      await authService.signup(formData)
      await authService.login({
        email: formData.email,
        password: formData.password,
      })
      const userData = await authService.getCurrentUser()
      dispatch(login({ userData }))
      navigate("/")
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="text-center">
        <Logo width={90} />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
          Create account
        </h1>
        <p className="mt-2 text-sm text-slate-500">Register first, then we log you in automatically.</p>
      </div>

      {error ? <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="signup-username">
            Username
          </label>
          <input
            id="signup-username"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            type="text"
            name="username"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="signup-email">
            Email
          </label>
          <input
            id="signup-email"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="signup-password">
            Password
          </label>
          <input
            id="signup-password"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <p className="mt-4 text-sm text-slate-500">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700">
          Sign in
        </Link>
      </p>
    </section>
  )
}

export default SignUp

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
  const [formData, setFormData] = useState({
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
      await authService.login(formData)
      const userData = await authService.getCurrentUser()
      dispatch(authLogin({ userData }))
      navigate("/")
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="page-card auth-card">
      <div style={{ textAlign: "center" }}>
        <Logo width={90} />
        <h1 className="page-title" style={{ marginTop: 16 }}>
          Sign in
        </h1>
        <p className="page-text">Use your account to enter the dashboard.</p>
      </div>

      {error ? <p className="form-error" style={{ marginTop: 16 }}>{error}</p> : null}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="login-email">
            Email
          </label>
          <input
            id="login-email"
            className="form-input"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="login-password">
            Password
          </label>
          <input
            id="login-password"
            className="form-input"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <Button type="submit" className="button--full" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <p className="auth-footer">
        Do not have an account? <Link to="/signup" className="auth-link">Sign up</Link>
      </p>
    </section>
  )
}

export default Login

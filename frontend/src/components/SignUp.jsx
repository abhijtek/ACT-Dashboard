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
    <section className="page-card auth-card">
      <div style={{ textAlign: "center" }}>
        <Logo width={90} />
        <h1 className="page-title" style={{ marginTop: 16 }}>
          Create account
        </h1>
        <p className="page-text">Register first, then we log you in automatically.</p>
      </div>

      {error ? <p className="form-error" style={{ marginTop: 16 }}>{error}</p> : null}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="signup-username">
            Username
          </label>
          <input
            id="signup-username"
            className="form-input"
            type="text"
            name="username"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="signup-email">
            Email
          </label>
          <input
            id="signup-email"
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
          <label className="form-label" htmlFor="signup-password">
            Password
          </label>
          <input
            id="signup-password"
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
          {isSubmitting ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <p className="auth-footer">
        Already have an account? <Link to="/login" className="auth-link">Sign in</Link>
      </p>
    </section>
  )
}

export default SignUp

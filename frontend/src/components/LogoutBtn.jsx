import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import authService from "../services/auth.service.js"
import { logout } from "../store/authSlice.js"

function LogoutBtn() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const logoutHandler = async () => {
    setIsLoading(true)

    try {
      await authService.logout()
    } finally {
      dispatch(logout())
      navigate("/login")
      setIsLoading(false)
    }
  }

  return (
    <button type="button" onClick={logoutHandler} className="button button--danger" disabled={isLoading}>
      {isLoading ? "Logging out..." : "Logout"}
    </button>
  )
}

export default LogoutBtn

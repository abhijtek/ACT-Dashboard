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
      dispatch(logout())
      navigate("/login")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={logoutHandler}
      className="inline-flex items-center justify-center rounded-xl bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-200 disabled:cursor-not-allowed disabled:opacity-70"
      disabled={isLoading}
    >
      {isLoading ? "Logging out..." : "Logout"}
    </button>
  )
}

export default LogoutBtn

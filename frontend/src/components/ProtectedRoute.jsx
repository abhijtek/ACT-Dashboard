import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

function ProtectedRoute({ children }) {
  const { status, initialized } = useSelector((state) => state.auth)

  if (!initialized) {
    return (
      <section className="page-card">
        <p className="page-text">Checking session...</p>
      </section>
    )
  }

  if (!status) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute

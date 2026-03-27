import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

function ProtectedRoute({ children }) {
  const { status, initialized } = useSelector((state) => state.auth)

  if (!initialized) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-slate-600">Checking session...</p>
      </section>
    )
  }

  if (!status) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute

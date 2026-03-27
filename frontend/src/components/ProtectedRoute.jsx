import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

function ProtectedRoute({ children }) {
  const { status, initialized } = useSelector((state) => state.auth)

  if (!initialized) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-slate-800 dark:bg-slate-900">
        <p className="text-slate-600 dark:text-slate-400">Checking session...</p>
      </section>
    )
  }

  if (!status) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute

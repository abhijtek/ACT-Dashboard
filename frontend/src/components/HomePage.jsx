import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import userService from "../services/user.service.js"

function HomePage() {
  const userData = useSelector((state) => state.auth.userData)
  const [dashboardData, setDashboardData] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await userService.getUserData()
        setDashboardData(data)
      } catch (err) {
        setError(err.message)
      }
    }

    fetchDashboardData()
  }, [])

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
        Welcome, {userData?.username || userData?.email || "User"}
      </h1>
      <p className="mt-2 text-sm text-slate-600 sm:text-base dark:text-slate-400">
        Track pipeline activity, team tasks, and account performance from one place.
      </p>

      {error ? <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-500/15 dark:text-red-300">{error}</p> : null}

      {dashboardData ? (
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-950">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Leads</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              {dashboardData.leads?.map((lead) => (
                <li key={lead.id} className="rounded-lg bg-white px-3 py-2 dark:bg-slate-900">
                  {lead.title} - {lead.status}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-950">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Tasks</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              {dashboardData.tasks?.map((task) => (
                <li key={task.id} className="rounded-lg bg-white px-3 py-2 dark:bg-slate-900">
                  {task.title} - {task.done ? "Done" : "Pending"}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-950">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Users</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              {dashboardData.users?.map((user) => (
                <li key={user.id} className="rounded-lg bg-white px-3 py-2 dark:bg-slate-900">{user.name}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p className="mt-5 text-slate-600 dark:text-slate-400">Loading dashboard data...</p>
      )}
    </section>
  )
}

export default HomePage

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
    <section className="page-card">
      <h1 className="page-title">Welcome, {userData?.username || userData?.email || "User"}</h1>
      <p className="page-text">
        This home route is pulling the dummy data returned by your backend `user data` API.
      </p>

      {error ? <p className="form-error" style={{ marginTop: 16 }}>{error}</p> : null}

      {dashboardData ? (
        <div className="dashboard-grid">
          <div className="dashboard-box">
            <h3>Leads</h3>
            <ul className="dashboard-list">
              {dashboardData.leads?.map((lead) => (
                <li key={lead.id}>
                  {lead.title} - {lead.status}
                </li>
              ))}
            </ul>
          </div>

          <div className="dashboard-box">
            <h3>Tasks</h3>
            <ul className="dashboard-list">
              {dashboardData.tasks?.map((task) => (
                <li key={task.id}>
                  {task.title} - {task.done ? "Done" : "Pending"}
                </li>
              ))}
            </ul>
          </div>

          <div className="dashboard-box">
            <h3>Users</h3>
            <ul className="dashboard-list">
              {dashboardData.users?.map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p className="page-text" style={{ marginTop: 20 }}>Loading dashboard data...</p>
      )}
    </section>
  )
}

export default HomePage

import { useSelector } from "react-redux"

function AccountDetails() {
  const userData = useSelector((state) => state.auth.userData)

  return (
    <section className="page-card">
      <h1 className="page-title">Account details</h1>
      <p className="page-text">This page shows the current user data fetched from the backend.</p>

      <div className="account-list">
        <div className="account-item">
          <strong>Username</strong>
          <span>{userData?.username || "Not available"}</span>
        </div>

        <div className="account-item">
          <strong>Email</strong>
          <span>{userData?.email || "Not available"}</span>
        </div>

        <div className="account-item">
          <strong>User id</strong>
          <span>{userData?._id || "Not available"}</span>
        </div>
      </div>
    </section>
  )
}

export default AccountDetails

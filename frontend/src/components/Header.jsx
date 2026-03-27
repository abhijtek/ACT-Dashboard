import { Link, NavLink } from "react-router-dom"
import { useSelector } from "react-redux"

import Logo from "../Logo.jsx"
import LogoutBtn from "./LogoutBtn.jsx"

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const userData = useSelector((state) => state.auth.userData)

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="brand">
          <Logo width={52} />
          <div>
            <p className="brand__title">ACT Dashboard</p>
            <p className="brand__subtitle">Simple auth setup</p>
          </div>
        </Link>

        <nav className="nav">
          {authStatus ? (
            <>
              <NavLink
                to="/"
                className={({ isActive }) => `nav__link ${isActive ? "nav__link--active" : ""}`}
              >
                Home
              </NavLink>
              <NavLink
                to="/account-details"
                className={({ isActive }) => `nav__link ${isActive ? "nav__link--active" : ""}`}
              >
                Account
              </NavLink>
              <span className="nav__user">{userData?.username || userData?.email || "User"}</span>
              <LogoutBtn />
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) => `nav__link ${isActive ? "nav__link--active" : ""}`}
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) => `nav__link ${isActive ? "nav__link--active" : ""}`}
              >
                Sign up
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header

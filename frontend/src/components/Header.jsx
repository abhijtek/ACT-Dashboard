import { Link, NavLink } from "react-router-dom"
import { useSelector } from "react-redux"

import Logo from "../Logo.jsx"
import LogoutBtn from "./LogoutBtn.jsx"

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const userData = useSelector((state) => state.auth.userData)
  const navLinkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition ${
      isActive ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <Logo width={52} />
          <div>
            <p className="text-base font-semibold text-slate-900">ACT Dashboard</p>
            <p className="text-sm text-slate-500">Operations workspace</p>
          </div>
        </Link>

        <nav className="flex flex-wrap items-center gap-2">
          {authStatus ? (
            <>
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to="/account-details" className={navLinkClass}>
                Account
              </NavLink>
              <span className="px-1 text-sm text-slate-500">{userData?.username || userData?.email || "User"}</span>
              <LogoutBtn />
            </>
          ) : (
            <>
              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>
              <NavLink to="/signup" className={navLinkClass}>
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

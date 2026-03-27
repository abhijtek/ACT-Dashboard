import { useSelector } from "react-redux"

function AccountDetails() {
  const userData = useSelector((state) => state.auth.userData)

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Account details</h1>
      <p className="mt-2 text-slate-600">Review your profile information and account identity details.</p>

      <div className="mt-6 grid gap-4">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <strong className="mb-1 block text-sm uppercase tracking-wide text-slate-500">Username</strong>
          <span>{userData?.username || "Not available"}</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <strong className="mb-1 block text-sm uppercase tracking-wide text-slate-500">Email</strong>
          <span>{userData?.email || "Not available"}</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <strong className="mb-1 block text-sm uppercase tracking-wide text-slate-500">User id</strong>
          <span>{userData?._id || "Not available"}</span>
        </div>
      </div>
    </section>
  )
}

export default AccountDetails

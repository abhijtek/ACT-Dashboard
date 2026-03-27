function Button({ children, type = "button", className = "", variant = "primary", ...props }) {
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    ghost: "bg-slate-100 text-blue-700 hover:bg-slate-200",
    danger: "bg-red-100 text-red-700 hover:bg-red-200",
  }

  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70 ${variants[variant] || variants.primary} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button

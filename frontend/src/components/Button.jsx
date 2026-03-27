function Button({ children, type = "button", className = "", variant = "primary", ...props }) {
  return (
    <button
      type={type}
      className={`button button--${variant} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button

import { Link } from 'react-router-dom'

function Button({ children, to, href, variant = 'primary', className = '', ...props }) {
  const classes = `btn btn-${variant} ${className}`.trim()

  if (to) {
    return (
      <Link className={classes} to={to} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a className={classes} href={href} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} type="button" {...props}>
      {children}
    </button>
  )
}

export default Button

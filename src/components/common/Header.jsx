import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import navigation from '../../data/navigation.json'
import company from '../../data/company.json'
import Button from './Button'

function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" to="/" onClick={() => setOpen(false)}>
          <span className="brand-mark">M</span>
          <span>
            <strong>{company.name}</strong>
            <small>Vision Care</small>
          </span>
        </Link>

        <nav className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Main navigation">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) => (isActive ? 'nav-active' : undefined)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <Button to="/contact" variant="outline">
            Enquire
          </Button>
          <button
            className="icon-button nav-toggle"
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header

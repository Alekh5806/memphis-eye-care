import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'
import navigation from '../../data/navigation.json'
import company from '../../data/company.json'
import Button from './Button'

function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" to="/" onClick={() => setOpen(false)}>
          <img className="brand-logo" src="/images/logo/memphis-vision-care-logo.svg" alt={company.name} />
        </Link>

        <nav className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Main navigation">
          {navigation.map((item) => {
            if (item.children?.length) {
              return (
                <div className="nav-group" key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) => `nav-parent ${isActive ? 'nav-active' : ''}`.trim()}
                  >
                    {item.label}
                    <ChevronDown size={15} />
                  </NavLink>
                  <div className="nav-submenu">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) => (isActive ? 'nav-active' : undefined)}
                      >
                        <span>{child.label}</span>
                        {child.description && <small>{child.description}</small>}
                      </NavLink>
                    ))}
                  </div>
                </div>
              )
            }

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) => (isActive ? 'nav-active' : undefined)}
              >
                {item.label}
              </NavLink>
            )
          })}
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

import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, Phone, X } from 'lucide-react'
import navigation from '../../data/navigation.json'
import company from '../../data/company.json'
import Button from './Button'

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openGroup, setOpenGroup] = useState(null)
  const location = useLocation()
  const drawerRef = useRef(null)

  /* eslint-disable react-hooks/set-state-in-effect -- closing the
     mobile drawer on navigation is a legitimate UI side-effect */
  useEffect(() => {
    setOpen(false)
    setOpenGroup(null)
  }, [location.pathname])
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container header-inner">
          <Link className="brand" to="/" onClick={() => setOpen(false)}>
            <img
              className="brand-logo"
              src="/images/logo/memphis-vision-care-logo.svg"
              alt={company.name}
              width="180"
              height="44"
            />
          </Link>

          <nav className="main-nav" aria-label="Main navigation">
            {navigation.map((item) => {
              if (item.children?.length) {
                return (
                  <div className="nav-group" key={item.path}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => `nav-parent ${isActive ? 'nav-active' : ''}`.trim()}
                    >
                      {item.label}
                      <ChevronDown size={15} />
                    </NavLink>
                    <div className="nav-submenu" role="menu">
                      {item.children.map((child) => (
                        <NavLink
                          key={child.path}
                          to={child.path}
                          role="menuitem"
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
                  className={({ isActive }) => (isActive ? 'nav-active' : undefined)}
                >
                  {item.label}
                </NavLink>
              )
            })}
          </nav>

          <div className="header-actions">
            <Button to="/contact" className="header-cta">
              Request a quote
            </Button>
            <button
              className="icon-button nav-toggle"
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-navigation-drawer"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="drawer-overlay"
              className="mobile-drawer-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              key="drawer-panel"
              ref={drawerRef}
              id="mobile-navigation-drawer"
              className="mobile-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 0.35 }}
              aria-label="Mobile navigation"
              aria-modal="true"
              role="dialog"
            >
              <div className="mobile-drawer-head">
                <Link className="brand" to="/" onClick={() => setOpen(false)}>
                  <img
                    className="brand-logo"
                    src="/images/logo/memphis-vision-care-logo.svg"
                    alt={company.name}
                    width="180"
                    height="44"
                  />
                </Link>
                <button
                  className="icon-button"
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  <X size={22} />
                </button>
              </div>

              <nav className="mobile-drawer-nav" aria-label="Mobile primary">
                {navigation.map((item) => {
                  if (item.children?.length) {
                    const isOpen = openGroup === item.path
                    return (
                      <div key={item.path} className={`mobile-nav-group ${isOpen ? 'is-open' : ''}`}>
                        <button
                          type="button"
                          className="mobile-nav-parent"
                          onClick={() => setOpenGroup(isOpen ? null : item.path)}
                          aria-expanded={isOpen}
                        >
                          <span>{item.label}</span>
                          <ChevronDown size={16} />
                        </button>
                        {isOpen && (
                          <div className="mobile-nav-children">
                            <NavLink to={item.path} onClick={() => setOpen(false)}>
                              All {item.label}
                            </NavLink>
                            {item.children.map((child) => (
                              <NavLink
                                key={child.path}
                                to={child.path}
                                onClick={() => setOpen(false)}
                              >
                                <span>{child.label}</span>
                                {child.description && <small>{child.description}</small>}
                              </NavLink>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  }
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setOpen(false)}
                      className="mobile-nav-link"
                    >
                      {item.label}
                    </NavLink>
                  )
                })}
              </nav>

              <div className="mobile-drawer-foot">
                <Button to="/contact" onClick={() => setOpen(false)}>
                  Request a quote
                </Button>
                <a href={`tel:${company.phone.replace(/\s|\+/g, '')}`} className="mobile-call">
                  <Phone size={16} /> {company.phone}
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header

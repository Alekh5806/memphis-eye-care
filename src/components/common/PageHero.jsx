import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'
import Container from './Container'

function PageHero({ eyebrow, title, text, breadcrumbs, children }) {
  return (
    <section className="page-hero">
      <div className="page-hero-bg" aria-hidden="true">
        <span className="page-hero-orb page-hero-orb-1" />
        <span className="page-hero-orb page-hero-orb-2" />
      </div>
      <Container>
        {breadcrumbs?.length > 0 && (
          <nav className="page-breadcrumbs" aria-label="Breadcrumb">
            <Link to="/" aria-label="Home"><Home size={13} /></Link>
            {breadcrumbs.map((crumb, index) => (
              <span key={`${crumb.label}-${index}`} className="page-breadcrumb">
                <ChevronRight size={13} aria-hidden="true" />
                {crumb.path ? (
                  <Link to={crumb.path}>{crumb.label}</Link>
                ) : (
                  <span aria-current="page">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {text && <p>{text}</p>}
        {children && <div className="page-hero-actions">{children}</div>}
      </Container>
    </section>
  )
}

export default PageHero

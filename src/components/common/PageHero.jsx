import { Link } from 'react-router-dom'
import { ArrowRight, BadgeCheck, ChevronRight, Home } from 'lucide-react'
import Button from './Button'
import Container from './Container'

function PageHero({
  eyebrow,
  title,
  text,
  breadcrumbs,
  children,
  image,
  imageAlt = '',
  imagePosition = 'center',
  tone = 'default',
  actions = [],
  proofPoints = [],
  stats = [],
  panelEyebrow = 'Memphis advantage',
  panelTitle,
  panelText,
}) {
  const hasActions = actions.length > 0 || children
  const hasEvidence = panelTitle || panelText || proofPoints.length > 0 || stats.length > 0

  return (
    <section
      className={`page-hero page-hero-${tone} ${image ? 'page-hero-with-image' : ''}`}
      style={image ? { '--page-hero-image-position': imagePosition } : undefined}
    >
      <div className="page-hero-bg" aria-hidden="true">
        {image && <img src={image} alt={imageAlt} />}
        <span className="page-hero-orb page-hero-orb-1" />
        <span className="page-hero-orb page-hero-orb-2" />
      </div>
      <Container className={`page-hero-inner ${hasEvidence ? 'page-hero-inner-split' : ''}`}>
        <div className="page-hero-copy">
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
          {hasActions && (
            <div className="page-hero-actions">
              {actions.map((action, index) => (
                <Button
                  key={`${action.label}-${index}`}
                  to={action.to}
                  href={action.href}
                  variant={action.variant ?? (index === 0 ? 'primary' : 'outline')}
                >
                  {action.label}
                  {index === 0 && <ArrowRight size={18} />}
                </Button>
              ))}
              {children}
            </div>
          )}
        </div>
        {hasEvidence && (
          <aside className="page-hero-evidence" aria-label="Page highlights">
            <span className="page-hero-panel-eyebrow">{panelEyebrow}</span>
            {panelTitle && <strong className="page-hero-panel-title">{panelTitle}</strong>}
            {panelText && <p>{panelText}</p>}
            {proofPoints.length > 0 && (
              <ul className="page-hero-proof-list">
                {proofPoints.map((point) => (
                  <li key={point}>
                    <BadgeCheck size={16} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}
            {stats.length > 0 && (
              <div className="page-hero-stat-grid">
                {stats.map((stat) => (
                  <div key={`${stat.value}-${stat.label}`}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            )}
          </aside>
        )}
      </Container>
    </section>
  )
}

export default PageHero

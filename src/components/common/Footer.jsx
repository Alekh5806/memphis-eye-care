import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { CONSENT_EVENT } from './CookieConsent'
import navigation from '../../data/navigation.json'
import categories from '../../data/categories.json'
import company from '../../data/company.json'

const companyLinks = [
  ...navigation.slice(1),
  { label: 'Manufacturing', path: '/manufacturing' },
  { label: 'Quality', path: '/quality' },
  { label: 'Contract Manufacturing', path: '/contract-manufacturing' },
  { label: 'Partner With Us', path: '/partner-with-us' },
]

function SocialIcon({ type }) {
  if (type === 'linkedin') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M6.94 8.95H3.9V20h3.04V8.95ZM5.42 4A1.74 1.74 0 1 0 5.4 7.48 1.74 1.74 0 0 0 5.42 4ZM20.1 13.65c0-3.02-1.61-4.43-3.77-4.43-1.73 0-2.51.95-2.94 1.62V8.95h-2.91V20h3.03v-5.47c0-1.45.28-2.86 2.08-2.86 1.77 0 1.79 1.66 1.79 2.95V20h3.04v-6.35h-.32Z" />
      </svg>
    )
  }

  if (type === 'facebook') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M14.2 8.3V6.9c0-.68.45-.84.77-.84h1.95V3.08L14.23 3.07c-2.99 0-3.67 2.24-3.67 3.67V8.3H8.84v3.08h1.72V20h3.64v-8.62h2.45l.32-3.08H14.2Z" />
      </svg>
    )
  }

  if (type === 'instagram') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M7.8 3h8.4A4.8 4.8 0 0 1 21 7.8v8.4a4.8 4.8 0 0 1-4.8 4.8H7.8A4.8 4.8 0 0 1 3 16.2V7.8A4.8 4.8 0 0 1 7.8 3Zm0 1.7a3.1 3.1 0 0 0-3.1 3.1v8.4a3.1 3.1 0 0 0 3.1 3.1h8.4a3.1 3.1 0 0 0 3.1-3.1V7.8a3.1 3.1 0 0 0-3.1-3.1H7.8Zm8.9 1.9a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7.4a4.6 4.6 0 1 1 0 9.2 4.6 4.6 0 0 1 0-9.2Zm0 1.7a2.9 2.9 0 1 0 0 5.8 2.9 2.9 0 0 0 0-5.8Z" />
      </svg>
    )
  }

  if (type === 'youtube') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M21.2 7.7a3 3 0 0 0-2.1-2.12C17.24 5.08 12 5.08 12 5.08s-5.24 0-7.1.5A3 3 0 0 0 2.8 7.7 31.23 31.23 0 0 0 2.3 12c0 1.43.17 2.86.5 4.3a3 3 0 0 0 2.1 2.12c1.86.5 7.1.5 7.1.5s5.24 0 7.1-.5a3 3 0 0 0 2.1-2.12c.33-1.44.5-2.87.5-4.3 0-1.43-.17-2.86-.5-4.3ZM10.05 15.43V8.57L15.5 12l-5.45 3.43Z" />
      </svg>
    )
  }

  return null
}

function Footer() {
  const openCookiePreferences = () => {
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT))
  }

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-company">
          <Link className="brand footer-brand" to="/">
            <img className="brand-logo" src="/images/logo/memphis-vision-care-logo.svg" alt={company.name} />
          </Link>
          <p>
            Business-oriented information for healthcare professionals, distributors,
            institutions, and manufacturing partners.
          </p>
          {company.socialLinks?.length > 0 && (
            <div className="footer-socials" aria-label="Social media links">
              {company.socialLinks.map((social) => {
                const icon = <SocialIcon type={social.type} />
                if (!social.url) {
                  return (
                    <span
                      aria-label={`${social.label} link pending`}
                      className="footer-social-placeholder"
                      key={social.label}
                      title={`${social.label} link pending`}
                    >
                      {icon}
                    </span>
                  )
                }

                return (
                  <a
                    aria-label={social.label}
                    href={social.url}
                    key={social.label}
                    rel="noreferrer"
                    target="_blank"
                    title={social.label}
                  >
                    {icon}
                  </a>
                )
              })}
            </div>
          )}
        </div>

        <div>
          <h3>Company</h3>
          <ul>
            {companyLinks.map((item) => (
              <li key={item.path}>
                <Link to={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Segments</h3>
          <ul>
            {categories.map((category) => (
              <li key={category.id}>
                <Link to={`/products?category=${category.id}`}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Contact</h3>
          <ul className="contact-list">
            <li>
              <MapPin size={16} />
              <span>{company.address}</span>
            </li>
            <li>
              <Phone size={16} />
              <span>{company.phone}</span>
            </li>
            <li>
              <Mail size={16} />
              <span>{company.email}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {company.name}. All rights reserved.</span>
        <span className="footer-bottom-links">
          <span>For healthcare professional and business enquiry use only.</span>
          <button onClick={openCookiePreferences} type="button">Cookie preferences</button>
        </span>
      </div>
    </footer>
  )
}

export default Footer

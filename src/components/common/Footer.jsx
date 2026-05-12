import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import navigation from '../../data/navigation.json'
import categories from '../../data/categories.json'
import company from '../../data/company.json'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-company">
          <Link className="brand footer-brand" to="/">
            <span className="brand-mark">M</span>
            <span>
              <strong>{company.name}</strong>
              <small>{company.tagline}</small>
            </span>
          </Link>
          <p>
            Business-oriented information for healthcare professionals, distributors,
            institutions, and manufacturing partners.
          </p>
        </div>

        <div>
          <h3>Company</h3>
          <ul>
            {navigation.slice(1).map((item) => (
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
        <span>For healthcare professional and business enquiry use only.</span>
      </div>
    </footer>
  )
}

export default Footer

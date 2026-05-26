import { ArrowRight, Mail, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import Container from '../common/Container'

function NewsletterCTA() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const submit = (event) => {
    event.preventDefault()
    if (!email) return
    setSent(true)
    setEmail('')
    setTimeout(() => setSent(false), 4500)
  }

  return (
    <section className="newsletter-section">
      <Container>
        <div className="newsletter-card">
          <div className="newsletter-copy">
            <span className="eyebrow eyebrow-light">
              <Mail size={13} /> Stay informed
            </span>
            <h2>Quarterly product, quality, and export updates — built for healthcare buyers.</h2>
            <p>
              Receive new product launches, regulatory updates, and Memphis facility news.
              No spam. Unsubscribe anytime.
            </p>
            <ul className="newsletter-trust">
              <li><ShieldCheck size={14} /> B2B audience only</li>
              <li><ShieldCheck size={14} /> One email per quarter</li>
            </ul>
          </div>
          <form className="newsletter-form" onSubmit={submit}>
            <label className="sr-only" htmlFor="cta-newsletter-email">Work email</label>
            <input
              id="cta-newsletter-email"
              type="email"
              required
              placeholder="you@company.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Subscribe <ArrowRight size={18} />
            </button>
            {sent && (
              <span className="newsletter-success" role="status">
                Thanks — you'll receive our next update.
              </span>
            )}
          </form>
        </div>
      </Container>
    </section>
  )
}

export default NewsletterCTA

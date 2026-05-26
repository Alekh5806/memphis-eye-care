import { ArrowRight, Mail, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import Container from '../common/Container'
import { submitNewsletterSubscription } from '../../utils/newsletterUtils'

function NewsletterCTA() {
  const [email, setEmail] = useState('')
  const [formState, setFormState] = useState({ status: 'idle', message: '' })

  const submit = async (event) => {
    event.preventDefault()
    if (!email) return

    setFormState({ status: 'loading', message: 'Subscribing...' })

    try {
      await submitNewsletterSubscription(email, 'Newsletter CTA')
      setFormState({ status: 'success', message: "Thanks - you'll receive our next update." })
      setEmail('')
      setTimeout(() => {
        setFormState((current) => (current.status === 'success' ? { status: 'idle', message: '' } : current))
      }, 4500)
    } catch (error) {
      setFormState({ status: 'error', message: error.message || 'Something went wrong. Please try again.' })
    }
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
              disabled={formState.status === 'loading'}
              onChange={(event) => setEmail(event.target.value)}
            />
            <button type="submit" className="btn btn-primary" disabled={formState.status === 'loading'}>
              {formState.status === 'loading' ? 'Subscribing...' : 'Subscribe'} <ArrowRight size={18} />
            </button>
            {formState.message && (
              <span className={`newsletter-success newsletter-success-${formState.status}`} role="status">
                {formState.message}
              </span>
            )}
          </form>
        </div>
      </Container>
    </section>
  )
}

export default NewsletterCTA

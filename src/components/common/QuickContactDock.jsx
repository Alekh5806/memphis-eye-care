import { Headset, Mail, MessageCircle } from 'lucide-react'
import company from '../../data/company.json'

const phoneDigits = company.phone?.replace(/\D/g, '') || ''

/**
 * Floating quick-contact dock that's visible on every page after a short delay,
 * offering one-tap WhatsApp / Email channels for serious B2B buyers.
 */
function QuickContactDock() {
  return (
    <div className="quick-contact-dock" aria-label="Quick contact">
      {phoneDigits && (
        <a
          className="quick-contact-bubble whatsapp"
          href={`https://wa.me/${phoneDigits}?text=${encodeURIComponent(
            'Hello Memphis Vision Care, I would like to discuss a product enquiry.'
          )}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          title="WhatsApp"
        >
          <MessageCircle size={22} />
          <span className="quick-contact-pulse" aria-hidden="true" />
        </a>
      )}
      <a
        className="quick-contact-bubble email"
        href={`mailto:${company.email}`}
        aria-label="Send email"
        title="Email"
      >
        <Mail size={20} />
      </a>
      <a
        className="quick-contact-bubble phone"
        href={`tel:${phoneDigits}`}
        aria-label="Call"
        title="Call"
      >
        <Headset size={20} />
      </a>
    </div>
  )
}

export default QuickContactDock

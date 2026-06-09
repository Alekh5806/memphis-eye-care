import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Clock3,
  FileText,
  Mail,
  Navigation,
  Phone,
  Send,
  ShieldCheck,
} from 'lucide-react'
import Button from '../components/common/Button'
import Container from '../components/common/Container'
import DocumentHead from '../components/common/DocumentHead'
import PageHero from '../components/common/PageHero'
import company from '../data/company.json'
import { submitContactForm } from '../utils/web3FormsClient'

const mapQuery = encodeURIComponent(company.address)
const googleMapEmbedUrl = `https://www.google.com/maps?q=${mapQuery}&z=15&output=embed`
const googleMapUrl = 'https://share.google/zvJwBULZHTRVgLINY'

function Contact() {
  const [searchParams] = useSearchParams()
  const enquiryType = searchParams.get('type') || 'Product enquiry'
  const selectedCountry = searchParams.get('country') || ''
  const selectedProduct = searchParams.get('product') || ''
  const [formState, setFormState] = useState({ status: 'idle', message: '' })

  async function handleSubmit(event) {
    event.preventDefault()
    setFormState({ status: 'loading', message: 'Sending your enquiry...' })

    const formData = new FormData(event.currentTarget)
    const payload = Object.fromEntries(formData)

    try {
      await submitContactForm(payload)
      setFormState({ status: 'success', message: 'Thank you. Your enquiry has been sent successfully.' })
      event.currentTarget.reset()
    } catch (error) {
      setFormState({ status: 'error', message: error.message || 'Something went wrong. Please try again.' })
    }
  }

  return (
    <>
      <DocumentHead
        title="Contact"
        description="Speak with Memphis Vision Care for sterile PFS product enquiries, contract manufacturing discussions, export partnerships, and documentation support."
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact Memphis Vision Care',
          url: 'https://www.memphisvisioncare.com/contact',
        }}
      />
      <PageHero
        eyebrow="Contact"
        title="Speak with Memphis Vision Care"
        text="Connect with our team for sterile prefilled syringe enquiries, contract manufacturing discussions, export partnerships, and documentation support."
        breadcrumbs={[{ label: 'Contact' }]}
        image="/images/hero/pages/syringe-preparation.jpg"
        imageAlt="Clinical syringe preparation representing specialist pharma enquiry support"
        imagePosition="center 34%"
        actions={[
          { label: 'Open enquiry form', to: '/contact#enquiry' },
          { label: 'Email Memphis', href: `mailto:${company.email}`, variant: 'outline' },
        ]}
        panelEyebrow="Business enquiry desk"
        panelTitle="Route product, export, CDMO, and documentation requests faster."
        panelText="Share product scope, market, volume, and document requirements so the Memphis team can respond with the right next step."
        proofPoints={['Product enquiry support', 'Export and registration support', 'Contract manufacturing discussion']}
        stats={[
          { value: '24-48h', label: 'Target response' },
          { value: '4', label: 'Enquiry routes' },
        ]}
      />
      <section id="enquiry" className="section contact-section section-ambient">
        <Container className="contact-layout">
          <div className="contact-form-panel">
            <div className="contact-panel-heading">
              <span className="eyebrow">Enquiry Desk</span>
              <h2>Start a business conversation</h2>
              <p>Share a few essentials and the right Memphis team member will respond with product, manufacturing, or partnership next steps.</p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <input className="hidden-field" type="checkbox" name="botcheck" tabIndex="-1" autoComplete="off" />
              <div className="form-grid">
                <label>
                  Name
                  <input type="text" name="name" placeholder="Your full name" required />
                </label>
                <label>
                  Company
                  <input type="text" name="company" placeholder="Company or institution" />
                </label>
                <label>
                  Email
                  <input type="email" name="email" placeholder="name@company.com" required />
                </label>
                <label>
                  Phone
                  <input type="tel" name="phone" placeholder="+91 00000 00000" />
                </label>
                <label>
                  Enquiry type
                  <select name="type" defaultValue={enquiryType}>
                    <option>Product enquiry</option>
                    <option>Contract manufacturing</option>
                    <option>Distribution partnership</option>
                    <option>Export enquiry</option>
                    <option>General enquiry</option>
                  </select>
                </label>
                <label>
                  Country / Market
                  <input type="text" name="country" placeholder="Country or market of interest" defaultValue={selectedCountry} />
                </label>
              </div>

              <label>
                Message
                <textarea
                  name="message"
                  rows="5"
                  defaultValue={selectedProduct ? `I'd like to enquire about ${selectedProduct}.\n\n` : ''}
                  placeholder={selectedCountry ? `Share product, volume, or documentation requirements for ${selectedCountry}.` : 'Share product, volume, market, or documentation requirements.'}
                  required
                />
              </label>

              <div className="contact-submit-card">
                <div>
                  <ShieldCheck size={20} />
                  <span>
                    <strong>Direct business enquiry</strong>
                    <small>Useful details help us respond with the right next step.</small>
                  </span>
                </div>
                <Button type="submit" disabled={formState.status === 'loading'}>
                  <Send size={18} /> {formState.status === 'loading' ? 'Sending...' : 'Send enquiry'}
                </Button>
              </div>
              {formState.message && (
                <p className={`form-status form-status-${formState.status}`}>{formState.message}</p>
              )}
            </form>
          </div>

          <aside className="contact-details" aria-label="Memphis Vision Care contact details">
            <div className="contact-location-panel">
              <div className="contact-panel-heading">
                <span className="eyebrow">Factory Location</span>
                <h2>Chhatral, Gandhinagar</h2>
                <p>{company.address}</p>
              </div>
              <div className="contact-map" aria-label="Google map showing Memphis Vision Care factory location">
                <iframe
                  title="Memphis Vision Care factory location on Google Maps"
                  src={googleMapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <div className="contact-location-actions">
                <Button href={googleMapUrl} target="_blank" rel="noreferrer">
                  <Navigation size={18} /> Open Google Maps
                </Button>
                <Button href={`tel:${company.phone.replace(/\s/g, '')}`} variant="secondary">
                  <Phone size={18} /> Call now
                </Button>
              </div>
            </div>

            <div className="contact-method-grid">
              <a className="contact-method-card" href={`mailto:${company.email}`}>
                <span><Mail size={20} /></span>
                <div><small>Email</small><strong>{company.email}</strong></div>
                <ArrowUpRight size={18} />
              </a>
              <a className="contact-method-card" href={`tel:${company.phone.replace(/\s/g, '')}`}>
                <span><Phone size={20} /></span>
                <div><small>Phone</small><strong>{company.phone}</strong></div>
                <ArrowUpRight size={18} />
              </a>
            </div>

            <div className="contact-support-panel">
              <div><Clock3 size={20} /><span>Priority response for product, export, and manufacturing enquiries.</span></div>
              <div><FileText size={20} /><span>Include product name, pack size, target market, and required documents where possible.</span></div>
              <div><Building2 size={20} /><span>Factory visits and audits can be coordinated after enquiry review.</span></div>
              <div><CheckCircle2 size={20} /><span>Dedicated support for B2B, institutional, and distribution partners.</span></div>
            </div>
          </aside>
        </Container>
      </section>
    </>
  )
}

export default Contact

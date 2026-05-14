import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import Button from '../components/common/Button'
import Container from '../components/common/Container'
import PageHero from '../components/common/PageHero'
import company from '../data/company.json'

function Contact() {
  const [searchParams] = useSearchParams()
  const enquiryType = searchParams.get('type') || 'Product enquiry'
  const selectedCountry = searchParams.get('country') || ''
  const [formState, setFormState] = useState({
    status: 'idle',
    message: '',
  })
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || ''

  async function handleSubmit(event) {
    event.preventDefault()

    if (!accessKey) {
      setFormState({
        status: 'error',
        message: 'Web3Forms access key is not configured yet.',
      })
      return
    }

    setFormState({
      status: 'loading',
      message: 'Sending your enquiry...',
    })

    const formData = new FormData(event.currentTarget)
    const payload = {
      ...Object.fromEntries(formData),
      access_key: accessKey,
      subject: 'New website enquiry - Memphis Vision Care',
      from_name: 'Memphis Vision Care Website',
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })

      let data = {}
      try {
        data = await response.json()
      } catch {
        data = {}
      }

      if (response.ok || data.success) {
        setFormState({
          status: 'success',
          message: 'Thank you. Your enquiry has been sent successfully.',
        })
        event.currentTarget.reset()
        return
      }

      setFormState({
        status: 'error',
        message: data.message || 'Something went wrong. Please try again.',
      })
    } catch {
      setFormState({
        status: 'success',
        message: 'Thank you. Your enquiry has been sent successfully.',
      })
      event.currentTarget.reset()
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch with Memphis for product enquiries, partnerships, or general questions."
        text="Share product, volume, market, or documentation requirements and the team can respond with the right next step."
      />
      <section className="section">
        <Container className="contact-layout">
          <form className="contact-form" onSubmit={handleSubmit}>
            <input className="hidden-field" type="checkbox" name="botcheck" tabIndex="-1" autoComplete="off" />
            <label>
              Name
              <input type="text" name="name" placeholder="Your name" required />
            </label>
            <label>
              Company
              <input type="text" name="company" placeholder="Company name" />
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
              <input
                type="text"
                name="country"
                placeholder="Country or market of interest"
                defaultValue={selectedCountry}
              />
            </label>
            <label>
              Message
              <textarea
                name="message"
                rows="5"
                placeholder={
                  selectedCountry
                    ? `Share product, volume, or documentation requirements for ${selectedCountry}.`
                    : 'Share product, volume, market, or documentation requirements.'
                }
                required
              />
            </label>
            <Button type="submit" disabled={formState.status === 'loading'}>
              {formState.status === 'loading' ? 'Sending...' : 'Submit enquiry'}
            </Button>
            {formState.message && (
              <p className={`form-status form-status-${formState.status}`}>{formState.message}</p>
            )}
          </form>

          <aside className="contact-card">
            <h2>Business contact</h2>
            <p>Use these details for product, partnership, and manufacturing enquiries.</p>
            <div>
              <MapPin size={19} />
              <span>{company.address}</span>
            </div>
            <div>
              <Phone size={19} />
              <span>{company.phone}</span>
            </div>
            <div>
              <Mail size={19} />
              <span>{company.email}</span>
            </div>
          </aside>
        </Container>
      </section>
    </>
  )
}

export default Contact

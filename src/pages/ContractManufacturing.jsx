import { BadgeCheck, Boxes, Handshake, ShieldCheck } from 'lucide-react'
import Button from '../components/common/Button'
import Container from '../components/common/Container'
import PageHero from '../components/common/PageHero'

const services = [
  'Prefilled syringe manufacturing enquiry',
  'Third-party manufacturing discussion',
  'Institutional and B2B supply support',
  'Product development and documentation coordination'
]

function ContractManufacturing() {
  return (
    <>
      <PageHero
        eyebrow="Contract manufacturing"
        title="A dedicated path for pharma partners, distributors, and institutions."
        text="Memphis supports contract manufacturing conversations with a clear service scope focused on sterile prefilled syringe products. Partners can understand the capability areas, ask questions, and start discussions around manufacturing, private label, and supply needs."
      />
      <section className="section">
        <Container className="partner-layout">
          <div className="partner-panel">
            <Boxes size={30} />
            <h2>Manufacturing partnership scope</h2>
            <p>
              Memphis is positioned as a focused partner for sterile prefilled syringe products,
              with a clean enquiry path and capability statements that can be verified by the company.
            </p>
            <Button to="/contact">Discuss a project</Button>
          </div>
          <div className="service-list">
            {services.map((service) => (
              <div key={service}>
                <BadgeCheck size={20} />
                <span>{service}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className="section section-muted">
        <Container>
          <div className="quality-card-grid">
            <div className="large-info-card">
              <Handshake size={28} />
              <h3>Partner-first communication</h3>
              <p>Make it easy for a buyer to send segment, volume, and documentation requirements.</p>
            </div>
            <div className="large-info-card">
              <ShieldCheck size={28} />
              <h3>Compliance-focused claims</h3>
              <p>Every certification or regulatory statement should be backed by actual company documents.</p>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

export default ContractManufacturing

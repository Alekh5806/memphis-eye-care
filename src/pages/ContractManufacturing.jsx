import { BadgeCheck, Boxes, Handshake, ShieldCheck } from 'lucide-react'
import Button from '../components/common/Button'
import Container from '../components/common/Container'
import DocumentHead from '../components/common/DocumentHead'
import PageHero from '../components/common/PageHero'

const services = [
  'Prefilled syringe manufacturing enquiry',
  'Third-party manufacturing discussion',
  'Institutional and B2B supply support',
  'Product development and documentation coordination',
  'Private label and packaging customisation',
  'Validated logistics and cold-chain coordination',
]

function ContractManufacturing() {
  return (
    <>
      <DocumentHead
        title="Contract Manufacturing"
        description="Discuss CDMO and third-party sterile PFS contract manufacturing with Memphis Vision Care — partner-grade quality, documentation, and supply alignment."
      />
      <PageHero
        eyebrow="Contract manufacturing"
        title="A dedicated CDMO route for pharma partners, distributors, and institutions."
        text="Memphis supports contract manufacturing conversations focused on sterile prefilled syringe products — with a clear service scope, partner-grade documentation, and disciplined supply support."
        breadcrumbs={[{ label: 'Capabilities', path: '/capabilities' }, { label: 'Contract Manufacturing' }]}
        image="/images/hero/optimized/cleanroom-manufacturing.jpg"
        imageAlt="Cleanroom manufacturing environment for sterile pharmaceutical partnerships"
        imagePosition="center"
        actions={[
          { label: 'Discuss a project', to: '/contact?type=Contract%20manufacturing' },
          { label: 'Review quality', to: '/quality', variant: 'outline' },
        ]}
        panelEyebrow="CDMO readiness"
        panelTitle="A clear route for sterile PFS manufacturing partnerships."
        panelText="Built around scope clarity, documentation confidence, and disciplined supply conversations."
        proofPoints={['Third-party manufacturing route', 'Private label and packaging support', 'Validated logistics coordination']}
        stats={[
          { value: 'PFS', label: 'Specialised focus' },
          { value: 'B2B', label: 'Partner route' },
        ]}
      />
      <section className="section section-ambient">
        <Container className="partner-layout">
          <div className="partner-panel">
            <Boxes size={30} />
            <h2>Manufacturing partnership scope</h2>
            <p>Memphis is positioned as a focused partner for sterile prefilled syringe products, with a clean enquiry path, capability statements, and documentation support that pharma partners can verify.</p>
            <Button to="/contact?type=Contract%20manufacturing">Discuss a project</Button>
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
      <section className="section section-muted section-ambient section-ambient-alt">
        <Container>
          <div className="quality-card-grid accent-cards icon-chip-cards">
            <div className="large-info-card">
              <Handshake size={28} />
              <h3>Partner-first communication</h3>
              <p>Send segment, volume, and documentation requirements — and receive a structured response from the right team.</p>
            </div>
            <div className="large-info-card">
              <ShieldCheck size={28} />
              <h3>Compliance-focused claims</h3>
              <p>Every certification or regulatory statement is backed by actual company documents — shared with verified partners.</p>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

export default ContractManufacturing

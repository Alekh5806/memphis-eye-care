import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  Factory,
  FileText,
  Handshake,
  PackageCheck,
  ShieldCheck,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/common/Button'
import Container from '../components/common/Container'
import DocumentHead from '../components/common/DocumentHead'
import PageHero from '../components/common/PageHero'
import SectionHeading from '../components/common/SectionHeading'

const capabilities = [
  { icon: Factory, title: 'Manufacturing', text: 'Sterile product preparation, prefilled syringe filling, inspection, packing, and controlled workflow communication.', to: '/manufacturing' },
  { icon: PackageCheck, title: 'Contract manufacturing', text: 'Third-party manufacturing for pharma partners seeking sterile PFS capability with documented quality systems.', to: '/contract-manufacturing' },
  { icon: Handshake, title: 'Partnership model', text: 'Structured routes for distributors, institutional buyers, export partners, and product-led commercial conversations.', to: '/partner-with-us' },
  { icon: ShieldCheck, title: 'Quality systems', text: 'QA, QC focus, validation readiness, documentation discipline, and traceability-led manufacturing confidence.', to: '/quality' },
  { icon: FileText, title: 'Regulatory documentation', text: 'Product dossier, market document, certification reference, and verified regulatory information for partners.', to: '/contact?type=Export%20enquiry' },
]

const operatingPoints = [
  'Sterile prefilled syringe product focus',
  'Business-ready enquiry routing',
  'Documentation-led partner conversations',
  'Quality and compliance-first positioning',
]

function Capabilities() {
  return (
    <>
      <DocumentHead
        title="Capabilities"
        description="Memphis Vision Care capabilities — sterile PFS manufacturing, contract manufacturing, quality systems, regulatory documentation, and partnership routes."
      />
      <PageHero
        eyebrow="Capabilities"
        title="Integrated pharma capabilities for sterile PFS partnerships."
        text="Explore Memphis Vision Care's manufacturing, quality, documentation, and partnership capabilities for distributors, institutions, export markets, and pharma partners."
        mobileTitle="Capabilities for sterile supply."
        mobileText="Manufacturing, quality, documents, and partner support."
        breadcrumbs={[{ label: 'Capabilities' }]}
        image="/images/hero/optimized/cleanroom-manufacturing.webp"
        imageAlt="Sterile cleanroom production area for pharmaceutical manufacturing"
        imagePosition="center"
        actions={[
          { label: 'Start an enquiry', to: '/contact' },
          { label: 'View products', to: '/products', variant: 'outline' },
        ]}
        panelEyebrow="Capability map"
        panelTitle="Manufacturing, quality, documentation, and partnership routes in one place."
        panelText="Designed for business buyers who need to qualify Memphis before opening a technical or commercial discussion."
        proofPoints={['Sterile PFS product focus', 'CDMO and third-party support', 'Regulatory document coordination']}
        stats={[
          { value: '5', label: 'Capability areas' },
          { value: '25+', label: 'Markets reached' },
        ]}
      />
      <section className="section section-ambient">
        <Container>
          <SectionHeading
            eyebrow="Capability areas"
            title="Focused support across manufacturing, compliance, and business development."
            text="Each capability area gives buyers a direct path to understand the company's scope, review relevant information, and begin the right enquiry."
          />
          <div className="capability-grid icon-chip-cards">
            {capabilities.map(({ icon: Icon, title, text, to }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <Link className="capability-card" to={to}>
                  <Icon size={27} />
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <strong>View details <ArrowRight size={16} /></strong>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section section-muted section-ambient section-ambient-alt">
        <Container className="capability-spotlight">
          <div>
            <span className="eyebrow">Operating focus</span>
            <h2>Built for procurement, distribution, and manufacturing conversations.</h2>
            <p>Capability information is organised around the questions business buyers usually ask first: product scope, manufacturing readiness, documentation, quality systems, and commercial route.</p>
            <Button to="/contact">Start an enquiry</Button>
          </div>
          <div className="capability-checklist">
            {operatingPoints.map((point) => (
              <div key={point}><BadgeCheck size={20} /><span>{point}</span></div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="cta-panel">
            <div>
              <span className="eyebrow">Regulatory support</span>
              <h2>Need product documents or market-specific information?</h2>
              <p>Share product, market, volume, and document requirements so the team can route your enquiry to the right capability area.</p>
            </div>
            <Button to="/contact?type=Export%20enquiry">Request documents <ClipboardCheck size={18} /></Button>
          </div>
        </Container>
      </section>
    </>
  )
}

export default Capabilities

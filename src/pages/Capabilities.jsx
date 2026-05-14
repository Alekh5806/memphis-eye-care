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
import Button from '../components/common/Button'
import Container from '../components/common/Container'
import PageHero from '../components/common/PageHero'
import SectionHeading from '../components/common/SectionHeading'

const capabilities = [
  {
    icon: Factory,
    title: 'Manufacturing',
    text: 'Sterile product preparation, prefilled syringe filling, inspection, packing, and controlled workflow communication.',
    to: '/manufacturing',
  },
  {
    icon: PackageCheck,
    title: 'Contract manufacturing',
    text: 'Third-party manufacturing discussions for pharma partners seeking sterile PFS capability, documentation, and supply alignment.',
    to: '/contract-manufacturing',
  },
  {
    icon: Handshake,
    title: 'Partnership model',
    text: 'Structured routes for distributors, institutional buyers, export partners, and product-led commercial conversations.',
    to: '/partner-with-us',
  },
  {
    icon: ShieldCheck,
    title: 'Quality systems',
    text: 'Quality assurance, QC focus, validation readiness, documentation discipline, and traceability-led manufacturing confidence.',
    to: '/quality',
  },
  {
    icon: FileText,
    title: 'Regulatory documentation',
    text: 'Product dossier, market document, certification reference, and verified regulatory information requests for partner review.',
    to: '/contact?type=Export%20enquiry',
  },
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
      <PageHero
        eyebrow="Capabilities"
        title="Integrated pharma capabilities for sterile PFS partnerships."
        text="Explore Memphis Vision Care's manufacturing, quality, documentation, and partnership capabilities for distributors, institutions, export markets, and pharma partners."
      />

      <section className="section">
        <Container>
          <SectionHeading
            eyebrow="Capability areas"
            title="Focused support across manufacturing, compliance, and business development."
            text="Each capability area gives buyers a direct path to understand the company's scope, review relevant information, and begin the right enquiry."
          />

          <div className="capability-grid">
            {capabilities.map(({ icon: Icon, title, text, to }) => (
              <Link className="capability-card" key={title} to={to}>
                <Icon size={27} />
                <h3>{title}</h3>
                <p>{text}</p>
                <strong>
                  View details <ArrowRight size={16} />
                </strong>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="section section-muted">
        <Container className="capability-spotlight">
          <div>
            <span className="eyebrow">Operating focus</span>
            <h2>Built for procurement, distribution, and manufacturing conversations.</h2>
            <p>
              Capability information is organized around the questions business buyers usually
              ask first: product scope, manufacturing readiness, documentation, quality systems,
              and commercial route.
            </p>
            <Button to="/contact">Start an enquiry</Button>
          </div>
          <div className="capability-checklist">
            {operatingPoints.map((point) => (
              <div key={point}>
                <BadgeCheck size={20} />
                <span>{point}</span>
              </div>
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
              <p>
                Share product, market, volume, and document requirements so the team can route
                your enquiry to the right capability area.
              </p>
            </div>
            <Button to="/contact?type=Export%20enquiry">
              Request documents <ClipboardCheck size={18} />
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}

export default Capabilities

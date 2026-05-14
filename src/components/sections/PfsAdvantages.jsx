import { CheckCircle2, Droplets, Hand, ShieldPlus } from 'lucide-react'
import Container from '../common/Container'
import SectionHeading from '../common/SectionHeading'

const advantages = [
  {
    icon: ShieldPlus,
    title: 'Reduced contamination risk',
    text: 'Ready-to-use presentation reduces additional handling during preparation.'
  },
  {
    icon: CheckCircle2,
    title: 'Accurate pre-measured dose',
    text: 'Standardized fill volumes support consistent product handling.'
  },
  {
    icon: Hand,
    title: 'Convenient administration',
    text: 'PFS formats simplify workflows for healthcare environments.'
  },
  {
    icon: Droplets,
    title: 'Lower wastage potential',
    text: 'Pre-filled presentations can help reduce product loss during use.'
  }
]

function PfsAdvantages() {
  return (
    <section className="section section-muted">
      <Container className="split-layout">
        <SectionHeading
          eyebrow="Why PFS"
          title="Prefilled syringe advantages explained with professional restraint."
          text="The content keeps claims clear, practical, and suitable for healthcare and procurement audiences reviewing the company for the first time."
        />
        <div className="advantage-grid">
          {advantages.map(({ icon: Icon, title, text }) => (
            <div className="advantage-card" key={title}>
              <Icon size={24} />
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default PfsAdvantages

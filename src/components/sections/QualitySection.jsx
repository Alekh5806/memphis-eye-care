import { ClipboardCheck, FileCheck2, Microscope, ShieldCheck } from 'lucide-react'
import Button from '../common/Button'
import Container from '../common/Container'

const points = [
  { icon: ShieldCheck, label: 'Quality assurance systems' },
  { icon: Microscope, label: 'Quality control laboratory focus' },
  { icon: ClipboardCheck, label: 'Documentation and traceability' },
  { icon: FileCheck2, label: 'Validation-ready workflows' }
]

function QualitySection() {
  return (
    <section className="quality-band">
      <Container className="quality-layout">
        <div>
          <span className="eyebrow">Quality and compliance</span>
          <h2>Trust should be visible before a buyer sends the first enquiry.</h2>
          <p>
            The redesigned website gives quality systems, manufacturing controls, and
            regulatory discipline a clear place in the story.
          </p>
          <Button to="/quality" variant="light">
            View quality approach
          </Button>
        </div>
        <div className="quality-points">
          {points.map(({ icon: Icon, label }) => (
            <div key={label}>
              <Icon size={22} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default QualitySection

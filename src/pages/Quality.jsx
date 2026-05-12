import { ClipboardCheck, FileText, Microscope, ShieldCheck } from 'lucide-react'
import Container from '../components/common/Container'
import PageHero from '../components/common/PageHero'

const qualityItems = [
  { icon: ShieldCheck, title: 'Quality assurance', text: 'Systems, SOPs, batch documentation, and release discipline should be communicated clearly.' },
  { icon: Microscope, title: 'Quality control', text: 'Lab capability, testing workflows, and stability information can be added when verified.' },
  { icon: ClipboardCheck, title: 'Validation', text: 'Process validation, cleaning validation, and equipment qualification can become trust-building content.' },
  { icon: FileText, title: 'Regulatory readiness', text: 'Only mention certifications and approvals that the company can document.' }
]

function Quality() {
  return (
    <>
      <PageHero
        eyebrow="Quality"
        title="A premium pharma website makes quality impossible to miss."
        text="This section is structured to hold certifications, QA/QC systems, validation details, and regulatory statements."
      />
      <section className="section">
        <Container>
          <div className="quality-card-grid">
            {qualityItems.map(({ icon: Icon, title, text }) => (
              <div className="large-info-card" key={title}>
                <Icon size={28} />
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}

export default Quality

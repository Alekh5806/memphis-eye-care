import { Factory, FlaskConical, PackageCheck, ScanSearch } from 'lucide-react'
import Container from '../components/common/Container'
import PageHero from '../components/common/PageHero'
import SectionHeading from '../components/common/SectionHeading'

const steps = [
  { icon: FlaskConical, title: 'Formulation', text: 'Sterile product preparation with controlled process documentation.' },
  { icon: Factory, title: 'PFS filling', text: 'Capability story for prefilled syringe filling and handling.' },
  { icon: ScanSearch, title: 'Inspection', text: 'Visual and quality checks positioned as part of manufacturing discipline.' },
  { icon: PackageCheck, title: 'Packing', text: 'Final packing, labelling, and business-ready supply information.' }
]

function Manufacturing() {
  return (
    <>
      <PageHero
        eyebrow="Manufacturing"
        title="Manufacturing communication focused on people, process, and controlled handling."
        text="The manufacturing page gives partners a concise view of sterile product preparation, PFS filling, inspection, packing, and documentation workflows. Real production-style imagery should remain part of the presentation because it helps the company feel tangible and trustworthy."
      />
      <section className="section">
        <Container>
          <SectionHeading
            eyebrow="Process flow"
            title="A manufacturing story made clear for institutional and B2B buyers."
          />
          <div className="process-grid">
            {steps.map(({ icon: Icon, title, text }) => (
              <div className="process-card" key={title}>
                <Icon size={25} />
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

export default Manufacturing

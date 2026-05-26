import { Globe2, Landmark, Network } from 'lucide-react'
import Button from '../components/common/Button'
import Container from '../components/common/Container'
import DocumentHead from '../components/common/DocumentHead'
import PageHero from '../components/common/PageHero'

const paths = [
  { icon: Network, title: 'Distribution partners', text: 'Build market-specific distribution and product enquiry paths with documented support.' },
  { icon: Landmark, title: 'Institutional buyers', text: 'A simple route for hospitals, agencies, and procurement teams to discuss volume and supply.' },
  { icon: Globe2, title: 'Export interest', text: 'Active export markets across Africa, Middle East, SE Asia, and EU partner enquiries.' },
]

function PartnerWithUs() {
  return (
    <>
      <DocumentHead
        title="Partner With Us"
        description="Distribution, institutional, and export partnerships with Memphis Vision Care — sterile PFS supply built around documented quality and disciplined logistics."
      />
      <PageHero
        eyebrow="Partner with us"
        title="Structured partnerships for distributors, institutions, and export markets."
        text="Distributors, institutions, and export partners can use this route to start structured conversations around products, markets, documentation, and supply requirements."
        breadcrumbs={[{ label: 'Capabilities', path: '/capabilities' }, { label: 'Partner With Us' }]}
      />
      <section className="section">
        <Container>
          <div className="quality-card-grid">
            {paths.map(({ icon: Icon, title, text }) => (
              <div className="large-info-card" key={title}>
                <Icon size={28} />
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <div className="center-action">
            <Button to="/contact?type=Distribution%20partnership">Send partnership enquiry</Button>
          </div>
        </Container>
      </section>
    </>
  )
}

export default PartnerWithUs

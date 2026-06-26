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
        mobileTitle="Partner with Memphis."
        mobileText="Distribution, institutional, and export routes."
        breadcrumbs={[{ label: 'Capabilities', path: '/capabilities' }, { label: 'Partner With Us' }]}
        image="/images/hero/optimized/export-logistics.jpg"
        imageAlt="Cargo and logistics route for international healthcare distribution partnerships"
        imagePosition="center"
        actions={[
          { label: 'Send partnership enquiry', to: '/contact?type=Distribution%20partnership' },
          { label: 'View global reach', to: '/global-reach', variant: 'outline' },
        ]}
        panelEyebrow="Partnership routes"
        panelTitle="Structured routes for distributors, institutions, and export partners."
        panelText="The hero makes the commercial paths visible immediately so the right buyer reaches the right conversation."
        proofPoints={['Distribution partner route', 'Institutional buyer route', 'Export-market route']}
        stats={[
          { value: '3', label: 'Partner paths' },
          { value: '25+', label: 'Countries served' },
        ]}
      />
      <section className="section section-ambient">
        <Container>
          <div className="quality-card-grid accent-cards icon-chip-cards">
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

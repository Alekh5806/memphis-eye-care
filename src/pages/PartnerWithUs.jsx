import { Globe2, Landmark, Network } from 'lucide-react'
import Button from '../components/common/Button'
import Container from '../components/common/Container'
import PageHero from '../components/common/PageHero'

const paths = [
  { icon: Network, title: 'Distribution partners', text: 'Build market-specific distribution and product enquiry paths.' },
  { icon: Landmark, title: 'Institutional buyers', text: 'Create a simple route for hospitals, agencies, and procurement teams.' },
  { icon: Globe2, title: 'Export interest', text: 'Add verified export markets and documents when Memphis provides them.' }
]

function PartnerWithUs() {
  return (
    <>
      <PageHero
        eyebrow="Partner with us"
        title="Make every serious buyer feel that the company is ready for business."
        text="Distributors, institutions, and export partners can use this route to start structured conversations around products, markets, documentation, and supply requirements."
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
            <Button to="/contact">Send partnership enquiry</Button>
          </div>
        </Container>
      </section>
    </>
  )
}

export default PartnerWithUs

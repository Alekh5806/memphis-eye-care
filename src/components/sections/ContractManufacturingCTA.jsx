import { ArrowRight } from 'lucide-react'
import Button from '../common/Button'
import Container from '../common/Container'

function ContractManufacturingCTA() {
  return (
    <section className="section">
      <Container>
        <div className="cta-panel">
          <div>
            <span className="eyebrow">B2B partnership</span>
            <h2>Discuss sterile PFS manufacturing requirements with Memphis.</h2>
            <p>
              Distributors, institutions, and pharma partners can share prefilled syringe
              manufacturing, private label, and supply requirements through a clear enquiry route.
            </p>
          </div>
          <Button to="/contact">
            Start an enquiry <ArrowRight size={18} />
          </Button>
        </div>
      </Container>
    </section>
  )
}

export default ContractManufacturingCTA

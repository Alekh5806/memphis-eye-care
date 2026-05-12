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
            <h2>Build the contract manufacturing page around capability, confidence, and clarity.</h2>
            <p>
              This gives distributors, institutions, and pharma partners a direct path to discuss
              prefilled syringe manufacturing, private label opportunities, and supply enquiries.
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

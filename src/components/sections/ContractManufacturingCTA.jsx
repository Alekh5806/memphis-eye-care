import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Button from '../common/Button'
import Container from '../common/Container'
import { panelReveal, revealInView, revealTransition, riseReveal } from '../../utils/revealMotion'

function ContractManufacturingCTA() {
  return (
    <section id="home-b2b" className="section b2b-partnership-section">
      <Container>
        <div className="cta-panel b2b-partnership-panel">
          <motion.div
            className="b2b-partnership-copy"
            variants={riseReveal}
            {...revealInView}
            transition={revealTransition()}
          >
            <span className="eyebrow">B2B partnership</span>
            <h2>Discuss sterile PFS manufacturing requirements with Memphis.</h2>
            <p>
              Distributors, institutions, and pharma partners can share prefilled syringe
              manufacturing, private label, and supply requirements through a clear enquiry route.
            </p>
            <div className="b2b-partnership-actions">
              <Button to="/contact?type=B2B%20partnership">
                Get in touch <ArrowRight size={18} />
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="b2b-partnership-visual"
            aria-hidden="true"
            variants={panelReveal}
            {...revealInView}
            transition={revealTransition(0.12, 0.65)}
          >
            <div className="b2b-syringe-model">
              <span className="b2b-syringe-plunger" />
              <span className="b2b-syringe-barrel">
                <span>Memphis</span>
              </span>
              <span className="b2b-syringe-tip" />
              <span className="b2b-syringe-needle" />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

export default ContractManufacturingCTA

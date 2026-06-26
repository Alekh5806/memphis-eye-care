import { ClipboardCheck, FileCheck2, Microscope, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import Button from '../common/Button'
import Container from '../common/Container'
import { revealInView, revealTransition, riseReveal } from '../../utils/revealMotion'

const points = [
  { icon: ShieldCheck, label: 'Quality assurance systems' },
  { icon: Microscope, label: 'Quality control laboratory focus' },
  { icon: ClipboardCheck, label: 'Documentation and traceability' },
  { icon: FileCheck2, label: 'Validation-ready workflows' }
]

function QualitySection() {
  return (
    <section className="quality-band" id="home-quality">
      <Container className="quality-layout">
        <motion.div variants={riseReveal} {...revealInView} transition={revealTransition()}>
          <span className="eyebrow">Quality and compliance</span>
          <h2>Trust should be visible before a buyer sends the first enquiry.</h2>
          <p>
            Quality systems, manufacturing controls, documentation, and traceability are
            positioned clearly so buyers can understand the company before starting a discussion.
          </p>
          <Button to="/quality" variant="light">
            View quality approach
          </Button>
        </motion.div>
        <motion.div
          className="quality-points"
          {...revealInView}
          transition={{ staggerChildren: 0.08 }}
        >
          {points.map(({ icon: Icon, label }, index) => (
            <motion.div
              key={label}
              variants={riseReveal}
              transition={revealTransition(index * 0.05)}
            >
              <Icon size={22} />
              <span>{label}</span>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}

export default QualitySection

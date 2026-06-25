import { ClipboardCheck, FileCheck2, Microscope, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'
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
    <section className="quality-band" id="home-quality">
      <Container className="quality-layout">
        <div>
          <span className="eyebrow">Quality and compliance</span>
          <h2>Trust should be visible before a buyer sends the first enquiry.</h2>
          <p>
            Quality systems, manufacturing controls, documentation, and traceability are
            positioned clearly so buyers can understand the company before starting a discussion.
          </p>
          <Button to="/quality" variant="light">
            View quality approach
          </Button>
        </div>
        <div className="quality-points">
          {points.map(({ icon: Icon, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.36, delay: i * 0.06 }}
            >
              <Icon size={22} />
              <span>{label}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default QualitySection

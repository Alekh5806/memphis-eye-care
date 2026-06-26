import { motion } from 'framer-motion'
import Container from '../common/Container'
import SectionHeading from '../common/SectionHeading'
import certifications from '../../data/certifications.json'
import { panelReveal, revealInView, revealTransition, riseReveal } from '../../utils/revealMotion'

function CertificationsStrip() {
  return (
    <section className="certifications-section section-muted">
      <Container>
        <div className="certifications-topline">
          <motion.div variants={riseReveal} {...revealInView} transition={revealTransition()}>
            <SectionHeading
              eyebrow="Quality & compliance"
              title="A documented quality system, recognised by partners across 25+ markets."
              text="Memphis Vision Care operates against quality standards aligned to WHO-GMP, ISO 9001:2015, and ISO 13485, with market-specific dossier support for export partners."
            />
          </motion.div>
          <motion.div
            className="compliance-visual"
            aria-hidden="true"
            variants={panelReveal}
            {...revealInView}
            transition={revealTransition(0.1, 0.62)}
          >
            <span className="compliance-map" />
            <span className="compliance-mark">QA</span>
            <span className="compliance-market">25+ export markets</span>
          </motion.div>
        </div>
        <motion.div
          className="certifications-grid"
          {...revealInView}
          transition={{ staggerChildren: 0.08 }}
        >
          {certifications.map((cert, index) => (
            <motion.article
              key={cert.id}
              className="certification-card"
              variants={riseReveal}
              transition={revealTransition(index * 0.05)}
            >
              <span className="certification-code" style={{ '--cert-accent': cert.color }}>
                {cert.name}
              </span>
              <small>{cert.fullName}</small>
              <p>{cert.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}

export default CertificationsStrip

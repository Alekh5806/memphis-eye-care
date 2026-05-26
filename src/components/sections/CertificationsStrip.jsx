import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import Container from '../common/Container'
import SectionHeading from '../common/SectionHeading'
import certifications from '../../data/certifications.json'

function CertificationsStrip() {
  return (
    <section className="certifications-section section-muted">
      <Container>
        <SectionHeading
          eyebrow="Quality & compliance"
          title="A documented quality system, recognised by partners across 25+ markets."
          text="Memphis Vision Care operates against quality standards aligned to WHO-GMP, ISO 9001:2015, and ISO 13485, with market-specific dossier support for export partners."
        />
        <div className="certifications-grid">
          {certifications.map((cert, i) => (
            <motion.article
              key={cert.id}
              className="certification-card"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <span className="certification-icon" style={{ background: `${cert.color}1a`, color: cert.color }}>
                <ShieldCheck size={22} />
              </span>
              <strong>{cert.name}</strong>
              <small>{cert.fullName}</small>
              <p>{cert.description}</p>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default CertificationsStrip

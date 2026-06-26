import Container from '../common/Container'
import SectionHeading from '../common/SectionHeading'
import certifications from '../../data/certifications.json'

function CertificationsStrip() {
  return (
    <section className="certifications-section section-muted">
      <Container>
        <div className="certifications-topline">
          <SectionHeading
            eyebrow="Quality & compliance"
            title="A documented quality system, recognised by partners across 25+ markets."
            text="Memphis Vision Care operates against quality standards aligned to WHO-GMP, ISO 9001:2015, and ISO 13485, with market-specific dossier support for export partners."
          />
          <div className="compliance-visual" aria-hidden="true">
            <span className="compliance-map" />
            <span className="compliance-mark">QA</span>
            <span className="compliance-market">25+ export markets</span>
          </div>
        </div>
        <div className="certifications-grid">
          {certifications.map((cert) => (
            <article
              key={cert.id}
              className="certification-card"
            >
              <span className="certification-code" style={{ '--cert-accent': cert.color }}>
                {cert.name}
              </span>
              <small>{cert.fullName}</small>
              <p>{cert.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default CertificationsStrip

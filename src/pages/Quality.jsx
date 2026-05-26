import { ClipboardCheck, FileText, Microscope, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import Container from '../components/common/Container'
import DocumentHead from '../components/common/DocumentHead'
import PageHero from '../components/common/PageHero'
import SectionHeading from '../components/common/SectionHeading'
import CertificationsStrip from '../components/sections/CertificationsStrip'

const qualityItems = [
  { icon: ShieldCheck, title: 'Quality assurance', text: 'Documented quality system, SOPs, batch records, and structured release discipline across all PFS lines.' },
  { icon: Microscope, title: 'Quality control', text: 'In-house and partner-lab testing for identity, assay, sterility, endotoxin, and stability indicators.' },
  { icon: ClipboardCheck, title: 'Validation', text: 'Process validation, cleaning validation, and equipment qualification aligned to GMP expectations.' },
  { icon: FileText, title: 'Regulatory readiness', text: 'Dossier coordination and partner-specific document support for active export markets.' },
]

function Quality() {
  return (
    <>
      <DocumentHead
        title="Quality Systems"
        description="Memphis Vision Care quality systems — WHO-GMP aligned manufacturing, QA/QC processes, validation, and regulatory documentation discipline."
      />
      <PageHero
        eyebrow="Quality"
        title="Quality systems built for partners that audit, register, and rely."
        text="A documented quality system covering QA, QC, validation, and regulatory readiness — communicated transparently for healthcare and B2B audiences."
        breadcrumbs={[{ label: 'Capabilities', path: '/capabilities' }, { label: 'Quality' }]}
      />
      <section className="section">
        <Container>
          <div className="quality-card-grid">
            {qualityItems.map(({ icon: Icon, title, text }, i) => (
              <motion.div
                className="large-info-card"
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <Icon size={28} />
                <h3>{title}</h3>
                <p>{text}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
      <CertificationsStrip />
      <section className="section">
        <Container>
          <SectionHeading
            eyebrow="Documentation"
            title="Common partner documentation supported on request"
            text="Memphis prepares partner-specific documentation across active markets. Submit a request via the enquiry desk for the documents relevant to your registration or procurement process."
          />
          <ul className="doc-grid">
            {['Certificate of Analysis (CoA)', 'Batch Manufacturing Record summary', 'Stability data summary', 'Method of analysis', 'GMP certificate', 'Free Sale Certificate (FSC)', 'Product dossier (CTD-aligned)', 'Material safety information'].map((doc) => (
              <li key={doc}><FileText size={16} /> {doc}</li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  )
}

export default Quality

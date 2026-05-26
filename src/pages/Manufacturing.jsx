import { ClipboardList, Factory, FlaskConical, PackageCheck, ScanSearch, ShieldCheck, Snowflake } from 'lucide-react'
import { motion } from 'framer-motion'
import Container from '../components/common/Container'
import DocumentHead from '../components/common/DocumentHead'
import PageHero from '../components/common/PageHero'
import SectionHeading from '../components/common/SectionHeading'

const steps = [
  { icon: ClipboardList, title: 'Material qualification', text: 'Active ingredient, excipient, and primary container qualification with vendor documentation.' },
  { icon: FlaskConical, title: 'Sterile formulation', text: 'Controlled sterile compounding in classified areas with batch documentation.' },
  { icon: Factory, title: 'PFS filling', text: 'Aseptic prefilled syringe filling with in-process control and traceability.' },
  { icon: ScanSearch, title: 'Visual inspection', text: 'Particulate inspection and integrity verification before release packing.' },
  { icon: PackageCheck, title: 'Labelling & packing', text: 'Market-specific labelling, serialisation support, and tamper-evident packing.' },
  { icon: ShieldCheck, title: 'QA release', text: 'QA reviews batch record, analytical data, and stability before final release.' },
]

function Manufacturing() {
  return (
    <>
      <DocumentHead
        title="Sterile PFS Manufacturing"
        description="Memphis Vision Care's sterile prefilled syringe (PFS) manufacturing flow — from material qualification and aseptic filling to QA release and partner-grade documentation."
      />
      <PageHero
        eyebrow="Manufacturing"
        title="Sterile PFS manufacturing — controlled, documented, partner-ready."
        text="A concise view of how Memphis prepares, fills, inspects, packs, and releases sterile prefilled syringe products for partners and institutional buyers."
        breadcrumbs={[{ label: 'Capabilities', path: '/capabilities' }, { label: 'Manufacturing' }]}
      />
      <section className="section">
        <Container>
          <SectionHeading
            eyebrow="Process flow"
            title="Six-step sterile PFS process built around quality and accountability."
          />
          <div className="process-grid process-grid-stepped">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <motion.div
                className="process-card"
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <span className="process-step">Step {String(i + 1).padStart(2, '0')}</span>
                <Icon size={25} />
                <h3>{title}</h3>
                <p>{text}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section section-muted">
        <Container className="capability-spotlight">
          <div>
            <span className="eyebrow">Cold-chain ready</span>
            <h2>From batch release to partner warehouse — supply discipline you can rely on.</h2>
            <p>
              Selected lines are handled under cold-chain conditions with validated logistics partners,
              ensuring product integrity through transit to your distribution centre.
            </p>
          </div>
          <div className="capability-checklist">
            <div><Snowflake size={20} /><span>2–8°C cold-chain support for sensitive PFS</span></div>
            <div><ShieldCheck size={20} /><span>Validated containers and shipping protocols</span></div>
            <div><ClipboardList size={20} /><span>Full batch traceability and CoA documentation</span></div>
          </div>
        </Container>
      </section>
    </>
  )
}

export default Manufacturing

import { BadgeCheck, Building2, Clock4, Target, Telescope, Users2 } from 'lucide-react'
import { motion } from 'framer-motion'
import Container from '../components/common/Container'
import DocumentHead from '../components/common/DocumentHead'
import PageHero from '../components/common/PageHero'
import SectionHeading from '../components/common/SectionHeading'
import company from '../data/company.json'

function About() {
  return (
    <>
      <DocumentHead
        title="About Memphis Vision Care"
        description={company.description}
      />
      <PageHero
        eyebrow="About Memphis"
        title="A focused sterile manufacturer built around dependable healthcare partnerships."
        text={company.description}
        breadcrumbs={[{ label: 'About' }]}
      />

      <section className="section">
        <Container className="split-layout about-split">
          <div>
            <SectionHeading
              eyebrow="Company profile"
              title="Built for sterile product confidence."
              text="Memphis Vision Care is a focused sterile manufacturer specialising in prefilled syringe (PFS) presentations for ophthalmic, cardiac critical care, orthopaedic, and gynaecology segments. We support hospitals, distributors, and pharma partners with reliable product supply and partner-grade documentation."
            />
            <div className="about-fact-row">
              <div><Clock4 size={20} /><strong>Founded {company.foundedYear}</strong><span>{new Date().getFullYear() - company.foundedYear}+ years of focused PFS experience</span></div>
              <div><Building2 size={20} /><strong>Chhatral · Gujarat</strong><span>Sterile manufacturing facility in Gandhinagar district</span></div>
              <div><Users2 size={20} /><strong>25+ countries</strong><span>Active distribution and pharma partner footprint</span></div>
            </div>
          </div>
          <div className="mission-grid">
            <div>
              <span className="mission-tag"><Target size={16} /> Mission</span>
              <p>{company.mission}</p>
            </div>
            <div>
              <span className="mission-tag"><Telescope size={16} /> Vision</span>
              <p>{company.vision}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="section section-muted">
        <Container>
          <SectionHeading
            eyebrow="Values"
            title="Our core values guide every batch, document, and partnership."
          />
          <div className="value-grid">
            {company.values.map((value, i) => (
              <motion.div
                className="value-card"
                key={value}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <BadgeCheck size={21} />
                <span>{value}</span>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {company.differentiators?.length > 0 && (
        <section className="section">
          <Container>
            <SectionHeading
              eyebrow="What sets us apart"
              title="Specialised. Documented. Accountable."
            />
            <div className="differentiator-grid">
              {company.differentiators.map((item, i) => (
                <motion.article
                  key={item.title}
                  className="differentiator-card"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <span className="differentiator-step">0{i + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </motion.article>
              ))}
            </div>
          </Container>
        </section>
      )}

      {company.timeline?.length > 0 && (
        <section className="section section-muted">
          <Container>
            <SectionHeading
              eyebrow="Our journey"
              title="A decade of focused sterile manufacturing milestones."
            />
            <ol className="timeline">
              {company.timeline.map((item, i) => (
                <motion.li
                  key={item.year}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <span className="timeline-year">{item.year}</span>
                  <div className="timeline-body">
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </Container>
        </section>
      )}

      {company.leadership?.length > 0 && (
        <section className="section">
          <Container>
            <SectionHeading
              eyebrow="Leadership"
              title="A focused team supporting partners with discipline and clarity."
            />
            <div className="leadership-grid">
              {company.leadership.map((person, i) => (
                <motion.article
                  key={person.name}
                  className="leadership-card"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <div className="leadership-avatar" aria-hidden="true">
                    {person.name.split(' ').slice(-2).map((part) => part[0]).join('')}
                  </div>
                  <strong>{person.name}</strong>
                  <small>{person.title}</small>
                  <p>{person.bio}</p>
                </motion.article>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  )
}

export default About

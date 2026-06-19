import { useState } from 'react'
import { BadgeCheck, Clock4, Factory, FileText, Globe2, ShieldCheck, Target, Telescope } from 'lucide-react'
import { motion } from 'framer-motion'
import Container from '../components/common/Container'
import DocumentHead from '../components/common/DocumentHead'
import PageHero from '../components/common/PageHero'
import SectionHeading from '../components/common/SectionHeading'
import company from '../data/company.json'

const profileReveal = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
}

const profileVisualReveal = {
  hidden: { opacity: 0, y: 24, scale: 0.985 },
  visible: { opacity: 1, y: 0, scale: 1 },
}

function About() {
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(() => Math.max((company.timeline?.length ?? 1) - 1, 0))
  const activeTimeline = company.timeline?.[activeTimelineIndex]

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
        mobileTitle="Focused sterile PFS manufacturing."
        mobileText="A Gujarat-based sterile manufacturer supporting hospitals, distributors, and pharma partners worldwide."
        breadcrumbs={[{ label: 'About' }]}
        image="/images/hero/optimized/cleanroom-manufacturing.jpg"
        imageAlt="Sterile manufacturing team working in a controlled cleanroom"
        imagePosition="center"
        actions={[
          { label: 'Explore capabilities', to: '/capabilities' },
          { label: 'Start an enquiry', to: '/contact', variant: 'outline' },
        ]}
        panelEyebrow="Company confidence"
        panelTitle="Focused sterile PFS manufacturing since 2014."
        panelText="A compact, accountable operation built for hospitals, distributors, and pharma partners who need verifiable sterile supply."
        proofPoints={['WHO-GMP-aligned systems', 'Partner-grade documentation', 'Export-ready communication']}
        stats={[
          { value: '10+', label: 'Years of PFS focus' },
          { value: '25+', label: 'Countries served' },
        ]}
      />

      <section className="section section-ambient about-profile-section">
        <Container className="about-profile">
          <motion.div
            className="about-profile-copy"
            variants={profileReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.28 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionHeading
              eyebrow="Company profile"
              title="Built for sterile product confidence."
              text="Memphis Vision Care is a focused sterile manufacturer specialising in prefilled syringe (PFS) presentations for ophthalmic, cardiac critical care, orthopaedic, and gynaecology segments. We support hospitals, distributors, and pharma partners with reliable product supply and partner-grade documentation."
            />
            <div className="about-profile-proof" aria-label="Company highlights">
              <motion.div
                variants={profileReveal}
                initial="hidden"
                whileInView="visible"
                whileHover={{ y: -6, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <Clock4 size={21} />
                <strong>Founded {company.foundedYear}</strong>
                <span>{new Date().getFullYear() - company.foundedYear}+ years of focused PFS experience</span>
              </motion.div>
              <motion.div
                variants={profileReveal}
                initial="hidden"
                whileInView="visible"
                whileHover={{ y: -6, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
              >
                <Factory size={21} />
                <strong>Chhatral · Gujarat</strong>
                <span>Sterile manufacturing facility in Gandhinagar district</span>
              </motion.div>
              <motion.div
                variants={profileReveal}
                initial="hidden"
                whileInView="visible"
                whileHover={{ y: -6, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <Globe2 size={21} />
                <strong>25+ countries</strong>
                <span>Active distribution and pharma partner footprint</span>
              </motion.div>
              <motion.div
                variants={profileReveal}
                initial="hidden"
                whileInView="visible"
                whileHover={{ y: -6, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
              >
                <FileText size={21} />
                <strong>Partner-grade docs</strong>
                <span>Dossiers, CoA, stability and registration support</span>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="about-profile-system"
            aria-label="Memphis company operating model"
            variants={profileReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="about-profile-visual"
              variants={profileVisualReveal}
              initial="hidden"
              whileInView="visible"
              whileHover={{ y: -4, transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] } }}
              viewport={{ once: true, amount: 0.28 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src="/images/hero/optimized/cleanroom-manufacturing.jpg" alt="Sterile Memphis manufacturing environment" loading="lazy" />
              <motion.div
                className="about-profile-visual-card"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.45, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                <ShieldCheck size={20} />
                <div>
                  <strong>Quality-led operation</strong>
                  <span>WHO-GMP-aligned systems · documented release discipline</span>
                </div>
              </motion.div>
            </motion.div>
            <div className="mission-grid about-mission-grid">
              <motion.div
                variants={profileReveal}
                initial="hidden"
                whileInView="visible"
                whileHover={{ y: -5, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="mission-tag"><Target size={16} /> Mission</span>
                <p>{company.mission}</p>
              </motion.div>
              <motion.div
                variants={profileReveal}
                initial="hidden"
                whileInView="visible"
                whileHover={{ y: -5, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="mission-tag"><Telescope size={16} /> Vision</span>
                <p>{company.vision}</p>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </section>

      <section className="section section-muted">
        <Container>
          <SectionHeading
            eyebrow="Values"
            title="Our core values guide every batch, document, and partnership."
          />
          <div className="value-grid accent-values">
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
            <div className="differentiator-grid accent-cards">
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
        <section className="section section-muted section-ambient section-ambient-alt">
          <Container>
            <SectionHeading
              eyebrow="Our journey"
              title="A decade of focused sterile manufacturing milestones."
            />
            <div className="timeline-interactive" aria-label="Interactive company milestone timeline">
              <ol className="timeline" aria-label="Company milestone timeline">
                {company.timeline.map((item, i) => {
                  const isActive = i === activeTimelineIndex

                  return (
                    <motion.li
                      key={item.year}
                      className={isActive ? 'is-active' : ''}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                    >
                      <button
                        className="timeline-year"
                        type="button"
                        aria-pressed={isActive}
                        aria-controls="timeline-active-panel"
                        aria-label={`Show ${item.year} milestone: ${item.title}`}
                        onClick={() => setActiveTimelineIndex(i)}
                        onFocus={() => setActiveTimelineIndex(i)}
                        onMouseEnter={() => setActiveTimelineIndex(i)}
                      >
                        {item.year}
                      </button>
                      <button
                        className="timeline-body"
                        type="button"
                        aria-pressed={isActive}
                        aria-controls="timeline-active-panel"
                        onClick={() => setActiveTimelineIndex(i)}
                        onFocus={() => setActiveTimelineIndex(i)}
                        onMouseEnter={() => setActiveTimelineIndex(i)}
                      >
                        <span className="timeline-body-title">{item.title}</span>
                        <span className="timeline-body-text">{item.text}</span>
                      </button>
                    </motion.li>
                  )
                })}
              </ol>
              {activeTimeline && (
                <motion.aside
                  id="timeline-active-panel"
                  className="timeline-active-panel"
                  key={activeTimeline.year}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  aria-live="polite"
                >
                  <span>{activeTimeline.year}</span>
                  <div>
                    <strong>{activeTimeline.title}</strong>
                    <p>{activeTimeline.text}</p>
                  </div>
                </motion.aside>
              )}
            </div>
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
            <div className="leadership-grid accent-cards">
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

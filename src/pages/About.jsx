import { BadgeCheck } from 'lucide-react'
import Container from '../components/common/Container'
import PageHero from '../components/common/PageHero'
import SectionHeading from '../components/common/SectionHeading'
import company from '../data/company.json'

function About() {
  return (
    <>
      <PageHero
        eyebrow="About Memphis"
        title="A focused pharma manufacturer with a sharper, more credible digital identity."
        text={company.description}
      />
      <section className="section">
        <Container className="split-layout">
          <div>
            <SectionHeading
              eyebrow="Company profile"
              title="Built for sterile product confidence."
              text="This page should eventually be strengthened with real leadership details, facility images, certificates, and verified milestones from the company."
            />
          </div>
          <div className="mission-grid">
            <div>
              <h3>Mission</h3>
              <p>{company.mission}</p>
            </div>
            <div>
              <h3>Vision</h3>
              <p>{company.vision}</p>
            </div>
          </div>
        </Container>
      </section>
      <section className="section section-muted">
        <Container>
          <SectionHeading
            eyebrow="Values"
            title="The brand should feel reliable before it feels decorative."
          />
          <div className="value-grid">
            {company.values.map((value) => (
              <div className="value-card" key={value}>
                <BadgeCheck size={21} />
                <span>{value}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}

export default About

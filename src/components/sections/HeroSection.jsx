import { ArrowRight, BadgeCheck, Factory, ShieldCheck, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import Button from '../common/Button'
import Container from '../common/Container'
import { panelReveal, revealTransition, riseReveal, usePageRevealReady } from '../../utils/revealMotion'

const trustBadges = [
  { icon: ShieldCheck, label: 'WHO-GMP aligned' },
  { icon: Factory, label: 'Sterile PFS specialist' },
  { icon: BadgeCheck, label: 'Trusted in 25+ countries' },
]

function HeroSection() {
  const isPageRevealReady = usePageRevealReady()

  return (
    <motion.section
      className="home-hero"
      initial="hidden"
      animate={isPageRevealReady ? 'visible' : 'hidden'}
      transition={{ staggerChildren: 0.12 }}
    >
      <div className="home-hero-bg" aria-hidden="true">
        <img src="/images/hero/optimized/cleanroom-manufacturing.webp" alt="" fetchPriority="high" />
        <span className="home-hero-orb home-hero-orb-1" />
        <span className="home-hero-orb home-hero-orb-2" />
        <span className="home-hero-grid" />
      </div>

      <Container className="hero-layout">
        <motion.div
          className="hero-copy"
          variants={riseReveal}
          transition={revealTransition(0, 0.72)}
        >
          <span className="eyebrow eyebrow-hero">
            <Sparkles size={13} /> Sterile prefilled syringe manufacturer
          </span>
          <h1>
            <span className="hero-title-desktop">
              Precision-engineered <span className="text-gradient">sterile PFS</span> for the world's most dependable healthcare partners.
            </span>
            <span className="hero-title-mobile">
              Sterile PFS, made dependable.
            </span>
          </h1>
          <p>
            <span className="hero-text-desktop">
              Memphis Vision Care manufactures ophthalmic, cardiac critical care, orthopaedic,
              and gynaecology prefilled syringes — quality-led, partner-grade, and supplied across 25+ countries.
            </span>
            <span className="hero-text-mobile">
              Quality-led prefilled syringe supply for healthcare partners worldwide.
            </span>
          </p>
          <div className="hero-actions">
            <Button to="/products">
              Explore products <ArrowRight size={18} />
            </Button>
            <Button to="/contact?type=Export%20enquiry" variant="outline">
              Talk to our team
            </Button>
          </div>

          <ul className="hero-trust-row" aria-label="Quality highlights">
            {trustBadges.map(({ icon: Icon, label }) => (
              <li key={label}>
                <Icon size={15} />
                {label}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="hero-visual"
          variants={panelReveal}
          transition={revealTransition(0.18, 0.82)}
        >
          <div className="hero-visual-frame">
            <img src="/images/hero/pharma1.webp" alt="Sterile prefilled syringe manufacturing line" loading="lazy" fetchPriority="low" />
          </div>
          <motion.div
            className="hero-badge hero-badge-top"
            variants={riseReveal}
            transition={revealTransition(0.42, 0.55)}
          >
            <ShieldCheck size={19} />
            <div>
              <strong>Quality-led approach</strong>
              <span>QA release · 99.6% acceptance</span>
            </div>
          </motion.div>
          <motion.div
            className="hero-badge hero-badge-bottom"
            variants={riseReveal}
            transition={revealTransition(0.54, 0.55)}
          >
            <Factory size={19} />
            <div>
              <strong>CDMO ready</strong>
              <span>Partner-grade documentation</span>
            </div>
          </motion.div>
        </motion.div>
      </Container>

      <a className="hero-scroll-cue" href="#home-stats" aria-label="Scroll to stats">
        <span />
      </a>
    </motion.section>
  )
}

export default HeroSection

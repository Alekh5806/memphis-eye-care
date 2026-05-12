import { ArrowRight, BadgeCheck, Factory, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import Button from '../common/Button'
import Container from '../common/Container'

function HeroSection() {
  return (
    <section className="home-hero">
      <Container className="hero-layout">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <span className="eyebrow">Sterile prefilled syringe manufacturing</span>
          <h1>Professional pharma manufacturing built around precision, quality, and trust.</h1>
          <p>
            A modern digital presence for Memphis Vision Care, focused on ophthalmic,
            critical care, orthopaedic, gynaecology, and contract manufacturing opportunities.
          </p>
          <div className="hero-actions">
            <Button to="/products">
              Explore products <ArrowRight size={18} />
            </Button>
            <Button to="/contract-manufacturing" variant="secondary">
              Partner with us
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <img src="/images/hero/sterile-pfs-lab.svg" alt="Sterile prefilled syringe manufacturing" />
          <div className="hero-badge hero-badge-top">
            <ShieldCheck size={19} />
            Quality-led process
          </div>
          <div className="hero-badge hero-badge-bottom">
            <Factory size={19} />
            B2B manufacturing
          </div>
        </motion.div>
      </Container>

      <Container className="trust-strip">
        <div>
          <BadgeCheck size={18} />
          Sterile PFS focus
        </div>
        <div>
          <BadgeCheck size={18} />
          Healthcare professional audience
        </div>
        <div>
          <BadgeCheck size={18} />
          Dynamic product catalogue
        </div>
      </Container>
    </section>
  )
}

export default HeroSection

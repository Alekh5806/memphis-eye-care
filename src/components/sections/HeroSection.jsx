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
          <span className="eyebrow">Memphis Vision Care Pvt. Ltd.</span>
          <h1>Precision-led sterile PFS manufacturing for dependable healthcare partnerships.</h1>
          <p>
            A focused pharma platform for ophthalmic, critical care, orthopaedic, and
            gynaecology prefilled syringe products, presented with the clarity buyers expect
            from a modern manufacturing partner.
          </p>
          <div className="hero-actions">
            <Button to="/products">
              Explore products <ArrowRight size={18} />
            </Button>
            <Button to="/capabilities" variant="secondary">
              View capabilities
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <img src="/images/hero/pharma1.webp" alt="Sterile prefilled syringe manufacturing" />
          <div className="hero-badge hero-badge-top">
            <ShieldCheck size={19} />
            Quality-led approach
          </div>
          <div className="hero-badge hero-badge-bottom">
            <Factory size={19} />
            Partner-ready
          </div>
          <div className="hero-panel">
            <strong>Focused sterile portfolio</strong>
            <span>Products, quality, and partnership routes in one professional experience.</span>
          </div>
        </motion.div>
      </Container>

      <Container className="trust-strip">
        <div>
          <BadgeCheck size={18} />
          Sterile PFS portfolio
        </div>
        <div>
          <BadgeCheck size={18} />
          Quality-first positioning
        </div>
        <div>
          <BadgeCheck size={18} />
          B2B enquiry ready
        </div>
      </Container>
    </section>
  )
}

export default HeroSection

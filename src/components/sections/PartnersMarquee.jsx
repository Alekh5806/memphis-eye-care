import { motion } from 'framer-motion'
import partners from '../../data/partners.json'
import { revealInView, revealTransition, riseReveal } from '../../utils/revealMotion'

/**
 * Continuous, low-noise partner/trust marquee. Decorative — pauses on hover.
 */
function PartnersMarquee() {
  const items = [...partners, ...partners]
  return (
    <section className="partners-marquee" aria-label="Trusted partner segments">
      <motion.div
        className="container partners-marquee-head"
        variants={riseReveal}
        {...revealInView}
        transition={revealTransition()}
      >
        <span className="eyebrow">Trusted by</span>
        <h2>Hospitals, distributors and pharma partners across 25+ countries.</h2>
      </motion.div>
      <div className="partners-marquee-track" role="list">
        {items.map((p, i) => (
          <span key={`${p.id}-${i}`} className="partners-marquee-item" role="listitem">
            <span className="partners-marquee-dot" aria-hidden="true" />
            <strong>{p.name}</strong>
            <small>{p.type}</small>
          </span>
        ))}
      </div>
    </section>
  )
}

export default PartnersMarquee

import { BadgeCheck, CircleGauge, Droplets, HandHeart, ShieldCheck, ShieldPlus, Sparkles, Syringe } from 'lucide-react'
import { motion } from 'framer-motion'
import Container from '../common/Container'
import SectionHeading from '../common/SectionHeading'
import content from '../../data/pfsAdvantages.json'

const iconMap = {
  BadgeCheck,
  CircleGauge,
  Droplets,
  HandHeart,
  ShieldCheck,
  ShieldPlus,
  Sparkles,
  Syringe,
}

const hexToRgb = (hex) => {
  const fallback = '15, 166, 179'
  const value = hex?.replace('#', '').trim()

  if (!value || !/^[\da-f]{3}([\da-f]{3})?$/i.test(value)) {
    return fallback
  }

  const normalized = value.length === 3
    ? value.split('').map((character) => character + character).join('')
    : value

  return [
    parseInt(normalized.slice(0, 2), 16),
    parseInt(normalized.slice(2, 4), 16),
    parseInt(normalized.slice(4, 6), 16),
  ].join(', ')
}

const getAccentStyle = (accent = '#0fa6b3') => ({
  '--advantage-accent': accent,
  '--advantage-accent-rgb': hexToRgb(accent),
})

function PfsAdvantages() {
  const { eyebrow, title, text, items } = content

  return (
    <section className="section section-muted pfs-advantages-section" id="home-cdmo">
      <Container className="split-layout">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          text={text}
        />
        <div className="advantage-grid">
          {items.map(({ id, icon, accent, signal, title, text }, i) => {
            const Icon = iconMap[icon] ?? ShieldCheck

            return (
              <motion.article
                className="advantage-card"
                key={id ?? title}
                style={getAccentStyle(accent)}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.42, delay: i * 0.05 }}
              >
                <div className="advantage-card-top">
                  <span className="advantage-icon" aria-hidden="true">
                    <Icon size={26} strokeWidth={2.2} />
                  </span>
                  {signal && <span className="advantage-signal">{signal}</span>}
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
                <span className="advantage-card-line" aria-hidden="true" />
              </motion.article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export default PfsAdvantages

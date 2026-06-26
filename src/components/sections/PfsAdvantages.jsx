import { motion } from 'framer-motion'
import Container from '../common/Container'
import SectionHeading from '../common/SectionHeading'
import content from '../../data/pfsAdvantages.json'
import { revealInView, revealTransition, riseReveal } from '../../utils/revealMotion'

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
        <motion.div variants={riseReveal} {...revealInView} transition={revealTransition()}>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            text={text}
          />
        </motion.div>
        <motion.div
          className="advantage-grid"
          {...revealInView}
          transition={{ staggerChildren: 0.08 }}
        >
          {items.map(({ id, accent, title, text }, i) => (
            <motion.article
              className="advantage-card"
              key={id ?? title}
              style={getAccentStyle(accent)}
              variants={riseReveal}
              transition={revealTransition(i * 0.05)}
            >
              <div className="advantage-card-top">
                <span className="advantage-number">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
              <span className="advantage-card-line" aria-hidden="true" />
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}

export default PfsAdvantages

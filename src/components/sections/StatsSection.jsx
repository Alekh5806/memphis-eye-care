import { Globe2, PackageCheck, ShieldCheck, TimerReset } from 'lucide-react'
import { motion } from 'framer-motion'
import Counter from '../common/Counter'
import stats from '../../data/stats.json'
import { revealInView, revealTransition, riseReveal } from '../../utils/revealMotion'

const statIcons = [Globe2, PackageCheck, TimerReset, ShieldCheck]

function StatsSection() {
  return (
    <section className="stats-section" id="home-stats">
      <motion.div
        className="container stats-grid"
        {...revealInView}
        transition={{ staggerChildren: 0.08 }}
      >
        {stats.map((item, index) => {
          const Icon = statIcons[index] ?? ShieldCheck
          return (
          <motion.div
            className="stat-card"
            key={item.label}
            variants={riseReveal}
            transition={revealTransition(index * 0.04)}
          >
            <span className="stat-card-icon" aria-hidden="true">
              <Icon size={22} />
            </span>
            <div className="stat-card-copy">
              <strong>
                <Counter to={item.value} />
              </strong>
              <span>{item.label}</span>
              {item.sub && <small>{item.sub}</small>}
            </div>
          </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}

export default StatsSection

import { motion } from 'framer-motion'
import { Globe2, PackageCheck, ShieldCheck, TimerReset } from 'lucide-react'
import Counter from '../common/Counter'
import stats from '../../data/stats.json'

const statIcons = [Globe2, PackageCheck, TimerReset, ShieldCheck]

function StatsSection() {
  return (
    <section className="stats-section" id="home-stats">
      <div className="container stats-grid">
        {stats.map((item, index) => {
          const Icon = statIcons[index] ?? ShieldCheck
          return (
          <motion.div
            className="stat-card"
            key={item.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
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
      </div>
    </section>
  )
}

export default StatsSection

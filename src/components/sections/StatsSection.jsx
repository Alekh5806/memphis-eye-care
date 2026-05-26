import { motion } from 'framer-motion'
import Counter from '../common/Counter'
import stats from '../../data/stats.json'

function StatsSection() {
  return (
    <section className="stats-section" id="home-stats">
      <div className="container stats-grid">
        {stats.map((item, index) => (
          <motion.div
            className="stat-card"
            key={item.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
          >
            <strong>
              <Counter to={item.value} />
            </strong>
            <span>{item.label}</span>
            {item.sub && <small>{item.sub}</small>}
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default StatsSection

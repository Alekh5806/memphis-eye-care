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
          <div
            className="stat-card"
            key={item.label}
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
          </div>
          )
        })}
      </div>
    </section>
  )
}

export default StatsSection

import stats from '../../data/stats.json'

function StatsSection() {
  return (
    <section className="stats-section">
      <div className="container stats-grid">
        {stats.map((item) => (
          <div className="stat-card" key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default StatsSection

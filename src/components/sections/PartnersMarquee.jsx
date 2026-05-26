import partners from '../../data/partners.json'

/**
 * Continuous, low-noise partner/trust marquee. Decorative — pauses on hover.
 */
function PartnersMarquee() {
  const items = [...partners, ...partners]
  return (
    <section className="partners-marquee" aria-label="Trusted partner segments">
      <div className="container partners-marquee-head">
        <span className="eyebrow">Trusted by</span>
        <h2>Hospitals, distributors and pharma partners across 25+ countries.</h2>
      </div>
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

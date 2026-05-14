import {
  ArrowRight,
  BadgeCheck,
  FileText,
  Globe2,
  MapPin,
  PackageCheck,
  Send,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import Button from '../common/Button'
import Container from '../common/Container'
import SectionHeading from '../common/SectionHeading'
import {
  getPluralizedLabel,
  globalReachCountries,
  globalReachSettings,
} from '../../utils/globalReachUtils'

function GlobalReachSection({ variant = 'preview' }) {
  const [selectedId, setSelectedId] = useState(globalReachCountries[0]?.id)
  const selectedCountry = useMemo(
    () => globalReachCountries.find((country) => country.id === selectedId) || globalReachCountries[0],
    [selectedId]
  )
  const isFull = variant === 'full'
  const totalProductSegments = new Set(globalReachCountries.flatMap((country) => country.products)).size
  const countryCount = globalReachCountries.length
  const mapMarketLabel = getPluralizedLabel(countryCount, {
    labelSingular: 'active market',
    labelPlural: 'active markets',
  })

  const kpiIcons = [Globe2, PackageCheck, Send]
  const capabilityItems = globalReachSettings.kpis.map((item, index) => {
    if (item.type === 'countryCount') {
      return {
        icon: kpiIcons[index] || Globe2,
        value: countryCount,
        label: getPluralizedLabel(countryCount, item),
      }
    }

    if (item.type === 'uniqueProductCount') {
      return {
        icon: kpiIcons[index] || PackageCheck,
        value: totalProductSegments,
        label: getPluralizedLabel(totalProductSegments, item),
      }
    }

    return {
      icon: kpiIcons[index] || Send,
      value: item.value,
      label: item.label,
    }
  })

  if (!selectedCountry) return null

  return (
    <section className={`global-reach-section ${isFull ? 'global-reach-full' : ''}`}>
      <Container>
        <div className="section-topline global-reach-topline">
          <SectionHeading
            eyebrow={globalReachSettings.eyebrow}
            title={globalReachSettings.section.title}
            text={globalReachSettings.section.text}
          />
          {!isFull && (
            <Button to="/global-reach" variant="secondary">
              {globalReachSettings.section.previewButtonLabel} <ArrowRight size={18} />
            </Button>
          )}
        </div>

        {isFull && (
          <div className="global-capability-strip">
            {capabilityItems.map(({ icon: Icon, value, label }) => (
              <div key={label}>
                <Icon size={20} />
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        )}

        <div className="global-reach-layout">
          <div className="world-map-panel" aria-label="Interactive export countries map">
            <div className="world-map-header">
              <div>
                <Globe2 size={22} />
                <span>{globalReachSettings.mapTitle}</span>
              </div>
              <small>{countryCount} {mapMarketLabel}</small>
            </div>

            <div className="world-map">
              <svg className="world-map-svg" viewBox="0 0 920 440" aria-hidden="true">
                <path className="map-grid-line" d="M0 110H920M0 220H920M0 330H920M184 0V440M368 0V440M552 0V440M736 0V440" />
                <path className="map-continent" d="M143 126c38-37 105-48 159-27 30 12 43 35 30 60-12 24-46 34-74 48-38 19-54 47-88 51-41 6-83-18-96-57-9-29 8-55 69-75Z" />
                <path className="map-continent" d="M375 113c43-28 112-24 153 6 32 24 30 57-7 76-29 16-77 12-102 33-21 18-9 52-34 68-29 18-75-1-84-36-8-32 26-59 25-87 0-22 18-41 49-60Z" />
                <path className="map-continent map-continent-focus" d="M466 210c48-30 100 0 113 55 15 63-34 118-82 100-24-9-32-35-40-61-7-25-28-38-25-59 2-14 14-26 34-35Z" />
                <path className="map-continent" d="M546 113c59-46 180-46 242-1 51 37 31 88-36 103-40 10-84-1-120 14-35 15-49 51-85 48-36-3-65-33-59-72 4-30 23-63 58-92Z" />
                <path className="map-continent" d="M694 312c35-20 82-18 108 3 20 17 12 39-17 47-29 9-72 4-95-11-22-14-19-27 4-39Z" />
              </svg>

              {globalReachCountries.map((country) => (
                <button
                  className={`country-marker ${selectedCountry.id === country.id ? 'is-active' : ''}`}
                  key={country.id}
                  style={{
                    left: `${country.coordinates.x}%`,
                    top: `${country.coordinates.y}%`,
                  }}
                  type="button"
                  onClick={() => setSelectedId(country.id)}
                  aria-label={`View export details for ${country.name}`}
                >
                  <span />
                  <strong className="country-tooltip">
                    {country.name}
                    <small>{country.region} · {country.products[0]}</small>
                  </strong>
                </button>
              ))}

              <div className="map-caption">
                <span>{selectedCountry.region}</span>
                <strong>{selectedCountry.name}</strong>
              </div>
            </div>

            <div className="market-selector" aria-label="Select export country">
              {globalReachCountries.map((country) => (
                <button
                  className={selectedCountry.id === country.id ? 'is-active' : ''}
                  key={country.id}
                  type="button"
                  onClick={() => setSelectedId(country.id)}
                >
                  <MapPin size={16} />
                  <span>{country.name}</span>
                  <small>{country.region}</small>
                </button>
              ))}
            </div>
          </div>

          <aside className="country-detail-card">
            <div className="country-detail-head">
              <span className="country-status">
                <BadgeCheck size={16} />
                {selectedCountry.status}
              </span>
              <h3>{selectedCountry.name}</h3>
              <p>{selectedCountry.summary}</p>
            </div>

            <div className="country-meta-grid">
              <div>
                <Globe2 size={18} />
                <span>Region</span>
                <strong>{selectedCountry.region}</strong>
              </div>
              <div>
                <PackageCheck size={18} />
                <span>Products</span>
                <strong>{selectedCountry.products.length} segments</strong>
              </div>
            </div>

            <div className="country-products">
              <h4>Products exported</h4>
              {selectedCountry.products.map((product) => (
                <span key={product}>{product}</span>
              ))}
            </div>

            {isFull && (
              <div className="country-detail-list">
                <h4>Partner support</h4>
                {selectedCountry.details.map((detail) => (
                  <div key={detail}>
                    <FileText size={16} />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="country-card-action">
              <Button
                to={`/contact?type=Export%20enquiry&country=${encodeURIComponent(selectedCountry.name)}`}
              >
                Enquire now <ArrowRight size={18} />
              </Button>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  )
}

export default GlobalReachSection

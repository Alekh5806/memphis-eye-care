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
import { worldMapPath } from '../../data/worldMapPath'
import {
  getPluralizedLabel,
  globalReachCountries,
  globalReachSettings,
} from '../../utils/globalReachUtils'

function GlobalReachSection({ mobileFull = false, variant = 'preview' }) {
  const [selectedId, setSelectedId] = useState(globalReachCountries[0]?.id)
  const selectedCountry = useMemo(
    () => globalReachCountries.find((country) => country.id === selectedId) || globalReachCountries[0],
    [selectedId]
  )
  const isFull = variant === 'full'
  const showMobileFull = mobileFull && !isFull
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
    <section
      className={[
        'global-reach-section',
        isFull ? 'global-reach-full' : '',
        showMobileFull ? 'global-reach-mobile-full' : '',
      ].filter(Boolean).join(' ')}
    >
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

        {(isFull || showMobileFull) && (
          <div className={`global-capability-strip ${showMobileFull ? 'global-reach-mobile-only' : ''}`.trim()}>
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
              <div className="world-map-title">
                <Globe2 size={22} />
                <span>{globalReachSettings.mapTitle}</span>
                <small>{countryCount} {mapMarketLabel}</small>
              </div>
              <div className="map-caption" aria-live="polite">
                <MapPin size={14} />
                <div>
                  <span>{selectedCountry.region}</span>
                  <strong>{selectedCountry.name}</strong>
                </div>
              </div>
            </div>

            <div className="world-map">
              <svg
                className="world-map-svg"
                viewBox="0 0 1000 500"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="oceanGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#eaf2fc" />
                    <stop offset="100%" stopColor="#dbe7f7" />
                  </linearGradient>
                  <linearGradient id="landGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#cdddf3" />
                    <stop offset="100%" stopColor="#aac3e4" />
                  </linearGradient>
                  <pattern id="oceanDots" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
                    <circle cx="1.2" cy="1.2" r="0.9" fill="rgba(41, 87, 162, 0.18)" />
                  </pattern>
                  <filter id="landShadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" />
                    <feOffset dx="0" dy="1.2" result="off" />
                    <feComponentTransfer><feFuncA type="linear" slope="0.35" /></feComponentTransfer>
                    <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>

                {/* Ocean background + dotted texture */}
                <rect width="1000" height="500" fill="url(#oceanGradient)" />
                <rect width="1000" height="500" fill="url(#oceanDots)" />

                {/* Graticule – latitude / longitude grid */}
                <g className="map-graticule">
                  <line x1="0" y1="125" x2="1000" y2="125" />
                  <line x1="0" y1="250" x2="1000" y2="250" strokeDasharray="4 4" />
                  <line x1="0" y1="375" x2="1000" y2="375" />
                  <line x1="167" y1="0" x2="167" y2="500" />
                  <line x1="333" y1="0" x2="333" y2="500" />
                  <line x1="500" y1="0" x2="500" y2="500" strokeDasharray="4 4" />
                  <line x1="667" y1="0" x2="667" y2="500" />
                  <line x1="833" y1="0" x2="833" y2="500" />
                </g>

                {/* Real country outlines – Natural Earth, equirectangular */}
                <g className="map-continents" filter="url(#landShadow)" fill="url(#landGradient)">
                  <path d={worldMapPath} fillRule="evenodd" />
                </g>

                {/* Subtle highlight ring around the focus region (India / SE Asia) */}
                <circle
                  cx="760"
                  cy="200"
                  r="70"
                  fill="none"
                  stroke="rgba(15, 154, 166, 0.32)"
                  strokeWidth="1.2"
                  strokeDasharray="3 4"
                />
              </svg>

              {globalReachCountries.map((country) => {
                const { x, y } = country.coordinates
                const tooltipClasses = ['country-tooltip']
                if (y < 22) tooltipClasses.push('is-bottom')
                if (x < 14) tooltipClasses.push('is-right')
                else if (x > 86) tooltipClasses.push('is-left')

                return (
                  <button
                    className={`country-marker ${selectedCountry.id === country.id ? 'is-active' : ''}`}
                    key={country.id}
                    style={{ left: `${x}%`, top: `${y}%` }}
                    type="button"
                    onClick={() => setSelectedId(country.id)}
                    aria-label={`View export details for ${country.name}`}
                  >
                    <span />
                    <strong className={tooltipClasses.join(' ')}>
                      {country.name}
                      <small>{country.region} · {country.products[0]}</small>
                    </strong>
                  </button>
                )
              })}
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

            {(isFull || showMobileFull) && (
              <div className={`country-detail-list ${showMobileFull ? 'global-reach-mobile-only' : ''}`.trim()}>
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

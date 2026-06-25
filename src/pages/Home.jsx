import { lazy, Suspense } from 'react'
import { Factory, Globe2, PackageCheck, ShieldCheck } from 'lucide-react'
import DocumentHead from '../components/common/DocumentHead'
import CertificationsStrip from '../components/sections/CertificationsStrip'
import ContractManufacturingCTA from '../components/sections/ContractManufacturingCTA'
import FeaturedProducts from '../components/sections/FeaturedProducts'
import HeroSection from '../components/sections/HeroSection'
import PartnersMarquee from '../components/sections/PartnersMarquee'
import PfsAdvantages from '../components/sections/PfsAdvantages'
import ProductSegments from '../components/sections/ProductSegments'
import QualitySection from '../components/sections/QualitySection'
import StatsSection from '../components/sections/StatsSection'
import company from '../data/company.json'

// Heavy below-the-fold section (world-map paths) — split into its own chunk
const GlobalReachSection = lazy(() => import('../components/sections/GlobalReachSection'))

const mobilePathItems = [
  { href: '#home-products', icon: PackageCheck, label: 'Products', meta: 'Sterile PFS' },
  { href: '#home-quality', icon: ShieldCheck, label: 'Quality', meta: 'Compliance' },
  { href: '#home-global', icon: Globe2, label: 'Global', meta: '25+ markets' },
  { href: '#home-cdmo', icon: Factory, label: 'CDMO', meta: 'Partners' },
]

function Home() {
  return (
    <>
      <DocumentHead
        title={null}
        description={company.description}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: company.name,
          url: 'https://www.memphisvisioncare.com/',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://www.memphisvisioncare.com/products?search={query}',
            'query-input': 'required name=query',
          },
        }}
      />
      <HeroSection />
      <nav className="home-mobile-path" aria-label="Home page quick sections">
        {mobilePathItems.map(({ href, icon: Icon, label, meta }) => (
          <a key={href} href={href}>
            <Icon size={18} aria-hidden="true" />
            <span>{label}</span>
            <small>{meta}</small>
          </a>
        ))}
      </nav>
      <PartnersMarquee />
      <StatsSection />
      <ProductSegments />
      <PfsAdvantages />
      <CertificationsStrip />
      <QualitySection />
      <Suspense fallback={<div id="home-global" className="global-reach-skeleton" aria-hidden="true" />}>
        <GlobalReachSection mobileFull />
      </Suspense>
      <FeaturedProducts />
      <ContractManufacturingCTA />
    </>
  )
}

export default Home

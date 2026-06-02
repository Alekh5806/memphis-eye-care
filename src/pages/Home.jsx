import { lazy, Suspense } from 'react'
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
      <PartnersMarquee />
      <StatsSection />
      <ProductSegments />
      <PfsAdvantages />
      <CertificationsStrip />
      <QualitySection />
      <Suspense fallback={<div style={{ minHeight: 540 }} />}>
        <GlobalReachSection />
      </Suspense>
      <FeaturedProducts />
      <ContractManufacturingCTA />
    </>
  )
}

export default Home

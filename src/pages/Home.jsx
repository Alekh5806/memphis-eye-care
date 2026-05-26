import DocumentHead from '../components/common/DocumentHead'
import CertificationsStrip from '../components/sections/CertificationsStrip'
import ContractManufacturingCTA from '../components/sections/ContractManufacturingCTA'
import FeaturedProducts from '../components/sections/FeaturedProducts'
import GlobalReachSection from '../components/sections/GlobalReachSection'
import HeroSection from '../components/sections/HeroSection'
import PartnersMarquee from '../components/sections/PartnersMarquee'
import PfsAdvantages from '../components/sections/PfsAdvantages'
import ProductSegments from '../components/sections/ProductSegments'
import QualitySection from '../components/sections/QualitySection'
import StatsSection from '../components/sections/StatsSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import company from '../data/company.json'

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
      <GlobalReachSection />
      <TestimonialsSection />
      <FeaturedProducts />
      <ContractManufacturingCTA />
    </>
  )
}

export default Home

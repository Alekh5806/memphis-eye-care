import ContractManufacturingCTA from '../components/sections/ContractManufacturingCTA'
import FeaturedProducts from '../components/sections/FeaturedProducts'
import HeroSection from '../components/sections/HeroSection'
import PfsAdvantages from '../components/sections/PfsAdvantages'
import ProductSegments from '../components/sections/ProductSegments'
import QualitySection from '../components/sections/QualitySection'
import StatsSection from '../components/sections/StatsSection'

function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ProductSegments />
      <PfsAdvantages />
      <QualitySection />
      <FeaturedProducts />
      <ContractManufacturingCTA />
    </>
  )
}

export default Home

import { lazy, Suspense } from 'react'
import { Factory, Globe2, PackageCheck, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'
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
import { revealTransition, revealViewport, riseReveal } from '../utils/revealMotion'

// Heavy below-the-fold section (world-map paths) — split into its own chunk
const GlobalReachSection = lazy(() => import('../components/sections/GlobalReachSection'))

const mobilePathItems = [
  { href: '#home-products', icon: PackageCheck, label: 'Products', meta: 'Sterile PFS' },
  { href: '#home-quality', icon: ShieldCheck, label: 'Quality', meta: 'Compliance' },
  { href: '#home-global', icon: Globe2, label: 'Global', meta: '25+ markets' },
  { href: '#home-b2b', icon: Factory, label: 'CDMO', meta: 'Partners' },
]

function Home() {
  return (
    <>
      <DocumentHead
        title={null}
        description="Sterile prefilled syringe manufacturer for ophthalmic, cardiac, orthopaedic, and gynaecology segments, serving healthcare partners across 25+ countries."
      />
      <HeroSection />
      <motion.nav
        className="home-mobile-path"
        aria-label="Home page quick sections"
        variants={riseReveal}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        transition={revealTransition(0.08)}
      >
        {mobilePathItems.map(({ href, icon: Icon, label, meta }) => (
          <a key={href} href={href}>
            <Icon size={18} aria-hidden="true" />
            <span>{label}</span>
            <small>{meta}</small>
          </a>
        ))}
      </motion.nav>
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

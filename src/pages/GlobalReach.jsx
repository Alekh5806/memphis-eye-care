import GlobalReachSection from '../components/sections/GlobalReachSection'
import ContractManufacturingCTA from '../components/sections/ContractManufacturingCTA'
import DocumentHead from '../components/common/DocumentHead'
import PageHero from '../components/common/PageHero'
import { globalReachSettings } from '../utils/globalReachUtils'

function GlobalReach() {
  return (
    <>
      <DocumentHead
        title="Global Reach"
        description={globalReachSettings.pageHero.text}
      />
      <PageHero
        eyebrow={globalReachSettings.pageHero.eyebrow}
        title={globalReachSettings.pageHero.title}
        text={globalReachSettings.pageHero.text}
        breadcrumbs={[{ label: 'Global Reach' }]}
        image="/images/hero/pages/export-logistics.jpg"
        imageAlt="International cargo containers representing pharmaceutical export logistics"
        imagePosition="center"
        actions={[
          { label: 'Explore markets', to: '/global-reach' },
          { label: 'Send export enquiry', to: '/contact?type=Export%20enquiry', variant: 'outline' },
        ]}
        panelEyebrow="Export footprint"
        panelTitle="International supply communication built for distributor confidence."
        panelText="Country-focused enquiries can include product scope, registration support, volume, and logistics requirements."
        proofPoints={['Africa, Middle East, SE Asia and EU interest', 'Market-specific documentation support', 'Distributor-first enquiry path']}
        stats={[
          { value: '25+', label: 'Countries served' },
          { value: '4', label: 'Regions supported' },
        ]}
      />
      <GlobalReachSection variant="full" />
      <ContractManufacturingCTA />
    </>
  )
}

export default GlobalReach

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
      />
      <GlobalReachSection variant="full" />
      <ContractManufacturingCTA />
    </>
  )
}

export default GlobalReach

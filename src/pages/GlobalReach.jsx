import GlobalReachSection from '../components/sections/GlobalReachSection'
import ContractManufacturingCTA from '../components/sections/ContractManufacturingCTA'
import PageHero from '../components/common/PageHero'
import { globalReachSettings } from '../utils/globalReachUtils'

function GlobalReach() {
  return (
    <>
      <PageHero
        eyebrow={globalReachSettings.pageHero.eyebrow}
        title={globalReachSettings.pageHero.title}
        text={globalReachSettings.pageHero.text}
      />
      <GlobalReachSection variant="full" />
      <ContractManufacturingCTA />
    </>
  )
}

export default GlobalReach

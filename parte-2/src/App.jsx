import './index.css'
import PageCanvas from './components/PageCanvas'
import GlowFollower from './components/GlowFollower'
import Hero from './components/Hero'
import CountdownBanner from './components/CountdownBanner'
import Roadmap from './components/Roadmap'
import Instructors from './components/Instructors'
import Portfolio from './components/Portfolio'
import CommunityWall from './components/CommunityWall'
import TechUpdates from './components/TechUpdates'
import Bonus from './components/Bonus'
import GhostBonus from './components/GhostBonus'
import PricingTable from './components/PricingTable'

export default function App() {
  return (
    <PageCanvas>
      <GlowFollower />
      <Hero />
      <div className="py-4 px-6">
        <CountdownBanner />
      </div>
      <Roadmap />
      <Instructors />
      <Portfolio />
      <CommunityWall />
      <TechUpdates />
      <Bonus />
      <GhostBonus />
      <PricingTable />
    </PageCanvas>
  )
}

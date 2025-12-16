import { type FC, type SyntheticEvent, memo, useState } from "react"
import { LiveLeaderboard } from "../LiveLeaderboard"
import { PreviousWinners } from "../PreviousWinners"
import {
  MobileTabsContainer,
  StyledTab,
  StyledTabs,
  TabContent,
} from "./MobileTabs.styled"

export const MobileTabs: FC = memo(() => {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabChange = (_event: SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  return (
    <MobileTabsContainer>
      <StyledTabs value={activeTab} onChange={handleTabChange}>
        <StyledTab label="October's Top Scenes" />
        <StyledTab label="Live Leaderboard" />
      </StyledTabs>
      <TabContent>
        {activeTab === 0 && <PreviousWinners />}
        {activeTab === 1 && <LiveLeaderboard />}
      </TabContent>
    </MobileTabsContainer>
  )
})

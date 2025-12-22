import { type FC, type SyntheticEvent, memo, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { LiveLeaderboard } from "../LiveLeaderboard"
import { PreviousWinners } from "../PreviousWinners"
import {
  MobileTabsContainer,
  StyledTab,
  StyledTabs,
  TabContent,
} from "./MobileTabs.styled"

export const MobileTabs: FC = memo(() => {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(() => {
    return location.hash === "#leaderboard" ? 1 : 0
  })

  useEffect(() => {
    if (location.hash === "#leaderboard") {
      setActiveTab(1)
    }
  }, [location.hash])

  const handleTabChange = (_event: SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  return (
    <MobileTabsContainer id="mobile-tabs">
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

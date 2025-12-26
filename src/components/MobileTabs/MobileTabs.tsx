import { type FC, type SyntheticEvent, memo, useState } from "react"
import { useTranslation } from "react-i18next"
import { LiveLeaderboard } from "../LiveLeaderboard"
import { PreviousWinners } from "../PreviousWinners"
import {
  MobileTabsContainer,
  StyledTab,
  StyledTabs,
  TabContent,
} from "./MobileTabs.styled"

type MobileTabsProps = {
  initialMonth?: string
  isLeaderboard?: boolean
}

export const MobileTabs: FC<MobileTabsProps> = memo(
  ({ initialMonth, isLeaderboard }) => {
    const { t } = useTranslation()

    const [activeTab, setActiveTab] = useState(isLeaderboard ? 1 : 0)

    const handleTabChange = (_event: SyntheticEvent, newValue: number) => {
      setActiveTab(newValue)
    }

    return (
      <MobileTabsContainer id="mobile-tabs">
        <StyledTabs value={activeTab} onChange={handleTabChange}>
          <StyledTab label={t("mobileTabs.topScenes")} />
          <StyledTab label={t("mobileTabs.liveLeaderboard")} />
        </StyledTabs>
        <TabContent>
          {activeTab === 0 && <PreviousWinners initialMonth={initialMonth} />}
          {activeTab === 1 && <LiveLeaderboard />}
        </TabContent>
      </MobileTabsContainer>
    )
  }
)

import { type FC, memo } from "react"
import { useLocation } from "react-router-dom"
import { usePageTracking } from "@dcl/hooks"
import { Banner } from "../../Banner"
import { LiveLeaderboard } from "../../LiveLeaderboard"
import { MobileTabs } from "../../MobileTabs"
import { PreviousWinners } from "../../PreviousWinners"
import { ContentWrapper, PageContainer } from "./TopScenesPage.styled"

export const TopScenesPage: FC = memo(() => {
  const location = useLocation()
  usePageTracking(location.pathname)

  return (
    <PageContainer>
      <Banner />
      <ContentWrapper>
        <PreviousWinners />
        <LiveLeaderboard />
      </ContentWrapper>
      <MobileTabs />
    </PageContainer>
  )
})

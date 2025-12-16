import { type FC, memo } from "react"
import { Banner } from "../../Banner"
import { LiveLeaderboard } from "../../LiveLeaderboard"
import { MobileTabs } from "../../MobileTabs"
import { PreviousWinners } from "../../PreviousWinners"
import { ContentWrapper, PageContainer } from "./TopScenesPage.styled"

export const TopScenesPage: FC = memo(() => {
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

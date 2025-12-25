import { type FC, memo } from "react"
import { useLocation, useParams } from "react-router-dom"
import { usePageTracking } from "@dcl/hooks"
import { ROUTES } from "../../../AppRoutes"
import { Banner } from "../../Banner"
import { LiveLeaderboard } from "../../LiveLeaderboard"
import { MobileTabs } from "../../MobileTabs"
import { PreviousWinners } from "../../PreviousWinners"
import { ContentWrapper, PageContainer } from "./TopScenesPage.styled"

export const TopScenesPage: FC = memo(() => {
  const { pathname } = useLocation()
  const { month } = useParams<{ month?: string }>()
  usePageTracking(pathname)

  const isLeaderboardRoute = pathname.startsWith(ROUTES.LEADERBOARD)
  const isPreviousWinnersRoute = pathname.startsWith(ROUTES.PREVIOUS_WINNERS)

  return (
    <PageContainer>
      <Banner />
      <ContentWrapper>
        <PreviousWinners
          initialMonth={month}
          scrollOnLoad={isPreviousWinnersRoute}
        />
        <LiveLeaderboard scrollOnLoad={isLeaderboardRoute} />
      </ContentWrapper>
      <MobileTabs initialMonth={month} isLeaderboard={isLeaderboardRoute} />
    </PageContainer>
  )
})

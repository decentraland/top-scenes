import { type FC, memo, useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"
import { useAnalytics, usePageTracking } from "@dcl/hooks"
import { FooterLanding } from "decentraland-ui2"
import { ROUTES } from "../../../AppRoutes"
import { Events } from "../../../modules/analytics"
import { Banner } from "../../Banner"
import { LiveLeaderboard } from "../../LiveLeaderboard"
import { MobileTabs } from "../../MobileTabs"
import { PreviousWinners } from "../../PreviousWinners"
import {
  ContentWrapper,
  FooterWrapper,
  PageContainer,
} from "./TopScenesPage.styled"

export const TopScenesPage: FC = memo(() => {
  const { pathname } = useLocation()
  const { month } = useParams<{ month?: string }>()
  const { track } = useAnalytics()
  usePageTracking(pathname)

  useEffect(() => {
    track(Events.PAGE_VIEW, { pathname })
  }, [track, pathname])

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
      <FooterWrapper>
        <FooterLanding />
      </FooterWrapper>
    </PageContainer>
  )
})

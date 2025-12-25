import { type FC, memo, useEffect, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { CircularProgress, ScenesTable, dclTable } from "decentraland-ui2"
import { ROUTES } from "../../AppRoutes"
import { scrollToLeaderboard } from "../../utils/scrollUtils"
import { BestNewScene } from "../BestNewScene"
import { useGetRanking } from "./useGetRanking"
import {
  LiveLeaderboardContainer,
  LiveLeaderboardTitle,
  LoadingWrapper,
  RankCell,
  RankTableWrapper,
  TablesWrapper,
} from "./LiveLeaderboard.styled"

type RankRow = {
  key: string
  rank: number
  borderColor?: string
}

const rankColumns: dclTable.Column<RankRow>[] = [
  {
    id: "rank",
    header: "Rank",
    cellPadding: 0,
    render: (row) => <RankCell key={row.key}>{row.rank}</RankCell>,
  },
]

type LiveLeaderboardProps = {
  scrollOnLoad?: boolean
}

export const LiveLeaderboard: FC<LiveLeaderboardProps> = memo(
  ({ scrollOnLoad }) => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { sceneRows, rankRows, isLoading, isError } = useGetRanking()

    const currentMonth = useMemo(() => {
      const now = new Date()
      const monthKey = String(now.getUTCMonth() + 1).padStart(2, "0")
      return t(`previousWinners.months.${monthKey}`)
    }, [t])

    const isPageReady = !isLoading

    useEffect(() => {
      if (!scrollOnLoad || !isPageReady) return
      scrollToLeaderboard()
      navigate(ROUTES.HOME, { replace: true })
    }, [scrollOnLoad, isPageReady, navigate])

    if (isLoading) {
      return (
        <LiveLeaderboardContainer>
          <LoadingWrapper>
            <CircularProgress />
          </LoadingWrapper>
        </LiveLeaderboardContainer>
      )
    }

    if (isError) {
      return (
        <LiveLeaderboardContainer>
          <LiveLeaderboardTitle>
            {t("liveLeaderboard.title", { month: currentMonth })}
          </LiveLeaderboardTitle>
          <TablesWrapper>Error loading rankings</TablesWrapper>
        </LiveLeaderboardContainer>
      )
    }

    return (
      <LiveLeaderboardContainer id="leaderboard">
        <LiveLeaderboardTitle>
          {t("liveLeaderboard.title", { month: currentMonth })}
        </LiveLeaderboardTitle>
        <TablesWrapper>
          <RankTableWrapper>
            <dclTable.Table
              columns={rankColumns}
              rows={rankRows}
              hoverEffect={false}
            />
          </RankTableWrapper>
          <ScenesTable rows={sceneRows} />
        </TablesWrapper>
        <BestNewScene />
      </LiveLeaderboardContainer>
    )
  }
)

import { type FC, memo, useCallback, useEffect, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { CircularProgress, ScenesTable, dclTable } from "decentraland-ui2"
import { ROUTES } from "../../AppRoutes"
import { getCurrentMonthKey } from "../../utils/dateUtils"
import { openJumpIn } from "../../utils/jumpUtils"
import { scrollToLeaderboard } from "../../utils/scrollUtils"
import { BestNewScene } from "../BestNewScene"
import { Countdown } from "./Countdown"
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

const LEADERBOARD_START_DAY = 4

const isLeaderboardAvailable = (): boolean => {
  const now = new Date()
  return now.getUTCDate() >= LEADERBOARD_START_DAY
}

export const LiveLeaderboard: FC<LiveLeaderboardProps> = memo(
  ({ scrollOnLoad }) => {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const showLeaderboard = useMemo(() => isLeaderboardAvailable(), [])

    const { sceneRows, positionRows, bestNewScene, isLoading, isError } =
      useGetRanking()

    const currentMonth = t(`previousWinners.months.${getCurrentMonthKey()}`)

    const handleMobileRowClick = useCallback((row: { location?: string }) => {
      if (row.location) {
        openJumpIn(row.location)
      }
    }, [])

    useEffect(() => {
      if (!scrollOnLoad || isLoading) return
      scrollToLeaderboard()
      navigate(ROUTES.HOME, { replace: true })
    }, [scrollOnLoad, isLoading, navigate])

    if (!showLeaderboard) {
      return (
        <LiveLeaderboardContainer id="leaderboard">
          <LiveLeaderboardTitle>
            {t("liveLeaderboard.title", { month: currentMonth })}
          </LiveLeaderboardTitle>
          <Countdown month={currentMonth} startDay={LEADERBOARD_START_DAY} />
        </LiveLeaderboardContainer>
      )
    }

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
          <TablesWrapper>{t("liveLeaderboard.error")}</TablesWrapper>
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
              rows={positionRows}
              hoverEffect={false}
            />
          </RankTableWrapper>
          <ScenesTable
            rows={sceneRows}
            onMobileRowClick={handleMobileRowClick}
          />
        </TablesWrapper>
        {bestNewScene && (
          <BestNewScene
            sceneRow={bestNewScene}
            onMobileRowClick={handleMobileRowClick}
          />
        )}
      </LiveLeaderboardContainer>
    )
  }
)

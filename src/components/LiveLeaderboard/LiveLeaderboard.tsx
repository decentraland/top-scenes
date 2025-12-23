import { type FC, memo } from "react"
import { CircularProgress, ScenesTable, dclTable } from "decentraland-ui2"
import { BestNewScene } from "../BestNewScene"
import { useGetRanking } from "./useGetRanking"
import {
  LiveLeaderboardContainer,
  LiveLeaderboardTitle,
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

export const LiveLeaderboard: FC = memo(() => {
  const { sceneRows, rankRows, isLoading, isError } = useGetRanking()

  if (isLoading) {
    return (
      <LiveLeaderboardContainer id="leaderboard">
        <LiveLeaderboardTitle>Live December Leaderboard</LiveLeaderboardTitle>
        <CircularProgress />
      </LiveLeaderboardContainer>
    )
  }

  if (isError) {
    return (
      <LiveLeaderboardContainer id="leaderboard">
        <LiveLeaderboardTitle>Live December Leaderboard</LiveLeaderboardTitle>
        <TablesWrapper>Error loading rankings</TablesWrapper>
      </LiveLeaderboardContainer>
    )
  }

  return (
    <LiveLeaderboardContainer id="leaderboard">
      <LiveLeaderboardTitle>Live December Leaderboard</LiveLeaderboardTitle>
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
})

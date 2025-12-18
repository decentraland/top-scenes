import { type FC, memo, useMemo } from "react"
import { ScenesTable, dclTable } from "decentraland-ui2"
import { useGetProfilesQuery } from "../../features/profiles"
import { useGetCurrentMonthRankingQuery } from "../../features/scenes"
import { getBorderColor } from "../../utils/rankColors"
import { BestNewScene } from "../BestNewScene"
import { transformToSceneRowData } from "./utils"
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
  const {
    data: rankings,
    isLoading: isLoadingRankings,
    isError: isErrorRankings,
  } = useGetCurrentMonthRankingQuery()

  const creatorAddresses = useMemo(() => {
    if (!rankings) return []
    const addresses = [
      ...new Set(rankings.map((scene) => scene.creator.toLowerCase())),
    ]
    console.log("Requesting profiles for addresses:", addresses)
    return addresses
  }, [rankings])

  const { data: profiles, isLoading: isLoadingProfiles } = useGetProfilesQuery(
    { ids: creatorAddresses },
    { skip: creatorAddresses.length === 0 }
  )

  const sceneRows = useMemo(() => {
    if (!rankings) return []
    return rankings.map((scene) => transformToSceneRowData(scene, profiles))
  }, [rankings, profiles])

  const rankRows: RankRow[] = useMemo(() => {
    return sceneRows.map((_, index) => ({
      key: String(index + 1),
      rank: index + 1,
      borderColor: getBorderColor(index + 1),
    }))
  }, [sceneRows])

  const isLoading = isLoadingRankings || isLoadingProfiles

  if (isLoading) {
    return (
      <LiveLeaderboardContainer id="leaderboard">
        <LiveLeaderboardTitle>Live December Leaderboard</LiveLeaderboardTitle>
        <TablesWrapper>Loading...</TablesWrapper>
      </LiveLeaderboardContainer>
    )
  }

  if (isErrorRankings) {
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

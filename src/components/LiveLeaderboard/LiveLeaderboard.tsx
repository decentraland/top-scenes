import { type FC, memo } from "react"
import { ScenesTable, dclTable } from "decentraland-ui2"
import { mockLeaderboardRows } from "./mockData"
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

const getBorderColor = (rank: number): string | undefined => {
  if (rank === 1) return dclColors.gradient.gold
  if (rank === 2) return dclColors.gradient.silver
  if (rank === 3) return dclColors.gradient.bronze
  return undefined
}

const rankRows: RankRow[] = mockLeaderboardRows.map((_, index) => ({
  key: String(index + 1),
  rank: index + 1,
  borderColor: getBorderColor(index + 1),
}))

const rankColumns: dclTable.Column<RankRow>[] = [
  {
    id: "rank",
    header: "Rank",
    cellPadding: 0,
    render: (row) => <RankCell key={row.key}>{row.rank}</RankCell>,
  },
]

export const LiveLeaderboard: FC = memo(() => {
  return (
    <LiveLeaderboardContainer>
      <LiveLeaderboardTitle>Live October Leaderboard</LiveLeaderboardTitle>
      <TablesWrapper>
        <RankTableWrapper>
          <dclTable.Table
            columns={rankColumns}
            rows={rankRows}
            hoverEffect={false}
          />
        </RankTableWrapper>
        <ScenesTable rows={mockLeaderboardRows} />
      </TablesWrapper>
    </LiveLeaderboardContainer>
  )
})

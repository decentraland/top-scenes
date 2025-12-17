import { type FC, memo } from "react"
import { ScenesTable, dclTable } from "decentraland-ui2"
import { BestNewScene } from "../BestNewScene"
import { mockLeaderboardRows } from "./mockData"
import { getBorderColor } from "../../utils/rankColors"
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
    <LiveLeaderboardContainer id="leaderboard">
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
      <BestNewScene />
    </LiveLeaderboardContainer>
  )
})

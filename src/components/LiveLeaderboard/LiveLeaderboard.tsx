import { type FC, memo } from "react"
import { ScenesTable } from "decentraland-ui2"
import { mockLeaderboardRows } from "./mockData"
import {
  LiveLeaderboardContainer,
  LiveLeaderboardTitle,
  TableWrapper,
} from "./LiveLeaderboard.styled"

export const LiveLeaderboard: FC = memo(() => {
  return (
    <LiveLeaderboardContainer>
      <LiveLeaderboardTitle>Live October Leaderboard</LiveLeaderboardTitle>
      <TableWrapper>
        <ScenesTable rows={mockLeaderboardRows} />
      </TableWrapper>
    </LiveLeaderboardContainer>
  )
})

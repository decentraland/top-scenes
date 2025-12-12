import { type FC, memo } from "react"
import { LiveLeaderboard } from "../../LiveLeaderboard"
import { PreviousWinners } from "../../PreviousWinners"
import { Container } from "./TopScenesPage.styled"

export const TopScenesPage: FC = memo(() => {
  return (
    <Container>
      <PreviousWinners />
      <LiveLeaderboard />
    </Container>
  )
})

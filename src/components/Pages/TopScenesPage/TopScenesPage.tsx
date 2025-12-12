import { type FC, memo } from "react"
import { PreviousWinners } from "../../PreviousWinners"
import { Container } from "./TopScenesPage.styled"

export const TopScenesPage: FC = memo(() => {
  return (
    <Container>
      <PreviousWinners />
    </Container>
  )
})

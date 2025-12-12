import { type FC, memo } from "react"
import { MenuItem, SceneCard, Typography } from "decentraland-ui2"
import { mockScenes } from "../Pages/TopScenesPage/mockData"
import {
  MonthSelect,
  PreviousWinnersContainer,
  PreviousWinnersHeader,
  ScenesGrid,
} from "./PreviousWinners.styled"

export const PreviousWinners: FC = memo(() => {
  return (
    <PreviousWinnersContainer>
      <PreviousWinnersHeader>
        <Typography variant="h5" fontWeight={700}>
          October Winners
        </Typography>
        <MonthSelect defaultValue="october-2025">
          <MenuItem value="october-2025">OCTOBER 2025</MenuItem>
          <MenuItem value="november-2025">NOVEMBER 2025</MenuItem>
        </MonthSelect>
      </PreviousWinnersHeader>
      <ScenesGrid>
        {mockScenes.map((scene) => (
          <SceneCard
            key={scene.id}
            image={scene.image}
            sceneName={scene.sceneName}
            avatar={scene.avatar}
            withShadow
            coordinates={scene.coordinates}
            showOnHover={["location", "jumpInButton"]}
          />
        ))}
      </ScenesGrid>
    </PreviousWinnersContainer>
  )
})

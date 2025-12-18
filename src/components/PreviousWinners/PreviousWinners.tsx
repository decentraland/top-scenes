import { type FC, memo } from "react"
import { MenuItem, SceneCard, Typography, dclColors } from "decentraland-ui2"
import { mockScenes } from "../Pages/TopScenesPage/mockData"
import {
  MonthSelect,
  PreviousWinnersContainer,
  PreviousWinnersHeader,
  PreviousWinnersTitle,
  ScenesGrid,
} from "./PreviousWinners.styled"

const getBorderColor = (index: number): string | undefined => {
  if (index === 0) return dclColors.gradient.gold
  if (index === 1) return dclColors.gradient.silver
  if (index === 2) return dclColors.gradient.bronze
  return undefined
}

export const PreviousWinners: FC = memo(() => {
  return (
    <PreviousWinnersContainer>
      <PreviousWinnersHeader>
        <PreviousWinnersTitle>
          <Typography variant="h5" fontWeight={700}>
            October Winners
          </Typography>
        </PreviousWinnersTitle>
        <MonthSelect defaultValue="october-2025">
          <MenuItem value="october-2025">OCTOBER 2025</MenuItem>
          <MenuItem value="november-2025">NOVEMBER 2025</MenuItem>
        </MonthSelect>
      </PreviousWinnersHeader>
      <ScenesGrid>
        {mockScenes.map((scene, index) => (
          <SceneCard
            key={scene.id}
            image={scene.image}
            sceneName={scene.sceneName}
            avatar={scene.avatar}
            withShadow
            borderColor={getBorderColor(index)}
            cornerBadge={index >= 3 ? String(index + 1) : undefined}
            coordinates={scene.coordinates}
            showOnHover={["location", "jumpInButton"]}
          />
        ))}
      </ScenesGrid>
    </PreviousWinnersContainer>
  )
})

import { type FC, memo } from "react"
import { useTranslation } from "react-i18next"
import { MenuItem, SceneCard, Typography, dclColors } from "decentraland-ui2"
import positionStar1 from "../../images/Position_Star_Medium_1.webp"
import positionStar2 from "../../images/Position_Star_Medium_2.webp"
import positionStar3 from "../../images/Position_Star_Medium_3.webp"
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

const getCornerBadgeImage = (index: number): string | undefined => {
  if (index === 0) return positionStar1
  if (index === 1) return positionStar2
  if (index === 2) return positionStar3
  return undefined
}

export const PreviousWinners: FC = memo(() => {
  const { t } = useTranslation()
  const currentMonth = t("previousWinners.months.october")

  return (
    <PreviousWinnersContainer>
      <PreviousWinnersHeader>
        <PreviousWinnersTitle>
          <Typography variant="h5" fontWeight={700}>
            {t("previousWinners.title", { month: currentMonth })}
          </Typography>
        </PreviousWinnersTitle>
        <MonthSelect defaultValue="october-2025">
          <MenuItem value="october-2025">
            {`${t("previousWinners.months.october").toUpperCase()} 2025`}
          </MenuItem>
          <MenuItem value="november-2025">
            {`${t("previousWinners.months.november").toUpperCase()} 2025`}
          </MenuItem>
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
            cornerBadgeImage={getCornerBadgeImage(index)}
            cornerBadge={index >= 3 ? String(index + 1) : undefined}
            coordinates={scene.coordinates}
            showOnHover={["location", "jumpInButton"]}
          />
        ))}
      </ScenesGrid>
    </PreviousWinnersContainer>
  )
})

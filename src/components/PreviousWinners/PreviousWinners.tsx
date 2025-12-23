import { type FC, memo, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  CircularProgress,
  MenuItem,
  SceneCard,
  SelectChangeEvent,
  Typography,
  dclColors,
} from "decentraland-ui2"
import { useGetPreviousWinners } from "./useGetPreviousWinners"
import positionStar1 from "../../images/Position_Star_Medium_1.webp"
import positionStar2 from "../../images/Position_Star_Medium_2.webp"
import positionStar3 from "../../images/Position_Star_Medium_3.webp"
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
  const [selectedPeriod, setSelectedPeriod] = useState("")

  const { scenes, availablePeriods, isLoading } =
    useGetPreviousWinners(selectedPeriod)

  useEffect(() => {
    if (availablePeriods.length > 0 && !selectedPeriod) {
      setSelectedPeriod(availablePeriods[0])
    }
  }, [availablePeriods, selectedPeriod])

  const handlePeriodChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedPeriod(event.target.value as string)
  }

  const getMonthKey = (period: string): string => period.split("/")[0] || "01"

  const currentMonth = t(
    `previousWinners.months.${getMonthKey(selectedPeriod)}`
  )

  if (isLoading && scenes.length === 0) {
    return (
      <PreviousWinnersContainer>
        <PreviousWinnersHeader>
          <PreviousWinnersTitle>
            <Typography variant="h5" fontWeight={700}>
              <CircularProgress />
            </Typography>
          </PreviousWinnersTitle>
        </PreviousWinnersHeader>
      </PreviousWinnersContainer>
    )
  }

  return (
    <PreviousWinnersContainer>
      <PreviousWinnersHeader>
        <PreviousWinnersTitle>
          <Typography variant="h5" fontWeight={700}>
            {t("previousWinners.title", { month: currentMonth })}
          </Typography>
        </PreviousWinnersTitle>
        <MonthSelect value={selectedPeriod} onChange={handlePeriodChange}>
          {availablePeriods.map((period) => {
            const [month, year] = period.split("/")
            return (
              <MenuItem key={period} value={period}>
                {`${t(`previousWinners.months.${month}`).toUpperCase()} 20${year}`}
              </MenuItem>
            )
          })}
        </MonthSelect>
      </PreviousWinnersHeader>
      <ScenesGrid key={selectedPeriod}>
        {scenes.map((scene, index) => (
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

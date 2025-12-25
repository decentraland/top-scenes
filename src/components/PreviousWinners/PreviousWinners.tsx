import { type FC, memo, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import {
  CircularProgress,
  MenuItem,
  SceneCard,
  SelectChangeEvent,
  Typography,
  dclColors,
} from "decentraland-ui2"
import { useGetPreviousWinners } from "./useGetPreviousWinners"
import { ROUTES } from "../../AppRoutes"
import positionStar1 from "../../images/Position_Star_Medium_1.webp"
import positionStar2 from "../../images/Position_Star_Medium_2.webp"
import positionStar3 from "../../images/Position_Star_Medium_3.webp"
import { scrollToRanking } from "../../utils/scrollUtils"
import {
  LoadingWrapper,
  MonthSelect,
  PreviousWinnersContainer,
  PreviousWinnersHeader,
  PreviousWinnersTitle,
  ScenesGrid,
} from "./PreviousWinners.styled"

//TODO move to utils
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

const parseMonthParam = (month: string | undefined): string | null => {
  if (!month || month.length !== 4) return null
  const mm = month.slice(0, 2)
  const yy = month.slice(2, 4)
  return `${mm}/${yy}`
}

type PreviousWinnersProps = {
  initialMonth?: string
  scrollOnLoad?: boolean
}

export const PreviousWinners: FC<PreviousWinnersProps> = memo(
  ({ initialMonth, scrollOnLoad }) => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [selectedPeriod, setSelectedPeriod] = useState("")

    const { scenes, availablePeriods, isLoading } =
      useGetPreviousWinners(selectedPeriod)

    useEffect(() => {
      if (availablePeriods.length === 0 || selectedPeriod) return
      const parsedMonth = parseMonthParam(initialMonth)
      if (parsedMonth && availablePeriods.includes(parsedMonth)) {
        setSelectedPeriod(parsedMonth)
      } else {
        setSelectedPeriod(availablePeriods[0])
      }
    }, [availablePeriods, initialMonth, selectedPeriod])

    useEffect(() => {
      if (!scrollOnLoad || isLoading || !selectedPeriod) return
      scrollToRanking()
      navigate(ROUTES.PREVIOUS_WINNERS, { replace: true })
    }, [scrollOnLoad, isLoading, selectedPeriod, navigate])

    const handlePeriodChange = (event: SelectChangeEvent<unknown>) => {
      setSelectedPeriod(event.target.value as string)
    }

    const getMonthKey = (period: string): string => period.split("/")[0] || "01"

    const currentMonth = t(
      `previousWinners.months.${getMonthKey(selectedPeriod)}`
    )

    if (isLoading) {
      return (
        <PreviousWinnersContainer id="previous-winners" isLoading>
          <LoadingWrapper>
            <CircularProgress />
          </LoadingWrapper>
        </PreviousWinnersContainer>
      )
    }

    return (
      <PreviousWinnersContainer>
        <PreviousWinnersHeader id="previous-winners">
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
  }
)

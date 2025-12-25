import { type FC, memo, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import {
  CircularProgress,
  MenuItem,
  SceneCard,
  SelectChangeEvent,
  Typography,
} from "decentraland-ui2"
import { useGetPreviousWinners } from "./useGetPreviousWinners"
import { ROUTES } from "../../AppRoutes"
import { parseMonthParam } from "../../utils/dateUtils"
import { getBorderColor, getCornerBadgeImage } from "../../utils/rankColors"
import { scrollToRanking } from "../../utils/scrollUtils"
import {
  LoadingWrapper,
  MonthSelect,
  PreviousWinnersContainer,
  PreviousWinnersHeader,
  PreviousWinnersTitle,
  ScenesGrid,
} from "./PreviousWinners.styled"

type PreviousWinnersProps = {
  initialMonth?: string
  scrollOnLoad?: boolean
}

export const PreviousWinners: FC<PreviousWinnersProps> = memo(
  ({ initialMonth, scrollOnLoad }) => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [selectedPeriod, setSelectedPeriod] = useState("")

    const { scenes, bestNewScene, availablePeriods, isLoading } =
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
              borderColor={getBorderColor(index + 1)}
              cornerBadgeImage={getCornerBadgeImage(index + 1)}
              cornerBadge={index >= 3 ? String(index + 1) : undefined}
              coordinates={scene.coordinates}
              showOnHover={["location", "jumpInButton"]}
            />
          ))}
          {bestNewScene && (
            <SceneCard
              key={bestNewScene.id}
              image={bestNewScene.image}
              sceneName={bestNewScene.sceneName}
              avatar={bestNewScene.avatar}
              withShadow
              cornerBadge={t("bestNewScene.newBadge")}
              coordinates={bestNewScene.coordinates}
              showOnHover={["location", "jumpInButton"]}
            />
          )}
        </ScenesGrid>
      </PreviousWinnersContainer>
    )
  }
)

import { type FC, memo, useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { useAnalytics } from "@dcl/hooks"
import {
  CircularProgress,
  MenuItem,
  SceneCard,
  SelectChangeEvent,
  Typography,
} from "decentraland-ui2"
import { useGetPreviousWinners } from "./useGetPreviousWinners"
import { ROUTES } from "../../AppRoutes"
import { useTrackJumpIn } from "../../hooks/useTrackJumpIn"
import { Events } from "../../modules/analytics"
import { parseMonthParam } from "../../utils/dateUtils"
import { openJumpIn } from "../../utils/jumpUtils"
import { getBorderColor } from "../../utils/rankColors"
import { scrollToRanking } from "../../utils/scrollUtils"
import { RankingBadge } from "../RankingBadge"
import {
  ClickableSceneWrapper,
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
    const { track } = useAnalytics()
    const [selectedPeriod, setSelectedPeriod] = useState("")
    const { trackJumpIn } = useTrackJumpIn(
      Events.JUMP_IN_TO_PREVIOUS_WINNERS_SCENE
    )

    const { scenes, bestNewScene, availablePeriods, isLoading } =
      useGetPreviousWinners(selectedPeriod)

    const handleCardClick = useCallback(
      (sceneName: string, coordinates: string) => {
        track(Events.JUMP_IN_TO_PREVIOUS_WINNERS_SCENE, {
          sceneName,
          sceneLocation: coordinates,
        })
        openJumpIn(coordinates)
      },
      [track]
    )

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
      const period = event.target.value as string
      setSelectedPeriod(period)
      track(Events.PREVIOUS_WINNERS_MONTH_CHANGED, {
        period,
      })
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
            <ClickableSceneWrapper
              key={scene.id}
              onClick={() =>
                handleCardClick(scene.sceneName, scene.coordinates)
              }
            >
              <SceneCard
                image={scene.image}
                sceneName={scene.sceneName}
                avatar={scene.avatar}
                withShadow
                borderColor={getBorderColor(index + 1)}
                cornerBadge={<RankingBadge rank={index + 1} />}
                coordinates={scene.coordinates}
                showOnHover={["location", "jumpInButton"]}
                onClick={() =>
                  handleCardClick(scene.sceneName, scene.coordinates)
                }
                onJumpInTrack={trackJumpIn({
                  sceneName: scene.sceneName,
                  sceneLocation: scene.coordinates,
                })}
              />
            </ClickableSceneWrapper>
          ))}
          {bestNewScene && (
            <ClickableSceneWrapper
              onClick={() =>
                handleCardClick(
                  bestNewScene.sceneName,
                  bestNewScene.coordinates
                )
              }
            >
              <SceneCard
                image={bestNewScene.image}
                sceneName={bestNewScene.sceneName}
                avatar={bestNewScene.avatar}
                withShadow
                cornerBadge={<RankingBadge rank={0} isNew />}
                coordinates={bestNewScene.coordinates}
                showOnHover={["location", "jumpInButton"]}
                onJumpInTrack={trackJumpIn({
                  sceneName: bestNewScene.sceneName,
                  sceneLocation: bestNewScene.coordinates,
                })}
              />
            </ClickableSceneWrapper>
          )}
        </ScenesGrid>
      </PreviousWinnersContainer>
    )
  }
)

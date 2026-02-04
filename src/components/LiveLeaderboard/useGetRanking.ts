import { useMemo } from "react"
import { transformToSceneRowData } from "./utils"
import {
  BEST_NEW_SCENE_RANKING,
  MAX_RANKING_ROWS,
} from "../../constants/ranking"
import { isEns, useGetPlacesAndWorldsQuery } from "../../features/places"
import { useGetProfilesQuery } from "../../features/profiles"
import { useGetCurrentMonthRankingQuery } from "../../features/scenes"
import { isValidPosition } from "../../utils/locationUtils"
import { getBorderColor } from "../../utils/rankColors"

type RankRow = {
  key: string
  rank: number
  borderColor?: string
}

const createPositionRows = (length: number): RankRow[] =>
  Array.from({ length: Math.min(length, MAX_RANKING_ROWS) }, (_, i) => ({
    key: String(i + 1),
    rank: i + 1,
    borderColor: getBorderColor(i + 1),
  }))

export const useGetRanking = () => {
  const {
    data,
    isLoading: isLoadingRankings,
    isError: isErrorRankings,
  } = useGetCurrentMonthRankingQuery()

  const { rankings, bestNewSceneRanking } = useMemo(() => {
    if (!data) return { rankings: [], bestNewSceneRanking: null }

    const bestNew = data.find(
      (r) => r.ranking === BEST_NEW_SCENE_RANKING && r.placeName !== "None"
    )
    const rankings = data.filter((r) => r.ranking !== BEST_NEW_SCENE_RANKING)

    return { rankings, bestNewSceneRanking: bestNew || null }
  }, [data])

  const creatorAddresses = useMemo(() => {
    if (!data) return []
    return [
      ...new Set(
        data
          .map((scene) => scene.creator.toLowerCase())
          .filter((addr) => addr && addr.startsWith("0x"))
      ),
    ]
  }, [data])

  const { positions, worlds } = useMemo(() => {
    if (!data) return { positions: [], worlds: [] }

    const positionsList: string[] = []
    const worldsList: string[] = []

    data.forEach((scene) => {
      const locationId = scene.locationId

      if (isEns(locationId)) {
        worldsList.push(locationId)
      } else if (isValidPosition(locationId)) {
        positionsList.push(locationId)
      }
    })

    return { positions: positionsList, worlds: worldsList }
  }, [data])

  const { data: profiles, isLoading: isLoadingProfiles } = useGetProfilesQuery(
    { ids: creatorAddresses },
    { skip: creatorAddresses.length === 0 }
  )

  const { data: places, isLoading: isLoadingPlaces } =
    useGetPlacesAndWorldsQuery(
      { positions, worlds },
      { skip: positions.length === 0 && worlds.length === 0 }
    )

  const sceneRows = useMemo(() => {
    if (!rankings.length) return []
    return rankings
      .slice(0, MAX_RANKING_ROWS)
      .map((scene) => transformToSceneRowData(scene, profiles, places))
  }, [rankings, profiles, places])

  const bestNewScene = useMemo(() => {
    if (!bestNewSceneRanking) return null
    return transformToSceneRowData(bestNewSceneRanking, profiles, places)
  }, [bestNewSceneRanking, profiles, places])

  const positionRows = useMemo(
    () => createPositionRows(sceneRows.length),
    [sceneRows.length]
  )

  const isLoading = isLoadingRankings || isLoadingProfiles || isLoadingPlaces

  return {
    sceneRows,
    positionRows,
    bestNewScene,
    isLoading,
    isError: isErrorRankings,
  }
}

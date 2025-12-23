import { useMemo } from "react"
import { transformToSceneRowData } from "./utils"
import { isEns, useGetPlacesAndWorldsQuery } from "../../features/places"
import { useGetProfilesQuery } from "../../features/profiles"
import { useGetCurrentMonthRankingQuery } from "../../features/scenes"
import { getBorderColor } from "../../utils/rankColors"

const MAX_ROWS = 20

type RankRow = {
  key: string
  rank: number
  borderColor?: string
}

const createRankRows = (length: number): RankRow[] =>
  Array.from({ length: Math.min(length, MAX_ROWS) }, (_, i) => ({
    key: String(i + 1),
    rank: i + 1,
    borderColor: getBorderColor(i + 1),
  }))

export const useGetRanking = () => {
  const {
    data: rankings,
    isLoading: isLoadingRankings,
    isError: isErrorRankings,
  } = useGetCurrentMonthRankingQuery()

  const creatorAddresses = useMemo(() => {
    if (!rankings) return []
    return [...new Set(rankings.map((scene) => scene.creator.toLowerCase()))]
  }, [rankings])

  const { positions, worlds } = useMemo(() => {
    if (!rankings) return { positions: [], worlds: [] }

    const positionsList: string[] = []
    const worldsList: string[] = []

    rankings.slice(0, MAX_ROWS).forEach((scene) => {
      const locationId = scene.locationId.includes("|")
        ? scene.locationId.replace("|", ",")
        : scene.locationId

      if (isEns(locationId)) {
        worldsList.push(locationId)
      } else {
        positionsList.push(locationId)
      }
    })

    return { positions: positionsList, worlds: worldsList }
  }, [rankings])

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
    if (!rankings) return []
    return rankings
      .slice(0, MAX_ROWS)
      .map((scene) => transformToSceneRowData(scene, profiles, places))
  }, [rankings, profiles, places])

  const rankRows = useMemo(
    () => createRankRows(sceneRows.length),
    [sceneRows.length]
  )

  const isLoading = isLoadingRankings || isLoadingProfiles || isLoadingPlaces

  return {
    sceneRows,
    rankRows,
    isLoading,
    isError: isErrorRankings,
  }
}

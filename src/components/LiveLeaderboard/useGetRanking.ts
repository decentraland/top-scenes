import { useMemo } from "react"
import { transformToSceneRowData } from "./utils"
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

  const { data: profiles, isLoading: isLoadingProfiles } = useGetProfilesQuery(
    { ids: creatorAddresses },
    { skip: creatorAddresses.length === 0 }
  )

  const sceneRows = useMemo(() => {
    if (!rankings) return []
    return rankings
      .slice(0, MAX_ROWS)
      .map((scene) => transformToSceneRowData(scene, profiles))
  }, [rankings, profiles])

  const rankRows = useMemo(
    () => createRankRows(sceneRows.length),
    [sceneRows.length]
  )

  const isLoading = isLoadingRankings || isLoadingProfiles

  return {
    sceneRows,
    rankRows,
    isLoading,
    isError: isErrorRankings,
  }
}

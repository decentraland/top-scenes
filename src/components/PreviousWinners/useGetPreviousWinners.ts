import { useEffect, useMemo, useState } from "react"
import {
  BEST_NEW_SCENE_RANKING,
  MAX_RANKING_ROWS,
} from "../../constants/ranking"
import { isEns, useGetPlacesAndWorldsQuery } from "../../features/places"
import { useGetProfilesQuery } from "../../features/profiles"
import { useGetPreviousMonthRankingQuery } from "../../features/scenes"
import sceneThumbnail from "../../images/scene-thumbnail.webp"
import { extractValidCreatorAddresses } from "../../utils/addressUtils"
import { createPlaceholderAvatar } from "../../utils/avatarUtils"
import { sortPeriodsByDate } from "../../utils/dateUtils"
import { isValidPosition } from "../../utils/locationUtils"
import type { Place } from "../../features/places"
import type { PreviousMonthRanking } from "../../features/scenes"
import type { Avatar } from "@dcl/schemas"

const preloadImages = (urls: string[]): Promise<void> =>
  Promise.all(
    urls.map(
      (url) =>
        new Promise<void>((resolve) => {
          const img = new Image()
          img.onload = () => resolve()
          img.onerror = () => resolve()
          img.src = url
        })
    )
  ).then(() => {})

type SceneCardData = {
  id: string
  image: string
  sceneName: string
  avatar: Avatar
  coordinates: string
  ranking: number
  isNew?: boolean
}

const getPlaceThumbnail = (
  locationId: string,
  places?: Record<string, Place>
): string => {
  if (!places) return sceneThumbnail

  if (isEns(locationId)) {
    const place = places[locationId.toLowerCase()]
    return place?.image || sceneThumbnail
  }

  const place = places[locationId]
  return place?.image || sceneThumbnail
}

const transformToSceneCardData = (
  ranking: PreviousMonthRanking,
  profiles?: Record<string, Avatar>,
  places?: Record<string, Place>
): SceneCardData => {
  const creatorAddress = ranking.creator.toLowerCase()
  const profile = profiles?.[creatorAddress]

  const avatar =
    profile || createPlaceholderAvatar(ranking.creator, ranking.contactName)

  return {
    id: `${ranking.locationId}-${ranking.ranking}`,
    image: getPlaceThumbnail(ranking.locationId, places),
    sceneName: ranking.placeName,
    avatar,
    coordinates: ranking.locationId,
    ranking: ranking.ranking,
  }
}

export const useGetPreviousWinners = (selectedPeriod: string) => {
  const [imagesReadyForPeriod, setImagesReadyForPeriod] = useState("")

  const { data: rankingsByPeriod, isLoading: isLoadingRankings } =
    useGetPreviousMonthRankingQuery()

  const availablePeriods = useMemo(
    () => sortPeriodsByDate(Object.keys(rankingsByPeriod ?? {})),
    [rankingsByPeriod]
  )

  const currentRankings = useMemo(() => {
    if (!rankingsByPeriod || !selectedPeriod) return []
    return rankingsByPeriod[selectedPeriod] || []
  }, [rankingsByPeriod, selectedPeriod])

  const creatorAddresses = useMemo(
    () => extractValidCreatorAddresses(currentRankings),
    [currentRankings]
  )

  const { positions, worlds } = useMemo(() => {
    if (!currentRankings.length) return { positions: [], worlds: [] }

    const positionsList: string[] = []
    const worldsList: string[] = []

    currentRankings.forEach((scene) => {
      const locationId = scene.locationId

      if (isEns(locationId)) {
        worldsList.push(locationId)
      } else if (isValidPosition(locationId)) {
        positionsList.push(locationId)
      }
    })

    return { positions: positionsList, worlds: worldsList }
  }, [currentRankings])

  const {
    data: profiles,
    isLoading: isLoadingProfiles,
    isFetching: isFetchingProfiles,
  } = useGetProfilesQuery(
    { ids: creatorAddresses },
    { skip: creatorAddresses.length === 0 }
  )

  const {
    data: places,
    isLoading: isLoadingPlaces,
    isFetching: isFetchingPlaces,
  } = useGetPlacesAndWorldsQuery(
    { positions, worlds },
    { skip: positions.length === 0 && worlds.length === 0 }
  )

  const { scenes, bestNewScene } = useMemo(() => {
    if (!currentRankings.length) return { scenes: [], bestNewScene: null }

    const bestNew = currentRankings.find(
      (r) => r.ranking === BEST_NEW_SCENE_RANKING && r.placeName !== "None"
    )
    const rankings = currentRankings
      .filter((r) => r.ranking !== BEST_NEW_SCENE_RANKING)
      .sort((a, b) => a.ranking - b.ranking)
      .slice(0, MAX_RANKING_ROWS)

    const sceneCards = rankings.map((ranking) =>
      transformToSceneCardData(ranking, profiles, places)
    )

    const bestNewCard = bestNew
      ? { ...transformToSceneCardData(bestNew, profiles, places), isNew: true }
      : null

    return { scenes: sceneCards, bestNewScene: bestNewCard }
  }, [currentRankings, profiles, places])

  // Preload images when scenes are ready and period changes
  useEffect(() => {
    if (!scenes.length || !selectedPeriod) return
    if (imagesReadyForPeriod === selectedPeriod) return

    const allImages = scenes.map((s) => s.image)
    if (bestNewScene) allImages.push(bestNewScene.image)
    const imageUrls = [...new Set(allImages)]

    preloadImages(imageUrls).then(() => setImagesReadyForPeriod(selectedPeriod))
  }, [scenes, bestNewScene, selectedPeriod, imagesReadyForPeriod])

  const apisLoading =
    isLoadingRankings ||
    isLoadingProfiles ||
    isFetchingProfiles ||
    isLoadingPlaces ||
    isFetchingPlaces

  const imagesReady = imagesReadyForPeriod === selectedPeriod
  const isLoading = apisLoading || !imagesReady

  return {
    scenes: imagesReady ? scenes : [],
    bestNewScene: imagesReady ? bestNewScene : null,
    availablePeriods,
    isLoading,
  }
}

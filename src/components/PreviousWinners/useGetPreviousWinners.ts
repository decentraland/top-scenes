import { useEffect, useMemo, useState } from "react"
import { isEns, useGetPlacesAndWorldsQuery } from "../../features/places"
import { useGetProfilesQuery } from "../../features/profiles"
import { useGetPreviousMonthRankingQuery } from "../../features/scenes"
import sceneThumbnail from "../../images/scene-thumbnail.webp"
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
}

const createPlaceholderAvatar = (address: string, name: string): Avatar => ({
  hasClaimedName: false,
  description: "",
  tutorialStep: 0,
  name: name || address.slice(0, 8),
  userId: address,
  email: "",
  ethAddress: address,
  version: 1,
  avatar: {
    bodyShape: "urn:decentraland:off-chain:base-avatars:BaseMale",
    wearables: [],
    forceRender: [],
    emotes: [],
    snapshots: {
      face256: `https://peer.decentraland.org/lambdas/profile/${address}/face256`,
      body: `https://peer.decentraland.org/lambdas/profile/${address}/body.png`,
    },
    eyes: { color: { r: 0.2, g: 0.5, b: 0.7 } },
    hair: { color: { r: 0.3, g: 0.2, b: 0.1 } },
    skin: { color: { r: 0.9, g: 0.7, b: 0.6 } },
  },
  blocked: [],
  interests: [],
  hasConnectedWeb3: true,
  country: "",
  employmentStatus: "",
  gender: "",
  pronouns: "",
  relationshipStatus: "",
  sexualOrientation: "",
  language: "",
  profession: "",
  realName: "",
  hobbies: "",
  birthdate: 0,
  links: [],
})

//TODO modify
const getPlaceThumbnail = (
  locationId: string,
  places?: Record<string, Place>
): string => {
  if (!places) return sceneThumbnail

  const location = locationId.includes("|")
    ? locationId.replace("|", ",")
    : locationId

  if (isEns(location)) {
    const place = places[location.toLowerCase()]
    return place?.image || sceneThumbnail
  }

  const place = places[location]
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

  const coordinates = ranking.locationId.includes("|")
    ? ranking.locationId.replace("|", ",")
    : ranking.locationId

  return {
    id: `${ranking.locationId}-${ranking.ranking}`,
    image: getPlaceThumbnail(ranking.locationId, places),
    sceneName: ranking.placeName,
    avatar,
    coordinates,
    ranking: ranking.ranking,
  }
}

export const useGetPreviousWinners = (selectedPeriod: string) => {
  const [imagesReadyForPeriod, setImagesReadyForPeriod] = useState("")

  const { data: rankingsByPeriod, isLoading: isLoadingRankings } =
    useGetPreviousMonthRankingQuery()

  const availablePeriods = useMemo(() => {
    if (!rankingsByPeriod) return []
    return Object.keys(rankingsByPeriod).sort().reverse()
  }, [rankingsByPeriod])

  const currentRankings = useMemo(() => {
    if (!rankingsByPeriod || !selectedPeriod) return []
    return rankingsByPeriod[selectedPeriod] || []
  }, [rankingsByPeriod, selectedPeriod])

  const creatorAddresses = useMemo(() => {
    if (!currentRankings.length) return []
    return [
      ...new Set(currentRankings.map((scene) => scene.creator.toLowerCase())),
    ]
  }, [currentRankings])

  const { positions, worlds } = useMemo(() => {
    if (!currentRankings.length) return { positions: [], worlds: [] }

    const positionsList: string[] = []
    const worldsList: string[] = []

    currentRankings.forEach((scene) => {
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

  const scenes = useMemo(() => {
    if (!currentRankings.length) return []
    return [...currentRankings]
      .sort((a, b) => a.ranking - b.ranking)
      .map((ranking) => transformToSceneCardData(ranking, profiles, places))
  }, [currentRankings, profiles, places])

  // Preload images when scenes are ready and period changes
  useEffect(() => {
    if (!scenes.length || !selectedPeriod) return
    if (imagesReadyForPeriod === selectedPeriod) return
    const imageUrls = [...new Set(scenes.map((s) => s.image))]
    preloadImages(imageUrls).then(() => setImagesReadyForPeriod(selectedPeriod))
  }, [scenes, selectedPeriod, imagesReadyForPeriod])

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
    availablePeriods,
    isLoading,
  }
}

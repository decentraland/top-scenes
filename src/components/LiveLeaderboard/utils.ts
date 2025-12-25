import type { SceneRowData } from "decentraland-ui2"
import { isEns } from "../../features/places"
import sceneThumbnail from "../../images/scene-thumbnail.webp"
import { getBorderColor } from "../../utils/rankColors"
import type { Place } from "../../features/places"
import type { SceneRanking } from "../../features/scenes"
import type { Avatar } from "@dcl/schemas"

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

export const transformToSceneRowData = (
  scene: SceneRanking,
  profiles?: Record<string, Avatar>,
  places?: Record<string, Place>
): SceneRowData => {
  const creatorAddress = scene.creator.toLowerCase()
  const avatar = profiles?.[creatorAddress]

  const finalAvatar =
    avatar || createPlaceholderAvatar(scene.creator, scene.contactName)

  const thumbnail = getPlaceThumbnail(scene.locationId, places)

  return {
    key: String(scene.ranking),
    sceneName: scene.placeName,
    thumbnail,
    creator: finalAvatar,
    location: scene.locationId,
    positionChange: 0,
    borderColor: getBorderColor(scene.ranking),
  }
}

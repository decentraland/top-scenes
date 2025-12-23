import type { SceneRowData } from "decentraland-ui2"
import sceneThumbnail from "../../images/scene-thumbnail.webp"
import { getBorderColor } from "../../utils/rankColors"
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

export const transformToSceneRowData = (
  scene: SceneRanking,
  profiles?: Record<string, Avatar>
): SceneRowData => {
  const creatorAddress = scene.creator.toLowerCase()
  const avatar = profiles?.[creatorAddress]

  if (!avatar) {
    console.log("Profile not found for:", creatorAddress, "- using placeholder")
  }

  const finalAvatar =
    avatar || createPlaceholderAvatar(scene.creator, scene.contactName)

  const location = scene.locationId.includes("|")
    ? scene.locationId.replace("|", ",")
    : scene.locationId

  return {
    key: String(scene.ranking),
    sceneName: scene.placeName,
    thumbnail: sceneThumbnail,
    creator: finalAvatar,
    location,
    positionChange: 0,
    borderColor: getBorderColor(scene.ranking),
  }
}

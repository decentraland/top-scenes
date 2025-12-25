import type { SceneRowData } from "decentraland-ui2"
import { isEns } from "../../features/places"
import sceneThumbnail from "../../images/scene-thumbnail.webp"
import { createPlaceholderAvatar } from "../../utils/avatarUtils"
import { getBorderColor } from "../../utils/rankColors"
import type { Place } from "../../features/places"
import type { SceneRanking } from "../../features/scenes"
import type { Avatar } from "@dcl/schemas"

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

import { dclColors } from "decentraland-ui2"
import positionStar1 from "../images/Position_Star_Medium_1.webp"
import positionStar2 from "../images/Position_Star_Medium_2.webp"
import positionStar3 from "../images/Position_Star_Medium_3.webp"

const getBorderColor = (rank: number): string | undefined => {
  if (rank === 1) return dclColors.gradient.gold
  if (rank === 2) return dclColors.gradient.silver
  if (rank === 3) return dclColors.gradient.bronze
  return undefined
}

const getCornerBadgeImage = (rank: number): string | undefined => {
  if (rank === 1) return positionStar1
  if (rank === 2) return positionStar2
  if (rank === 3) return positionStar3
  return undefined
}

export { getBorderColor, getCornerBadgeImage }

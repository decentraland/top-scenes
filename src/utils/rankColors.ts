import { dclColors } from "decentraland-ui2"
import positionStar1 from "../images/Position_Star_Medium_1.webp"
import positionStar2 from "../images/Position_Star_Medium_2.webp"
import positionStar3 from "../images/Position_Star_Medium_3.webp"

const RANK_STYLES: Record<number, { border: string; badge: string }> = {
  1: { border: dclColors.gradient.gold, badge: positionStar1 },
  2: { border: dclColors.gradient.silver, badge: positionStar2 },
  3: { border: dclColors.gradient.bronze, badge: positionStar3 },
}

const getBorderColor = (rank: number): string | undefined =>
  RANK_STYLES[rank]?.border

const getCornerBadgeImage = (rank: number): string | undefined =>
  RANK_STYLES[rank]?.badge

export { getBorderColor, getCornerBadgeImage }

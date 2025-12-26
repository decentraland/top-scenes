import { type FC, memo } from "react"
import { useTranslation } from "react-i18next"
import { NumberBadge, TextBadge } from "decentraland-ui2"
import { getCornerBadgeImage } from "../../utils/rankColors"
import { StarImage } from "./RankingBadge.styled"

type RankingBadgeProps = {
  rank: number
  isNew?: boolean
}

export const RankingBadge: FC<RankingBadgeProps> = memo(({ rank, isNew }) => {
  const { t } = useTranslation()

  if (isNew) {
    return <TextBadge text={t("bestNewScene.badgeText")} />
  }

  const starImage = getCornerBadgeImage(rank)
  if (starImage) {
    return <StarImage src={starImage} alt={`Rank ${rank}`} />
  }

  return <NumberBadge value={String(rank)} />
})

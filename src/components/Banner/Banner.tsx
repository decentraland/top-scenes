import { type FC, memo, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useAnalytics } from "@dcl/hooks"
import bannerBg from "../../images/banner_bg.webp"
import bannerOverlay from "../../images/banner_overlay.webp"
import { Events } from "../../modules/analytics"
import { scrollToLeaderboard } from "../../utils/scrollUtils"
import {
  BannerContainer,
  BannerContent,
  BannerDescription,
  BannerImage,
  BannerOverlay,
  BannerTitle,
  LiveLeaderboardButton,
} from "./Banner.styled"

export const Banner: FC = memo(() => {
  const { t } = useTranslation()
  const { track } = useAnalytics()

  const handleLeaderboardClick = useCallback(() => {
    track(Events.CLICK_VIEW_LEADERBOARD_CTA)
    scrollToLeaderboard()
  }, [track])

  return (
    <BannerContainer>
      <BannerImage src={bannerBg} alt={t("banner.backgroundAlt")} />
      <BannerOverlay src={bannerOverlay} alt="" />
      <BannerContent>
        <BannerTitle>{t("banner.title")}</BannerTitle>
        <BannerDescription>{t("banner.description")}</BannerDescription>
        <LiveLeaderboardButton
          variant="contained"
          color="secondary"
          onClick={handleLeaderboardClick}
        >
          {t("banner.button")}
        </LiveLeaderboardButton>
      </BannerContent>
    </BannerContainer>
  )
})

import { type FC, memo } from "react"
import { useTranslation } from "react-i18next"
import bannerBg from "../../images/banner_bg.webp"
import bannerOverlay from "../../images/banner_overlay.webp"
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
          href="#leaderboard"
        >
          {t("banner.button")}
        </LiveLeaderboardButton>
      </BannerContent>
    </BannerContainer>
  )
})

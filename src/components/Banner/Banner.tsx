import { type FC, memo } from "react"
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
  return (
    <BannerContainer>
      <BannerImage src={bannerBg} alt="Banner background" />
      <BannerOverlay src={bannerOverlay} alt="" />
      <BannerContent>
        <BannerTitle>Top Scenes Leaderboard</BannerTitle>
        <BannerDescription>
          Discover Decentraland&apos;s hottest scenes as they race to the top of
          the leaderboard each month!
        </BannerDescription>
        <LiveLeaderboardButton
          variant="contained"
          color="secondary"
          href="#leaderboard"
        >
          ⭐️ Live Leaderboard
        </LiveLeaderboardButton>
      </BannerContent>
    </BannerContainer>
  )
})

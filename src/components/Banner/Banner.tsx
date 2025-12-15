import { type FC, memo } from "react"
import bannerBg from "../../images/banner_bg.png"
import {
  BannerContainer,
  BannerContent,
  BannerDescription,
  BannerImage,
  BannerTitle,
} from "./Banner.styled"

export const Banner: FC = memo(() => {
  return (
    <BannerContainer>
      <BannerImage src={bannerBg} alt="Banner background" />
      <BannerContent>
        <BannerTitle>Top Scenes Leaderboard</BannerTitle>
        <BannerDescription>
          Discover Decentraland&apos;s hottest scenes as they race to the top of
          the leaderboard each month!
        </BannerDescription>
      </BannerContent>
    </BannerContainer>
  )
})

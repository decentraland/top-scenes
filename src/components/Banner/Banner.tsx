import { type FC, memo } from "react"
import bannerBg from "../../images/banner_bg.png"
import { BannerContainer, BannerImage } from "./Banner.styled"

export const Banner: FC = memo(() => {
  return (
    <BannerContainer>
      <BannerImage src={bannerBg} alt="Banner background" />
    </BannerContainer>
  )
})

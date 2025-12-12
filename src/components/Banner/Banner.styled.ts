import { Box, styled } from "decentraland-ui2"

const BannerContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  display: "flex",
  marginTop: theme.spacing(8),
  flexDirection: "column",
  alignItems: "center",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "150px",
    background: "linear-gradient(270deg, #A042CD -55.09%, #140323 164.07%)",
    mask: "linear-gradient(to bottom, transparent 0%, black 100%)",
    WebkitMask: "linear-gradient(to bottom, transparent 0%, black 100%)",
    pointerEvents: "none",
  },
  [theme.breakpoints.down("sm")]: {
    height: "400px",
    overflow: "hidden",
  },
}))

const BannerImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: "auto",
  display: "block",
  [theme.breakpoints.down("sm")]: {
    width: "auto",
    height: "100%",
    maxWidth: "none",
    objectFit: "cover",
  },
}))

export { BannerContainer, BannerImage }

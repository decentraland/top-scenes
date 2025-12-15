import { Box, Typography, styled } from "decentraland-ui2"

const BannerContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  display: "flex",
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

const BannerContent = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "35%",
  left: theme.spacing(8),
  transform: "translateY(-50%)",
  display: "grid",
  gridTemplateColumns: "min-content",
  zIndex: 1,
  [theme.breakpoints.down("md")]: {
    left: theme.spacing(4),
  },
  [theme.breakpoints.down("xs")]: {
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    maxWidth: "90%",
    gridTemplateColumns: "1fr",
  },
}))

const BannerTitle = styled(Typography)(({ theme }) => ({
  fontSize: "56px",
  fontWeight: 700,
  color: "#fff",
  lineHeight: 1.1,
  marginBottom: theme.spacing(2),
  whiteSpace: "nowrap",
  [theme.breakpoints.down("lg")]: {
    fontSize: "48px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "32px",
  },
  [theme.breakpoints.down("xs")]: {
    fontSize: "24px",
    whiteSpace: "normal",
  },
}))

const BannerDescription = styled(Typography)(({ theme }) => ({
  fontSize: "24px",
  fontWeight: 400,
  color: "rgba(255, 255, 255, 0.9)",
  lineHeight: 1.5,
  [theme.breakpoints.down("lg")]: {
    fontSize: "20px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "16px",
  },
  [theme.breakpoints.down("xs")]: {
    fontSize: "14px",
  },
}))

export {
  BannerContainer,
  BannerContent,
  BannerDescription,
  BannerImage,
  BannerTitle,
}

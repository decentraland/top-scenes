import { Box, Button, Typography, styled } from "decentraland-ui2"

const BannerContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  maxWidth: "1920px",
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
    // [theme.breakpoints.down("sm")]: {
    //   display: "none",
    // },
  },
  [theme.breakpoints.down("sm")]: {
    height: "350px",
    overflow: "hidden",
  },
  [theme.breakpoints.down("xs")]: {
    height: "300px",
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
  [theme.breakpoints.down("sm")]: {
    top: "50%",
  },
  [theme.breakpoints.down("xs")]: {
    top: "auto",
    bottom: 0,
    left: 0,
    transform: "none",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    padding: theme.spacing(2),
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
    marginBottom: theme.spacing(1),
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

const LiveLeaderboardButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(1.5, 3),
  fontSize: "16px",
  fontWeight: 600,
  borderRadius: theme.spacing(1),
  textTransform: "none",
  maxWidth: "fit-content",
  [theme.breakpoints.down("sm")]: {
    fontSize: "14px",
    padding: theme.spacing(1, 2),
  },
  [theme.breakpoints.down("xs")]: {
    display: "none",
  },
}))

const BannerOverlay = styled("img")(({ theme }) => ({
  position: "absolute",
  width: "45%",
  top: "40%",
  right: 0,
  transform: "translateY(-50%)",
  maxHeight: "100%",
  objectFit: "contain",
  pointerEvents: "none",
  zIndex: 1,
  [theme.breakpoints.down("sm")]: {
    top: "50%",
  },
  [theme.breakpoints.down("xs")]: {
    width: "70%",
    top: "40%",
    right: "20px",
  },
}))

export {
  BannerContainer,
  BannerContent,
  BannerDescription,
  BannerImage,
  BannerOverlay,
  BannerTitle,
  LiveLeaderboardButton,
}

import { Box, Typography, styled } from "decentraland-ui2"

const LiveLeaderboardContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  maxWidth: "1920px",
  boxSizing: "border-box",
}))

const LiveLeaderboardTitle = styled(Typography)(({ theme }) => ({
  fontSize: "48px",
  fontWeight: 700,
  width: "100%",
  [theme.breakpoints.down("xl")]: {
    fontSize: "32px",
  },
}))

export { LiveLeaderboardContainer, LiveLeaderboardTitle }

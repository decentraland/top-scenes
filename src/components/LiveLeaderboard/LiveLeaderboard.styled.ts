import { Box, Typography, styled } from "decentraland-ui2"

const LiveLeaderboardContainer = styled(Box)(() => ({
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

const TablesWrapper = styled(Box)(() => ({
  display: "flex",
  width: "100%",
  alignItems: "flex-start",
  gap: 0,
}))

const RankTableWrapper = styled(Box)(() => ({
  maxWidth: "90px",
  flexShrink: 0,
}))

const RankCell = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "20px",
  fontWeight: 600,
  height: theme.spacing(8.75),
  [theme.breakpoints.down("xs")]: {
    height: theme.spacing(7.5),
  },
}))

export {
  LiveLeaderboardContainer,
  LiveLeaderboardTitle,
  RankCell,
  RankTableWrapper,
  TablesWrapper,
}

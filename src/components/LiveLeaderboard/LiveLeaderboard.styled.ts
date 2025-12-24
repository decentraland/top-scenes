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
  padding: theme.spacing(2),
  [theme.breakpoints.down("xl")]: {
    fontSize: "32px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "24px",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  [theme.breakpoints.down("xs")]: {
    display: "none",
  },
}))

const TablesWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  alignItems: "flex-start",
  gap: 0,
  paddingTop: theme.spacing(1.5),
  "& .MuiTableCell-root": {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  "& .MuiTableCell-root img": {
    width: "100px",
    minWidth: "100",
    maxWidth: "100x",
  },
  [theme.breakpoints.down("sm")]: {
    "& .MuiTableCell-root img": {
      width: "70px",
      minWidth: "70px",
      maxWidth: "70px",
    },
    [theme.breakpoints.down("xs")]: {
      "& .MuiTableCell-root img": {
        width: "50px",
        minWidth: "50px",
        maxWidth: "50px",
      },
    },
  },
}))

const RankTableWrapper = styled(Box)(({ theme }) => ({
  maxWidth: theme.spacing(11),
  flexShrink: 0,
  "& .MuiTableContainer-root": {
    padding: theme.spacing(0, 0, 0, 2),
  },
  [theme.breakpoints.down("sm")]: {
    maxWidth: "64px",
  },
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

const LoadingWrapper = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "300px",
  width: "100%",
}))

export {
  LiveLeaderboardContainer,
  LiveLeaderboardTitle,
  LoadingWrapper,
  RankCell,
  RankTableWrapper,
  TablesWrapper,
}

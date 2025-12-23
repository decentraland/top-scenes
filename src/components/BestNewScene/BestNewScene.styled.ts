import { Box, Typography, styled } from "decentraland-ui2"

const BestNewSceneContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  paddingTop: theme.spacing(4),
  [theme.breakpoints.down("xs")]: {
    display: "none",
  },
}))

const BestNewSceneTitle = styled(Typography)(({ theme }) => ({
  fontSize: "20px",
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  paddingLeft: theme.spacing(2),
  color: theme.palette.text.primary,
}))

const BestNewSceneWrapper = styled(Box)(() => ({
  display: "flex",
  width: "100%",
  alignItems: "flex-start",
  gap: 0,
}))

const NewTableWrapper = styled(Box)(({ theme }) => ({
  maxWidth: theme.spacing(11),
  flexShrink: 0,
  "& .MuiTableContainer-root": {
    padding: theme.spacing(0, 0, 0, 2),
  },
  [theme.breakpoints.down("sm")]: {
    maxWidth: theme.spacing(10),
  },
}))

const NewCell = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: theme.spacing(8.75),
  [theme.breakpoints.down("xs")]: {
    height: theme.spacing(7.5),
  },
}))

const NewBadge = styled(Box)(({ theme }) => ({
  background: "linear-gradient(90deg, #FF2D55 0%, #A524B3 100%)",
  color: theme.palette.common.white,
  fontSize: "12px",
  fontWeight: 700,
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.spacing(0.5),
  textTransform: "uppercase",
}))

export {
  BestNewSceneContainer,
  BestNewSceneTitle,
  BestNewSceneWrapper,
  NewBadge,
  NewCell,
  NewTableWrapper,
}

import { Box, styled } from "decentraland-ui2"

const PageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minHeight: "100vh",
  background: "linear-gradient(270deg, #A042CD -55.09%, #140323 164.07%)",
  marginTop: theme.spacing(8),
}))

const ContentWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  padding: theme.spacing(4),
  boxSizing: "border-box",
  [theme.breakpoints.down("sm")]: {
    padding: 0,
  },
  [theme.breakpoints.down("xs")]: {
    display: "none",
  },
}))

export { ContentWrapper, PageContainer }

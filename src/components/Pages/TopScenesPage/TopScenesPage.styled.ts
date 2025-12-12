import { Box, styled } from "decentraland-ui2"

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: theme.spacing(6),
  padding: theme.spacing(4),
  minHeight: "100vh",
  background: "linear-gradient(270deg, #A042CD -55.09%, #140323 164.07%)",
  [theme.breakpoints.down("sm")]: {
    padding: 0,
  },
}))

export { Container }

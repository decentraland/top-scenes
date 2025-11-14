import { Box, Typography, styled } from "decentraland-ui2"

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(4),
}))

const Title = styled(Typography)(({ theme }) => ({
  ...theme.typography.h3,
  color: theme.palette.text.primary,
}))

export { Container, Title }

import { Box, Typography, dclColors, styled } from "decentraland-ui2"

const CountdownWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(2),
  width: "100%",
  padding: theme.spacing(6),
  textAlign: "center",
  background: "rgba(0, 0, 0, 0.4)",
  borderRadius: theme.spacing(3),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
  },
}))

const CountdownTitle = styled(Typography)(({ theme }) => ({
  fontSize: "32px",
  fontWeight: 700,
  color: theme.palette.text.primary,
  [theme.breakpoints.down("sm")]: {
    fontSize: "24px",
  },
}))

const CountdownText = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: 400,
  color: theme.palette.text.primary,
  maxWidth: "500px",
  lineHeight: 1.6,
  [theme.breakpoints.down("sm")]: {
    fontSize: "14px",
  },
}))

const CountdownTimer = styled(Typography)(({ theme }) => ({
  fontSize: "96px",
  fontWeight: 700,
  lineHeight: 1,
  background: dclColors.gradient.flare,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  marginTop: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    fontSize: "56px",
  },
}))

export { CountdownText, CountdownTimer, CountdownTitle, CountdownWrapper }

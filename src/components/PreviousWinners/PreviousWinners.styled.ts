import { Box, Select, keyframes, styled } from "decentraland-ui2"

const fadeIn = keyframes({
  from: {
    opacity: 0,
    transform: "translateY(12px)",
  },
  to: {
    opacity: 1,
    transform: "translateY(0)",
  },
})

const gradientPulse = keyframes({
  "0%": {
    backgroundPosition: "0% 50%",
  },
  "50%": {
    backgroundPosition: "100% 50%",
  },
  "100%": {
    backgroundPosition: "0% 50%",
  },
})

const PreviousWinnersContainer = styled(Box)<{ isLoading?: boolean }>(
  ({ theme, isLoading }) => ({
    padding: theme.spacing(4),
    background: isLoading
      ? "linear-gradient(270deg, #A042CD, #140323, #6B1F9A, #140323, #A042CD)"
      : "radial-gradient(circle, #A042CD 0%, #140323 100%)",
    backgroundSize: isLoading ? "400% 400%" : "100% 100%",
    animation: isLoading ? `${gradientPulse} 3s ease infinite` : "none",
    borderRadius: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    position: "relative",
    top: "-90px",
    alignItems: "center",
    width: "100%",
    maxWidth: "1920px",
    minHeight: isLoading ? "400px" : undefined,
    justifyContent: "space-between",
    boxSizing: "border-box",
    transition: "background 0.5s ease",
    [theme.breakpoints.down("sm")]: {
      borderRadius: 0,
      padding: theme.spacing(2),
      top: 0,
      minHeight: isLoading ? "300px" : undefined,
    },
    [theme.breakpoints.down("xs")]: {
      background: isLoading ? "transparent" : undefined,
      animation: "none",
      padding: isLoading ? 0 : theme.spacing(2),
      minHeight: isLoading ? "300px" : undefined,
    },
  })
)

const PreviousWinnersHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  animation: `${fadeIn} 0.4s ease-out`,
  [theme.breakpoints.down("xs")]: {
    justifyContent: "flex-end",
  },
}))

const PreviousWinnersTitle = styled(Box)(({ theme }) => ({
  display: "block",
  [theme.breakpoints.down("xs")]: {
    display: "none",
  },
}))

const MonthSelect = styled(Select)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.spacing(1.5),
  minWidth: "200px",
  cursor: "pointer",
  transition: "background-color 0.2s ease",
  "& .MuiSelect-select": {
    padding: theme.spacing(1, 1.5),
    paddingRight: theme.spacing(7),
    fontWeight: 600,
    cursor: "pointer",
    fontSize: "12px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiSelect-icon": {
    right: 0,
    top: 0,
    height: "100%",
    width: theme.spacing(6),
    backgroundColor: "transparent",
    borderRadius: theme.shape.borderRadius,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.2s ease",
  },
  "& .MuiSelect-icon svg": {
    width: "24px",
    height: "24px",
  },
  "&:hover": {
    backgroundColor: theme.palette.error.main,
  },
}))

const ScenesGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(12, 1fr)",
  gap: theme.spacing(4),
  width: "100%",
  marginTop: theme.spacing(4),
  animation: `${fadeIn} 0.4s ease-out`,
  "& > *": {
    minWidth: 0,
    gridColumn: "span 4",
  },
  [theme.breakpoints.up("xl")]: {
    "& > *": {
      gridColumn: "span 3",
    },
    "& > *:nth-of-type(1), & > *:nth-of-type(2), & > *:nth-of-type(3)": {
      gridColumn: "span 4",
    },
  },
  [theme.breakpoints.down("xs")]: {
    gridTemplateColumns: "1fr",
    gap: theme.spacing(2.5),
    justifyItems: "center",
    "& > *": {
      gridColumn: "span 1",
      maxWidth: "400px",
      width: "100%",
    },
  },
}))

const LoadingWrapper = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "300px",
  width: "100%",
  [theme.breakpoints.down("xs")]: {
    display: "flex",
  },
}))

export {
  LoadingWrapper,
  MonthSelect,
  PreviousWinnersContainer,
  PreviousWinnersHeader,
  PreviousWinnersTitle,
  ScenesGrid,
}

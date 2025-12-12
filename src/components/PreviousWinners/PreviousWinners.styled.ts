import { Box, Select, styled } from "decentraland-ui2"

const PreviousWinnersContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  background: "radial-gradient(circle, #A042CD 0%, #140323 100%)",
  borderRadius: theme.spacing(5),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  justifyContent: "space-between",
  boxSizing: "border-box",
}))

const PreviousWinnersHeader = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
}))

const MonthSelect = styled(Select)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.spacing(1.5),
  minWidth: "200px",
  cursor: "pointer",
  transition: "background-color 0.2s ease",
  "& .MuiSelect-select": {
    padding: theme.spacing(1.5, 2),
    paddingRight: theme.spacing(7),
    fontWeight: 600,
    cursor: "pointer",
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
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: theme.spacing(3),
  width: "100%",
  marginTop: theme.spacing(4),
  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "repeat(1, 1fr)",
  },
}))

export {
  MonthSelect,
  PreviousWinnersContainer,
  PreviousWinnersHeader,
  ScenesGrid,
}

import { Box, Tab, Tabs, styled } from "decentraland-ui2"

const MobileTabsContainer = styled(Box)(({ theme }) => ({
  display: "none",
  width: "100%",
  [theme.breakpoints.down("xs")]: {
    display: "flex",
    flexDirection: "column",
  },
}))

const StyledTabs = styled(Tabs)(({ theme }) => ({
  width: "100%",
  minHeight: "auto",
  "& .MuiTabs-flexContainer": {
    justifyContent: "center",
  },
  "& .MuiTabs-indicator": {
    backgroundColor: theme.palette.error.main,
    height: "3px",
  },
}))

const StyledTab = styled(Tab)(({ theme }) => ({
  flex: 1,
  maxWidth: "none",
  fontSize: "14px",
  fontWeight: 700,
  textTransform: "uppercase",
  color: theme.palette.text.secondary,
  padding: theme.spacing(2),
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  "&.Mui-selected": {
    color: theme.palette.text.primary,
    backgroundColor: "transparent",
  },
}))

const TabContent = styled(Box)(() => ({
  width: "100%",
}))

export { MobileTabsContainer, StyledTab, StyledTabs, TabContent }

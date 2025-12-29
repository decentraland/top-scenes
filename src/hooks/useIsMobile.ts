import { useMediaQuery, useTheme } from "decentraland-ui2"

export const useIsMobile = (): boolean => {
  const theme = useTheme()
  return useMediaQuery(theme.breakpoints.down("sm"))
}

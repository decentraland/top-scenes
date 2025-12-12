import { type FC, memo } from "react"
import { Box, FooterLanding } from "decentraland-ui2"
import { AppRoutes } from "./AppRoutes"
import { Navbar } from "./components/Navbar"

export const App: FC = memo(() => {
  return (
    <Box>
      <Navbar />
      <AppRoutes />
      <FooterLanding />
    </Box>
  )
})

import { type FC, memo } from "react"
import { Route, Routes } from "react-router-dom"
import { TopScenesPage } from "./components/Pages/TopScenesPage"

const ROUTES = {
  HOME: "/",
  LEADERBOARD: "/leaderboard",
  PREVIOUS_WINNERS: "/previous-winners",
}

const AppRoutes: FC = memo(() => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<TopScenesPage />} />
      <Route path={ROUTES.LEADERBOARD} element={<TopScenesPage />} />
      <Route
        path={ROUTES.PREVIOUS_WINNERS + "/:month?"}
        element={<TopScenesPage />}
      />
    </Routes>
  )
})

export { AppRoutes, ROUTES }

import { type FC, memo } from "react"
import { Route, Routes } from "react-router-dom"
import { TopScenesPage } from "./components/Pages/TopScenesPage"
import { usePageTracking } from "./hooks/usePageTracking"

export const AppRoutes: FC = memo(() => {
  usePageTracking()

  return (
    <Routes>
      <Route path="/top-scenes" element={<TopScenesPage />} />
    </Routes>
  )
})

import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQuery } from "./baseQuery"

export const scenesClient = createApi({
  reducerPath: "scenesClient",
  baseQuery,
  tagTypes: ["SceneRanking"],
  keepUnusedDataFor: 60,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: () => ({}),
})

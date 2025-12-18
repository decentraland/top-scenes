import { fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const baseQuery = fetchBaseQuery({
  baseUrl: "https://cdn-data.decentraland.org/public",
  prepareHeaders: (headers) => {
    headers.set("accept", "application/json")
    return headers
  },
})

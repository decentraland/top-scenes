import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Place, PlacesApiResponse } from "./places.types"

const PLACES_API_URL = "https://places.decentraland.org/api"

const isEns = (str: string | undefined): str is `${string}.eth` =>
  !!str?.match(/^[a-zA-Z0-9.]+\.eth$/)?.length

const placesClient = createApi({
  reducerPath: "placesClient",
  baseQuery: fetchBaseQuery({
    baseUrl: PLACES_API_URL,
    prepareHeaders: (headers) => {
      headers.set("accept", "application/json")
      return headers
    },
  }),
  tagTypes: ["Places"],
  endpoints: (build) => ({
    getPlacesByPositions: build.query<Place[], string[]>({
      query: (positions) => `/places?positions=${positions.join(",")}`,
      transformResponse: (response: PlacesApiResponse): Place[] =>
        response.ok ? response.data : [],
      providesTags: ["Places"],
    }),
    getWorldsByNames: build.query<Place[], string[]>({
      query: (names) => `/worlds?names=${names.join(",")}`,
      transformResponse: (response: PlacesApiResponse): Place[] =>
        response.ok ? response.data : [],
      providesTags: ["Places"],
    }),
    getPlacesAndWorlds: build.query<
      Record<string, Place>,
      { positions: string[]; worlds: string[] }
    >({
      async queryFn(
        { positions, worlds },
        _queryApi,
        _extraOptions,
        fetchWithBQ
      ) {
        const results: Record<string, Place> = {}

        const placePromises = positions.map(async (position) => {
          const response = await fetchWithBQ(`/places?positions=${position}`)
          if (response.data) {
            const data = response.data as PlacesApiResponse
            if (data.ok && data.data.length > 0) {
              const place = data.data[0]
              results[place.base_position] = place
            }
          }
        })

        const worldPromises = worlds.map(async (world) => {
          const response = await fetchWithBQ(
            `/worlds?names=${world.toLowerCase()}`
          )
          if (response.data) {
            const data = response.data as PlacesApiResponse
            if (data.ok && data.data.length > 0) {
              const place = data.data[0]
              if (place.world_name) {
                results[place.world_name.toLowerCase()] = place
              }
            }
          }
        })

        await Promise.all([...placePromises, ...worldPromises])

        return { data: results }
      },
      providesTags: ["Places"],
    }),
  }),
})

const {
  useGetPlacesByPositionsQuery,
  useGetWorldsByNamesQuery,
  useGetPlacesAndWorldsQuery,
} = placesClient

export {
  isEns,
  placesClient,
  useGetPlacesAndWorldsQuery,
  useGetPlacesByPositionsQuery,
  useGetWorldsByNamesQuery,
}

import { client } from "../../services/client"
import type { SceneRanking, SceneRankingResponse } from "./scenes.types"

const scenesClient = client.injectEndpoints({
  endpoints: (build) => ({
    getCurrentMonthRanking: build.query<SceneRanking[], void>({
      query: () => "/current/scene-ranking-current-month.json",
      transformResponse: (response: SceneRankingResponse): SceneRanking[] =>
        response.values.map(
          ([
            placeName,
            locationId,
            creator,
            contactName,
            ranking,
            lastEventRegisteredAt,
          ]) => ({
            placeName,
            locationId,
            creator,
            contactName,
            ranking,
            lastEventRegisteredAt,
          })
        ),
      providesTags: ["SceneRanking"],
    }),
  }),
  overrideExisting: false,
})

const { useGetCurrentMonthRankingQuery } = scenesClient

export { scenesClient, useGetCurrentMonthRankingQuery }

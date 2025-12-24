import { client } from "../../services/client"
import type {
  PreviousMonthRankingByPeriod,
  SceneRanking,
  SceneRankingResponse,
} from "./scenes.types"

const formatPeriod = (periodDate: string): string => {
  const date = new Date(periodDate)
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = String(date.getFullYear()).slice(-2)
  return `${month}/${year}`
}

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
    getPreviousMonthRanking: build.query<PreviousMonthRankingByPeriod, void>({
      query: () => "/current/scene-ranking-previous-month.json",
      transformResponse: (
        response: SceneRankingResponse
      ): PreviousMonthRankingByPeriod => {
        const rankings = response.values.map(
          ([
            placeName,
            locationId,
            creator,
            contactName,
            ranking,
            periodDate,
          ]) => ({
            placeName,
            locationId,
            creator,
            contactName,
            ranking,
            periodDate,
          })
        )

        return rankings.reduce<PreviousMonthRankingByPeriod>((acc, item) => {
          const period = formatPeriod(item.periodDate)
          if (!acc[period]) {
            acc[period] = []
          }
          acc[period].push(item)
          return acc
        }, {})
      },
      providesTags: ["SceneRanking"],
    }),
  }),
  overrideExisting: false,
})

const { useGetCurrentMonthRankingQuery, useGetPreviousMonthRankingQuery } =
  scenesClient

export {
  scenesClient,
  useGetCurrentMonthRankingQuery,
  useGetPreviousMonthRankingQuery,
}

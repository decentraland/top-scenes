type SceneRankingResponse = {
  name: string
  description: string
  metric_type: string
  dimensions: string[]
  dimension_display_names: string[]
  dimension_descriptions: string[]
  values: [string, string, string, string, number, string][]
}

type SceneRanking = {
  placeName: string
  locationId: string
  creator: string
  contactName: string
  ranking: number
  lastEventRegisteredAt: string
}

export type { SceneRanking, SceneRankingResponse }

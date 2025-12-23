type Place = {
  id: string
  title: string
  description: string
  image: string
  owner: string
  positions: string[]
  base_position: string
  contact_name: string
  content_rating: string
  disabled: boolean
  disabled_at: string | null
  created_at: string
  updated_at: string
  favorites: number
  likes: number
  dislikes: number
  like_rate: number
  highlighted: boolean
  highlighted_image: string | null
  featured: boolean
  featured_image: string | null
  user_favorite: boolean
  user_like: boolean
  user_dislike: boolean
  user_count: number
  user_visits: number
  categories: string[]
  world: boolean
  world_name: string | null
  deployed_at: string
}

type PlacesApiResponse = {
  ok: boolean
  data: Place[]
}

type PlaceApiResponse = {
  ok: boolean
  data: Place
}

export type { Place, PlaceApiResponse, PlacesApiResponse }

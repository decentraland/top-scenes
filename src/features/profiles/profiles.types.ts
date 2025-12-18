import type { Avatar } from "@dcl/schemas"

type ProfileResponse = {
  avatars: Avatar[]
}

type ProfilesRequest = {
  ids: string[]
}

export type { ProfileResponse, ProfilesRequest }

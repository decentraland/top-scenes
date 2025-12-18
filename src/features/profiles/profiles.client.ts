import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { ProfileResponse, ProfilesRequest } from "./profiles.types"
import type { Avatar } from "@dcl/schemas"

const profilesClient = createApi({
  reducerPath: "profilesClient",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://peer.decentraland.org/lambdas",
  }),
  tagTypes: ["Profiles"],
  endpoints: (build) => ({
    getProfiles: build.query<Record<string, Avatar>, ProfilesRequest>({
      query: ({ ids }) => ({
        url: "/profiles",
        method: "POST",
        body: { ids },
      }),
      transformResponse: (
        response: ProfileResponse[]
      ): Record<string, Avatar> => {
        const profilesMap: Record<string, Avatar> = {}
        response.forEach((profile) => {
          if (profile.avatars && profile.avatars.length > 0) {
            const avatar = profile.avatars[0]
            if (avatar.ethAddress) {
              profilesMap[avatar.ethAddress.toLowerCase()] = avatar
            }
            if (avatar.userId) {
              profilesMap[avatar.userId.toLowerCase()] = avatar
            }
          }
        })
        console.log("Profiles loaded:", Object.keys(profilesMap).length)
        return profilesMap
      },
      providesTags: ["Profiles"],
    }),
  }),
})

const { useGetProfilesQuery } = profilesClient

export { profilesClient, useGetProfilesQuery }

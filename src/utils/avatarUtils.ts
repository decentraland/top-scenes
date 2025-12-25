import type { Avatar } from "@dcl/schemas"

const createPlaceholderAvatar = (address: string, name: string): Avatar => ({
  hasClaimedName: false,
  description: "",
  tutorialStep: 0,
  name: name || address.slice(0, 8),
  userId: address,
  email: "",
  ethAddress: address,
  version: 1,
  avatar: {
    bodyShape: "urn:decentraland:off-chain:base-avatars:BaseMale",
    wearables: [],
    forceRender: [],
    emotes: [],
    snapshots: {
      face256: `https://peer.decentraland.org/lambdas/profile/${address}/face256`,
      body: `https://peer.decentraland.org/lambdas/profile/${address}/body.png`,
    },
    eyes: { color: { r: 0.2, g: 0.5, b: 0.7 } },
    hair: { color: { r: 0.3, g: 0.2, b: 0.1 } },
    skin: { color: { r: 0.9, g: 0.7, b: 0.6 } },
  },
  blocked: [],
  interests: [],
  hasConnectedWeb3: true,
  country: "",
  employmentStatus: "",
  gender: "",
  pronouns: "",
  relationshipStatus: "",
  sexualOrientation: "",
  language: "",
  profession: "",
  realName: "",
  hobbies: "",
  birthdate: 0,
  links: [],
})

export { createPlaceholderAvatar }

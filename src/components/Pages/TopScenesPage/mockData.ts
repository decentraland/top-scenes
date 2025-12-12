import sceneThumbnail from "../../../images/scene-thumbnail.png"
import type { Avatar } from "@dcl/schemas"

const exampleAvatar: Avatar = {
  hasClaimedName: true,
  description: "",
  tutorialStep: 256,
  name: "alelevyyyy",
  userId: "0xe3fc7040653768efb2941a6c26fdb868ed36ca99",
  email: "",
  ethAddress: "0xe3fc7040653768efb2941a6c26fdb868ed36ca99",
  version: 5,
  avatar: {
    bodyShape: "urn:decentraland:off-chain:base-avatars:BaseFemale",
    wearables: [
      "urn:decentraland:off-chain:base-avatars:black_top",
      "urn:decentraland:off-chain:base-avatars:kilt",
      "urn:decentraland:off-chain:base-avatars:SchoolShoes",
      "urn:decentraland:off-chain:base-avatars:matrix_sunglasses",
      "urn:decentraland:off-chain:base-avatars:thunder_02_earring",
      "urn:decentraland:off-chain:base-avatars:hair_undere",
      "urn:decentraland:off-chain:base-avatars:f_eyes_06",
    ],
    forceRender: [],
    emotes: [
      { slot: 0, urn: "handsair" },
      { slot: 1, urn: "wave" },
      { slot: 2, urn: "fistpump" },
      { slot: 3, urn: "dance" },
      { slot: 4, urn: "raiseHand" },
      { slot: 5, urn: "clap" },
      { slot: 6, urn: "money" },
      { slot: 7, urn: "kiss" },
      { slot: 8, urn: "headexplode" },
      { slot: 9, urn: "shrug" },
    ],
    snapshots: {
      face256:
        "https://profile-images.decentraland.org/entities/bafkreietha7mzh7q3lk4j236vut2znwqhbiapihg46p6yrv3j4lbwlzd34/face.png",
      body: "https://profile-images.decentraland.org/entities/bafkreietha7mzh7q3lk4j236vut2znwqhbiapihg46p6yrv3j4lbwlzd34/body.png",
    },
    eyes: {
      color: {
        r: 0.2235294133424759,
        g: 0.48627451062202454,
        b: 0.6901960968971252,
      },
    },
    hair: {
      color: {
        r: 0.32549020648002625,
        g: 0.2352941334247589,
        b: 0.1764705926179886,
      },
    },
    skin: {
      color: {
        r: 0.9490196108818054,
        g: 0.7607843279838562,
        b: 0.6470588445663452,
      },
    },
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
}

const mockScenes = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  image: sceneThumbnail,
  sceneName: `Simple Numbers ${i + 1}`,
  avatar: exampleAvatar,
  coordinates: "0,10",
}))

export { exampleAvatar, mockScenes }

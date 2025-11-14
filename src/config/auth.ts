import { ChainId } from "@dcl/schemas"
import { createAuthConfig } from "../contexts/auth"

export const authConfig = createAuthConfig({
  defaultChainId: ChainId.ETHEREUM_MAINNET,
  authUrl: "https://decentraland.org/auth",
  basePath: "/top-scenes-program",
  debug: process.env.NODE_ENV === "development",
})

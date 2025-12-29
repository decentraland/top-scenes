import { isEns } from "../features/places"

const JUMP_BASE_URL = "https://decentraland.org/jump/"

const getJumpInUrl = (coordinates: string): string => {
  if (isEns(coordinates)) {
    return `${JUMP_BASE_URL}?realm=${coordinates}`
  }
  return `${JUMP_BASE_URL}?position=${coordinates}`
}

const openJumpIn = (coordinates: string): void => {
  window.open(getJumpInUrl(coordinates), "_blank")
}

export { getJumpInUrl, openJumpIn }

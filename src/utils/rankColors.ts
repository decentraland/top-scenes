import { dclColors } from "decentraland-ui2"

export const getBorderColor = (rank: number): string | undefined => {
  if (rank === 1) return dclColors.gradient.gold
  if (rank === 2) return dclColors.gradient.silver
  if (rank === 3) return dclColors.gradient.bronze
  return undefined
}

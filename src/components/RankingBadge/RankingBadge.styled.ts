import { styled } from "decentraland-ui2"

const StarImage = styled("img")(({ theme }) => ({
  width: 70,
  height: 70,
  [theme.breakpoints.down("sm")]: {
    width: 40,
    height: 40,
  },
}))

export { StarImage }

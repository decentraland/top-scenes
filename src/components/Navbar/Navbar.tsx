import { FC } from "react"
import { Navbar as BaseNavbar } from "decentraland-ui2"
import { NavbarProps } from "./types"
import { useAuth } from "../../contexts/auth"

export const Navbar: FC<NavbarProps> = (props) => {
  const { avatar, wallet, isSignedIn, signIn, signOut } = useAuth()

  return (
    <BaseNavbar
      {...props}
      activePage=""
      address={wallet}
      avatar={avatar}
      isSignedIn={isSignedIn}
      onClickSignIn={signIn}
      onClickSignOut={signOut}
    />
  )
}

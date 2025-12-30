import { useCallback } from "react"
import { useAdvancedUserAgentData, useAnalytics } from "@dcl/hooks"
import { JumpInEventType, JumpInTrackingData } from "decentraland-ui2"
import { Events } from "../modules/analytics"

type TrackJumpInParams = {
  sceneName: string
  sceneLocation: string
}

type JumpInEvent =
  | Events.JUMP_IN_TO_PREVIOUS_WINNERS_SCENE
  | Events.JUMP_IN_TO_LEADERBOARD_SCENE

export const useTrackJumpIn = (event: JumpInEvent) => {
  const { track } = useAnalytics()
  const [, userAgentData] = useAdvancedUserAgentData()

  const trackJumpIn = useCallback(
    ({ sceneName, sceneLocation }: TrackJumpInParams) => {
      return (data: JumpInTrackingData) => {
        if (
          data.type === JumpInEventType.JUMP_IN ||
          data.type === JumpInEventType.OPEN_DOWNLOAD_MODAL
        ) {
          track(event, {
            sceneName,
            sceneLocation,
            has_launcher: data.has_launcher,
            mobile: userAgentData?.mobile,
            os: userAgentData?.os?.name,
            cpuArchitecture: userAgentData?.cpu?.architecture,
          })
        }
      }
    },
    [track, event, userAgentData]
  )

  return { trackJumpIn }
}

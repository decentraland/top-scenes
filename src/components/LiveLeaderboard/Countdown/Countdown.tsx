import { type FC, memo, useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  type TimeRemaining,
  calculateTimeRemaining,
} from "../../../utils/dateUtils"
import {
  CountdownText,
  CountdownTimer,
  CountdownTitle,
  CountdownWrapper,
} from "./Countdown.styled"

type CountdownProps = {
  month: string
  startDay: number
}

const getExpireDate = (startDay: number): Date => {
  const now = new Date()
  return new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), startDay, 0, 0, 0)
  )
}

export const Countdown: FC<CountdownProps> = memo(({ month, startDay }) => {
  const { t } = useTranslation()
  const expireDate = useMemo(() => getExpireDate(startDay), [startDay])
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(
    calculateTimeRemaining(expireDate)
  )

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = calculateTimeRemaining(expireDate)
      setTimeRemaining(newTime)

      if (
        newTime.hours === 0 &&
        newTime.minutes === 0 &&
        newTime.seconds === 0
      ) {
        window.location.reload()
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [expireDate])

  const timerDisplay = `${String(timeRemaining.hours).padStart(2, "0")}:${String(timeRemaining.minutes).padStart(2, "0")}:${String(timeRemaining.seconds).padStart(2, "0")}`

  return (
    <CountdownWrapper>
      <CountdownTitle>
        {t("liveLeaderboard.countdown.title", { month })}
      </CountdownTitle>
      <CountdownText>
        {t("liveLeaderboard.countdown.description")}{" "}
        {t("liveLeaderboard.countdown.subtitle", {
          month,
          day: startDay,
        })}
      </CountdownText>
      <CountdownTimer>{timerDisplay}</CountdownTimer>
    </CountdownWrapper>
  )
})

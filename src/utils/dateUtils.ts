type TimeRemaining = {
  hours: number
  minutes: number
  seconds: number
}

const parseMonthParam = (month: string | undefined): string | null => {
  if (!month || month.length !== 4) return null
  const mm = month.slice(0, 2)
  const yy = month.slice(2, 4)
  return `${mm}/${yy}`
}

const getCurrentMonthKey = (): string => {
  const now = new Date()
  return String(now.getUTCMonth() + 1).padStart(2, "0")
}

const calculateTimeRemaining = (expireDate: Date): TimeRemaining => {
  const now = new Date()
  const diff = Math.max(0, expireDate.getTime() - now.getTime())

  const totalHours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  return { hours: totalHours, minutes, seconds }
}

const sortPeriodsByDate = (periods: string[]): string[] =>
  [...periods].sort((a, b) => {
    const [monthA, yearA] = a.split("/").map(Number)
    const [monthB, yearB] = b.split("/").map(Number)
    if (yearB !== yearA) return yearB - yearA
    return monthB - monthA
  })

export {
  calculateTimeRemaining,
  getCurrentMonthKey,
  parseMonthParam,
  sortPeriodsByDate,
}
export type { TimeRemaining }

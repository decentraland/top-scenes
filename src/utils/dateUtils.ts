const parseMonthParam = (month: string | undefined): string | null => {
  if (!month || month.length !== 4) return null
  const mm = month.slice(0, 2)
  const yy = month.slice(2, 4)
  return `${mm}/${yy}`
}

export { parseMonthParam }

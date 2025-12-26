const scrollToLeaderboard = (): void => {
  document.getElementById("leaderboard")?.scrollIntoView()
}

const scrollToRanking = (): void => {
  document.getElementById("previous-winners")?.scrollIntoView()
}

export { scrollToLeaderboard, scrollToRanking }

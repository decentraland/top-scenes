import { type FC, memo } from "react"
import { useTranslation } from "react-i18next"
import { ScenesTable, dclTable } from "decentraland-ui2"
import { BestNewScene } from "../BestNewScene"
import { mockLeaderboardRows } from "./mockData"
import { getBorderColor } from "../../utils/rankColors"
import {
  LiveLeaderboardContainer,
  LiveLeaderboardTitle,
  RankCell,
  RankTableWrapper,
  TablesWrapper,
} from "./LiveLeaderboard.styled"

type RankRow = {
  key: string
  rank: number
  borderColor?: string
}

const rankRows: RankRow[] = mockLeaderboardRows.map((_, index) => ({
  key: String(index + 1),
  rank: index + 1,
  borderColor: getBorderColor(index + 1),
}))

export const LiveLeaderboard: FC = memo(() => {
  const { t } = useTranslation()
  const currentMonth = t("previousWinners.months.october")

  const rankColumns: dclTable.Column<RankRow>[] = [
    {
      id: "rank",
      header: t("liveLeaderboard.rankHeader"),
      cellPadding: 0,
      render: (row) => <RankCell key={row.key}>{row.rank}</RankCell>,
    },
  ]

  return (
    <LiveLeaderboardContainer id="leaderboard">
      <LiveLeaderboardTitle>
        {t("liveLeaderboard.title", { month: currentMonth })}
      </LiveLeaderboardTitle>
      <TablesWrapper>
        <RankTableWrapper>
          <dclTable.Table
            columns={rankColumns}
            rows={rankRows}
            hoverEffect={false}
          />
        </RankTableWrapper>
        <ScenesTable rows={mockLeaderboardRows} />
      </TablesWrapper>
      <BestNewScene />
    </LiveLeaderboardContainer>
  )
})

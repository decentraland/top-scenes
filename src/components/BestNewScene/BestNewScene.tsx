import { type FC, memo } from "react"
import { useTranslation } from "react-i18next"
import { ScenesTable, dclTable } from "decentraland-ui2"
import { mockBestNewScene } from "../LiveLeaderboard/mockData"
import {
  BestNewSceneContainer,
  BestNewSceneTitle,
  BestNewSceneWrapper,
  NewBadge,
  NewCell,
  NewTableWrapper,
} from "./BestNewScene.styled"

type NewRow = {
  key: string
}

const newRows: NewRow[] = [{ key: "new" }]

export const BestNewScene: FC = memo(() => {
  const { t } = useTranslation()

  const newColumns: dclTable.Column<NewRow>[] = [
    {
      id: "new",
      header: t("bestNewScene.rankHeader"),
      cellPadding: 0,
      render: (row) => (
        <NewCell key={row.key}>
          <NewBadge>{t("bestNewScene.newBadge")}</NewBadge>
        </NewCell>
      ),
    },
  ]

  return (
    <BestNewSceneContainer>
      <BestNewSceneTitle>{t("bestNewScene.title")}</BestNewSceneTitle>
      <BestNewSceneWrapper>
        <NewTableWrapper>
          <dclTable.Table
            columns={newColumns}
            rows={newRows}
            hoverEffect={false}
          />
        </NewTableWrapper>
        <ScenesTable rows={[mockBestNewScene]} />
      </BestNewSceneWrapper>
    </BestNewSceneContainer>
  )
})

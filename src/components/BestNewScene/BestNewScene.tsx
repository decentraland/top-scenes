import { type FC, memo, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { type SceneRowData, ScenesTable, dclTable } from "decentraland-ui2"
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

type BestNewSceneProps = {
  sceneRow: SceneRowData
  onMobileRowClick?: (row: SceneRowData, index: number) => void
}

const newRows: NewRow[] = [{ key: "new" }]

export const BestNewScene: FC<BestNewSceneProps> = memo(
  ({ sceneRow, onMobileRowClick }) => {
    const { t } = useTranslation()

    const newColumns: dclTable.Column<NewRow>[] = useMemo(
      () => [
        {
          id: "new",
          header: t("liveLeaderboard.rankHeader"),
          cellPadding: 0,
          render: (row) => (
            <NewCell key={row.key}>
              <NewBadge>{t("bestNewScene.newBadge")}</NewBadge>
            </NewCell>
          ),
        },
      ],
      [t]
    )

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
          <ScenesTable rows={[sceneRow]} onMobileRowClick={onMobileRowClick} />
        </BestNewSceneWrapper>
      </BestNewSceneContainer>
    )
  }
)

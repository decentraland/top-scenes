import { type FC, memo } from "react"
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

const newColumns: dclTable.Column<NewRow>[] = [
  {
    id: "new",
    header: "Rank",
    cellPadding: 0,
    render: (row) => (
      <NewCell key={row.key}>
        <NewBadge>NEW</NewBadge>
      </NewCell>
    ),
  },
]

export const BestNewScene: FC = memo(() => {
  return (
    <BestNewSceneContainer>
      <BestNewSceneTitle>Best New Scene</BestNewSceneTitle>
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

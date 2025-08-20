import type { ISpaceList } from "~/composables/apiClient/types/spaceTree/ISpaceList";

export interface ISpaceTreeNode {
  id: string
  name: string
  task_count: number
  children?: ISpaceList[]
}

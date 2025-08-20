import type { ISpaceList } from "~/composables/apiClient/types/spaceTree/ISpaceList";

export interface ISpaceFolder {
  id: string
  name: string
  task_count: number
  lists: ISpaceList[]
}

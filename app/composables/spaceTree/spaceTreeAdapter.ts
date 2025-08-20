import type { ISpaceTreeResponse } from "~/composables/apiClient/types/spaceTree/ISpaceTreeResponse";
import type { ISpaceTreeNode } from "~/composables/spaceTree/types/ISpaceTreeNode";

export const spaceTreeAdapter = {
  toClient (data: ISpaceTreeResponse['data']): ISpaceTreeNode[] {
    return data.map((item) => {
      if ('lists' in item) {
        return {
          id: item.id,
          name: item.name,
          task_count: item.task_count,
          children: item.lists,
        }
      }

      return item
    })
  },
}

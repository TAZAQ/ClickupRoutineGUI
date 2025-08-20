import { useClickUp } from "~/composables/apiClient/useClickUp";
import type { ISpaceTreeResponse } from "~/composables/apiClient/types/spaceTree/ISpaceTreeResponse";
import { spaceTreeAdapter } from "~/composables/spaceTree/spaceTreeAdapter";
import type { ISpaceTreeNode } from "~/composables/spaceTree/types/ISpaceTreeNode";

export const useSpaceTree = () => {
  const spaceTree = ref<ISpaceTreeNode[]>([])

  const { getSpace } = useClickUp()

  async function fetchSpace () {
    spaceTree.value = await getSpace()
      .then((response) => response.data)
      .then((data: ISpaceTreeResponse['data']) => { return spaceTreeAdapter.toClient(data) })
  }

  return {
    spaceTree,
    fetchSpace,
  }
}

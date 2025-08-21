import { useClickUp } from "~/composables/apiClient/useClickUp";
import type { ISpaceTreeResponse } from "~/composables/apiClient/types/spaceTree/ISpaceTreeResponse";
import { spaceTreeAdapter } from "~/composables/spaceTree/spaceTreeAdapter";
import type { ISpaceTreeNode } from "~/composables/spaceTree/types/ISpaceTreeNode";

export const useSpaceTree = () => {
  const spaceTree = ref<ISpaceTreeNode[]>([])
  const spaceTreeSelected = ref<ISpaceTreeNode[]>([])
  const listIds = computed(() => spaceTreeSelected.value.map((item) => item.id))

  const { getSpace } = useClickUp()

  async function fetchSpace () {
    spaceTree.value = await getSpace()
      .then((response) => response.data)
      .then((data: ISpaceTreeResponse['data']) => { return spaceTreeAdapter.toClient(data) })
  }

  function selectNode (selected: ISpaceTreeNode[]) {
    spaceTreeSelected.value = selected.filter((item) => !item.children)
  }

  return {
    spaceTree,
    spaceTreeSelected,
    fetchSpace,
    selectNode,
    listIds,
  }
}

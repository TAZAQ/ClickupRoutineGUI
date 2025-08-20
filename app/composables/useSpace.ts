import { useClickUp } from "~/composables/apiClient/useClickUp";

export const useSpace = () => {
  const space = ref({})

  const { getSpace } = useClickUp()

  function fetchSpace () {
    space.value = getSpace()
  }

  return {
    space,
    fetchSpace,
  }
}

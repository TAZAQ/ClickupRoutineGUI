import type { ITask } from "~/composables/apiClient/types/Task/ITask";
import { useClickUp } from "~/composables/apiClient/useClickUp";

const tasks = ref<ITask[]>([])

export const useTasksStore = () => {
  const tasksIds = computed(() => tasks.value.map((task) => task.id))
  const { getTasks, loading } = useClickUp()

  function fetchTasks (listIds: string[]) {
    tasks.value = []
    listIds.forEach(async (listId) => {
      const response = await getTasks(listId)
      tasks.value.push(...response.data.tasks)
    })
  }

  return {
    tasks,
    tasksIds,
    fetchTasks,
    tasksLoading: loading,
  }
}

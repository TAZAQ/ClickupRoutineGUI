import type { ITask } from "~/composables/apiClient/types/Task/ITask";
import { useClickUp } from "~/composables/apiClient/useClickUp";

interface TaskFilters {
  status?: string | null
}

const tasks = ref<ITask[]>([])
const filters = ref<TaskFilters>({
  status: null,
})

export const useTasksStore = () => {
  const { getTasks, loading } = useClickUp()

  const tasksIds =
    computed(() => tasks.value.map((task) => task.id))

  function fetchTasks (listIds: string[]) {
    tasks.value = []
    const params = filters.value
    const query = {
      'statuses[]': params.status ? [params.status] : undefined,
    } as unknown as Record<string, string>
    
    listIds.forEach(async (listId) => {
      const response = await getTasks(listId, query)
      tasks.value.push(...response.data.tasks)
    })
  }

  return {
    tasks,
    tasksIds,
    filters,
    fetchTasks,
    tasksLoading: loading,
  }
}

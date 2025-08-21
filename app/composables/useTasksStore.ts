import type { ITask } from "~/composables/apiClient/types/Task/ITask";
import { useClickUp } from "~/composables/apiClient/useClickUp";

interface TaskFilters {
  status?: string | null
}

const tasks = ref<ITask[]>([])
const filters = ref<TaskFilters>({
  status: 'approved',
})
const loading = ref(false)

export const useTasksStore = () => {
  const { getTasks } = useClickUp()

  const tasksIds =
    computed(() => tasks.value.map((task) => task.id))

  function fetchTasks (listIds: string[]) {
    loading.value = true
    tasks.value = []
    const params = filters.value
    const query = {
      'statuses[]': params.status ? [params.status] : undefined,
    } as unknown as Record<string, string>
    
    Promise
      .all(listIds.map((listId) => getTasks(listId, query)))
      .then((results) => {
        tasks.value = results.flatMap((result) => result.data.tasks)
      })
      .finally(() => { loading.value = false })
  }

  return {
    tasks,
    tasksIds,
    filters,
    fetchTasks,
    tasksLoading: loading,
  }
}

import { apiClient } from '~/composables/apiClient/ApiClient'
import type { IListTasksResponse } from "~/composables/apiClient/types/IListTasksResponse";

export const useClickUp = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)

  const handleRequest = async <T>(request: Promise<T>): Promise<T> => {
    loading.value = true
    error.value = null

    try {
      const result = await request

      return result as T
    } catch (err: unknown) {
      error.value = (err as { message: string }).message || 'Произошла ошибка'
      console.error('ClickUp Error:', err)

      return null as T
    } finally {
      loading.value = false
    }
  }


  // Задачи
  const getTasks = (listId: string, query?: Record<string, string>) =>
    handleRequest(apiClient.getTasks(listId, query)) as Promise<IListTasksResponse>

  const getTask = (taskId: string) => handleRequest(apiClient.getTask(taskId))


  return {
    // Состояние
    loading: readonly(loading),
    error: readonly(error),

    // Задачи
    getTasks,
    getTask,
  }
}

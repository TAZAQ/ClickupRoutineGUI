import type { ITask } from "~/composables/apiClient/types/Task/ITask";

export interface IListTasksResponse {
  data: {
    last_page: boolean,
    tasks: ITask[]
  }
  success: boolean,
}

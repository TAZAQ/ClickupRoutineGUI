import type { ITaskStatus } from "~/composables/apiClient/types/Task/ITaskStatus";

const TASK_STATUSES = {
  APPROVED: { status: 'approved', id: '1', color: '#AF7E2E', type: 'custom', orderindex: 0  },
  STAGE: { status: 'stage', id: '2', color: '#e16b16', type: 'done', orderindex: 1  },
  BEFOREPROD: { status: 'beforeprod', id: '3', color: '#f8ae00', type: 'done', orderindex: 2  },
  PRODUCTION: { status: 'production', id: '4', color: '#008844', type: 'closed', orderindex: 3  },
}

const defaultSteps = [
  { name: 'To Stage', color: TASK_STATUSES.STAGE.color, from: TASK_STATUSES.APPROVED.status, to: TASK_STATUSES.STAGE.status },
  { name: 'To BeforeProd', color: TASK_STATUSES.BEFOREPROD.color, from: TASK_STATUSES.STAGE.status, to: TASK_STATUSES.BEFOREPROD.status },
  { name: 'To Production', color: TASK_STATUSES.PRODUCTION.color, from: TASK_STATUSES.BEFOREPROD.status, to: TASK_STATUSES.PRODUCTION.status },
]

export interface ITaskStatusStep {
  name: string
  color: string
  from: string
  to: string
}

export const useTaskStatuses = () => {
  const taskStatuses: ITaskStatus[] = Object.values(TASK_STATUSES)

  return {
    taskStatuses,
    defaultSteps,
    setTaskStatusesSteps(fromStatus: Ref<string>, toStatus: Ref<string>, step: ITaskStatusStep) {
      fromStatus.value = step.from
      toStatus.value = step.to
    },
  }
}

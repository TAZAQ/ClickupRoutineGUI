import type { ITaskCustomFieldBase } from "~/composables/apiClient/types/Task/ITaskCustomField/ITaskCustomFieldBase";

interface ITaskCustomFieldLabelsTypeConfig {
  sorting: string,
  options: Array<{
    id: string,
    label: string,
    color: string | null,
  }>
}

export interface ITaskCustomFieldLabels
  extends ITaskCustomFieldBase<ITaskCustomFieldLabelsTypeConfig>
{
  type: 'labels'
  value?: string[]
}

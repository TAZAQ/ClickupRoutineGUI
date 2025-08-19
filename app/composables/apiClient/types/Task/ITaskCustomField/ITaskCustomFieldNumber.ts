import type { ITaskCustomFieldBase } from "~/composables/apiClient/types/Task/ITaskCustomField/ITaskCustomFieldBase";

export interface ITaskCustomFieldNumber extends ITaskCustomFieldBase {
  type: 'number'
  value?: string
}

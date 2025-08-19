import type { ITaskCustomFieldFormula } from "~/composables/apiClient/types/Task/ITaskCustomField/ITaskCustomFieldFormula";
import type { ITaskCustomFieldLabels } from "~/composables/apiClient/types/Task/ITaskCustomField/ITaskCustomFieldLabels";
import type { ITaskCustomFieldNumber } from "~/composables/apiClient/types/Task/ITaskCustomField/ITaskCustomFieldNumber";

export type TTaskCustomField = ITaskCustomFieldFormula
  | ITaskCustomFieldLabels
  | ITaskCustomFieldNumber

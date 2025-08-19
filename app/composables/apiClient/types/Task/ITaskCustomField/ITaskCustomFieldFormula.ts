import type { ITaskCustomFieldBase } from "~/composables/apiClient/types/Task/ITaskCustomField/ITaskCustomFieldBase";

interface ITaskCustomFieldFormulaTypeConfig {
  simple: boolean
  formula: string
  version: string
  reset_at: number
  is_dynamic: boolean
  return_types: string[]
  calculation_state: string
}

export interface ITaskCustomFieldFormula extends ITaskCustomFieldBase<ITaskCustomFieldFormulaTypeConfig> {
  type: 'formula'
  value?: string
}

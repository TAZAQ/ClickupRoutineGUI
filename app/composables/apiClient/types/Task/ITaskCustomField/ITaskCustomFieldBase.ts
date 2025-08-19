export interface ITaskCustomFieldBase<TypeConfig extends object = object> {
  id: string,
  name: string,
  type: 'number' | 'labels' | 'formula',
  type_config: TypeConfig,
  date_created: string,
  hide_from_guests: boolean,
  required: boolean
  value?: unknown
  value_richtext: string | null
}

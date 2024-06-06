import { SelectFieldOperator } from './utils'

export type SingleType = 'string' | 'number' | 'date' | 'boolean'
export type MultiType = 'array'
export type FieldType = SingleType | MultiType
export type Option<T = string> = { label: string; value: T }
export type Field = {
  selector: string
  label: string
  operators?: SelectFieldOperator[]
  options?: Option[]
  type: FieldType
  onSearchItems?: (search: string) => void
}

export type FilterItem = Field & {
  operator: string
  value: string | string[]
}

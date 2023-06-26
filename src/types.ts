import { ComparisonOperator } from '@rsql/ast'

export type SingleType = 'string' | 'number' | 'date'
export type MultiType = 'array'
export type FieldType = SingleType | MultiType
export type Option<T = string> = { label: string, value: T }
export type Field = {
  selector: string
  label: string
  operators?: ComparisonOperator[]
  options?: Option[]
  type: FieldType
}

export type FilterItem = Field & {
  operator: string
  value: string | string[]
}

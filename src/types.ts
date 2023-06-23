import { ComparisonOperator } from '@rsql/ast'

export type FieldType = 'string' | 'number' | 'date' | 'array'

export type Field = {
  selector: string
  label: string
  type: FieldType
  operators?: ComparisonOperator[]
}

export type FilterItem = Field & {
  operator: string
  value: string | string[]
}

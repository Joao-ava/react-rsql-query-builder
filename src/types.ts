import type { SelectFieldOperator } from './utils'

export type { SingleSelectProps } from './components/_internal/base-single-select'
export type { MultiSelectProps } from './components/_internal/base-multi-select'
export type { CheckboxProps } from './components/_internal/base-checkbox'
export type { DatepickerProps } from './components/_internal/base-datepicker'
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

export type CommonSelectProps = {
  className?: string
  onSearchItems?: (search: string) => void
  items: Option[]
}

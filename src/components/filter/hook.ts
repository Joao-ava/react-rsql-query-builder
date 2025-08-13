import React, { createContext, useContext } from 'react'
import type { ExpressionNode } from '@rsql/ast'

import type {
  ButtonProps,
  CheckboxProps,
  DatepickerProps,
  InputProps,
  MultiSelectProps,
  SingleSelectProps
} from '../_internal'
import type { Field, FilterItem } from '../../types'

export type CustomComponentsType = {
  Button: React.FC<ButtonProps>
  Input: React.FC<InputProps>
  Checkbox: React.FC<CheckboxProps>
  SingleSelect: React.FC<SingleSelectProps>
  MultiSelect: React.FC<MultiSelectProps>
  DatePicker: React.FC<DatepickerProps>
}

export type FilterContextType = CustomComponentsType & {
  initialField: FilterItem
  fields: Field[]
  search: ExpressionNode | undefined
  onSelectField: (field: string) => void
  onUnselectField: () => void
  appliedFilters: FilterItem[]
  field: FilterItem
  setField: React.Dispatch<React.SetStateAction<FilterItem>>
  onAddFilterItem: () => void
  originalFilter: FilterItem
  onSelectFilter: (item: FilterItem) => void
  onRemoveFilter: () => void
  editionFilter: FilterItem
  onEditFilter: () => void
  setEditionFilter: React.Dispatch<React.SetStateAction<FilterItem>>
}
export const FilterContext = createContext({} as FilterContextType)

export const useFilterContext = (): FilterContextType =>
  useContext(FilterContext)

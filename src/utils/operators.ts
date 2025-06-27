import type { ComparisonOperator } from '@rsql/ast'
import type { FieldType } from '../types'

export const selectFieldOperators = [
  'equals',
  'notEquals',
  'contains',
  'notContains',
  'moreThan',
  'moreThanOrEqual',
  'lessThan',
  'lessThanOrEqual',
  'in',
  'out'
] as const
export type SelectFieldOperator = (typeof selectFieldOperators)[number]
const selectFieldRelationComparison: Record<
  SelectFieldOperator,
  ComparisonOperator
> = {
  equals: '==',
  notEquals: '!=',
  contains: '==',
  notContains: '!=',
  moreThan: '>',
  moreThanOrEqual: '>=',
  lessThan: '<',
  lessThanOrEqual: '<=',
  in: '=in=',
  out: '=out='
}
export const selectFieldToComparisonOperator = (operator: string): string =>
  selectFieldRelationComparison[operator as SelectFieldOperator]
export const searchableOperators: ComparisonOperator[] = ['==', '!=']
export const searchableSelectField = ['contains', 'notContains']
export const comparisonToSelectFieldOperator = (
  operator: string,
  value = ''
): string => {
  const isSearchableOperator = searchableOperators.includes(operator)
  const result = Object.entries(selectFieldRelationComparison).find(
    ([, comparison]) => comparison == operator
  )
  if (!result) return ''
  const [selectFieldOperator] = result
  if (!isSearchableOperator) return selectFieldOperator
  const valueSearch = value.startsWith('*') && value.endsWith('*')
  if (valueSearch && operator == '==') return 'contains'
  if (valueSearch && operator == '!=') return 'notContains'
  if (operator == '==') return 'equals'
  return 'notEquals'
}
export const defaultOperators: Record<FieldType, SelectFieldOperator[]> = {
  array: ['in', 'out'],
  string: ['equals', 'notEquals', 'contains', 'notContains'],
  boolean: ['equals', 'notEquals'],
  number: [
    'equals',
    'lessThan',
    'lessThanOrEqual',
    'notEquals',
    'moreThan',
    'moreThanOrEqual'
  ],
  date: [
    'equals',
    'lessThan',
    'lessThanOrEqual',
    'notEquals',
    'moreThan',
    'moreThanOrEqual'
  ]
}

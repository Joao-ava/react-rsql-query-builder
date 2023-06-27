import { ComparisonNode, getSelector, getValue } from '@rsql/ast'
import { FilterItem } from '../types.ts'

const sameArray = (first: string[], second: string[]): boolean => {
  const firstSet = Array.from(new Set(first))
  const secondSet = Array.from(new Set(second))
  return (
    first.length === second.length &&
    firstSet.every((item) => secondSet.includes(item))
  )
}

export const isSameRsqlFilter = (
  field: FilterItem,
  search?: ComparisonNode
): boolean => {
  if (!search) return false
  const selector = getSelector(search)
  const value = getValue(search)
  const isSameValue = Array.isArray(value)
    ? sameArray(value, field.value as string[])
    : value === field.value
  return (
    selector === field.selector &&
    field.operator === search.operator &&
    isSameValue
  )
}

import { FieldType } from '../types'
import { ComparisonOperator } from '@rsql/ast'

export const defaultOperators: Record<FieldType, ComparisonOperator[]> = {
  string: ['==', '!='],
  number: ['==', '<', '<=', '!=', '>', '>='],
  date: ['==', '<', '<=', '!=', '>', '>='],
  array: ['=in=', '=out=']
}

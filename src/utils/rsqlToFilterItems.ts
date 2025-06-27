import { type ExpressionNode, getSelector, getValue } from '@rsql/ast'

import type { Field, FilterItem } from '../types.ts'
import {
  comparisonToSelectFieldOperator,
  defaultOperators
} from './operators.ts'

const rsqlToFilterItems = (
  fields: Field[],
  param?: ExpressionNode
): FilterItem[] => {
  if (!param) return []
  if (param.type === 'LOGIC')
    return [
      ...rsqlToFilterItems(fields, param.left),
      ...rsqlToFilterItems(fields, param.right)
    ]
  const selector = getSelector(param)
  const field = fields.find((value) => value.selector === selector)
  if (!field) return []
  const value = getValue(param)
  const operators = field.operators || defaultOperators[field.type]
  return [
    {
      selector,
      operators,
      value,
      operator: comparisonToSelectFieldOperator(
        param.operator,
        !Array.isArray(value) ? value : ''
      ),
      label: field.label,
      type: field.type,
      options: field.options
    }
  ]
}

export { rsqlToFilterItems }

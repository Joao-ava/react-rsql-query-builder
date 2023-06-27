import { ExpressionNode, getSelector, getValue } from '@rsql/ast'

import { Field, FilterItem } from '../types.ts'

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
  return [
    {
      selector,
      operator: param.operator,
      value: getValue(param),
      label: field.label,
      type: field.type,
      operators: field?.operators,
      options: field.options
    }
  ]
}

export { rsqlToFilterItems }

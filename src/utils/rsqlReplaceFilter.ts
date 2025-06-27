import type { ExpressionNode } from '@rsql/ast'
import builder from '@rsql/builder'

import type { FilterItem } from '../types.ts'
import { isSameRsqlFilter } from './isSameRsqlFilter.ts'

export const rsqlReplaceFilter = (
  original: FilterItem,
  replace: FilterItem,
  search?: ExpressionNode
): ExpressionNode | undefined => {
  if (!search) return search
  if (search.type === 'LOGIC')
    return builder.logic(
      [
        rsqlReplaceFilter(original, replace, search.left) as ExpressionNode,
        rsqlReplaceFilter(original, replace, search.right) as ExpressionNode
      ],
      search.operator
    )
  if (!isSameRsqlFilter(original, search)) return search
  return builder.comparison(replace.selector, replace.operator, replace.value)
}

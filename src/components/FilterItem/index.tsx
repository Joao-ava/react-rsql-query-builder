import React from 'react'

import { FilterItem } from '../../types'

export type ItemProps = FilterItem
const Item: React.FC<ItemProps> = ({ selector, operator, value }) => {
  const values = Array.isArray(value) ? value.join(', ') : value.replaceAll('**', '')
  const operatorRepresentations: Record<string, string> = {
    '==': ':',
    '!=': '≠',
    '>=': '≥',
    '<=': '≤',
    '==in==': ':',
    '==out==': '≠'
  }
  const operatorShow = operatorRepresentations[operator] || operator
  return (
    <div className="rsql-filter-item">
      <strong>{selector}</strong>
      <p>{operatorShow}</p>
      <p>{values}</p>
    </div>
  )
}

export { Item }

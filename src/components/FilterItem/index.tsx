import React from 'react'

import { FilterItem } from '../../types'

export type ItemProps = FilterItem & {
  onEdit: (item: FilterItem) => void
}
const Item: React.FC<ItemProps> = ({ onEdit, ...props }) => {
  const { selector, operator, value } = props
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
    <div className="rsql-filter-item" onClick={() => onEdit(props)}>
      <strong>{selector}</strong>
      <p>{operatorShow}</p>
      <p>{values}</p>
    </div>
  )
}

export { Item }

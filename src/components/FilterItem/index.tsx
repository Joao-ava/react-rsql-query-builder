import React from 'react'

import { FilterItem } from '../../types'
import { Operator } from '../Operator.tsx'

export type ItemProps = FilterItem & {
  onEdit: (item: FilterItem) => void
}
const Item: React.FC<ItemProps> = ({ onEdit, ...props }) => {
  const { label, value } = props
  const values = Array.isArray(value)
    ? value.join(', ')
    : value.replaceAll('*', '')
  return (
    <div className="rsql-filter-item" onClick={() => onEdit(props)}>
      <strong>{label}</strong>
      <p>
        <Operator
          operator={props.operator}
          value={!Array.isArray(value) ? value : ''}
        />
      </p>
      <p>{values}</p>
    </div>
  )
}

export { Item }

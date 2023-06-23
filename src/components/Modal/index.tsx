import React, { useState } from 'react'

import { ComparisonOperator } from '@rsql/ast'

import { FilterItem } from '../../types.ts'

type Field = {
  name: string
  label: string
  type?: string
  operators: ComparisonOperator[]
}

export type FilterModalProps = {
  item: FilterItem
  fields: Field[]
  onAdd: () => void
}

const Modal: React.FC<FilterModalProps> = ({ fields, item, onAdd }) => {
    const [selector] = useState(item.selector)
    const [value, setValue] = useState(item.value)
    const type = fields.find((field) => field.name === selector)?.type || ''
    return (
      <div>
        <div>
          <input
            type={type}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <button onClick={onAdd}>Add</button>
      </div>
    )
}

export { Modal }

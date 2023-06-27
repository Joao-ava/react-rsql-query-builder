import React, { forwardRef, useState } from 'react'
import { IconType } from 'react-icons'
import {
  BiText,
  BiHash,
  BiCalendarAlt,
  BiDownArrowCircle
} from 'react-icons/bi'
import { Field, FieldType } from '../../../types.ts'

export type SelectFieldProps = {
  fields: Field[]
  onSelectField: (field: string) => void
}

const iconsByType: Record<FieldType, IconType> = {
  string: BiText,
  number: BiHash,
  date: BiCalendarAlt,
  array: BiDownArrowCircle
}
const SelectFieldFunction: React.ForwardRefRenderFunction<
  HTMLDivElement,
  SelectFieldProps
> = ({ fields, onSelectField }, ref) => {
  const [search, setSearch] = useState('')
  const items = fields.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
  )
  return (
    <div className="rsql-box rsql-select-field" ref={ref}>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="rsql-input"
        name="rsql-field-search"
        placeholder="Filter by..."
      />
      <div>
        {items.map((item) => {
          const Icon = iconsByType[item.type]
          return (
            <div
              className="rsql-select-field-option"
              key={item.selector}
              onClick={() => onSelectField(item.selector)}
            >
              <Icon />
              <p>{item.label}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const SelectField = forwardRef(SelectFieldFunction)

export { SelectField }

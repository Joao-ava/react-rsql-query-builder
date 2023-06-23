import React, { HTMLInputTypeAttribute, forwardRef } from 'react'
import { BiTrashAlt } from 'react-icons/bi'
import { FieldType, FilterItem } from '../../../types.ts'
import { defaultOperators } from '../../../utils/operators.ts'

const inputType: Record<FieldType, HTMLInputTypeAttribute> = {
  string: 'text',
  number: 'number',
  date: 'date',
  array: 'string'
}

export type SelectFilterProps = FilterItem & {
  setOperator: (param: string) => void
  setValue: (param: string) => void
  onRemove: () => void
  onAddFilterItem: () => void
}

const SelectFilterFunction: React.ForwardRefRenderFunction<HTMLDivElement, SelectFilterProps> = ({
  label,
  operators,
  operator,
  type,
  value,
  setValue,
  onRemove,
  onAddFilterItem,
  setOperator
}, ref) => {
  const allOperators = operators?.length ? operators : defaultOperators[type]
  return (
    <div className="rsql-box rsql-select-filter" ref={ref}>
      <div className="rsql-select-filter-row">
        <p>{label}</p>
        <select defaultValue={operator} className="rsql-select-filter-select" onChange={(e) => setOperator(e.target.value)}>
          {allOperators?.map(
            (item) =>
              (
                <option key={item} value={item}>
                  {item}
                </option>
              )
          )}
        </select>
        <button onClick={onRemove} className="rsql-btn-icon">
          <BiTrashAlt />
        </button>
      </div>

      <input
        className="rsql-input"
        name="rsql-field-search"
        placeholder="Filter by..."
        value={value}
        type={inputType[type]}
        onChange={(e) => setValue(e.target.value)}
      />

      <div className="rsql-row end">
        <button className="rsql-btn" onClick={onAddFilterItem}>
          Add
        </button>
      </div>
    </div>
  )
}

const SelectFilter = forwardRef(SelectFilterFunction)

export { SelectFilter }

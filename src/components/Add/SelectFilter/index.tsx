import React, { HTMLInputTypeAttribute, forwardRef } from 'react'
import { BiTrashAlt } from 'react-icons/bi'
import { useTranslation } from 'react-i18next'

import { FieldType, FilterItem } from '../../../types'
import { defaultOperators } from '../../../utils'
import { Operator } from '../../Operator.tsx'

const inputType: Record<FieldType, HTMLInputTypeAttribute> = {
  string: 'text',
  number: 'number',
  date: 'date',
  array: 'string'
}

export type SelectFilterProps = FilterItem & {
  setOperator: (param: string) => void
  setValue: (param: string | string[]) => void
  onRemove: () => void
  onAddFilterItem: () => void
}

const SelectFilterFunction: React.ForwardRefRenderFunction<
  HTMLDivElement,
  SelectFilterProps
> = (
  {
    label,
    operators,
    operator,
    type,
    value,
    setValue,
    onRemove,
    onAddFilterItem,
    setOperator,
    options
  },
  ref
) => {
  const { t } = useTranslation()
  const allOperators = operators?.length ? operators : defaultOperators[type]
  const isArray = type === 'array'
  const valueArray = value ? (value as string[]) : []
  const possibleOptions = isArray
    ? options?.filter((option) => !valueArray.includes(option.value))
    : []
  return (
    <div className="rsql-box rsql-select-filter" ref={ref}>
      <div className="rsql-select-filter-row">
        <p>{label}</p>
        <select
          defaultValue={operator}
          className="rsql-select-filter-select"
          onChange={(e) => setOperator(e.target.value)}
        >
          {allOperators?.map((item) => (
            <option key={item} value={item}>
              <Operator operator={item} />
            </option>
          ))}
        </select>
        <button onClick={onRemove} className="rsql-btn-icon">
          <BiTrashAlt />
        </button>
      </div>

      {isArray ? (
        <div>
          <select
            value=""
            onChange={(e) => setValue([...value, e.target.value])}
          >
            <option value="">Select a value</option>
            {possibleOptions?.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <div>
            {valueArray.map((item) => (
              <div key={item}>
                <p>{item}</p>
                <button
                  onClick={() =>
                    setValue(valueArray.filter((option) => option !== item))
                  }
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <input
          className="rsql-input"
          name="rsql-field-search"
          placeholder={t('search') as string}
          value={value}
          type={inputType[type]}
          onChange={(e) => setValue(e.target.value)}
        />
      )}

      <div className="rsql-row end">
        <button className="rsql-btn" onClick={onAddFilterItem}>
          {t('submit')}
        </button>
      </div>
    </div>
  )
}

const SelectFilter = forwardRef(SelectFilterFunction)

export { SelectFilter }

import React, { forwardRef, HTMLInputTypeAttribute } from 'react'
import { BiTrashAlt, BiX } from 'react-icons/bi'
import { useTranslation } from 'react-i18next'

import { FieldType, FilterItem } from '../../../types'
import { defaultOperators } from '../../../utils'
import { useComponentsProvider } from '../../../providers/ComponentsProvider.tsx'

const inputType: Record<FieldType, HTMLInputTypeAttribute> = {
  string: 'text',
  number: 'number',
  date: 'date',
  array: 'string',
  boolean: 'checkbox'
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
  const { Button, Input, Checkbox } = useComponentsProvider()
  const { t } = useTranslation()
  const allOperators = operators?.length ? operators : defaultOperators[type]
  const isBoolean = type === 'boolean'
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
              {t(`operators.${item}`)}
            </option>
          ))}
        </select>
        <button onClick={onRemove} className="rsql-btn-icon">
          <BiTrashAlt />
        </button>
      </div>

      {isArray && (
        <div>
          <select
            className="rsql-input rsql-select-filter-select-value"
            value=""
            onChange={(e) => setValue([...value, e.target.value])}
          >
            <option value="" className="rsql-select-filter-select-option">
              Select a value
            </option>
            {possibleOptions?.map((item) => (
              <option
                key={item.value}
                value={item.value}
                className="rsql-select-filter-select-option"
              >
                {item.label}
              </option>
            ))}
          </select>
          <div className="rsql-select-filter-select-values">
            {valueArray.map((item) => {
              const option = options?.find(({ value }) => item === value)
              return (
                <div
                  key={item}
                  className="rsql-select-filter-select-value-item"
                >
                  <p>{option?.label}</p>
                  <button
                    className="rsql-btn-icon"
                    onClick={() =>
                      setValue(valueArray.filter((option) => option !== item))
                    }
                  >
                    <BiX />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {isBoolean && (
        <Checkbox
          name="rsql-switch"
          placeholder={t('true') as string}
          value={value}
          type={inputType[type]}
          checked={value === 'true'}
          onChange={(e) => setValue(String(e.target.checked))}
        />
      )}

      {!isBoolean && !isArray && (
        <Input
          name="rsql-field-search"
          placeholder={t('search') as string}
          value={value}
          type={inputType[type]}
          onChange={(e) => setValue(e.target.value)}
        />
      )}

      <div className="rsql-row end">
        <Button onClick={onAddFilterItem}>{t('submit')}</Button>
      </div>
    </div>
  )
}

const SelectFilter = forwardRef(SelectFilterFunction)

export { SelectFilter }

import React, { forwardRef, HTMLInputTypeAttribute } from 'react'
import { BiTrashAlt, BiX } from 'react-icons/bi'
import { useTranslation } from 'react-i18next'

import { FieldType, FilterItem, Option } from '../../../types'
import { defaultOperators } from '../../../utils'
import { useComponentsProvider } from '../../../providers/ComponentsProvider'

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
    options,
    onSearchItems
  },
  ref
) => {
  const { Button, Input, Checkbox, Select } = useComponentsProvider()
  const { t } = useTranslation()
  const allOperators = operators?.length ? operators : defaultOperators[type]
  const allOperatorsOptions = allOperators.map((item) => ({
    label: t(`operators.${item}`),
    value: item
  }))
  const isBoolean = type === 'boolean'
  const isArray = type === 'array'
  const empty = { value: '', label: t('select') }
  const valueArray = value ? (value as string[]) : []
  const possibleOptions = isArray
    ? options?.filter((option) => !valueArray.includes(option.value)) ?? []
    : []
  return (
    <div className="rsql-box rsql-select-filter" ref={ref}>
      <div className="rsql-select-filter-row">
        <p>{label}</p>
        <Select
          items={allOperatorsOptions}
          option={
            allOperatorsOptions.find(
              (item) => item.value === operator
            ) as Option
          }
          setValue={setOperator}
        />
        <button onClick={onRemove} className="rsql-btn-icon">
          <BiTrashAlt />
        </button>
      </div>

      {isArray && (
        <div>
          <Select
            items={[empty, ...possibleOptions]}
            onSearchItems={onSearchItems}
            option={
              possibleOptions?.find((item) => item.value === value) ?? empty
            }
            setValue={(e) => setValue([...value, e])}
            className="rsql-input rsql-select-filter-select-value"
          />
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

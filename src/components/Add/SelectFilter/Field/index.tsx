import React, { type HTMLInputTypeAttribute } from 'react'
import { useTranslation } from 'react-i18next'
import { BiX } from 'react-icons/bi'

import type { FieldType, FilterItem } from '../../../../types'
import { useComponentsProvider } from '../../../../providers/ComponentsProvider'

const inputType: Record<FieldType, HTMLInputTypeAttribute> = {
  string: 'text',
  number: 'number',
  date: 'date',
  array: 'string',
  boolean: 'checkbox'
}

type ParsedFieldProps = FilterItem & {
  setValue: (param: string | string[]) => void
}
const ParsedField: React.FC<ParsedFieldProps> = ({
  type,
  value,
  setValue,
  options,
  onSearchItems
}) => {
  const { Input, Checkbox, MultiSelect, DatePicker } = useComponentsProvider()
  const { t } = useTranslation()

  if (type === 'boolean') {
    return (
      <Checkbox
        type="checkbox"
        name="rsql-switch"
        placeholder={t('true') as string}
        value={value}
        checked={value === 'true'}
        onChange={(e) => setValue(String(e.target.checked))}
      />
    )
  }

  if (type === 'date') {
    return (
      <DatePicker value={value as string} setValue={(date) => setValue(date)} />
    )
  }

  if (type === 'array') {
    const empty = { value: '', label: t('select') }
    const valueArray = value ? (value as string[]) : []
    const possibleOptions =
      options?.filter((option) => !valueArray.includes(option.value)) ?? []
    return (
      <div>
        <MultiSelect
          className="rsql-input rsql-select-filter-select-value"
          items={[empty, ...possibleOptions]}
          onSearchItems={onSearchItems}
          values={valueArray
            .map((value) => options?.find((option) => option.value === value))
            .filter((item) => !!item)}
          setValues={(values) => setValue(values)}
        />
        <div className="rsql-select-filter-select-values">
          {valueArray.map((item) => {
            const option = options?.find(({ value }) => item === value)
            return (
              <div key={item} className="rsql-select-filter-select-value-item">
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
    )
  }

  return (
    <Input
      name="rsql-field-search"
      placeholder={t('search') as string}
      value={value}
      type={inputType[type]}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}

export { ParsedField }

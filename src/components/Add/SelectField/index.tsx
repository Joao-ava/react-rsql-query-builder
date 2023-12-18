import React, { forwardRef, useState } from 'react'
import { IconType } from 'react-icons'
import { useTranslation } from 'react-i18next'
import {
  BiCalendarAlt,
  BiDownArrowCircle,
  BiHash,
  BiText,
  BiToggleRight
} from 'react-icons/bi'

import { Field, FieldType } from '../../../types'
import { useComponentsProvider } from '../../../providers/ComponentsProvider.tsx'

export type SelectFieldProps = {
  fields: Field[]
  onSelectField: (field: string) => void
}

const iconsByType: Record<FieldType, IconType> = {
  string: BiText,
  number: BiHash,
  date: BiCalendarAlt,
  array: BiDownArrowCircle,
  boolean: BiToggleRight
}
const SelectFieldFunction: React.ForwardRefRenderFunction<
  HTMLDivElement,
  SelectFieldProps
> = ({ fields, onSelectField }, ref) => {
  const { t } = useTranslation()
  const { Input } = useComponentsProvider()
  const [search, setSearch] = useState('')
  const items = fields.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
  )
  return (
    <div className="rsql-box rsql-select-field" ref={ref}>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        name="rsql-field-search"
        placeholder={t('search') as string}
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

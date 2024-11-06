import React from 'react'
import { useTranslation } from 'react-i18next'

import { CommonSelectProps, Option } from '../../types'

export type MultiSelectProps<T = string> = CommonSelectProps & {
  values: Option[]
  setValues: (value: T[]) => void
}
const MultiSelect: React.FC<MultiSelectProps> = ({
  setValues,
  values,
  items,
  ...props
}) => {
  const { t } = useTranslation()
  return (
    <select
      className="rsql-select-filter-select multi"
      onChange={(event) =>
        setValues([...values.map((option) => option.value), event.target.value])
      }
      {...props}
    >
      {items?.map((item) => (
        <option key={item.value} value={item.value}>
          {t(item.label)}
        </option>
      ))}
    </select>
  )
}

export { MultiSelect }

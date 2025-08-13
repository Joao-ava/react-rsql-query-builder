import { useTranslation } from 'react-i18next'

import type { CommonSelectProps, Option } from '../../../types'

export type SingleSelectProps<T = string> = CommonSelectProps & {
  value: Option
  setValue: (value: T) => void
}
function BaseSingleSelect({
  items,
  setValue,
  value,
  ...props
}: SingleSelectProps) {
  const { t } = useTranslation()
  return (
    <select
      className="rsql-select-filter-select single"
      value={value.value}
      onChange={(event) => setValue(event.target.value)}
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

export { BaseSingleSelect }

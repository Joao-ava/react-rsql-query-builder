import { useTranslation } from 'react-i18next'

import { Option } from '../../types'

export type SelectProps<T = string> = {
  option: Option
  items: Option[]
  setValue: (value: T) => void
  className?: string
  onSearchItems?: (search: string) => void
}
function Select({ option, items, setValue, ...props }: SelectProps) {
  const { t } = useTranslation()
  return (
    <select
      className="rsql-select-filter-select"
      value={option.value}
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

export { Select }

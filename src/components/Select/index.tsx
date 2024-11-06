import { useTranslation } from 'react-i18next'

import { Option } from '../../types'

export type SelectProps<T = string> = {
  items: Option[]
  values: Option[]
  setValues: (value: T[]) => void
  className?: string
  onSearchItems?: (search: string) => void
}
function Select({ items, setValues, values, ...props }: SelectProps) {
  const { t } = useTranslation()
  return (
    <select
      className="rsql-select-filter-select"
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

export { Select }

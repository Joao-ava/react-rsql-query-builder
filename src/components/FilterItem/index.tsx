import React, { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'

import type { FilterItem } from '../../types'

export type ItemProps = FilterItem & {
  onSelectFilter: (item: FilterItem) => void
}
const Item: React.FC<ItemProps> = forwardRef<HTMLLIElement, ItemProps>(
  ({ onSelectFilter, ...props }, ref) => {
    const { t } = useTranslation()
    const {
      label,
      value,
      type,
      options,
      operator,
      operators,
      selector,
      onSearchItems,
      ...innerProps
    } = props

    const parseValue = () => {
      if (Array.isArray(value)) {
        return value
          .map(
            (item) =>
              options?.find((option) => item === option.value)?.label ?? item
          )
          .join(', ')
      }
      if (type === 'boolean') return t(value)
      if (type === 'date') return value.split('-').reverse().join('/')
      return value.replaceAll('*', '')
    }

    const handleSelect = () => {
      onSelectFilter({
        label,
        value,
        operator,
        type,
        options,
        operators,
        selector,
        onSearchItems
      })
    }

    return (
      <li
        {...innerProps}
        ref={ref}
        role="button"
        className="rsql-filter"
        onClick={handleSelect}
        data-testid="filter-applied"
      >
        <strong>{label}</strong>
        <p>{t(`operators.${operator}`)}</p>
        <p>{parseValue()}</p>
      </li>
    )
  }
)
Item.displayName = 'FilterItem'

export { Item }

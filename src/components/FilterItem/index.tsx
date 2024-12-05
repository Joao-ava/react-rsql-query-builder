import React, { forwardRef, HTMLProps } from 'react'
import { useTranslation } from 'react-i18next'

import { FilterItem } from '../../types'

export type ItemProps = FilterItem &
  Pick<HTMLProps<HTMLElement>, 'onClick'> & {
    onSelectFilter: (item: FilterItem) => void
  }
const Item: React.FC<ItemProps> = forwardRef<HTMLLIElement, ItemProps>(
  ({ onSelectFilter, onClick, ...props }, ref) => {
    const {
      label,
      value,
      operator,
      type,
      options,
      operators,
      selector,
      onSearchItems,
      ...innerProps
    } = props
    const { t } = useTranslation()

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

    const handleSelect = (event: React.MouseEvent<HTMLElement>) => {
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
      onClick?.(event)
    }

    return (
      <li
        {...innerProps}
        ref={ref}
        role="button"
        className="rsql-filter"
        onClick={handleSelect}
      >
        <strong>{label}</strong>
        <p>{t(`operators.${operator}`)}</p>
        <p>{parseValue()}</p>
      </li>
    )
  }
)

export { Item }

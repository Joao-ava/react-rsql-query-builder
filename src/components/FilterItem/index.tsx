import React from 'react'
import { useTranslation } from 'react-i18next'

import { FilterItem } from '../../types'

export type ItemProps = FilterItem & {
  onEdit: (item: FilterItem) => void
  isSelected: boolean
}
const Item: React.FC<ItemProps> = ({
  onEdit,
  isSelected,
  options,
  ...props
}) => {
  const { label, value, operator, type } = props
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

  return (
    <div
      className={
        !isSelected
          ? 'rsql-filter-item'
          : 'rsql-filter-item rsql-filter-item-selected'
      }
      onClick={() => onEdit(props)}
    >
      <strong>{label}</strong>
      <p>{t(`operators.${operator}`)}</p>
      <p>{parseValue()}</p>
    </div>
  )
}

export { Item }

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
  const isBoolean = type === 'boolean'
  const { t } = useTranslation()
  const values = Array.isArray(value)
    ? value
        .map(
          (item) =>
            options?.find((option) => item === option.value)?.label ?? item
        )
        .join(', ')
    : value.replaceAll('*', '')
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
      <p>{isBoolean ? t(values) : values}</p>
    </div>
  )
}

export { Item }

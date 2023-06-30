import React from 'react'
import { useTranslation } from 'react-i18next'

import { FilterItem } from '../../types'

export type ItemProps = FilterItem & {
  onEdit: (item: FilterItem) => void
}
const Item: React.FC<ItemProps> = ({ onEdit, ...props }) => {
  const { label, value, operator } = props
  const { t } = useTranslation()
  const values = Array.isArray(value)
    ? value.join(', ')
    : value.replaceAll('*', '')
  return (
    <div className="rsql-filter-item" onClick={() => onEdit(props)}>
      <strong>{label}</strong>
      <p>{t(`operators.${operator}`)}</p>
      <p>{values}</p>
    </div>
  )
}

export { Item }

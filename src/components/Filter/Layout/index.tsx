import React, { useRef } from 'react'
import { ExpressionNode } from '@rsql/ast'
import { useTranslation } from 'react-i18next'

import {
  comparisonToSelectFieldOperator,
  rsqlToFilterItems
} from '../../../utils'
import { Item } from '../../FilterItem'
import { SelectField, SelectFieldProps } from '../../Add/SelectField'
import { SelectFilter, SelectFilterProps } from '../../Add/SelectFilter'
import { useClickOutside } from '../../../hooks/useClickOutside'
import { FilterItem } from '../../../types'
import { useComponentsProvider } from '../../../providers/ComponentsProvider.tsx'

export type FilterProps = SelectFieldProps &
  SelectFilterProps & {
    onAddFilter: () => void
    addFieldModal: boolean
    onCloseFieldModel: () => void
    selectFilterModal: boolean
    onCloseFilterModel: () => void
    search?: ExpressionNode
    onEdit: (item: FilterItem) => void
    editField: FilterItem
  }
const Layout: React.FC<FilterProps> = ({
  onAddFilter,
  search,
  addFieldModal,
  onCloseFieldModel,
  fields,
  onSelectField,
  selectFilterModal,
  onCloseFilterModel,
  label,
  value,
  setValue,
  onRemove,
  operators,
  selector,
  type,
  operator,
  setOperator,
  onAddFilterItem,
  onEdit,
  editField,
  options,
  onSearchItems
}) => {
  const { t } = useTranslation()
  const items = rsqlToFilterItems(fields, search)
  const selectFieldRef = useRef<HTMLDivElement>(null)
  const selectFilterRef = useRef<HTMLDivElement>(null)
  const { Button } = useComponentsProvider()

  useClickOutside(selectFieldRef, () => onCloseFieldModel())
  useClickOutside(selectFilterRef, () => onCloseFilterModel())

  return (
    <div className="rsql-filter">
      <Button onClick={onAddFilter}>{t('add')}</Button>
      {addFieldModal && (
        <SelectField
          fields={fields}
          onSelectField={onSelectField}
          ref={selectFieldRef}
        />
      )}
      {selectFilterModal && (
        <SelectFilter
          setOperator={setOperator}
          onAddFilterItem={onAddFilterItem}
          operator={operator}
          selector={selector}
          type={type}
          label={label}
          value={value}
          setValue={setValue}
          onRemove={onRemove}
          operators={operators}
          options={options}
          onSearchItems={onSearchItems}
          ref={selectFilterRef}
        />
      )}
      <div className="rsql-filter-items">
        {items.map((item) => (
          <Item
            key={item.selector + item.operator + item.value}
            onEdit={onEdit}
            {...item}
            isSelected={
              item.selector === editField.selector &&
              item.operator.slice(1, -1) === editField.operator
            }
            operator={comparisonToSelectFieldOperator(
              item.operator,
              !Array.isArray(item.value) ? item.value : ''
            )}
          />
        ))}
      </div>
    </div>
  )
}

export { Layout }

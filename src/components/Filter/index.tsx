import React, { useState } from 'react'
import builder from '@rsql/builder'
import { ExpressionNode } from '@rsql/ast'

import { SelectFieldProps } from '../Add/SelectField'
import { FilterItem } from '../../types'
import {
  defaultOperators,
  rsqlReplaceFilter,
  rsqlRemoveFilter,
  selectFieldToComparisonOperator,
  searchableSelectField
} from '../../utils'
import { Layout } from './Layout'

export type FilterProps = Pick<SelectFieldProps, 'fields'> & {
  search: ExpressionNode | undefined
  setSearch: (search: ExpressionNode | undefined) => void
}
const initialFieldState: FilterItem = {
  label: '',
  operators: [],
  selector: '',
  type: 'string',
  value: '',
  operator: '=='
}
const Filter: React.FC<FilterProps> = ({ fields, search, setSearch }) => {
  const [addFieldModal, setAddFieldModal] = useState(false)
  const [selectFilterModal, setSelectFilterModal] = useState(false)
  const [field, setField] = useState<FilterItem>(initialFieldState)
  const [editField, setEditField] = useState<FilterItem>(initialFieldState)
  const handleAddFilter = () => setAddFieldModal(true)
  const handleSelectField = (selector: string) => {
    setAddFieldModal(false)
    setSelectFilterModal(true)
    const field = fields.find((item) => item.selector === selector)
    if (!field) return
    const [operator] = field.operators || defaultOperators[field.type]
    setField({ ...field, selector, operator, value: '' })
  }

  const onAddFilterItem = () => {
    setSelectFilterModal(false)
    const rsqlField = {
      ...field,
      operator: selectFieldToComparisonOperator(field.operator),
      value: searchableSelectField.includes(field.operator)
        ? `*${field.value}*`
        : field.value
    }
    if (editField.selector) {
      const rsqlEditField = {
        ...editField,
        operator: selectFieldToComparisonOperator(editField.operator)
      }
      setSearch(rsqlReplaceFilter(rsqlEditField, rsqlField, search))
      setField(initialFieldState)
      setEditField(initialFieldState)
      return
    }
    const comparison = builder.comparison(
      rsqlField.selector,
      rsqlField.operator,
      rsqlField.value
    )
    setSearch(search ? builder.and(search, comparison) : comparison)
    setField(initialFieldState)
  }

  const handleEditFilter = (item: FilterItem): void => {
    setSelectFilterModal(true)
    setEditField(item)
    setField({
      ...item,
      value: searchableSelectField.includes(item.operator)
        ? item.value.slice(1, -1)
        : item.value
    })
  }

  const handleCloseFilterModal = () => {
    setSelectFilterModal(false)
    setEditField(initialFieldState)
  }

  const handleRemove = () => {
    if (editField.selector) {
      const rsqlEditField = {
        ...editField,
        operator: selectFieldToComparisonOperator(editField.operator)
      }
      setSearch(rsqlRemoveFilter(rsqlEditField, search))
    }
    setSelectFilterModal(false)
    setField(initialFieldState)
    setEditField(initialFieldState)
  }

  return (
    <Layout
      fields={fields}
      addFieldModal={addFieldModal}
      search={search}
      onAddFilter={handleAddFilter}
      selectFilterModal={selectFilterModal}
      onSelectField={handleSelectField}
      selector={field.selector}
      label={field.label}
      operator={field.operator}
      setOperator={(operator) => setField({ ...field, operator })}
      type={field.type}
      value={field.value as string}
      setValue={(value) => setField({ ...field, value })}
      operators={field.operators}
      options={field.options}
      onRemove={handleRemove}
      onAddFilterItem={onAddFilterItem}
      onCloseFieldModel={() => setAddFieldModal(false)}
      onCloseFilterModel={handleCloseFilterModal}
      onEdit={handleEditFilter}
    />
  )
}

export { Filter }

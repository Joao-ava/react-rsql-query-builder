import React, { useRef, useState } from 'react'
import type { ExpressionNode } from '@rsql/ast'
import { useTranslation } from 'react-i18next'
import { BiFilter } from 'react-icons/bi'

import { rsqlToFilterItems } from '../../../utils'
import { Item } from '../../FilterItem'
import { SelectField, type SelectFieldProps } from '../../Add/SelectField'
import { SelectFilter } from '../../Add/SelectFilter'
import type { FilterItem } from '../../../types'
import { Popover, PopoverContent, PopoverTrigger } from '../../Popover'

export type FilterProps = SelectFieldProps & {
  onUnselectField: () => void
  search?: ExpressionNode
  field: FilterItem
  onAddFilterItem: () => void
  setField: (filter: FilterItem) => void
  originalFilter: FilterItem
  isFilterSelected: boolean
  setIsFilterSelected: (value: boolean) => void
  onSelectFilter: (item: FilterItem) => void
  onRemoveFilter: () => void
  editionFilter: FilterItem
  onEditFilter: () => void
  setEditionFilter: (filter: FilterItem) => void
}
const Layout: React.FC<FilterProps> = ({
  fields,
  search,
  field,
  onSelectField,
  onAddFilterItem,
  setField,
  onUnselectField,
  originalFilter,
  isFilterSelected,
  setIsFilterSelected,
  onSelectFilter,
  editionFilter,
  onEditFilter,
  setEditionFilter,
  onRemoveFilter
}) => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const appliedFilters = rsqlToFilterItems(fields, search)
  const selectFieldRef = useRef<HTMLDivElement>(null)

  const onOpenChange = (open: boolean): void => {
    if (!open && field.selector) {
      onUnselectField()
    }
    setIsOpen(open)
  }

  return (
    <main className="rsql-main">
      <Popover open={isOpen} onOpenChange={onOpenChange}>
        <PopoverTrigger
          className="rsql-popover-trigger"
          onClick={() => setIsOpen(true)}
        >
          <BiFilter size={18} />
          {t('filters')}
        </PopoverTrigger>
        <PopoverContent>
          <section className="rsql-filter-box">
            {!field.selector && (
              <SelectField
                fields={fields}
                onSelectField={onSelectField}
                ref={selectFieldRef}
              />
            )}
            {field.selector && (
              <SelectFilter
                onApply={onAddFilterItem}
                label={field.label}
                selector={field.selector}
                type={field.type}
                operators={field.operators}
                operator={field.operator}
                setOperator={(operator) => setField({ ...field, operator })}
                value={field.value}
                setValue={(value) => setField({ ...field, value })}
                onCancel={onUnselectField}
                options={
                  fields.find((item) => item.selector === field.selector)
                    ?.options
                }
                onSearchItems={field.onSearchItems}
              />
            )}
          </section>
        </PopoverContent>
      </Popover>
      <ul className="rsql-filters">
        {appliedFilters.map((item) => (
          <Popover
            key={`${item.selector}-${item.operator}`}
            open={
              isFilterSelected &&
              `${item.selector}-${item.operator}` ===
                `${originalFilter.selector}-${originalFilter.operator}`
            }
            onOpenChange={setIsFilterSelected}
          >
            <PopoverTrigger asChild>
              <Item
                key={item.selector + item.operator + item.value}
                onSelectFilter={(filter) => {
                  onSelectFilter(filter)
                  setIsFilterSelected(true)
                }}
                {...item}
              />
            </PopoverTrigger>
            <PopoverContent>
              <SelectFilter
                onApply={onEditFilter}
                label={editionFilter.label}
                selector={editionFilter.selector}
                type={editionFilter.type}
                operators={editionFilter.operators}
                operator={editionFilter.operator}
                setOperator={(operator) =>
                  setEditionFilter({ ...editionFilter, operator })
                }
                value={editionFilter.value}
                setValue={(value) =>
                  setEditionFilter({ ...editionFilter, value })
                }
                onRemove={onRemoveFilter}
                options={
                  fields.find(
                    (item) => item.selector === editionFilter.selector
                  )?.options
                }
                onSearchItems={editionFilter.onSearchItems}
              />
            </PopoverContent>
          </Popover>
        ))}
      </ul>
    </main>
  )
}

export { Layout }

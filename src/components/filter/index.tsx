import React, {
  type ButtonHTMLAttributes,
  forwardRef,
  type HTMLProps,
  type PropsWithChildren,
  useCallback,
  useMemo,
  useState
} from 'react'
import type { ExpressionNode } from '@rsql/ast'
import builder from '@rsql/builder'
import {
  BiCalendarAlt,
  BiChevronRight,
  BiDownArrowCircle,
  BiHash,
  BiText,
  BiToggleRight
} from 'react-icons/bi'
import type { IconType } from 'react-icons'
import { useTranslation } from 'react-i18next'

import type { FieldType, FilterItem } from '../../types'

import {
  defaultOperators,
  joinClasses,
  rsqlRemoveFilter,
  rsqlReplaceFilter,
  rsqlToFilterItems,
  searchableSelectField,
  selectFieldToComparisonOperator
} from '../../utils'

import {
  BaseButton,
  BaseCheckbox,
  BaseDatepicker,
  BaseFilterTrigger,
  BaseInput,
  BaseMultiSelect,
  BaseSingleSelect,
  FilterItemForm,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '../_internal'

import {
  type CustomComponentsType,
  type FilterContextType,
  useFilterContext
} from './hook'
import { FilterProvider } from './provider'

const INITIAL_FIELD: FilterItem = {
  label: '',
  operators: [],
  selector: '',
  type: 'string',
  value: '',
  operator: 'equals'
} as const

export type FilterRootProps = PropsWithChildren<FilterProps>
export const FilterRoot: React.FC<FilterRootProps> = ({
  fields,
  search,
  setSearch,
  children,
  ...components
}) => {
  const [field, setField] = useState<FilterItem>(INITIAL_FIELD)
  const [originalFilter, setOriginalFilter] =
    useState<FilterItem>(INITIAL_FIELD)
  const [editionFilter, setEditionFilter] = useState<FilterItem>(INITIAL_FIELD)

  const appliedFilters = useMemo(
    () => rsqlToFilterItems(fields, search),
    [fields, search]
  )

  const makeField = (item: FilterItem): FilterItem => ({
    ...item,
    operator: selectFieldToComparisonOperator(item.operator),
    value: searchableSelectField.includes(item.operator)
      ? `*${item.value}*`
      : item.value
  })

  const handleSelectField = (selector: string) => {
    const selected = fields.find((item) => item.selector === selector)
    if (!selected) return
    const operators = selected.operators || defaultOperators[selected.type]
    setField({
      ...selected,
      selector,
      operators,
      operator: operators[0],
      value: ''
    })
  }

  const handleUnselectField = () => {
    setField(INITIAL_FIELD)
  }

  const onAddFilterItem = () => {
    const isAlreadyApplied = appliedFilters.some(
      (item) =>
        item.selector === field.selector && item.operator === field.operator
    )
    if (isAlreadyApplied) return

    const rsqlField = makeField(field)
    const comparison = builder.comparison(
      rsqlField.selector,
      rsqlField.operator,
      rsqlField.value
    )
    setSearch(search ? builder.and(search, comparison) : comparison)
    setField(INITIAL_FIELD)
  }

  const handleSelectFilter = (item: FilterItem) => {
    setOriginalFilter(item)
    setEditionFilter({
      ...item,
      value: searchableSelectField.includes(item.operator)
        ? item.value.slice(1, -1)
        : item.value
    })
  }

  const handleRemoveFilter = () => {
    setSearch(rsqlRemoveFilter(makeField(editionFilter), search))
    setOriginalFilter(INITIAL_FIELD)
    setEditionFilter(INITIAL_FIELD)
  }

  const handleEditFilter = () => {
    const newFilter = makeField(editionFilter)
    setSearch(
      rsqlReplaceFilter(
        {
          ...originalFilter,
          operator: selectFieldToComparisonOperator(originalFilter.operator)
        },
        newFilter,
        search
      )
    )
    setOriginalFilter(INITIAL_FIELD)
    setEditionFilter(INITIAL_FIELD)
  }

  return (
    <FilterProvider
      Button={BaseButton}
      Input={BaseInput}
      Checkbox={BaseCheckbox}
      DatePicker={BaseDatepicker}
      SingleSelect={BaseSingleSelect}
      MultiSelect={BaseMultiSelect}
      {...components}
      initialField={INITIAL_FIELD}
      fields={fields}
      search={search}
      onSelectField={handleSelectField}
      onUnselectField={handleUnselectField}
      field={field}
      setField={setField}
      onAddFilterItem={onAddFilterItem}
      originalFilter={originalFilter}
      appliedFilters={appliedFilters}
      onSelectFilter={handleSelectFilter}
      onRemoveFilter={handleRemoveFilter}
      editionFilter={editionFilter}
      setEditionFilter={setEditionFilter}
      onEditFilter={handleEditFilter}
    >
      {children}
    </FilterProvider>
  )
}
FilterRoot.displayName = 'Filter.Root'

export const FilterTriggerContent: React.FC<PropsWithChildren> = (props) => {
  const { field, onUnselectField } = useFilterContext()
  const [isOpen, setIsOpen] = useState(false)

  const onOpenChange = (open: boolean): void => {
    if (!open && field.selector) {
      onUnselectField()
    }
    setIsOpen(open)
  }

  return <Popover {...props} open={isOpen} onOpenChange={onOpenChange} />
}
FilterTriggerContent.displayName = 'Filter.TriggerContent'

type FilterTriggerProps = HTMLProps<HTMLButtonElement> & {
  asChild?: boolean
}
export const FilterTrigger = forwardRef<HTMLButtonElement, FilterTriggerProps>(
  ({ asChild, children, className, ...props }, forwardedRef) => {
    const { field } = useFilterContext()

    return (
      <>
        <PopoverTrigger
          ref={forwardedRef}
          className={joinClasses('rsql-popover-trigger', className)}
          asChild={asChild}
          children={asChild ? children : <BaseFilterTrigger />}
          {...props}
          data-testid="select-filter-trigger"
        />
        <PopoverContent>
          <section className="rsql-filter-box" data-testid="select-filter-box">
            {!field.selector && <FilterFieldsList />}
            {field.selector && <FilterItemForm />}
          </section>
        </PopoverContent>
      </>
    )
  }
)
FilterTrigger.displayName = 'Filter.Trigger'

const ICONS_BY_TYPE: Record<FieldType, IconType> = {
  string: BiText,
  number: BiHash,
  date: BiCalendarAlt,
  array: BiDownArrowCircle,
  boolean: BiToggleRight
} as const
export const FilterFieldsList: React.FC = () => {
  const { t } = useTranslation()
  const { fields, onSelectField, Input } = useFilterContext()
  const [search, setSearch] = useState('')

  const items = useMemo(
    () =>
      fields.filter((item) =>
        item.label.toLowerCase().includes(search.toLowerCase())
      ),
    [fields, search]
  )

  return (
    <section className="rsql-fields">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        name="rsql-field-search"
        placeholder={t('search') as string}
        data-testid="field-search"
      />
      <ul className="rsql-fields-list">
        {items.map((item) => {
          const Icon = ICONS_BY_TYPE[item.type]
          return (
            <li key={item.selector} className="rsql-field">
              <button
                className="rsql-field-btn"
                onClick={() => onSelectField(item.selector)}
                data-testid="field-submit"
              >
                <Icon size={16} />
                {item.label}
                <BiChevronRight size={16} />
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
FilterFieldsList.displayName = 'Filter.FieldsList'

export const AppliedFiltersList = forwardRef<
  HTMLUListElement,
  HTMLProps<HTMLUListElement>
>(({ className, ...props }, forwardedRef) => {
  const { appliedFilters } = useFilterContext()

  return (
    <ul
      className={joinClasses('rsql-filters', className)}
      {...props}
      ref={forwardedRef}
      data-testid="applied-filters-list"
    >
      {appliedFilters.map((item, index) => (
        <AppliedFilterItem key={index} item={item} />
      ))}
    </ul>
  )
})
AppliedFiltersList.displayName = 'Filters.AppliedFiltersList'

type AppliedFilterItemProps = {
  item: FilterItem
}
export const AppliedFilterItem: React.FC<AppliedFilterItemProps> = ({
  item
}) => {
  const { originalFilter, onSelectFilter } = useFilterContext()

  const isOpen = useMemo(() => {
    const itemKey = `${item.selector}-${item.operator}`
    const originalKey = `${originalFilter.selector}-${originalFilter.operator}`
    return itemKey === originalKey
  }, [
    item.operator,
    item.selector,
    originalFilter.operator,
    originalFilter.selector
  ])

  const onOpenChange = useCallback(
    (open: boolean): void => {
      onSelectFilter(open ? item : INITIAL_FIELD)
    },
    [item, onSelectFilter]
  )

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <li>
        <PopoverTrigger asChild>
          <AppliedFilterTrigger
            key={item.selector + item.operator + item.value}
            item={item}
          />
        </PopoverTrigger>
      </li>
      <PopoverContent>
        <FilterItemForm />
      </PopoverContent>
    </Popover>
  )
}
AppliedFilterItem.displayName = 'Filters.AppliedFilterItem'

type AppliedFilterTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  item: FilterItem
}
const AppliedFilterTrigger = forwardRef<
  HTMLButtonElement,
  AppliedFilterTriggerProps
>(({ item: filterItem, className, ...props }, forwardedRef) => {
  const { t } = useTranslation()

  const value = useMemo((): string => {
    if (Array.isArray(filterItem.value)) {
      return filterItem.value
        .map((item) => {
          const option = filterItem.options?.find((opt) => opt.value === item)
          return option?.label ?? item
        })
        .join(', ')
    }
    if (filterItem.type === 'date') {
      return filterItem.value.split('-').reverse().join('/')
    }
    if (filterItem.type === 'boolean') return t(value)
    return filterItem.value.replaceAll('*', '')
  }, [filterItem.options, filterItem.type, filterItem.value, t])

  return (
    <button
      className={joinClasses('rsql-filter', className)}
      {...props}
      ref={forwardedRef}
      data-testid="filter-applied"
    >
      <strong>{filterItem.label}</strong>
      <p>{t(`operators.${filterItem.operator}`)}</p>
      <p>{value}</p>
    </button>
  )
})
AppliedFilterTrigger.displayName = 'Filters.AppliedFilterTrigger'

export type FilterProps = Pick<FilterContextType, 'search' | 'fields'> &
  Partial<CustomComponentsType> & {
    setSearch: (search: ExpressionNode | undefined) => void
  }
const Filter: React.FC<FilterProps> = (props) => (
  <FilterRoot {...props}>
    <section className="rsql-main" data-testid="filter-main-section">
      <FilterTriggerContent>
        <FilterTrigger />
      </FilterTriggerContent>
      <AppliedFiltersList />
    </section>
  </FilterRoot>
)

export default Filter

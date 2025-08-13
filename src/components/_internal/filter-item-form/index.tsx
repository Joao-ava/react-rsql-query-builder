import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { BiTrash } from 'react-icons/bi'

import { defaultOperators } from '../../../utils'

import { useFilterContext } from '../../filter/hook'
import type { Option } from '../../../types'

import { ParsedField } from '../parsed-field'

const FilterItemForm: React.FC = () => {
  const { t } = useTranslation()
  const {
    initialField,
    field,
    editionFilter,
    setField,
    setEditionFilter,
    onEditFilter,
    onAddFilterItem,
    onSelectFilter,
    onUnselectField,
    onRemoveFilter,
    Button,
    SingleSelect
  } = useFilterContext()

  const isEdition = useMemo(
    () => !!editionFilter.selector,
    [editionFilter.selector]
  )

  const currentFilter = useMemo(
    () => (isEdition ? editionFilter : field),
    [editionFilter, field, isEdition]
  )

  const onChange = useMemo(
    () => (isEdition ? setEditionFilter : setField),
    [isEdition, setEditionFilter, setField]
  )

  const operatorsOptions = useMemo(() => {
    const operators = currentFilter.operators?.length
      ? currentFilter.operators
      : defaultOperators[currentFilter.type]

    return operators.map((item) => ({
      value: item,
      label: t(`operators.${item}`)
    }))
  }, [currentFilter.operators, currentFilter.type, t])

  const onCancelChanges = useCallback(() => {
    if (isEdition) {
      onSelectFilter(initialField)
      return
    }

    onUnselectField()
  }, [initialField, isEdition, onSelectFilter, onUnselectField])

  const onApplyChanges = useCallback(() => {
    const handlerFn = isEdition ? onEditFilter : onAddFilterItem
    handlerFn()
  }, [isEdition, onAddFilterItem, onEditFilter])

  return (
    <section className="rsql-set-filter">
      <section className="rsql-set-filter-header">
        <p>{currentFilter.label}</p>
        <SingleSelect
          items={operatorsOptions}
          value={
            operatorsOptions.find(
              (item) => item.value === currentFilter.operator
            ) as Option
          }
          setValue={(operator) => onChange((prev) => ({ ...prev, operator }))}
        />
        {isEdition && (
          <button className="rsql-btn-icon" onClick={onRemoveFilter}>
            <BiTrash />
          </button>
        )}
      </section>
      <ParsedField
        {...currentFilter}
        setValue={(value) => onChange((prev) => ({ ...prev, value }))}
      />
      <section className="rsql-set-filter-footer">
        <Button className="secondary" onClick={onCancelChanges}>
          {t('cancel')}
        </Button>
        <Button onClick={onApplyChanges} data-testid="filter-submit">
          {t('apply')}
        </Button>
      </section>
    </section>
  )
}

export { FilterItemForm }

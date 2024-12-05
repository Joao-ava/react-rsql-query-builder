import React from 'react'
import { useTranslation } from 'react-i18next'

import { FilterItem, Option } from '../../../types'
import { defaultOperators } from '../../../utils'
import { useComponentsProvider } from '../../../providers/ComponentsProvider'
import { ParsedField } from './Field'
import { BiTrash } from 'react-icons/bi'

export type SelectFilterProps = FilterItem & {
  setOperator: (param: string) => void
  setValue: (param: string | string[]) => void
  onCancel?: () => void
  onRemove?: () => void
  onApply: () => void
}

const SelectFilter: React.FC<SelectFilterProps> = (params) => {
  const { Button, SingleSelect } = useComponentsProvider()
  const {
    label,
    operators,
    operator,
    type,
    onRemove,
    onCancel,
    setOperator,
    onApply
  } = params
  const { t } = useTranslation()
  const allOperators = operators?.length ? operators : defaultOperators[type]
  const allOperatorsOptions = allOperators.map((item) => ({
    label: t(`operators.${item}`),
    value: item
  }))
  return (
    <div className="rsql-set-filter">
      <div className="rsql-set-filter-header">
        <p>{label}</p>
        <SingleSelect
          items={allOperatorsOptions}
          value={
            allOperatorsOptions.find(
              (item) => item.value === operator
            ) as Option
          }
          setValue={(value) => setOperator(value)}
        />
        {onRemove && (
          <button className="rsql-btn-icon" onClick={onRemove}>
            <BiTrash />
          </button>
        )}
      </div>
      <ParsedField {...params} />
      <div className="rsql-set-filter-footer">
        {onCancel && (
          <Button className="secondary" onClick={onCancel}>
            {t('cancel')}
          </Button>
        )}
        <Button onClick={onApply}>{t('apply')}</Button>
      </div>
    </div>
  )
}

export { SelectFilter }

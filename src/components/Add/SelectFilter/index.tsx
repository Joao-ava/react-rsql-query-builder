import React, { forwardRef } from 'react'
import { BiTrashAlt } from 'react-icons/bi'
import { useTranslation } from 'react-i18next'

import { FilterItem, Option } from '../../../types'
import { defaultOperators } from '../../../utils'
import { useComponentsProvider } from '../../../providers/ComponentsProvider'
import { ParsedField } from './Field'

export type SelectFilterProps = FilterItem & {
  setOperator: (param: string) => void
  setValue: (param: string | string[]) => void
  onRemove: () => void
  onAddFilterItem: () => void
}

const SelectFilterFunction: React.ForwardRefRenderFunction<
  HTMLDivElement,
  SelectFilterProps
> = (params, ref) => {
  const { Button, Select } = useComponentsProvider()
  const {
    label,
    operators,
    operator,
    type,
    onRemove,
    onAddFilterItem,
    setOperator
  } = params
  const { t } = useTranslation()
  const allOperators = operators?.length ? operators : defaultOperators[type]
  const allOperatorsOptions = allOperators.map((item) => ({
    label: t(`operators.${item}`),
    value: item
  }))
  return (
    <div className="rsql-box rsql-select-filter" ref={ref}>
      <div className="rsql-select-filter-row">
        <p>{label}</p>
        <Select
          items={allOperatorsOptions}
          option={
            allOperatorsOptions.find(
              (item) => item.value === operator
            ) as Option
          }
          setValue={setOperator}
        />
        <button onClick={onRemove} className="rsql-btn-icon">
          <BiTrashAlt />
        </button>
      </div>
      <ParsedField {...params} />
      <div className="rsql-row end">
        <Button onClick={onAddFilterItem}>{t('submit')}</Button>
      </div>
    </div>
  )
}

const SelectFilter = forwardRef(SelectFilterFunction)

export { SelectFilter }

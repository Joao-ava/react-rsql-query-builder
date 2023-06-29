import React from 'react'
import { useTranslation } from 'react-i18next'
import { ComparisonOperator } from '@rsql/ast'

type OperatorProps = {
  operator: string
  value?: string
}
const Operator: React.FC<OperatorProps> = ({ operator, value = '' }) => {
  const { t } = useTranslation()
  const operatorTranslation: Record<ComparisonOperator, string> = {
    '==': t('operators.equals'),
    '!=': t('operators.notEquals'),
    '>': t('operators.moreThan'),
    '>=': t('operators.moreThanOrEqual'),
    '<': t('operators.lessThan'),
    '<=': t('operators.lessThanOrEqual'),
    '=in=': t('operators.in'),
    '=out=': t('operators.out')
  }
  const isSearch =
    !!value &&
    !Array.isArray(value) &&
    value.startsWith('*') &&
    value.endsWith('*')
  if (operator === '==' && isSearch) return <>{t('operators.contains')}</>
  return <>{operatorTranslation[operator]}</>
}

export { Operator }

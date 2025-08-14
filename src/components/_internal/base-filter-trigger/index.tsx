import React from 'react'
import { useTranslation } from 'react-i18next'
import { BiFilter } from 'react-icons/bi'

const BaseFilterTrigger: React.FC = () => {
  const { t } = useTranslation()
  return (
    <>
      <BiFilter size={18} />
      {t('filters')}
    </>
  )
}

export { BaseFilterTrigger }

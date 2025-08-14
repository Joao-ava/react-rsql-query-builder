import React, { type PropsWithChildren, useLayoutEffect } from 'react'
import { I18nextProvider, useTranslation } from 'react-i18next'
import type { i18n } from 'i18next'

import { i18next } from '../i18n'

type LanguageProviderProps = {
  language?: string
  i18n?: i18n
}
const LanguageProvider: React.FC<PropsWithChildren<LanguageProviderProps>> = ({
  language = 'en',
  i18n = i18next,
  children
}) => {
  const translation = useTranslation()

  useLayoutEffect(() => {
    translation.i18n.changeLanguage(language)
  }, [language, translation.i18n])

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}

export { LanguageProvider }

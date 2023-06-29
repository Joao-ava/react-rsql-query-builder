import React from 'react'
import { I18nextProvider, I18nextProviderProps } from 'react-i18next'

type I18nProviderWrapperProps = I18nextProviderProps & {
  locale: string
}
const I18nProviderWrapper: React.FC<I18nProviderWrapperProps> = ({ children, i18n, locale }) => {
  React.useEffect(() => {
    i18n.changeLanguage(locale)
  }, [i18n, locale])
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

export { I18nProviderWrapper }

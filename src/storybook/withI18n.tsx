import { Suspense, useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import type { Decorator } from '@storybook/react-vite'
import { i18next } from '../i18n'

export const WithI18n: Decorator = (Story, context) => {
  const { locale } = context.globals

  useEffect(() => {
    i18next.changeLanguage(locale)
  }, [locale])

  return (
    <Suspense fallback={<div>loading translations...</div>}>
      <I18nextProvider i18n={i18next}>
        <Story />
      </I18nextProvider>
    </Suspense>
  )
}

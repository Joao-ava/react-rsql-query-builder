import type { Preview } from '@storybook/react'

import '../src/styles.css'
import { I18nProviderWrapper } from '../src/storybook/I18nProviderWrapper'
import { i18next } from '../src/i18n'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    i18n: {
      provider: I18nProviderWrapper,
      providerProps: {
        i18n: i18next
      },
      supportedLocales: ['en'],
      providerLocaleKey: 'locale'
    }
  }
}

export default preview

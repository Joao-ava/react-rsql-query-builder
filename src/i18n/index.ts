import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import { resources } from './resources'

i18next.use(initReactI18next).init({
  resources,
  fallbackLng: 'en-US',
  interpolation: {
    escapeValue: false
  }
})

export { i18next }

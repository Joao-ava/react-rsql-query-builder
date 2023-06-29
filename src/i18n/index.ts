import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import { resources } from './locales'

i18next.use(initReactI18next).init({
  resources: resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
})

export { i18next }

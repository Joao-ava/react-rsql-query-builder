import React from 'react'
import { I18nextProvider, type I18nextProviderProps } from 'react-i18next'

import { i18next } from '../i18n'
import { Filter, type FilterProps } from '../components/Filter'
import {
  ComponentsProvider,
  type ComponentsProviderProps
} from './ComponentsProvider'

type FiltersProviderProps = Partial<I18nextProviderProps> &
  FilterProps &
  Omit<ComponentsProviderProps, 'children'>
const FiltersProvider: React.FC<FiltersProviderProps> = ({
  i18n = i18next,
  language = 'en',
  Button,
  Input,
  Checkbox,
  SingleSelect,
  MultiSelect,
  DatePicker,
  ...props
}) => (
  <I18nextProvider i18n={i18n}>
    <ComponentsProvider
      Button={Button}
      Input={Input}
      Checkbox={Checkbox}
      SingleSelect={SingleSelect}
      MultiSelect={MultiSelect}
      DatePicker={DatePicker}
      language={language}
    >
      <Filter {...props} />
    </ComponentsProvider>
  </I18nextProvider>
)

export { FiltersProvider }

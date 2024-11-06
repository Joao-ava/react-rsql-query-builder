import React from 'react'
import { I18nextProvider, I18nextProviderProps } from 'react-i18next'

import { i18next } from '../i18n'
import { Filter, FilterProps } from '../components/Filter'
import {
  ComponentsProvider,
  ComponentsProviderProps
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
  ...props
}) => {
  return (
    <I18nextProvider i18n={i18n}>
      <ComponentsProvider
        Button={Button}
        Input={Input}
        Checkbox={Checkbox}
        SingleSelect={SingleSelect}
        MultiSelect={MultiSelect}
        language={language}
      >
        <Filter {...props} />
      </ComponentsProvider>
    </I18nextProvider>
  )
}

export { FiltersProvider }

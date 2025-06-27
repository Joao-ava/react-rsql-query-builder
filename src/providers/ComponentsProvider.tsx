import React, { createContext, useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { Button as DefaultButton, type ButtonProps } from '../components/Button'
import { Input as DefaultInput, type InputProps } from '../components/Input'
import {
  Checkbox as DefaultCheckbox,
  type CheckboxProps
} from '../components/Checkbox'
import {
  SingleSelect as DefaultSingleSelect,
  type SingleSelectProps
} from '../components/SingleSelect'
import {
  Datepicker as DefaultDatepicker,
  type DatepickerProps
} from '../components/Datepicker'
import {
  MultiSelect as DefaultMultiSelect,
  type MultiSelectProps
} from '../components/MultiSelect'

type ComponentsContextType = {
  Button: React.FC<ButtonProps>
  Input: React.FC<InputProps>
  Checkbox: React.FC<CheckboxProps>
  SingleSelect: React.FC<SingleSelectProps>
  MultiSelect: React.FC<MultiSelectProps>
  DatePicker: React.FC<DatepickerProps>
}

const ComponentsContext = createContext({} as ComponentsContextType)

export type ComponentsProviderProps = Partial<ComponentsContextType> & {
  children: React.ReactNode
  language?: string
}

export const ComponentsProvider: React.FC<ComponentsProviderProps> = ({
  Button = DefaultButton,
  Input = DefaultInput,
  Checkbox = DefaultCheckbox,
  SingleSelect = DefaultSingleSelect,
  MultiSelect = DefaultMultiSelect,
  DatePicker = DefaultDatepicker,
  language,
  children
}) => {
  const { i18n } = useTranslation()
  useEffect(() => {
    i18n.changeLanguage(language)
  }, [i18n, language])
  return (
    <ComponentsContext.Provider
      value={{
        Button,
        Input,
        Checkbox,
        SingleSelect,
        MultiSelect,
        DatePicker
      }}
    >
      {children}
    </ComponentsContext.Provider>
  )
}

export const useComponentsProvider = (): ComponentsContextType =>
  useContext(ComponentsContext)

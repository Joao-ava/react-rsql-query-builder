import React, { createContext, useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { Button as DefaultButton, ButtonProps } from '../components/Button'
import { Input as DefaultInput, InputProps } from '../components/Input'
import {
  Checkbox as DefaultCheckbox,
  CheckboxProps
} from '../components/Checkbox'
import { Select as DefaultSelect, SelectProps } from '../components/Select'
import {
  Datepicker as DefaultDatepicker,
  DatepickerProps
} from '../components/Datepicker'

type ComponentsContextType = {
  Button: React.FC<ButtonProps>
  Input: React.FC<InputProps>
  Checkbox: React.FC<CheckboxProps>
  Select: React.FC<SelectProps>
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
  Select = DefaultSelect,
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
        Select,
        DatePicker
      }}
    >
      {children}
    </ComponentsContext.Provider>
  )
}

export const useComponentsProvider = (): ComponentsContextType =>
  useContext(ComponentsContext)

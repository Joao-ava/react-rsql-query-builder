import React, { createContext, useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { Button as DefaultButton, ButtonProps } from '../components/Button'
import { Input as DefaultInput, InputProps } from '../components/Input'
import {
  Checkbox as DefaultCheckbox,
  CheckboxProps
} from '../components/Checkbox'

type ComponentsContextType = {
  Button: React.FC<ButtonProps>
  Input: React.FC<InputProps>
  Checkbox: React.FC<CheckboxProps>
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
        Checkbox
      }}
    >
      {children}
    </ComponentsContext.Provider>
  )
}

export const useComponentsProvider = (): ComponentsContextType =>
  useContext(ComponentsContext)

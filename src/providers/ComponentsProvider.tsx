import React, { createContext, useContext } from 'react'

import { Button as DefaultButton, ButtonProps } from '../components/Button'
import { Input as DefaultInput, InputProps } from '../components/Input'

type ComponentsContextType = {
  Button: React.FC<ButtonProps>
  Input: React.FC<InputProps>
}

const ComponentsContext = createContext({} as ComponentsContextType)

export type ComponentsProviderProps = Partial<ComponentsContextType> & {
  children: React.ReactNode
}

export const ComponentsProvider: React.FC<ComponentsProviderProps> = ({
  Button = DefaultButton,
  Input = DefaultInput,
  children
}) => {
  return (
    <ComponentsContext.Provider
      value={{
        Button,
        Input
      }}
    >
      {children}
    </ComponentsContext.Provider>
  )
}

export const useComponentsProvider = (): ComponentsContextType =>
  useContext(ComponentsContext)

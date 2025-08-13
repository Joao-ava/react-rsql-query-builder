import React, { type PropsWithChildren } from 'react'
import { FilterContext, type FilterContextType } from './hook.ts'

const FilterProvider: React.FC<PropsWithChildren<FilterContextType>> = ({
  children,
  ...props
}) => <FilterContext.Provider value={props}>{children}</FilterContext.Provider>

export { FilterProvider }

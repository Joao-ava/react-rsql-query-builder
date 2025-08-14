import React, { type PropsWithChildren } from 'react'

import { FilterContext, type FilterContextType } from './hook'

const FilterProvider: React.FC<PropsWithChildren<FilterContextType>> = ({
  children,
  ...props
}) => <FilterContext.Provider value={props}>{children}</FilterContext.Provider>

export { FilterProvider }

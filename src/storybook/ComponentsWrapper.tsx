import React from 'react'
import { ComponentsProvider } from '../providers/ComponentsProvider.tsx'

const ComponentsWrapper = (Story: React.FC) => (
  <ComponentsProvider>
    <Story />
  </ComponentsProvider>
)

export { ComponentsWrapper }

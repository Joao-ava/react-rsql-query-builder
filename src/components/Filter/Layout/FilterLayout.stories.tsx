import React from 'react'
import { Meta, StoryFn } from '@storybook/react'

import builder from '@rsql/builder'

import { FilterProps, Layout } from './index.tsx'

export default {
  title: 'components/Filter/Layout',
  component: Layout
} as Meta<React.JSXElementConstructor<FilterProps>>

const Template: StoryFn<React.JSXElementConstructor<FilterProps>> = (args) => (
  <Layout {...args} />
)

const defaultProps: FilterProps = {
  isFilterSelected: false,
  setIsFilterSelected: () => undefined,
  onEditFilter: () => undefined,
  onRemoveFilter: () => undefined,
  onSelectFilter: () => undefined,
  onUnselectField: () => undefined,
  setEditionFilter: () => undefined,
  setField: () => undefined,
  fields: [
    { selector: 'name', label: 'Name', type: 'string' },
    { selector: 'age', label: 'Age', type: 'number' },
    { selector: 'status', label: 'Status', type: 'array' }
  ],
  onSelectField: () => undefined,
  onAddFilterItem: () => undefined,
  field: {
    selector: 'name',
    label: 'Name',
    type: 'string',
    value: 'John Doe',
    operator: '=='
  },
  editionFilter: {
    selector: 'name',
    label: 'Name',
    type: 'string',
    value: 'John Doe',
    operator: '=='
  },
  originalFilter: {
    selector: 'name',
    label: 'Name',
    type: 'string',
    value: 'John Doe',
    operator: '=='
  }
}

export const Empty = Template.bind({})
Empty.args = defaultProps

export const OneItem = Template.bind({})
OneItem.args = {
  ...defaultProps,
  search: builder.eq('name', 'John Doe')
}

export const ThreeItems = Template.bind({})
ThreeItems.args = {
  ...defaultProps,
  search: builder.and(
    builder.eq('name', 'John Doe'),
    builder.gt('age', 18),
    builder.lt('age', 65)
  )
}

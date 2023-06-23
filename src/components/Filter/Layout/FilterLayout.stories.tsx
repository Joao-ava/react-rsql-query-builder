import React from 'react'
import { StoryFn, Meta } from '@storybook/react'

import builder from '@rsql/builder'

import { Layout, FilterProps } from './index.tsx'

export default {
  title: 'components/Filter/Layout',
  component: Layout
} as Meta<React.JSXElementConstructor<FilterProps>>

const Template: StoryFn<React.JSXElementConstructor<FilterProps>> = (
  args
) => <Layout {...args} />

const defaultProps: FilterProps = {
  operator: '==',
  selector: '',
  type: 'string',
  fields: [
    { selector: 'name', label: 'Name', type: 'string' },
    { selector: 'age', label: 'Age', type: 'number' },
    { selector: 'status', label: 'Status', type: 'array' },
  ],
  addFieldModal: false,
  onSelectField: () => undefined,
  onAddFilter: () => undefined,
  label: 'Name',
  value: 'John Doe',
  setValue: () => undefined,
  selectFilterModal: false,
  operators: ['==', '!='],
  setOperator: () => undefined,
  onRemove: () => undefined,
  onAddFilterItem: () => undefined,
  onCloseFieldModel: () => undefined,
  onCloseFilterModel: () => undefined,
  onEdit: () => undefined
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

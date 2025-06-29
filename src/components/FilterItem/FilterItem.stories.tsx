import React from 'react'
import type { Meta, StoryFn } from '@storybook/react-vite'

import { Item, type ItemProps } from '.'

export default {
  title: 'components/FilterItem',
  component: Item
} as Meta<React.JSXElementConstructor<ItemProps>>

const Template: StoryFn<React.JSXElementConstructor<ItemProps>> = (args) => (
  <Item {...args} />
)

const defaultProps: ItemProps = {
  onSelectFilter: () => undefined,
  label: 'Year',
  type: 'number',
  selector: 'year',
  operator: 'equals',
  value: '1989'
}

export const Equals = Template.bind({})
Equals.args = defaultProps

export const Contains = Template.bind({})
Contains.args = {
  ...defaultProps,
  label: 'Name',
  selector: 'name',
  operator: 'contains',
  value: '*19*'
}

export const NotEquals = Template.bind({})
NotEquals.args = {
  ...defaultProps,
  operator: 'notEquals'
}

export const MoreThan = Template.bind({})
MoreThan.args = {
  ...defaultProps,
  operator: 'moreThan'
}

export const MoreThanEqual = Template.bind({})
MoreThanEqual.args = {
  ...defaultProps,
  operator: 'moreThanOrEqual'
}

export const LessThan = Template.bind({})
LessThan.args = {
  ...defaultProps,
  operator: 'lessThan'
}

export const LessThanEqual = Template.bind({})
LessThanEqual.args = {
  ...defaultProps,
  operator: 'lessThanOrEqual'
}

export const StatusIn = Template.bind({})
StatusIn.args = {
  ...defaultProps,
  selector: 'status',
  value: ['active', 'schedule'],
  operator: 'in'
}

export const StatusOut = Template.bind({})
StatusOut.args = {
  ...defaultProps,
  selector: 'status',
  value: ['active', 'schedule'],
  operator: 'out'
}

export const Boolean = Template.bind({})
Boolean.args = {
  ...defaultProps,
  operator: 'isActive',
  value: 'true',
  type: 'boolean'
}

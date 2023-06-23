import React from 'react'
import { StoryFn, Meta } from '@storybook/react'

import { Filter, FilterProps } from './index'

export default {
  title: 'components/Filter',
  component: Filter
} as Meta<React.JSXElementConstructor<FilterProps>>

const Template: StoryFn<React.JSXElementConstructor<FilterProps>> = (
  args
) => <Filter {...args} />

const defaultProps: FilterProps = {
  fields: [
    { selector: 'name', label: 'Name', type: 'string' },
    { selector: 'age', label: 'Age', type: 'number' },
    { selector: 'status', label: 'Status', type: 'array' },
  ]
}

export const Default = Template.bind({})
Default.args = defaultProps

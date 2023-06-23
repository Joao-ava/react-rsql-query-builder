import React from 'react'
import { StoryFn, Meta } from '@storybook/react'

import { SelectField, SelectFieldProps } from '.'

export default {
  title: 'components/Add/SelectField',
  component: SelectField
} as Meta<React.JSXElementConstructor<SelectFieldProps>>

const Template: StoryFn<React.JSXElementConstructor<SelectFieldProps>> = (
  args
) => <SelectField {...args} />

const defaultProps: SelectFieldProps = {
  fields: [
    { name: 'name', label: 'Name', type: 'string' },
    { name: 'age', label: 'Age', type: 'number' },
    { name: 'status', label: 'Status', type: 'array' },
  ],
  onSelectField: () => undefined
}

export const Default = Template.bind({})
Default.args = defaultProps

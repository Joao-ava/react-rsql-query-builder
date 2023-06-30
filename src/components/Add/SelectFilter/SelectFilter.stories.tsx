import React, { useState } from 'react'
import { StoryFn, Meta } from '@storybook/react'

import { SelectFilter, SelectFilterProps } from '.'

export default {
  title: 'components/Add/SelectFilter',
  component: SelectFilter
} as Meta<React.JSXElementConstructor<SelectFilterProps>>

const Template: StoryFn<React.JSXElementConstructor<SelectFilterProps>> = (
  args
) => {
  const [value, setValue] = useState(args.value)
  return <SelectFilter {...args} value={value} setValue={setValue} />
}

const defaultProps: SelectFilterProps = {
  operator: 'equals',
  selector: 'age',
  type: 'string',
  label: 'Age',
  operators: [
    'equals',
    'notEquals',
    'lessThanOrEqual',
    'moreThanOrEqual',
    'lessThan',
    'moreThan'
  ],
  value: '2',
  setValue: () => undefined,
  onRemove: () => undefined,
  onAddFilterItem: () => undefined,
  setOperator: () => undefined
}

export const Default = Template.bind({})
Default.args = defaultProps

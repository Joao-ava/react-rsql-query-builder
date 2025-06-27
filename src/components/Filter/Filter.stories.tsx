import React, { useState } from 'react'
import type { Meta, StoryFn } from '@storybook/react-vite'
import type { ExpressionNode } from '@rsql/ast'

import { Filter, type FilterProps } from './index'

export default {
  title: 'components/Filter',
  component: Filter
} as Meta<React.JSXElementConstructor<FilterProps>>

const Template: StoryFn<React.JSXElementConstructor<FilterProps>> = (args) => {
  const [search, setSearch] = useState<ExpressionNode | undefined>(args.search)
  return <Filter {...args} search={search} setSearch={setSearch} />
}

const defaultProps: FilterProps = {
  search: undefined,
  setSearch: () => undefined,
  fields: [
    { selector: 'name', label: 'Name', type: 'string' },
    { selector: 'age', label: 'Age', type: 'number' },
    { selector: 'isActive', label: 'Active', type: 'boolean' },
    { selector: 'createdAt', label: 'Created at', type: 'date' },
    {
      selector: 'status',
      label: 'Status',
      type: 'array',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Deactivate', value: 'deactivate' },
        { label: 'Pending', value: 'pending' }
      ]
    }
  ]
}

export const Default = Template.bind({})
Default.args = defaultProps

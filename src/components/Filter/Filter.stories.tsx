import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ExpressionNode } from '@rsql/ast'
import { expect, screen } from 'storybook/test'

import { Filter, type FilterProps } from './index'

const meta = {
  title: 'components/Filter',
  component: Filter
} as Meta<typeof Filter>
export default meta

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

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: defaultProps,
  render: (args) => {
    const [search, setSearch] = useState<ExpressionNode | undefined>(
      args.search
    )
    return <Filter {...args} search={search} setSearch={setSearch} />
  },
  play: async ({ canvas, userEvent }) => {
    // open filter selection
    await userEvent.click(canvas.getByTestId('select-filter-trigger'))
    await expect(canvas.getByTestId('select-filter-trigger')).toHaveAttribute(
      'data-state',
      'open'
    )
    await expect(screen.getByTestId('select-filter-box')).toBeInTheDocument()

    // search for the name field
    await userEvent.type(screen.getByTestId('field-search'), 'name')

    // select field to filter
    await userEvent.click(screen.getByTestId('field-submit'))

    // set a value to filter
    await userEvent.type(screen.getByTestId('input-filter-setter'), 'Teste')

    // apply filter
    await userEvent.click(screen.getByTestId('filter-submit'))

    // verify if filter is displaying
    await expect(canvas.getAllByTestId('filter-applied')).toHaveLength(1)
  }
}

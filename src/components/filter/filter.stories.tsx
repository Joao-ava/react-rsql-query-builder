import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, screen } from 'storybook/test'
import type { ExpressionNode } from '@rsql/ast'

import Filter, { type FilterRootProps } from '.'

const meta = {
  title: 'components/Filter',
  component: Filter,
  parameters: {
    layout: 'padded'
  }
} as Meta<typeof Filter>
export default meta

type Story = StoryObj<typeof meta>

const defaultProps: FilterRootProps = {
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

export const Default: Story = {
  args: defaultProps,
  render: (args) => {
    const [search, setSearch] = useState<ExpressionNode | undefined>(
      args.search
    )
    return <Filter {...args} search={search} setSearch={setSearch} />
  },
  play: async ({ canvas, userEvent }) => {
    // test filter menu opening
    await userEvent.click(canvas.getByTestId('select-filter-trigger'))
    await expect(canvas.getByTestId('select-filter-trigger')).toHaveAttribute(
      'data-state',
      'open'
    )
    await expect(screen.getByTestId('select-filter-box')).toBeInTheDocument()

    // test filter addition
    await userEvent.type(screen.getByTestId('field-search'), 'name')
    await userEvent.click(screen.getAllByTestId('field-submit')[0])
    await userEvent.type(screen.getByTestId('input-filter-setter'), 'Teste')
    await userEvent.click(screen.getByTestId('filter-submit'))
    await userEvent.click(screen.getByTestId('filter-main-section'))
    await expect(screen.getAllByTestId('filter-applied')).toHaveLength(1)

    // test filter edition
    const filterToEdit = screen.getAllByTestId('filter-applied')[0]
    await userEvent.click(filterToEdit)
    await userEvent.type(screen.getByTestId('input-filter-setter'), ' 2')
    await userEvent.click(screen.getByTestId('filter-submit'))
    const editedFilter = screen.getAllByTestId('filter-applied')[0]
    await expect(editedFilter.innerText).toContain('Teste 2')

    // test filter removal
    const filterToDelete = screen.getAllByTestId('filter-applied')[0]
    await userEvent.click(filterToDelete)
    await userEvent.click(screen.getByTestId('delete-filter-button'))
    await expect(
      screen.getByTestId('applied-filters-list')
    ).toBeEmptyDOMElement()
  }
}

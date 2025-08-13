import React, { type ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { FilterProvider } from '../../filter/provider'

import type { FilterItem } from '../../../types'

import { BaseButton } from '../base-button'
import { BaseInput } from '../base-input'
import { BaseCheckbox } from '../base-checkbox'
import { BaseDatepicker } from '../base-datepicker'
import { BaseSingleSelect } from '../base-single-select'
import { BaseMultiSelect } from '../base-multi-select'

import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '.'

const Render: React.FC<ComponentProps<typeof Popover>> = (args) => (
  <FilterProvider
    Button={BaseButton}
    Input={BaseInput}
    Checkbox={BaseCheckbox}
    DatePicker={BaseDatepicker}
    SingleSelect={BaseSingleSelect}
    MultiSelect={BaseMultiSelect}
    initialField={{} as FilterItem}
    fields={[]}
    search={undefined}
    onSelectField={() => undefined}
    onUnselectField={() => undefined}
    field={{} as FilterItem}
    setField={() => undefined}
    onAddFilterItem={() => undefined}
    originalFilter={{} as FilterItem}
    appliedFilters={[]}
    onSelectFilter={() => undefined}
    onRemoveFilter={() => undefined}
    editionFilter={{} as FilterItem}
    setEditionFilter={() => undefined}
    onEditFilter={() => undefined}
  >
    <Popover {...args}>
      <PopoverTrigger>Open</PopoverTrigger>
      <PopoverContent>
        <p>Popover content</p>
        <PopoverClose>Close</PopoverClose>
      </PopoverContent>
    </Popover>
  </FilterProvider>
)

const meta = {
  title: 'components/_internal/Popover',
  component: Popover,
  render: (args) => <Render {...args} />
} as Meta<typeof Popover>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

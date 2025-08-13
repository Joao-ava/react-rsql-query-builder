import React, { type ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '.'

const Render: React.FC<ComponentProps<typeof Popover>> = () => (
  <Popover>
    <PopoverTrigger asChild>trigger</PopoverTrigger>
    <PopoverContent>
      <PopoverClose>Close</PopoverClose>
    </PopoverContent>
  </Popover>
)

const meta = {
  title: 'components/_internal/Popover',
  component: Popover,
  render: (args) => <Render {...args} />
} as Meta<typeof Popover>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

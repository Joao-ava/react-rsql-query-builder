import { Meta, StoryFn } from '@storybook/react'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '.'

export default {
  title: 'components/Popover',
  component: Popover
} as Meta<typeof Popover>

const Template: StoryFn<typeof Popover> = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>trigger</PopoverTrigger>
      <PopoverContent>
        <PopoverClose>Close</PopoverClose>
      </PopoverContent>
    </Popover>
  )
}

export const Default = Template.bind({})
Default.args = {}

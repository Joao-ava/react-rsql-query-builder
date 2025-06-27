import React from 'react'
import { Input } from '../Input'

export type DatepickerProps = {
  value?: string
  setValue: (value: string) => void
}
const Datepicker: React.FC<DatepickerProps> = ({ value, setValue }) => (
  <Input
    type="date"
    value={value}
    onChange={(event) => setValue(event.target.value)}
  />
)

export { Datepicker }

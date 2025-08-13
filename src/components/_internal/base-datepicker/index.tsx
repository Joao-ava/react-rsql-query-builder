import React from 'react'

import { BaseInput } from '../base-input'

export type DatepickerProps = {
  value?: string
  setValue: (value: string) => void
}
const BaseDatepicker: React.FC<DatepickerProps> = ({ value, setValue }) => (
  <BaseInput
    type="date"
    value={value}
    onChange={(event) => setValue(event.target.value)}
  />
)

export { BaseDatepicker }

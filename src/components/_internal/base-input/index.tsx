import React, { type InputHTMLAttributes } from 'react'

export type InputProps = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'name' | 'placeholder' | 'type' | 'onChange'
>

const BaseInput: React.FC<InputProps> = ({ ...props }) => (
  <input className="rsql-input" {...props} />
)

export { BaseInput }

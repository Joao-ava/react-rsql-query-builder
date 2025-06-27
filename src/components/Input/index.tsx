import React, { type InputHTMLAttributes } from 'react'

export type InputProps = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'name' | 'placeholder' | 'type' | 'onChange'
>

export const Input: React.FC<InputProps> = ({ ...props }) => (
  <input className="rsql-input" {...props} />
)

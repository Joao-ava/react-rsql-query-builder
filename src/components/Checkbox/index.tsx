import React, { InputHTMLAttributes } from 'react'

export type CheckboxProps = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | 'value'
  | 'name'
  | 'onChange'
  | 'checked'
  | 'defaultChecked'
  | 'aria-checked'
  | 'placeholder'
  | 'type'
>

export const Checkbox: React.FC<CheckboxProps> = ({
  placeholder,
  ...props
}) => (
  <div className="rsql-checkbox-wrapper">
    <input
      type="checkbox"
      id="rsql-checkbox-id"
      className="rsql-checkbox"
      {...props}
    />
    <label htmlFor="rsql-checkbox-id" className="rsql-checkbox-label">
      {placeholder}
    </label>
  </div>
)

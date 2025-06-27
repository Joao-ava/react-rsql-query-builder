import { forwardRef, type HTMLProps } from 'react'

export type ButtonProps = HTMLProps<HTMLButtonElement>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => (
    <button
      ref={ref}
      {...props}
      type="button"
      className={`rsql-btn ${props.className}`}
    >
      {children}
    </button>
  )
)

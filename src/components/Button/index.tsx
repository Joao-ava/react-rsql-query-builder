import { forwardRef, type HTMLProps } from 'react'

export type ButtonProps = HTMLProps<HTMLButtonElement>

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
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
Button.displayName = 'Button'

export { Button }

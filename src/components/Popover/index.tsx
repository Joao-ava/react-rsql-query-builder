import React, {
  cloneElement,
  createContext,
  forwardRef,
  type HTMLProps,
  isValidElement,
  type ReactNode,
  useContext,
  useState
} from 'react'
import {
  autoPlacement,
  autoUpdate,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  type Placement,
  useClick,
  useDismiss,
  useFloating,
  type UseFloatingReturn,
  useInteractions,
  useMergeRefs,
  useRole
} from '@floating-ui/react'
import { AnimatePresence, motion } from 'motion/react'

import { useComponentsProvider } from '../../providers/ComponentsProvider'
import type { ButtonProps } from '../Button'

type PopoverOptions = {
  initialOpen?: boolean
  placement?: Placement
  modal?: boolean
  open?: boolean
  onOpenChange?: (isOpen: boolean) => void
}

type PopoverContextType = PopoverOptions & {
  data: UseFloatingReturn
  interactions: ReturnType<typeof useInteractions>
}

type AsChild = {
  asChild?: ReactNode
}

type WithChildren = {
  children?: ReactNode
}

const PopoverContext = createContext({} as PopoverContextType)
const PopoverProvider: React.FC<PopoverContextType & WithChildren> = ({
  children,
  ...props
}) => (
  <PopoverContext.Provider value={props}>{children}</PopoverContext.Provider>
)
const usePopoverContext = (): PopoverContextType => useContext(PopoverContext)

export const Popover: React.FC<PopoverOptions & WithChildren> = ({
  initialOpen,
  open: controlledOpen = null,
  onOpenChange: setControlledOpen = null,
  placement,
  modal,
  children
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen ?? false)
  const open = controlledOpen ?? uncontrolledOpen
  const setOpen = setControlledOpen ?? setUncontrolledOpen
  const floating = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(4),
      autoPlacement({
        alignment: 'start',
        allowedPlacements: [
          'top',
          'top-start',
          'top-end',
          'bottom',
          'bottom-start',
          'bottom-end'
        ]
      })
    ]
  })
  const click = useClick(floating.context, {
    enabled: controlledOpen == null
  })
  const dismiss = useDismiss(floating.context)
  const role = useRole(floating.context)
  const interactions = useInteractions([click, dismiss, role])

  return (
    <PopoverProvider
      data={floating}
      interactions={interactions}
      modal={modal}
      open={open}
      onOpenChange={setOpen}
    >
      {children}
    </PopoverProvider>
  )
}

type PopoverTriggerProps = WithChildren & {
  asChild?: boolean
}
export const PopoverTrigger = forwardRef<
  HTMLElement,
  HTMLProps<HTMLElement> & PopoverTriggerProps
>(({ children, asChild = false, ...props }, propRef) => {
  const context = usePopoverContext()
  const { Button } = useComponentsProvider()
  // const childrenRef = (children as any).ref
  const ref = useMergeRefs([context.data.refs.setReference, propRef])
  if (asChild && isValidElement(children)) {
    return cloneElement(
      children,
      context.interactions.getReferenceProps({
        ref,
        ...props,
        ...children.props,
        'data-state': context.open ? 'open' : 'closed'
      })
    )
  }

  return (
    <Button
      ref={ref}
      type="button"
      data-state={context.open ? 'open' : 'closed'}
      {...context.interactions.getReferenceProps(props)}
    >
      {children}
    </Button>
  )
})
PopoverTrigger.displayName = 'PopoverTrigger'

export const PopoverContent = forwardRef<
  HTMLDivElement,
  HTMLProps<HTMLDivElement>
>(({ style, ...props }, propRef) => {
  const context = usePopoverContext()
  const ref = useMergeRefs([context.data.refs.setFloating, propRef])

  const variants = {
    hidden: {
      opacity: 0,
      scale: 0.98
    },
    visible: {
      y: '0',
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.14
      }
    },
    exit: {
      opacity: 0,
      scale: [1, 0.98],
      transition: {
        duration: 0.1
      }
    }
  }
  return (
    <AnimatePresence>
      {context.data.context.open && (
        <FloatingPortal>
          <FloatingFocusManager
            context={context.data.context}
            modal={context.modal}
          >
            <div
              ref={ref}
              style={{ ...context.data.floatingStyles, ...style }}
              {...context.interactions.getFloatingProps(props)}
            >
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
              >
                {props.children}
              </motion.div>
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </AnimatePresence>
  )
})
PopoverContent.displayName = 'PopoverContent'

export const PopoverClose = forwardRef<
  HTMLButtonElement,
  HTMLProps<HTMLButtonElement> & ButtonProps & AsChild
>(({ asChild, ...props }, propRef) => {
  const { Button } = useComponentsProvider()
  const { onOpenChange } = usePopoverContext()
  // const childrenRef = (props.children as any).ref
  // const ref = useMergeRefs([propRef, childrenRef])
  if (asChild && isValidElement(props.children)) {
    return cloneElement(props.children, {
      propRef,
      ...props,
      ...props.children.props,
      onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        props.onClick?.(event)
        if (onOpenChange) {
          onOpenChange(false)
        }
      }
    })
  }

  return (
    <Button
      ref={propRef}
      {...props}
      type="button"
      onClick={(event) => {
        props.onClick?.(event)
        if (onOpenChange) {
          onOpenChange(false)
        }
      }}
    />
  )
})
PopoverClose.displayName = 'PopoverClose'

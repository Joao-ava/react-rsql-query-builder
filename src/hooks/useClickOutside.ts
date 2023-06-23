import { RefObject, useEffect } from 'react'

type Handler = (event: MouseEvent) => void

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
  mouseEvent: 'mousedown' | 'mouseup' = 'mouseup',
) {
  useEffect(() => {
    const listener: Handler = event => {
      const el = ref?.current
      if (!el || el.contains(event.target as Node)) {
        return
      }

      handler(event)
    }
    document.addEventListener(mouseEvent, listener)

    return () => {
      document.removeEventListener(mouseEvent, listener)
    }
  }, [handler, mouseEvent, ref])
}

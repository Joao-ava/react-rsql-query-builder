export const joinClasses = (...classes: Array<string | undefined>) =>
  classes.filter((name) => !!name).join(' ')

export const splitClass = (className?: string): string[] =>
  className ? className.split(' ') : []

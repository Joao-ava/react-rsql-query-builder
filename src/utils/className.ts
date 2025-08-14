export const joinClasses = (...classes: Array<string | undefined>) =>
  classes.filter((name) => !!name).join(' ')

import type { Resource } from 'i18next'

export type AppTranslation = {
  add: string
  filters: string
  search: string
  cancel: string
  remove: string
  apply: string
  true: string
  false: string
  select: string
  operators: {
    equals: string
    notEquals: string
    moreThan: string
    moreThanOrEqual: string
    lessThan: string
    lessThanOrEqual: string
    in: string
    out: string
    contains: string
    notContains: string
  }
}

export interface NamespaceTranslations extends Resource {
  translation: AppTranslation
}

import type { Decorator } from '@storybook/react-vite'

export const WithLanguage: Decorator = (Story, context) => {
  const { locale } = context.globals
  return <Story args={{ ...context.args, language: locale }} />
}

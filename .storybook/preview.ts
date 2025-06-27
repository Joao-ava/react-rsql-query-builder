import type { Preview } from '@storybook/react-vite'
import { INITIAL_VIEWPORTS } from 'storybook/viewport'

import '../src/styles.css'
import { WithI18n } from '../src/storybook/withI18n'
import { ComponentsWrapper } from '../src/storybook/ComponentsWrapper'

const preview: Preview = {
  globalTypes: {
    locale: {
      name: 'Locale',
      description: 'Internationalization locale',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en', right: '🇺🇸', title: 'English' },
          { value: 'ptBr', right: '🇧🇷', title: 'Português' },
          { value: 'es', right: '🇪🇸', title: 'Español' }
        ],
        showName: true
      }
    }
  },
  decorators: [WithI18n, ComponentsWrapper],
  parameters: {
    viewport: {
      options: INITIAL_VIEWPORTS
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  },
  tags: ['autodocs']
}

export default preview

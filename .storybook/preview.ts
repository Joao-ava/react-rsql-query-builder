import type { Preview } from '@storybook/react-vite'
import { INITIAL_VIEWPORTS } from 'storybook/viewport'

import '../src/styles.css'

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
  initialGlobals: {
    locale: 'ptBr'
  },
  parameters: {
    viewport: {
      options: INITIAL_VIEWPORTS
    },
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

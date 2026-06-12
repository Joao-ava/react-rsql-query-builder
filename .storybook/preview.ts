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
          { value: 'en-US', right: '🇺🇸', title: 'English' },
          { value: 'pt-BR', right: '🇧🇷', title: 'Português' },
          { value: 'es-ES', right: '🇪🇸', title: 'Español' }
        ]
      }
    }
  },
  initialGlobals: {
    locale: 'pt-BR'
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

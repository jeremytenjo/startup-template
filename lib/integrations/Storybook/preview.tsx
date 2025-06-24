import React from 'react'
import { SnackbarProvider } from '@useweb/ui/Snackbar'
import Box from '@useweb/ui/Box'
import { configure } from '@storybook/test'
import type { Preview } from '@storybook/react'

import appConfig from '../../../app.config.js'

import StorybookTheme from './theme/storybookTheme.js'

configure({
  testIdAttribute: appConfig.devtools.playwright.testIdAttribute,
})

const preview: Preview = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
}

export default preview

export const decorators = [
  (Story) => {
    return (
      <>
        <StorybookTheme>
          <SnackbarProvider>
            <Box
              sx={{
                minHeight: '100vh',
              }}
            >
              <Story />
            </Box>
          </SnackbarProvider>
        </StorybookTheme>
      </>
    )
  },
]

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },

  viewport: {
    // https://mui.com/material-ui/customization/breakpoints/#default-breakpoints
    viewports: {
      mobile: {
        name: 'Mobile',
        styles: {
          width: '360px',
          height: '875px',
        },
      },
      tablet: {
        name: 'Tablet',
        styles: {
          width: '600px',
          height: '875px',
        },
      },
      macbookPro16: {
        name: 'Macbook Pro 16',
        styles: {
          width: '1920px',
          height: '900px',
        },
      },
    },
  },
}

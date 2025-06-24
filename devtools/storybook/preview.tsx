import React from 'react'
import { SnackbarProvider } from '@useweb/ui/Snackbar'
import Box from '@useweb/ui/Box'
import { configure } from '@storybook/test'

import appConfig from '../../app.config.js'
import Firebase from '../../src/lib/integrations/Google/Firebase/firebase.js'
import AuthUserSetter from '../../src/lib/integrations/Google/Firebase/auth/ui/AuthUserSetter/AuthUserSetter.js'

import StorybookTheme from './theme/storybookTheme.js'

configure({
  testIdAttribute: appConfig.devtools.playwright.testIdAttribute,
})

export const decorators = [
  (Story, metadata) => {
    const signInAs = metadata?.parameters?.signInAs
    const ignoreAuthUserSetter = metadata?.parameters?.ignoreAuthUserSetter

    return (
      <>
        <Firebase>
          <StorybookTheme>
            <SnackbarProvider>
              <Box
                sx={{
                  minHeight: '100vh',
                }}
              >
                <AuthUserSetter
                  signInAs={signInAs}
                  ignoreAuthUserSetter={ignoreAuthUserSetter}
                >
                  <Story />
                </AuthUserSetter>
              </Box>
            </SnackbarProvider>
          </StorybookTheme>
        </Firebase>
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

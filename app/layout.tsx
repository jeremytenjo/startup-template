import * as React from 'react'
import { SnackbarProvider } from '@useweb/ui/Snackbar'

import Theme from '../theme/theme.js'
import GlobalErrorLogger from '../lib/utils/loggers/logError/GlobalErrorLogger/GlobalErrorLogger.js'
import colors from '../theme/tokens/colors.js'

export const metadata = {
  viewport: 'initial-scale=1, maximum-scale=1, width=device-width',
  robots: 'index, follow',
  themeColor: colors.neutral[500],
  manifest: '/manifest.json',
  icons: {
    icon: '/images/logo/logo.svg',
    apple: '/images/logo/assets/apple/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <GlobalErrorLogger>
          <Theme>
            <SnackbarProvider>{children}</SnackbarProvider>
          </Theme>
        </GlobalErrorLogger>
      </body>
    </html>
  )
}

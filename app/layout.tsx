import * as React from 'react'
import { SnackbarProvider } from '@useweb/ui/Snackbar'
import type { Metadata } from 'next/dist/types'

import Theme from '../theme/theme.js'
import GlobalErrorLogger from '../lib/utils/loggers/logError/GlobalErrorLogger/GlobalErrorLogger.js'
import colors from '../theme/tokens/colors.js'
import RootLayout from '../lib/layouts/RootLayout/RootLayout.js'
import appConfig from '../app.config.js'

export const metadata: Metadata = {
  title: appConfig.siteInfo.name,
  viewport: 'initial-scale=1, maximum-scale=1, width=device-width',
  robots: 'index, follow',
  themeColor: colors.neutral[500],
  manifest: '/manifest.json',
  icons: {
    icon: '/images/logo/logo.svg',
    apple: '/images/logo/assets/apple/apple-touch-icon.png',
  },
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <RootLayout>
          <GlobalErrorLogger>
            <Theme>
              <SnackbarProvider>{children}</SnackbarProvider>
            </Theme>
          </GlobalErrorLogger>
        </RootLayout>
      </body>
    </html>
  )
}

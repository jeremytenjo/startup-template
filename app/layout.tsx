import * as React from 'react'
import { SnackbarProvider } from '@useweb/ui/Snackbar'
import type { Metadata, Viewport } from 'next/dist/types'

import Theme from '../lib/integrations/Useweb/theme/theme.js'
import colors from '../lib/integrations/Useweb/theme/tokens/colors.js'
import RootLayout from '../lib/layouts/RootLayout/RootLayout.js'
import { siteInfo } from '../data/_siteInfo/siteInfo.js'

export const metadata: Metadata = {
  title: siteInfo.name,
  robots: 'index, follow',
  manifest: '/manifest.json',
  icons: {
    icon: '/images/logo/logo.svg',
    apple: '/images/logo/assets/apple/apple-touch-icon.png',
  },
  openGraph: {
    title: siteInfo.name,
    description: siteInfo.description,
    type: 'website',
    url: siteInfo.domain,
    siteName: siteInfo.name,
    images: [
      {
        url: '/images/og/main.png',
        width: 1200,
        height: 630,
        alt: siteInfo.name,
      },
    ],
  },
  metadataBase: new URL(siteInfo.domain),
}

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  width: 'device-width',
  themeColor: colors.neutral[500],
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <Theme>
          <RootLayout>
            <SnackbarProvider>{children}</SnackbarProvider>
          </RootLayout>
        </Theme>
      </body>
    </html>
  )
}

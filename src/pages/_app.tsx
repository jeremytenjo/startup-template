import * as React from 'react'
import Head from 'next/head'
import { CacheProvider } from '@emotion/react'
import { SnackbarProvider } from '@useweb/ui/Snackbar'

import Theme from '../theme/theme.js'
import createEmotionCache from '../theme/UiTheme/utils/createEmotionCache.js'
import GlobalErrorLogger from '../lib/utils/loggers/logError/GlobalErrorLogger/GlobalErrorLogger.js'
import colors from '../theme/tokens/colors.js'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='initial-scale=1, maximum-scale=1, width=device-width'
        />
        {/* vercel staging sites will always have no index */}
        <meta name='robots' content='index, follow' />
        <meta name='theme-color' content={colors.neutral[500]} />
      </Head>

      <GlobalErrorLogger>
        <CacheProvider value={emotionCache}>
          <Theme>
            <SnackbarProvider>
              <Component {...pageProps} />
            </SnackbarProvider>
          </Theme>
        </CacheProvider>
      </GlobalErrorLogger>
    </>
  )
}

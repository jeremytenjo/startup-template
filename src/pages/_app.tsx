import * as React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { CacheProvider } from '@emotion/react'
import { SnackbarProvider } from '@useweb/ui/Snackbar'
import GoogleIdentityScript from '@useweb/google-identity-service/GoogleIdentityScript'

import ClickToComponent from '../lib/components/useweb/ClickToComponent/ClickToComponent.js'
import Theme from '../theme/theme.js'
import createEmotionCache from '../theme/UiTheme/utils/createEmotionCache.js'
import GoogleSearchConsole from '../lib/integrations/Google/GoogleSearchConsole/components/GoogleSearchConsole.js'
import Firebase from '../lib/integrations/Google/Firebase/firebase.js'
import FirebaseAnalytics from '../lib/integrations/Google/Firebase/analytics/FirebaseAnalytics/FirebaseAnalytics.js'
import GlobalErrorLogger from '../lib/utils/loggers/logError/GlobalErrorLogger/GlobalErrorLogger.js'
import colors from '../theme/tokens/colors.js'
import Prismic from '../lib/integrations/Prismic/Prismic.js'
import GoogleAds from '../lib/integrations/Google/GoogleAds/GoogleAds.js'
import AuthUserSetterMounter from '../lib/integrations/Google/Firebase/auth/ui/AuthUserSetter/AuthUserSetterMounter.js'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <>
      <ClickToComponent />
      <GoogleSearchConsole />
      <GoogleIdentityScript />
      <FirebaseAnalytics />
      <GoogleAds />

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
        <Firebase>
          <CacheProvider value={emotionCache}>
            <Theme>
              <SnackbarProvider>
                <Prismic>
                  <AuthUserSetterMounter />
                  <Component {...pageProps} />
                </Prismic>
              </SnackbarProvider>
            </Theme>
          </CacheProvider>
        </Firebase>
      </GlobalErrorLogger>
    </>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
}

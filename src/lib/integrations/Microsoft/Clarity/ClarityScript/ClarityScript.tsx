import React from 'react'
import Script from 'next/script'

import useAuth from '../../../../../data/users/utils/useAuth/useAuth.js'
import { clarityIdentify } from '../clarity.js'

const isProduction = process.env.NODE_ENV === 'production'

export default function ClarityScript() {
  const auth = useAuth()

  React.useEffect(() => {
    if (auth.user?.id && isProduction) {
      clarityIdentify()
    }
  }, [auth.user?.id])

  return isProduction ? (
    <>
      <Script
        id='clarity-script'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "hc4x2qbu1j");`,
        }}
      />
    </>
  ) : null
}

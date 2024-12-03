import React from 'react'

import googleAdsConfig from './googleAds.config.js'
import GoogleAdsHeadScript from './GoogleAdsHeadScript/GoogleAdsHeadScript.js'

export default function GoogleAds() {
  const addScript = process.env.NODE_ENV === 'production' && googleAdsConfig.clientCaPub

  return (
    <>{addScript && <GoogleAdsHeadScript clientCaPub={googleAdsConfig.clientCaPub} />}</>
  )
}

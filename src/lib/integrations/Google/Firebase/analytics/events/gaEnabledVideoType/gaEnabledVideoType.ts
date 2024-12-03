import assert from '@useweb/assert'

import firebaseAnalyticsLogger from '../_common/firebaseAnalyticsLogger/firebaseAnalyticsLogger.js'

export type GaEnableVideoTypeProps = {
  name: 'youtube video' | 'youtube short' | 'tiktok video' | 'freshcut video'
}

// track which video type is most popular
export default async function gaEnabledVideoType(props: GaEnableVideoTypeProps) {
  assert({ props })

  firebaseAnalyticsLogger({
    eventName: 'enabledVideoType',
    params: {
      name: props.name,
    },
  })
}

export type GaEnableVideoTypeReturn = ReturnType<typeof gaEnabledVideoType>

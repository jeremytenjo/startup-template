import { useEffect } from 'react'

import postHog from '../../../utils/postHog.js'

export default function usePostHogSendPageView() {
  useEffect(() => {
    postHog({
      eventName: '$pageview',
      data: {},
    })
  }, [])
}

export type UsePostHogSendPageViewReturn = ReturnType<typeof usePostHogSendPageView>

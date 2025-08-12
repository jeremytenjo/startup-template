'use client'
import React from 'react'
import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'

import posthogConfig from '../../posthog.config.js'
import enablePostHog from '../enablePostHog/enablePostHog.js'

export type PostHogProviderProps = {
  children: React.ReactNode
}

const enablePostHogValue = enablePostHog().enable

export default function PostHogProvider(props: PostHogProviderProps) {
  React.useEffect(() => {
    if (enablePostHogValue) {
      posthog.init(posthogConfig.id, {
        api_host: posthogConfig.initContig.api_host,
      })
    }
  }, [])

  if (!enablePostHogValue) {
    return <>{props.children}</>
  }

  return <PHProvider client={posthog}>{props.children}</PHProvider>
}

import { type PostHogConfig } from 'posthog-js'

export default {
  id: undefined,
  initContig: {
    api_host: 'https://app.posthog.com',
    autocapture: false,
    capture_pageleave: false,
    capture_pageview: false,
    disable_session_recording: true,
  } as PostHogConfig,
}

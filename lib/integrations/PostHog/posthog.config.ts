import { type PostHogConfig } from 'posthog-js'

export default {
  // eg phc_abcadfasd
  id: '',
  initContig: {
    api_host: 'https://us.i.posthog.com',
    autocapture: false,
  } as PostHogConfig,
}

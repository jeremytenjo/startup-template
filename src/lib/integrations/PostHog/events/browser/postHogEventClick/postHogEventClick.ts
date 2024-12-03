import assert from '@useweb/assert'

import postHog from '../../../postHog.js'

export type PostHogEventClickProps = { action: string; metadata?: any }

export default async function postHogEventClick(props: PostHogEventClickProps) {
  assert<PostHogEventClickProps>({ props, requiredProps: ['action'] })

  postHog({
    eventName: 'Click',
    data: {
      action: props.action,
      metadata: props.metadata || {},
    },
  })
}

export type PostHogEventClickReturn = ReturnType<typeof postHogEventClick>

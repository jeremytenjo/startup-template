import posthogJs from 'posthog-js'
import assert from '@useweb/assert'

import enablePostHog from './enablePostHog/enablePostHog.js'

// https://posthog.com/docs/data/events#default-events-and-properties
export default function postHog(props: { eventName: string; data: any }) {
  assert({ props, requiredProps: ['eventName', 'data'] })

  if (enablePostHog().enable) {
    // const signedInUser: UserSchema = vanillaAuthStore?.getState()?.user
    posthogJs.capture(props.eventName, {
      ...props.data,
      // uid: signedInUser?.id,
      // used to identify user in posthog
      // https://posthog.com/docs/getting-started/user-properties#how-to-set-user-properties
      // $set: signedInUser,
    })
  }
}

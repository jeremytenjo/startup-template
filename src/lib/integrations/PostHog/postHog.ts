import posthogJs from 'posthog-js'
import assert from '@useweb/assert'
import { vanillaAuthStore } from '@useweb/firebase/useFirebaseAuth'

import type UserSchema from '../../../data/users/user.schema.js'

import posthogConfig from './posthog.config.js'

if (typeof window !== 'undefined' && posthogConfig.id) {
  posthogJs.init(posthogConfig.id, posthogConfig.initContig),
    {
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') {
          posthog.debug()
        }
      },
    }
}

export { posthogJs }

// https://posthog.com/docs/data/events#default-events-and-properties
export default function postHog(props: { eventName: string; data: any }) {
  assert({ props, requiredProps: ['eventName', 'data'] })

  if (process.env.NODE_ENV === 'development' || !posthogConfig.id) {
    return
  }

  const signedInUser: UserSchema = vanillaAuthStore?.getState()?.user

  posthogJs.capture(props.eventName, {
    ...props.data,
    uid: signedInUser?.id,
    // used to identify user in posthog
    // https://posthog.com/docs/getting-started/user-properties#how-to-set-user-properties
    $set: signedInUser,
  })
}

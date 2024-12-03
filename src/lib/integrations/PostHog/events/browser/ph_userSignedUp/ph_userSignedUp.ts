import assert from '@useweb/assert'

import type UserSchema from '../../../../../../data/users/user.schema.js'

import postHog from '@/src/lib/integrations/PostHog/postHog'

export type PH_UserSignedUpProps = { newUser: UserSchema }

export default async function ph_userSignedUp(props: PH_UserSignedUpProps) {
  assert<PH_UserSignedUpProps>({
    props,
    requiredProps: ['newUser'],
  })

  postHog({
    eventName: 'user_signed_up',
    data: {
      ...props.newUser,
      metadata: { ...props.newUser },
    },
  })
}

export type PH_UserSignedUpReturn = ReturnType<typeof ph_userSignedUp>

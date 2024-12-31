import assert from '@useweb/assert'

import nodePostHog from '../../../nodePostHog/nodePostHog.js'
import type UserSchema from '../../../../../../data/users/user.schema.js'

export type PH_UserDeactivatedAccountProps = { uid: UserSchema['id'] }

export default function ph_userDeactivatedAccount(props: PH_UserDeactivatedAccountProps) {
  assert<PH_UserDeactivatedAccountProps>({
    props,
    requiredProps: ['uid'],
  })

  nodePostHog({
    eventName: 'user_deactivated_account',
    data: {
      metadata: {
        ...props,
      },
    },
  })
}

export type PH_UserDeactivatedAccountReturn = ReturnType<typeof ph_userDeactivatedAccount>

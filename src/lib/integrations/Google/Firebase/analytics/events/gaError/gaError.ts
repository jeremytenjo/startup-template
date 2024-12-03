import assert from '@useweb/assert'

import firebaseAnalyticsLogger from '../_common/firebaseAnalyticsLogger/firebaseAnalyticsLogger.js'
import type UserSchema from '../../../../../../../data/users/user.schema.js'

export type GaErrorProps = {
  user: UserSchema
  fnName: string
  description: string
  fatal?: boolean
}

export default async function gaError(props: GaErrorProps) {
  assert({ props, requiredProps: ['description', 'fnName'] })

  firebaseAnalyticsLogger({
    eventName: 'exception',
    params: {
      userId: props.user?.id,
      userName: props.user?.displayName,
      description: props.description,
      fatal: Boolean(props.fatal),
      functionName: props.fnName,
    },
  })
}

export type GaErrorReturn = ReturnType<typeof gaError>

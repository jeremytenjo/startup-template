import useAsync from '@useweb/use-async'

import type { FinishCreatingConnectedAccountReturn } from '../../finishCreatingConnectedAccount.client.js'
import finishCreatingConnectedAccountClient from '../../finishCreatingConnectedAccount.client.js'
import logError from '../../../../../lib/utils/loggers/logError/logError.js'
import type UserSchema from '../../../../../data/users/user.schema.js'
import useAuth from '../../../../../data/users/utils/useAuth/useAuth.js'
import {
  getRefreshUrl,
  getReturnUrl,
} from '../../../../../lib/integrations/Stripe/utils/stripe.utils.config.js'

export type UseFinishCreatingConnectedAccountProps = {
  userToCreateAccount: UserSchema
}

export async function finishCreatingConnectedAccount(
  props: UseFinishCreatingConnectedAccountProps,
) {
  const res = await finishCreatingConnectedAccountClient({
    userToCreateAccount: props.userToCreateAccount,
    refreshUrl: getRefreshUrl(),
    returnUrl: getReturnUrl(),
  })

  window.location.href = res.data.accountLink.url

  return res.data
}

export default function useFinishCreatingConnectedAccount(
  props: UseFinishCreatingConnectedAccountProps,
) {
  const auth = useAuth()

  const _finishCreatingConnectedAccount = useAsync<
    UseFinishCreatingConnectedAccountProps,
    FinishCreatingConnectedAccountReturn
  >({
    fn: async (execProps = props) => {
      if (!auth.user?.id) {
        throw new Error('User is not logged in')
      }

      if (auth.user?.accountType === 'developer') {
        throw new Error("Developer can't complete connected accounts")
      }

      return await finishCreatingConnectedAccount(execProps)
    },
    onError({ error, fnProps }) {
      logError({
        error,
        fnName: 'useFinishCreatingConnectedAccount',
        metadata: { props, fnProps, error },
      })
    },
  })

  return _finishCreatingConnectedAccount
}

export type UseFinishCreatingConnectedAccountReturn = ReturnType<
  typeof useFinishCreatingConnectedAccount
>

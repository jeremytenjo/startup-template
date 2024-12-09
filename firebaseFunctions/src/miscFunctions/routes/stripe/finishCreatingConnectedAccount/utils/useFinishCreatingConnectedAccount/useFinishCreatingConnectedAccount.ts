import useAsync from '@useweb/use-async'

import {
  getRefreshUrl,
  getReturnUrl,
} from '../../../../../../../../src/lib/integrations/Stripe/utils/stripe.utils.config.js'
import type UserSchema from '../../../../../../../../src/data/users/user.schema.js'
import useAuth from '../../../../../../../../src/data/users/utils/useAuth/useAuth.js'
import logError from '../../../../../../../../src/lib/utils/loggers/logError/logError.js'
import type { FinishCreatingConnectedAccountReturn } from '../../finishCreatingConnectedAccount.js'
import finishCreatingConnectedAccount from '../../finishCreatingConnectedAccount.js'

export type UseFinishCreatingConnectedAccountProps = {
  userToCreateAccount: UserSchema
}

export async function usefinishCreatingConnectedAccount(
  props: UseFinishCreatingConnectedAccountProps,
) {
  const res = await finishCreatingConnectedAccount({
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

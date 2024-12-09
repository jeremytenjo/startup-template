import useAsync from '@useweb/use-async'
import { updateUserData } from '@useweb/firebase/useFirebaseAuth'

import type { CreateConnectedAccountReturn } from '../../createConnectedAccount.client.js'
import createConnectedAccountClient from '../../createConnectedAccount.client.js'
import {
  getRefreshUrl,
  getReturnUrl,
} from '../../../../../../../../src/lib/integrations/Stripe/utils/stripe.utils.config.js'
import type UserSchema from '../../../../../../../../src/data/users/user.schema.js'
import useAuth from '../../../../../../../../src/data/users/utils/useAuth/useAuth.js'
import logError from '../../../../../../../../src/lib/utils/loggers/logError/logError.js'

export type UseCreateConnectedAccountProps = { userToCreateAccount: UserSchema }

export async function createStripeConnectedAccount(
  props: UseCreateConnectedAccountProps,
) {
  const res = await createConnectedAccountClient({
    userToCreateAccount: props.userToCreateAccount,
    refreshUrl: getRefreshUrl(),
    returnUrl: getReturnUrl(),
  })

  if (!res.data?.createdConnectedAccount?.id) {
    throw new Error('Failed to create connected account')
  }

  await updateUserData<UserSchema>({
    updatedData: {
      stripeConnectedAccountId: res.data.createdConnectedAccount.id,
    },
    uid: props.userToCreateAccount.id,
  })

  window.location.href = res.data.accountLink.url

  return res.data
}

export default function useCreateStripeConnectedAccount(
  props: UseCreateConnectedAccountProps,
) {
  const auth = useAuth()

  const _createConnectedAccount = useAsync<
    UseCreateConnectedAccountProps,
    CreateConnectedAccountReturn
  >({
    fn: async (execProps = props) => {
      if (!auth.user?.id) {
        throw new Error('User is not logged in')
      }

      return createStripeConnectedAccount(execProps)
    },
    onError({ error, fnProps }) {
      logError({
        error,
        fnName: 'useCreateStripeConnectedAccount',
        metadata: { props, fnProps },
      })
    },
  })

  return _createConnectedAccount
}

export type UseCreateConnectedAccountReturn = ReturnType<
  typeof useCreateStripeConnectedAccount
>

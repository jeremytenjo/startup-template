import useAsync from '@useweb/use-async'
import { updateUserData } from '@useweb/firebase/useFirebaseAuth'

import type UserSchema from '../../../../../data/users/user.schema.js'
import type { CreateConnectedAccountReturn } from '../../createConnectedAccount.client.js'
import createConnectedAccountClient from '../../createConnectedAccount.client.js'
import logError from '../../../../../lib/utils/loggers/logError/logError.js'
import useAuth from '../../../../../data/users/utils/useAuth/useAuth.js'
import {
  getRefreshUrl,
  getReturnUrl,
} from '../../../../../lib/integrations/Stripe/utils/stripe.utils.config.js'

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

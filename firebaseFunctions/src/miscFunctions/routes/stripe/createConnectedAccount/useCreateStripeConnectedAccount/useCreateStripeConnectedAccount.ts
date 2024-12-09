import useAsync from '@useweb/use-async'
import { refetchFirestoreUser } from '@useweb/firebase/useFirebaseAuth'

import {
  getRefreshUrl,
  getReturnUrl,
} from '../../../../../../../src/lib/integrations/Stripe/utils/stripe.utils.config.js'
import type UserSchema from '../../../../../../../src/data/users/user.schema.js'
import useAuth from '../../../../../../../src/data/users/utils/useAuth/useAuth.js'
import logError from '../../../../../../../src/lib/utils/loggers/logError/logError.js'
import miscFunctionsClient from '../../../../miscFunctions.client.js'
import type {
  API_CreateConnectedAccountProps,
  CreateConnectedAccountReturn,
} from '../createConnectedAccount.js'

export type UseCreateConnectedAccountProps = { userToCreateAccount: UserSchema }

export async function createStripeConnectedAccount(
  props: UseCreateConnectedAccountProps,
) {
  const res = await miscFunctionsClient<API_CreateConnectedAccountProps>({
    api: {
      route: 'routes/createConnectedAccount',
      payload: {
        userToCreateAccount: props.userToCreateAccount,
        refreshUrl: getRefreshUrl(),
        returnUrl: getReturnUrl(),
      },
    },
  })

  if (!res.data?.[0]?.createdConnectedAccount?.id) {
    throw new Error('Failed to create connected account')
  }

  await refetchFirestoreUser()

  window.location.href = res.data?.[0].accountLink.url

  return res.data
}

export default function useCreateStripeConnectedAccount(
  props: UseCreateConnectedAccountProps,
) {
  const auth = useAuth()

  const _createConnectedAccount = useAsync<
    UseCreateConnectedAccountProps,
    Awaited<CreateConnectedAccountReturn>['data']
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

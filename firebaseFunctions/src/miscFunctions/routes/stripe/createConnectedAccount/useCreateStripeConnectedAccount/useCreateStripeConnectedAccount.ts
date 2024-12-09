import { refetchFirestoreUser } from '@useweb/firebase/useFirebaseAuth'

import type UserSchema from '../../../../../../../src/data/users/user.schema.js'
import type { API_CreateConnectedAccountProps } from '../createConnectedAccount.js'
import useStripeUtilsConfig from '../../../../../../../src/lib/integrations/Stripe/utils/useStripeUtilsConfig/useStripeUtilsConfig'
import { useMiscFunctionsClient } from '../../../../utils/useMiscFunctionsClient/useMiscFunctionsClient'

export type UseCreateConnectedAccountProps = { userToCreateAccount: UserSchema }

export default function useCreateStripeConnectedAccount(
  props: UseCreateConnectedAccountProps,
) {
  const stripeConfig = useStripeUtilsConfig()

  const createStripeConnectedAccount =
    useMiscFunctionsClient<API_CreateConnectedAccountProps>({
      api: {
        route: 'routes/createConnectedAccount',
        payload: {
          refreshUrl: stripeConfig.refreshUrl,
          returnUrl: stripeConfig.returnUrl,
          userToCreateAccount: props.userToCreateAccount,
        },
      },
      options: {
        onResult: async (p) => {
          if (!p.result.data?.[0]?.createdConnectedAccount?.id) {
            throw new Error('Failed to create connected account')
          }

          await refetchFirestoreUser()

          window.location.href = p.result.data?.[0].accountLink.url
        },
      },
    })

  return createStripeConnectedAccount
}

export type UseCreateConnectedAccountReturn = ReturnType<
  typeof useCreateStripeConnectedAccount
>

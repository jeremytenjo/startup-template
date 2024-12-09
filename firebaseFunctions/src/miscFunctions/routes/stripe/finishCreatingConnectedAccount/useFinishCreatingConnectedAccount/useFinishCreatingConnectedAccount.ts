import type UserSchema from '../../../../../../../src/data/users/user.schema.js'
import {
  getRefreshUrl,
  getReturnUrl,
} from '../../../../../../../src/lib/integrations/Stripe/utils/stripe.utils.config.js'
import { useMiscFunctionsClient } from '../../../../utils/useMiscFunctionsClient/useMiscFunctionsClient.js'
import type { API_FinishCreatingConnectedAccountProps } from '../finishCreatingConnectedAccount.js'

export type UseFinishCreatingConnectedAccountProps = {
  userToCreateAccount: UserSchema
}

export default function useFinishCreatingConnectedAccount(
  props: UseFinishCreatingConnectedAccountProps,
) {
  const finishCreatingConnectedAccount =
    useMiscFunctionsClient<API_FinishCreatingConnectedAccountProps>({
      api: {
        route: 'routes/finishCreatingConnectedAccount',
        payload: {
          refreshUrl: getRefreshUrl(),
          returnUrl: getReturnUrl(),
          userToCreateAccount: props.userToCreateAccount,
        },
      },
    })

  return finishCreatingConnectedAccount
}

export type UseFinishCreatingConnectedAccountReturn = ReturnType<
  typeof useFinishCreatingConnectedAccount
>

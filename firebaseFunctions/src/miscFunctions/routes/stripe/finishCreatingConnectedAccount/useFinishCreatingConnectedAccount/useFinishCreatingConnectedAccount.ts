import { useEffect } from 'react'
import type UserSchema from '../../../../../../../src/data/users/user.schema.js'
import {
  connetetedAccountUrlQuery,
  ConnetetedAccountUrlQueryNames,
  getRefreshUrl,
  getReturnUrl,
} from '../../../../../../../src/lib/integrations/Stripe/utils/stripe.utils.config.js'
import { useMiscFunctionsClient } from '../../../../utils/useMiscFunctionsClient/useMiscFunctionsClient.js'
import type { API_FinishCreatingConnectedAccountProps } from '../finishCreatingConnectedAccount.js'
import { useRouter } from 'next/router'
import useStripeUtilsConfig from '../../../../../../../src/lib/integrations/Stripe/utils/useStripeUtilsConfig/useStripeUtilsConfig'

export type UseFinishCreatingConnectedAccountProps = {
  userToCreateAccount: UserSchema
}

export default function useFinishCreatingConnectedAccount(
  props: UseFinishCreatingConnectedAccountProps,
) {
  const router = useRouter()
  const stripeConfig = useStripeUtilsConfig()

  const finishCreatingConnectedAccount =
    useMiscFunctionsClient<API_FinishCreatingConnectedAccountProps>({
      api: {
        route: 'routes/finishCreatingConnectedAccount',
        payload: {
          refreshUrl: stripeConfig.refreshUrl,
          returnUrl: stripeConfig.returnUrl,
          userToCreateAccount: props.userToCreateAccount,
        },
      },
    })

  const stripeConnectedAccountQuery: ConnetetedAccountUrlQueryNames = router.query[
    connetetedAccountUrlQuery.queryName
  ] as any

  useEffect(() => {
    if (stripeConnectedAccountQuery) {
      if (stripeConnectedAccountQuery === 'refreshUrl' && props.userToCreateAccount) {
        finishCreatingConnectedAccount.exec()
      }
    }
  }, [stripeConnectedAccountQuery, props.userToCreateAccount])

  return finishCreatingConnectedAccount
}

export type UseFinishCreatingConnectedAccountReturn = ReturnType<
  typeof useFinishCreatingConnectedAccount
>

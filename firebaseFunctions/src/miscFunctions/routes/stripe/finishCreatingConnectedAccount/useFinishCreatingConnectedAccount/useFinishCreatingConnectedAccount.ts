import { useEffect } from 'react'
import { useRouter } from 'next/router'

import type UserSchema from '../../../../../../../src/data/users/user.schema.js'
import type {
  ConnetetedAccountUrlQueryNames} from '../../../../../../../src/lib/integrations/Stripe/utils/stripe.utils.config.js';
import {
  connetetedAccountUrlQuery
} from '../../../../../../../src/lib/integrations/Stripe/utils/stripe.utils.config.js'
import { useMiscFunctionsClient } from '../../../../utils/useMiscFunctionsClient/useMiscFunctionsClient.js'
import type { API_FinishCreatingConnectedAccountProps } from '../finishCreatingConnectedAccount.js'
import useStripeUtilsConfig from '../../../../../../../src/lib/integrations/Stripe/utils/useStripeUtilsConfig/useStripeUtilsConfig.js'

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
      options: {
        onResult: async (p) => {
          window.location.href = p.result.data?.[0].accountLink.url
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

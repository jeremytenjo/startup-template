import useAuth from '../../../../../../../src/data/users/utils/useAuth/useAuth.js'
import useMiscFunctionsPersist from '../../../../utils/useMiscFunctionsPersist/useMiscFunctionsPersist.js'
import type { API_GetStripeConnectedAccountDashboardLinkProps } from '../getStripeConnectedAccountDashboardLink.js'

export default function useGetStripeConnectedAccountDashboardLink() {
  const auth = useAuth()

  const stripeAccountDashboardLink =
    useMiscFunctionsPersist<API_GetStripeConnectedAccountDashboardLinkProps>({
      currentUser: auth.user,
      id: auth.user?.stripeConnectedAccountId || undefined,
      api: {
        route: 'routes/getStripeConnectedAccountDashboardLink',
        payload: {
          connectedAccountId: auth.user.stripeConnectedAccountId || '',
        },
      },
    })

  return stripeAccountDashboardLink
}

export type UseGetStripeConnectedAccountDashboardLinkReturn = ReturnType<
  typeof useGetStripeConnectedAccountDashboardLink
>

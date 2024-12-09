import useData from '@useweb/use-data'

import logError from '../../../lib/utils/loggers/logError/logError.js'

import type {
  GetStripeConnectedAccountDashboardLinkProps,
  GetStripeConnectedAccountDashboardLinkReturn,
} from './getStripeConnectedAccountDashboardLink.raw.js'

import nextApi from '@/src/lib/utils/nextjs/nextApi/nextApi'

export type {
  GetStripeConnectedAccountDashboardLinkProps,
  GetStripeConnectedAccountDashboardLinkReturn,
}

export default async function getStripeConnectedAccountDashboardLinkClient(
  props: GetStripeConnectedAccountDashboardLinkProps,
) {
  const res = await nextApi<
    GetStripeConnectedAccountDashboardLinkReturn,
    GetStripeConnectedAccountDashboardLinkProps
  >({
    name: 'stripe/getStripeConnectedAccountDashboardLink',
    payload: props,
  })

  if (res.error) {
    throw new Error(res.error)
  }

  return res
}

export const useGetStripeConnectedAccountDashboardLink = (props: {
  connectedAccountId: string | undefined
}) => {
  const stripeConnectedAccountDashboardLink = useData<
    GetStripeConnectedAccountDashboardLinkReturn,
    GetStripeConnectedAccountDashboardLinkProps
  >({
    id: props.connectedAccountId
      ? `stripeConnectedAccountDashboardLink/${props.connectedAccountId}`
      : undefined,
    get: {
      fetcher: async () => {
        if (!props.connectedAccountId) {
          throw new Error('props.connectedAccountId is undefined')
        }

        const link = await getStripeConnectedAccountDashboardLinkClient({
          connectedAccountId: props.connectedAccountId,
        })

        return [link.data]
      },
      onGetError({ error }) {
        logError({
          error,
          fnName: 'useGetStripeConnectedAccountDashboardLink',
          metadata: { props },
        })
      },
    },
  })

  return stripeConnectedAccountDashboardLink
}

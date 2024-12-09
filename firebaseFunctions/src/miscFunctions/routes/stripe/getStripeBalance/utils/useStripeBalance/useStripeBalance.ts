import useData from '@useweb/use-data'

import getStripeBalanceClient, {
  type GetStripeBalanceProps,
  type GetStripeBalanceReturn,
} from '../../getStripeBalance.client.js'
import logError from '../../../../../lib/utils/loggers/logError/logError.js'

export type UseStripeBalanceProps = {
  connectedAccountId: GetStripeBalanceProps['connectedAccountId'] | undefined
}

export const getUseStripeBalanceDataId = (props: UseStripeBalanceProps) => {
  return `stripeBalance/${props.connectedAccountId}`
}

export default function useStripeBalance(props: UseStripeBalanceProps) {
  const stripeBalance = useData<GetStripeBalanceReturn>({
    id: props.connectedAccountId ? getUseStripeBalanceDataId(props) : undefined,
    get: {
      fetcher: async () => {
        if (!props.connectedAccountId) {
          throw new Error('props.connectedAccountId is undefined')
        }

        const res = await getStripeBalanceClient({
          connectedAccountId: props.connectedAccountId,
        })

        if (res.data) {
          return [res.data]
        }

        return []
      },
      onGetError({ error }) {
        logError({
          error,
          fnName: 'useStripeBalance',
          metadata: { props },
        })
      },
    },
  })

  return stripeBalance
}

export type UseStripeBalanceReturn = ReturnType<typeof useStripeBalance>

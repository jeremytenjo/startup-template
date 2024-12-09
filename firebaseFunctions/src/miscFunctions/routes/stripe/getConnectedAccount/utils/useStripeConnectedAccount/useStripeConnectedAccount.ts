import useData from '@useweb/use-data'
import logError from '@/src/lib/utils/loggers/logError/logError'

import getConnectedAccountClient, {
  type GetConnectedAccountProps,
  type GetConnectedAccountReturn,
} from '../../getConnectedAccount.client.js'

export type UseConnectedAccountProps = Partial<GetConnectedAccountProps>

export const getUseStripeConnectedAccountDataId = (props: UseConnectedAccountProps) => {
  return props.connectedAccountId
    ? `useStripeConnectedAccount/${props.connectedAccountId}`
    : undefined
}

export default function useStripeConnectedAccount(props: UseConnectedAccountProps) {
  const useCreatedAccount = useData<
    Awaited<GetConnectedAccountReturn>,
    GetConnectedAccountProps
  >({
    id: getUseStripeConnectedAccountDataId(props),
    get: {
      fetcher: async () => {
        const useCreatedAccountRes = await getConnectedAccountClient(
          props as GetConnectedAccountProps,
        )

        if (useCreatedAccountRes.data.connectedAccount) {
          return [useCreatedAccountRes.data]
        }

        return []
      },
      onGetError({ error }) {
        logError({
          error,
          fnName: 'useStripeConnectedAccount',
          metadata: { props },
        })
      },
    },
  })

  return useCreatedAccount
}

export type UseConnectedAccountReturn = ReturnType<typeof useStripeConnectedAccount>

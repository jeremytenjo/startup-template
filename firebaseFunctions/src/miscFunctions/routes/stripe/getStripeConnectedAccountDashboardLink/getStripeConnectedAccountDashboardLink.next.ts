import type { NextApiRequest } from 'next'

import getStripeConnectedAccountDashboardLink, {
  type GetStripeConnectedAccountDashboardLinkProps,
} from './getStripeConnectedAccountDashboardLink.raw.js'

export type GetStripeConnectedAccountDashboardLinkNextProps = {
  req?: NextApiRequest
  body: GetStripeConnectedAccountDashboardLinkProps
}

export default async function getStripeConnectedAccountDashboardLink_next(
  props: GetStripeConnectedAccountDashboardLinkNextProps,
) {
  try {
    const data = await getStripeConnectedAccountDashboardLink({
      ...props.body,
    })

    return data
  } catch (error: any) {
    throw new Error(error, {
      cause: error?.cause || {},
    })
  }
}

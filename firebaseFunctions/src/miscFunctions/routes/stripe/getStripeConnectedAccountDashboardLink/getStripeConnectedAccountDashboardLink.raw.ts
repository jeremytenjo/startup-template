import assert from '@useweb/assert'
import type Stripe from 'stripe'

import getStripe from '../../../lib/integrations/Stripe/utils/getStripe/getStripe.js'

export type GetStripeConnectedAccountDashboardLinkProps = {
  connectedAccountId: string
}

export type GetStripeConnectedAccountDashboardLinkReturn = {
  dashboardLink: Stripe.Response<Stripe.LoginLink>
  id: string
}

export default async function getStripeConnectedAccountDashboardLink(
  props: GetStripeConnectedAccountDashboardLinkProps,
): Promise<GetStripeConnectedAccountDashboardLinkReturn> {
  assert<GetStripeConnectedAccountDashboardLinkProps>({
    props,
    requiredProps: ['connectedAccountId'],
  })

  const { stripe } = getStripe()

  const dashboardLink = await stripe.accounts.createLoginLink(props.connectedAccountId)

  if (!dashboardLink?.url) {
    throw new Error('dashboardLink?.url is undefined')
  }

  return {
    dashboardLink,
    id: props.connectedAccountId,
  }
}

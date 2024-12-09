import assert from '@useweb/assert'
import type { CallableRequest } from 'firebase-functions/v2/https'
import logger from 'firebase-functions/logger'
import type Stripe from 'stripe'

import type UserSchema from '../../../../../../src/data/users/user.schema.js'
import getStripe from '../../../../../../src/lib/integrations/Stripe/utils/getStripe/getStripe.js'

export const routeId = 'routes/finishCreatingConnectedAccount'

export type API_FinishCreatingConnectedAccountProps = {
  route: typeof routeId
  authUser: CallableRequest['auth']
  payload: {
    userToCreateAccount: UserSchema
    refreshUrl: string
    returnUrl: string
  }
  return: Awaited<FinishCreatingConnectedAccountReturn>
}

export type FinishCreatingConnectedAccountPropsInternal = Omit<
  API_FinishCreatingConnectedAccountProps,
  'route' | 'return'
>

export default async function finishCreatingConnectedAccount(
  props: FinishCreatingConnectedAccountPropsInternal,
): FinishCreatingConnectedAccountReturn {
  logger.info(`START: ${routeId}`, { props })

  assert<FinishCreatingConnectedAccountPropsInternal>({
    props,
    requiredProps: ['payload'],
  })
  assert<API_FinishCreatingConnectedAccountProps['payload']>({
    props: props.payload,
    requiredProps: ['userToCreateAccount'],
  })

  if (!props.payload.userToCreateAccount.stripeConnectedAccountId) {
    throw new Error(
      `${props.payload.userToCreateAccount.displayName} doesn't have a stripeConnectedAccountId`,
    )
  }

  const { stripe } = getStripe()

  const accountLink = await stripe.accountLinks.create({
    type: 'account_onboarding',
    account: props.payload.userToCreateAccount.stripeConnectedAccountId,
    refresh_url: props.payload.refreshUrl,
    return_url: props.payload.returnUrl,
  })

  const response: Awaited<FinishCreatingConnectedAccountReturn> = {
    data: [
      {
        id: accountLink.url,
        accountLink,
      },
    ],
  }

  logger.info(`END: ${routeId}`, { response })

  return response
}

export type FinishCreatingConnectedAccountReturn = Promise<{
  data: {
    id: string
    accountLink: Stripe.Response<Stripe.AccountLink>
  }[]
}>

import assert from '@useweb/assert'
import type Stripe from 'stripe'

import getStripe from '../../../lib/integrations/Stripe/utils/getStripe/getStripe.js'
import type UserSchema from '../../../data/users/user.schema.js'

export type FinishCreatingConnectedAccountProps = {
  userToCreateAccount: UserSchema
  refreshUrl: string
  returnUrl: string
}

export type FinishCreatingConnectedAccountReturn = {
  accountLink: Stripe.Response<Stripe.AccountLink>
}

export default async function finishCreatingConnectedAccount(
  props: FinishCreatingConnectedAccountProps,
): Promise<FinishCreatingConnectedAccountReturn> {
  assert<FinishCreatingConnectedAccountProps>({
    props,
    requiredProps: ['userToCreateAccount'],
  })

  if (!props.userToCreateAccount.stripeConnectedAccountId) {
    throw new Error(
      `${props.userToCreateAccount.displayName} doesn't have a stripeConnectedAccountId`,
    )
  }

  const { stripe } = getStripe()

  const accountLink = await stripe.accountLinks.create({
    type: 'account_onboarding',
    account: props.userToCreateAccount.stripeConnectedAccountId,
    refresh_url: props.refreshUrl,
    return_url: props.returnUrl,
  })

  return {
    accountLink,
  }
}

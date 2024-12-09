import assert from '@useweb/assert'
import type { CallableRequest } from 'firebase-functions/v2/https'
import logger from 'firebase-functions/logger'
import type Stripe from 'stripe'

import type UserSchema from '../../../../../../src/data/users/user.schema.js'
import getStripe from '../../../../../../src/lib/integrations/Stripe/utils/getStripe/getStripe.js'
import appConfig from '../../../../../../app.config.js'
import ph_sellerAddedBankAccount from '../../../../../../src/lib/integrations/PostHog/events/node/ph_sellerAddedBankAccount.ts/ph_sellerAddedBankAccount.js'

export const routeId = 'routes/createConnectedAccount'

export type API_CreateConnectedAccountProps = {
  route: typeof routeId
  authUser: CallableRequest['auth']
  payload: {
    refreshUrl: string
    returnUrl: string
    userToCreateAccount: UserSchema
  }
  return: Awaited<CreateConnectedAccountReturn>
}

export type CreateConnectedAccountPropsInternal = Omit<
  API_CreateConnectedAccountProps,
  'route' | 'return'
>

export default async function createConnectedAccount(
  props: CreateConnectedAccountPropsInternal,
): CreateConnectedAccountReturn {
  logger.info(`START: ${routeId}`, { props })

  assert<CreateConnectedAccountPropsInternal>({
    props,
    requiredProps: ['payload'],
  })
  assert<API_CreateConnectedAccountProps['payload']>({
    props: props.payload,
    requiredProps: ['refreshUrl', 'returnUrl', 'userToCreateAccount'],
  })

  const { stripe } = getStripe()

  // returns minimum data, use getConnectedAccount if you need all the data
  const createdConnectedAccount = await stripe.accounts.create({
    type: 'express',
    business_type: 'individual',
    business_profile: {
      url: `${appConfig.siteInfo.domain}/user/${props.payload.userToCreateAccount.displayName}`,
    },
    settings: {
      payouts: {
        schedule: {
          // https://stripe.com/docs/api/accounts/create#create_account-settings-payouts-schedule-delay_days
          interval: 'daily',
          delay_days: 2,
        },
      },
    },
  })

  const accountLink = await stripe.accountLinks.create({
    type: 'account_onboarding',
    account: createdConnectedAccount.id,
    refresh_url: props.payload.refreshUrl,
    return_url: props.payload.returnUrl,
  })

  try {
    ph_sellerAddedBankAccount({
      user: props.payload.userToCreateAccount,
      source: 'stripe',
    })
  } catch (error) {}

  const response: Awaited<CreateConnectedAccountReturn> = {
    data: [{ accountLink, createdConnectedAccount }],
  }

  logger.info(`END: ${routeId}`, { response })

  return response
}

export type CreateConnectedAccountReturn = Promise<{
  data: {
    accountLink: Stripe.Response<Stripe.AccountLink>
    createdConnectedAccount: Stripe.Response<Stripe.Account>
  }[]
}>

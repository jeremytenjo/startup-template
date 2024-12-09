import assert from '@useweb/assert'

import type { MiscFunctionsProps, MiscFunctionsReturn } from '../miscFunctions.js'

// users
import * as deactivateAccount from './users/deactivateAccount/deactivateAccount.js'
// stripe
import * as createConnectedAccount from './stripe/createConnectedAccount/createConnectedAccount.js'
import * as deleteStripeAccount from './stripe/deleteStripeAccount/deleteStripeAccount.js'
import * as finishCreatingConnectedAccount from './stripe/finishCreatingConnectedAccount/finishCreatingConnectedAccount.js'
import * as getConnectedAccount from './stripe/getConnectedAccount/getConnectedAccount.js'
import * as getStripeBalance from './stripe/getStripeBalance/getStripeBalance.js'
import * as getStripeConnectedAccountDashboardLink from './stripe/getStripeConnectedAccountDashboardLink/getStripeConnectedAccountDashboardLink.js'

import type { ApiRouteSchema } from '@/firebaseFunctions/src/utils/useApiRouteData/useApiRouteData.js'

export type MiscFunctionsRoutesProps = MiscFunctionsProps

export default async function miscFunctionsRoutes<RouteSchema extends ApiRouteSchema>(
  props: MiscFunctionsRoutesProps,
): Promise<MiscFunctionsReturn<RouteSchema>> {
  assert<MiscFunctionsRoutesProps>({
    props,
    requiredProps: ['context'],
  })

  // users
  if (props.context.route === deactivateAccount.routeId) {
    try {
      return await deactivateAccount.default({
        authUser: props.authUser,
        payload: props.context.payload,
      })
    } catch (error: any) {
      throw new Error(`${deactivateAccount.routeId} - ${error}`, {
        cause: error?.cause,
      })
    }
  }

  // stripe
  if (props.context.route === createConnectedAccount.routeId) {
    try {
      return await createConnectedAccount.default({
        authUser: props.authUser,
        payload: props.context.payload,
      })
    } catch (error: any) {
      throw new Error(`${createConnectedAccount.routeId} - ${error}`, {
        cause: error?.cause,
      })
    }
  }
  if (props.context.route === deleteStripeAccount.routeId) {
    try {
      return await deleteStripeAccount.default({
        authUser: props.authUser,
        payload: props.context.payload,
      })
    } catch (error: any) {
      throw new Error(`${deleteStripeAccount.routeId} - ${error}`, {
        cause: error?.cause,
      })
    }
  }
  if (props.context.route === finishCreatingConnectedAccount.routeId) {
    try {
      return await finishCreatingConnectedAccount.default({
        authUser: props.authUser,
        payload: props.context.payload,
      })
    } catch (error: any) {
      throw new Error(`${finishCreatingConnectedAccount.routeId} - ${error}`, {
        cause: error?.cause,
      })
    }
  }
  if (props.context.route === getConnectedAccount.routeId) {
    try {
      return await getConnectedAccount.default({
        authUser: props.authUser,
        payload: props.context.payload,
      })
    } catch (error: any) {
      throw new Error(`${getConnectedAccount.routeId} - ${error}`, {
        cause: error?.cause,
      })
    }
  }
  if (props.context.route === getStripeBalance.routeId) {
    try {
      return await getStripeBalance.default({
        authUser: props.authUser,
        payload: props.context.payload,
      })
    } catch (error: any) {
      throw new Error(`${getStripeBalance.routeId} - ${error}`, {
        cause: error?.cause,
      })
    }
  }
  if (props.context.route === getStripeConnectedAccountDashboardLink.routeId) {
    try {
      return await getStripeConnectedAccountDashboardLink.default({
        authUser: props.authUser,
        payload: props.context.payload,
      })
    } catch (error: any) {
      throw new Error(`${getStripeConnectedAccountDashboardLink.routeId} - ${error}`, {
        cause: error?.cause,
      })
    }
  }

  throw new Error(`Action doesn't exist - ${props.context.route}`, {
    cause: {
      props,
    },
  })
}

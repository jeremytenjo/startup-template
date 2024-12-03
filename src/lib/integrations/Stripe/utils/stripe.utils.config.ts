export const connetetedAccountUrlQuery = {
  queryName: 'createConnectedAccount',
}

export type ConnetetedAccountUrlQueryNames = 'refreshUrl' | 'returnUrl'

const getPrefix = () => {
  const urlsPrefix = `${location.origin}${location.pathname}?${connetetedAccountUrlQuery.queryName}=`
  return urlsPrefix
}

export const getRefreshUrl = () => {
  const refreshUrl: `${string}${ConnetetedAccountUrlQueryNames}` = `${getPrefix()}refreshUrl`
  return refreshUrl
}

export const getReturnUrl = () => {
  const returnUrl: `${string}${ConnetetedAccountUrlQueryNames}` = `${getPrefix()}returnUrl`
  return returnUrl
}

export const getStripePublishableKey = () => {
  const stripePublishableKey =
    (process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_PRODUCTION
      : process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_DEVELOPMENT) || ''

  return { stripePublishableKey }
}

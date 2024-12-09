export const connetetedAccountUrlQuery = {
  queryName: 'createConnectedAccount',
}

export type ConnetetedAccountUrlQueryNames = 'refreshUrl' | 'returnUrl'

export type GetPrefixProps = {
  origin: string
  pathname: string
}

const getPrefix = (p: GetPrefixProps) => {
  const urlsPrefix = `${p.origin}${p.pathname}?${connetetedAccountUrlQuery.queryName}=`
  return urlsPrefix
}

export const getRefreshUrl = (p: GetPrefixProps) => {
  const refreshUrl: `${string}${ConnetetedAccountUrlQueryNames}` = `${getPrefix(
    p,
  )}refreshUrl`
  return refreshUrl
}

export const getReturnUrl = (p: GetPrefixProps) => {
  const returnUrl: `${string}${ConnetetedAccountUrlQueryNames}` = `${getPrefix(
    p,
  )}returnUrl`
  return returnUrl
}

export const getStripePublishableKey = () => {
  const stripePublishableKey =
    (process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_PRODUCTION
      : process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_DEVELOPMENT) || ''

  return { stripePublishableKey }
}

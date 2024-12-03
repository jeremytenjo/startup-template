import crossFetch from 'cross-fetch'

import { paypalConfig } from '../../paypal.config.js'
import formatCodeToBasicAuthorization from '../../../../utils/http/formatCodeToBasicAuthorization/formatCodeToBasicAuthorization.js'

const isProduction = process.env.NODE_ENV === 'production'

export default async function getPaypalAccessToken(): Promise<GetPaypalAccessTokenReturn> {
  const clientId = paypalConfig.clientId().clientId
  const clientSecret = paypalConfig.clientSecret().clientSecret
  const credentials = formatCodeToBasicAuthorization({
    id: clientId,
    secret: clientSecret,
  })

  // https://developer.paypal.com/api/rest/authentication/
  const res = (await crossFetch(
    `https://api-m${isProduction ? '' : '.sandbox'}.paypal.com/v1/oauth2/token`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials.basic}`,
        'PayPal-Partner-Attribution-ID': paypalConfig.bnCode().bnCode,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    },
  ).then((response) => response.json())) as GetPaypalAccessTokenReturn

  if (!res.access_token) {
    throw new Error('getPaypalAccessToken - access_token is undefined', {
      cause: { res, clientId },
    })
  }

  return res
}

export type GetPaypalAccessTokenReturn = {
  scope: string
  access_token: string
  token_type: string
  app_id: string
  expires_in: number
  nonce: string
}

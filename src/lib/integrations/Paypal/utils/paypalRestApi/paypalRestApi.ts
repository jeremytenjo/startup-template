import crossFetch from 'cross-fetch'
import assert from '@useweb/assert'

import getPaypalAccessToken from '../getPaypalAccessToken/getPaypalAccessToken.js'
import { paypalConfig } from '../../paypal.config.js'

const isProduction = process.env.NODE_ENV === 'production'

export type PaypalRestApiProps<BodySchema> = {
  route: `${'v1' | 'v2'}/${string}`
  method: 'GET' | 'POST'
  body?: BodySchema
}

/**
 *
 * [Docs](https://developer.paypal.com/api/rest)
 */
export default async function paypalRestApi<
  DataSchema extends {
    body: object
    return: object
  },
>(props: PaypalRestApiProps<DataSchema['body']>) {
  assert<PaypalRestApiProps<DataSchema['body']>>({
    props,
    requiredProps: ['route', 'method'],
  })

  const { access_token } = await getPaypalAccessToken()

  const res = (await crossFetch(
    `https://api-m${isProduction ? '' : '.sandbox'}.paypal.com/${props.route}`,
    {
      method: props.method,
      headers: {
        Authorization: `Bearer ${access_token}`,
        'PayPal-Partner-Attribution-ID': paypalConfig.bnCode().bnCode,
        'Content-Type': 'application/json',

        // Use to simulate errors
        // 'PayPal-Mock-Response': JSON.stringify({
        //   mock_application_codes: 'DUPLICATE_INVOICE_ID',
        // }),
      },
      body: props.method === 'POST' ? JSON.stringify(props.body || {}) : undefined,
    },
  ).then((response) => response.json())) as DataSchema['return'] & {
    debug_id: string
    message: string
    name: string
  }

  if ((res.message && res.name) || res.debug_id) {
    throw new Error(`${props.route} - ${res.message}`, { cause: { res } })
  }

  return res
}

export type PaypalRestApiReturn = ReturnType<typeof paypalRestApi>

import assert from '@useweb/assert'
import crossFetch from 'cross-fetch'

import { robloxConfig } from '../../../roblox.config.js'

export type GetRobloxAccountAccessTokenProps = { authorizationCode: string }

export default async function getRobloxAccountAccessToken(
  props: GetRobloxAccountAccessTokenProps,
) {
  assert<GetRobloxAccountAccessTokenProps>({
    props,
    requiredProps: ['authorizationCode'],
  })

  const response = await crossFetch('https://apis.roblox.com/oauth/v1/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: props.authorizationCode,
      client_id: robloxConfig.clientId,
      client_secret: robloxConfig.clientSecret().robloxClientSecret,
    }).toString(),
  })

  const robloxAccountData = (await response.json()) as RobloxAuthResponse

  if (robloxAccountData.error) {
    throw new Error(robloxAccountData.error, {
      cause: { robloxAccountData },
    })
  }

  return {
    robloxAccountData,
  }
}

export type GetRobloxAccountAccessTokenReturn = ReturnType<
  typeof getRobloxAccountAccessToken
>

// Other Types

// https://dev.epicgames.com/docs/web-api-ref/authentication#requesting-an-access-token
type RobloxAuthResponse = {
  // success
  access_token: string
  refresh_token: string
  token_type: string
  expires_in: number
  scope: string

  // Optional error fields
  error?: string
  error_description?: string
}

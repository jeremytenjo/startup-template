import assert from '@useweb/assert'
import crossFetch from 'cross-fetch'

export type GetTiktokUserAccessTokenProps = {
  clientKey: string
  clientSecret: string
  code: string
  redirectUri: string
}

export default async function getTiktokUserAccessToken(
  props: GetTiktokUserAccessTokenProps,
) {
  assert<GetTiktokUserAccessTokenProps>({
    props,
    requiredProps: ['clientKey', 'clientSecret', 'code', 'redirectUri'],
  })

  try {
    const data = (await crossFetch('https://open.tiktokapis.com/v2/oauth/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cache-Control': 'no-cache',
      },
      body: new URLSearchParams({
        client_key: props.clientKey,
        client_secret: props.clientSecret,
        code: decodeURIComponent(props.code),
        grant_type: 'authorization_code',
        redirect_uri: props.redirectUri,
      } satisfies {
        client_key: string
        client_secret: string
        code: string
        grant_type: 'authorization_code'
        redirect_uri: string
      }),
    }).then((res) => res.json())) as {
      error?: {
        error: string
        error_description: string
      }
      access_token: string
      expires_in: number
      refresh_token: string
      refresh_token_expires_in: number
      scope: string
      token_type: string
      open_id: string
    }

    if (data.error) {
      throw new Error(`${data.error.error} - ${data.error.error_description}`, {
        cause: {
          data,
          props,
        },
      })
    }

    return { data }
  } catch (error) {
    throw new Error('Error getting TikTok user data from access token', {
      cause: {
        error,
        props,
      },
    })
  }
}

export type GetTiktokUserAccessTokenReturn = ReturnType<typeof getTiktokUserAccessToken>

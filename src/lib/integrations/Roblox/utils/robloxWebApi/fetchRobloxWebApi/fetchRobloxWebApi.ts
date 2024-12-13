import assert from '@useweb/assert'

import getRobloxGetXcsrfToken from './getRobloxGetXCSRFToken/getRobloxGetXcsrfToken.js'

export type FetchRobloxWebApiProps = {
  url: string
  name: string
  useXcsrfToken?: boolean
  dontUseCookie?: boolean
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: object
}

/**
 * @throws {Error} If ROBLOX_API_TOKEN env variable is not set.
 * @see {@link https://devforum.roblox.com/t/collected-list-of-apis/557091l} for official Roblox API docs
 * @see {@link https://noblox.js.org/index.html} for more function info. Use when adding more functions
 * @see {@link https://github.com/noblox/noblox.js} Noblox Github
 */
export default async function fetchRobloxWebApi<ReturnSchema>(
  props: FetchRobloxWebApiProps,
): Promise<FetchRobloxWebApiReturn<ReturnSchema>> {
  assert<FetchRobloxWebApiProps>({ props, requiredProps: ['url', 'name'] })

  if (!process.env.ROBLOX_API_TOKEN) {
    throw new Error('ROBLOX_API_TOKEN env variable is not set')
  }

  let xcsrfToken = ''

  if (props.useXcsrfToken) {
    const xcsrfTokenRes = await getRobloxGetXcsrfToken()
    xcsrfToken = xcsrfTokenRes.xcsrfToken
  }

  const robloxRes = (await (
    await fetch(props.url, {
      method: props.method || 'GET',
      referrer: 'https://www.roblox.com/',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
        cookie: !props.dontUseCookie
          ? `.ROBLOSECURITY=${process.env.ROBLOX_API_TOKEN};`
          : '',
        'X-CSRF-Token': xcsrfToken,
      },
      ...(props.body ? { body: JSON.stringify(props.body) } : {}),
    })
  )?.json()) as any

  if (!!robloxRes?.errors?.length) {
    throw new Error(
      `${props.name}: ${robloxRes.errors?.[0]?.message} - Code: ${robloxRes.errors?.[0]?.code}`,
    )
  }

  return { ...robloxRes }
}

export type FetchRobloxWebApiReturn<ReturnSchema> = ReturnSchema

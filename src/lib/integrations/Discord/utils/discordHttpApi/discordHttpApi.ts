import assert from '@useweb/assert'
import crossFetch from 'cross-fetch'

export type DiscordHttpApiProps = {
  endpoint: string
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
    headers?: Record<string, string>
    body?: any
  }
  ignoreDiscordToken?: boolean
}

export default async function discordHttpApi<DataSchema>(props: DiscordHttpApiProps) {
  if (!process.env.DISCORD_TOKEN && !props.ignoreDiscordToken) {
    throw new Error('DISCORD_TOKEN not found in environment variables')
  }

  assert<DiscordHttpApiProps>({ props, requiredProps: ['endpoint'] })

  // append endpoint to root API URL
  const url = 'https://discord.com/api/v10/' + props.endpoint
  // Stringify payloads
  if (props.options?.body) {
    props.options.body = JSON.stringify(props.options.body)
  }
  // Use node-fetch to make requests
  const res = await crossFetch(url, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      'Content-Type': 'application/json; charset=UTF-8',
      'User-Agent': 'DiscordBot (https://socialseed.com, 1.0.0)',
      ...props.options.headers,
    },
    ...props.options,
  })
  // throw API errors
  if (!res.ok) {
    const data = await res.json()
    throw new Error(JSON.stringify(data))
  }

  try {
    return (await res.json()) as DataSchema
  } catch (error) {
    return {} as DataSchema
  }
}

export type DiscordHttpApiReturn = ReturnType<typeof discordHttpApi>

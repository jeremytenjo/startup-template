import assert from '@useweb/assert'

export type GetRobloxUserInfoProps = { accessToken: string }

export default async function getRobloxUserInfo(props: GetRobloxUserInfoProps) {
  assert<GetRobloxUserInfoProps>({ props, requiredProps: ['accessToken'] })

  const response = await fetch('https://apis.roblox.com/oauth/v1/userinfo', {
    headers: {
      Authorization: `Bearer ${props.accessToken}`,
    },
  })

  const userInfo = (await response.json()) as RobloxUserInfoResponseSchema

  return { userInfo }
}

export type GetRobloxUserInfoReturn = ReturnType<typeof getRobloxUserInfo>

type RobloxUserInfoResponseSchema = {
  sub: string
  name: string
  nickname: string
  preferred_username: string
  created_at: number
  profile: string
  picture: string
}

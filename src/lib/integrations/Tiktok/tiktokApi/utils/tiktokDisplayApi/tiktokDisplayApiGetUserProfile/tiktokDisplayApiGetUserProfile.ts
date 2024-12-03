import assert from '@useweb/assert'
import crossFetch from 'cross-fetch'

export type TiktokDisplayApiGetUserProfileProps = {
  accessToken: string
}

export default async function tiktokDisplayApiGetUserProfile(
  props: TiktokDisplayApiGetUserProfileProps,
) {
  assert<TiktokDisplayApiGetUserProfileProps>({
    props,
    requiredProps: ['accessToken'],
  })

  const data = (await crossFetch(
    'https://open.tiktokapis.com/v2/user/info/?fields=open_id,union_id,avatar_url,username',
    {
      headers: {
        Authorization: `Bearer ${props.accessToken}`,
      },
    },
  ).then((res) => res.json())) as {
    data: {
      user: {
        avatar_url: string
        open_id: string
        union_id: string
        username: string
      }
    }
    error: {
      code: string
      message: string
      log_id: string
    }
  }

  if (data.error.code !== 'ok') {
    throw new Error(`${data.error.code} - ${data.error.message}`, {
      cause: {
        data,
        props,
      },
    })
  }

  return { data }
}

export type TiktokDisplayApiGetUserProfileReturn = ReturnType<
  typeof tiktokDisplayApiGetUserProfile
>

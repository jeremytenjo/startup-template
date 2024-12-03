import assert from '@useweb/assert'
import crossFetch from 'cross-fetch'

import getSocialAccountProfilePhoto from '../../../../utils/socials/getSocialAccountProfilePhoto/getSocialAccountProfilePhoto.js'

export type GetTikTokAccountProfilePhotoUrlProps = { username: string }

export default async function getTikTokAccountProfilePhotoUrl(
  props: GetTikTokAccountProfilePhotoUrlProps,
) {
  assert<GetTikTokAccountProfilePhotoUrlProps>({ props, requiredProps: ['username'] })

  const html = await crossFetch(`https://www.tiktok.com/@${props.username}`).then((res) =>
    res.text(),
  )

  const profilePhotoUrl = getSocialAccountProfilePhoto({ html }).platformPhotoUrl

  return { profilePhotoUrl }
}

export type GetTikTokAccountProfilePhotoReturn = ReturnType<
  typeof getTikTokAccountProfilePhotoUrl
>

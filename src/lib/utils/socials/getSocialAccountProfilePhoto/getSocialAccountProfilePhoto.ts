import assert from '@useweb/assert'

export type GetSocialAccountProfilePhotoProps = { html: string }

export default function getSocialAccountProfilePhoto(
  props: GetSocialAccountProfilePhotoProps,
) {
  assert<GetSocialAccountProfilePhotoProps>({ props, requiredProps: ['html'] })

  const regex = /<meta property="og:image" content="(.*?)"/

  const platformPhotoUrl = props.html.match(regex)?.[1]?.replace('amp;', '')

  return { platformPhotoUrl }
}

export type GetSocialAccountProfilePhotoReturn = ReturnType<
  typeof getSocialAccountProfilePhoto
>

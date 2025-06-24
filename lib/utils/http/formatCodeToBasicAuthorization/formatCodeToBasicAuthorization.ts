import assert from '@useweb/assert'

export type FormatCodeToBasicAuthorizationProps = { id: string; secret: string }

export default function formatCodeToBasicAuthorization(
  props: FormatCodeToBasicAuthorizationProps,
) {
  assert<FormatCodeToBasicAuthorizationProps>({ props, requiredProps: ['id', 'secret'] })

  const basic = Buffer.from(`${props.id}:${props.secret}`).toString('base64')

  return { basic }
}

export type FormatCodeToBasicAuthorizationReturn = ReturnType<
  typeof formatCodeToBasicAuthorization
>

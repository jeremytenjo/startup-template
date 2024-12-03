import assert from '@useweb/assert'

export type GetTiktokAuthStateProps = { uid: string }

export default function getTiktokAuthState(props: GetTiktokAuthStateProps) {
  assert<GetTiktokAuthStateProps>({ props, requiredProps: ['uid'] })

  const tiktokAuthState = props?.uid + `_${process.env.NODE_ENV}`

  return { tiktokAuthState }
}

export type GetTiktokAuthStateReturn = ReturnType<typeof getTiktokAuthState>

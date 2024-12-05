import assert from '@useweb/assert'
import { getIsUsernameTaken } from '@useweb/firebase/useFirebaseAuth'

export type CreateUsernameFromEmailProps = { email: string; customUsername?: string }

export default async function createUsernameFromEmail(
  props: CreateUsernameFromEmailProps,
) {
  assert<CreateUsernameFromEmailProps>({ props, requiredProps: ['email'] })

  const username = props.customUsername || props.email.split('@')[0]

  if (!username) {
    throw new Error(`username is undefined`, {
      cause: {
        props,
        username,
      },
    })
  }

  await getIsUsernameTaken({ username })

  return { username }
}

export type CreateUsernameFromEmailReturn = ReturnType<typeof createUsernameFromEmail>

import assert from '@useweb/assert'
import { vanillaAuthStore } from '@useweb/firebase/useFirebaseAuth'

import type UserSchema from '../../../../data/users/user.schema.js'

const isProduction = process.env.NODE_ENV === 'production'

declare global {
  interface Window {
    clarity: any
  }
}

type ClarityProps = {
  eventName: string
  data: string[]
}

export default function Clarity(props: ClarityProps) {
  assert({ props, requiredProps: ['eventName', 'data'] })
  const signedInUser: UserSchema = vanillaAuthStore?.getState()?.user

  if (isProduction) {
    clarityIdentify()
    // https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-api
    window.clarity('set', props.eventName, [
      ...(props.data || []),
      `User ID: ${signedInUser?.id}`,
      `User Name: ${signedInUser?.displayName}`,
    ])
  }
}

// https://learn.microsoft.com/en-us/clarity/setup-and-installation/identify-api
export const clarityIdentify = () => {
  const signedInUser: UserSchema = vanillaAuthStore?.getState()?.user

  window.clarity(
    'identify',
    signedInUser?.id,
    undefined,
    undefined,
    signedInUser?.displayName,
  )
}

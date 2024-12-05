import React from 'react'
import ErrorMessage from '@useweb/ui/ErrorMessage'

import type { UseAuthReturn } from '../../../../../../utils/useAuth/useAuth.js'

export type UserAccessCardSignUpErrorMessageProps = {
  auth: UseAuthReturn
}

export default function UserAccessCardSignUpErrorMessage(
  props: UserAccessCardSignUpErrorMessageProps,
) {
  const error = props.auth.signUp?.error

  if (String(error)?.includes('(auth/popup-closed-by-user)')) {
    return null
  }

  return (
    <ErrorMessage error={props.auth.signUp?.error} message={'Error creating account'} />
  )
}

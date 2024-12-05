import React from 'react'
import ErrorMessage from '@useweb/ui/ErrorMessage'

import type { UseAuthReturn } from '../../../../../../utils/useAuth/useAuth.js'

export type UserAccessCardSignUpErrorMessageProps = {
  auth: UseAuthReturn
}

export default function UserAccessCardSignUpErrorMessage(
  props: UserAccessCardSignUpErrorMessageProps,
) {
  return (
    <ErrorMessage error={props.auth.signUp?.error} message={'Error creating account'} />
  )
}

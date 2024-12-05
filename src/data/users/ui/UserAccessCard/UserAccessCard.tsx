import React, { useMemo } from 'react'
import type { BoxProps } from '@useweb/ui/Box'

import CenterIsland from '../../../../lib/layouts/CenterIsland/CenterIsland.js'

import type { UserAccessCardHeaderProps } from './containers/UserAccessCardHeader/UserAccessCardHeader.js'
import UserAccessCardHeader from './containers/UserAccessCardHeader/UserAccessCardHeader.js'
import type { UserAccessCardSignInProps } from './containers/UserAccessCardSignIn/UserAccessCardSignIn.js'
import UserAccessCardSignIn from './containers/UserAccessCardSignIn/UserAccessCardSignIn.js'
import type { UserAccessCardSignUpProps } from './containers/UserAccessCardSignUp/UserAccessCardSignUp.js'
import type { UserAccessCardResetPasswordProps } from './containers/UserAccessCardResetPassword/UserAccessCardResetPassword.js'
import UserAccessCardSignUp from './containers/UserAccessCardSignUp/UserAccessCardSignUp.js'
import UserAccessCardResetPassword from './containers/UserAccessCardResetPassword/UserAccessCardResetPassword.js'

export type UserAccessCardProps = {
  type: 'sign-in' | 'sign-up' | 'reset-password'
  sx?: BoxProps['sx']
  headerProps?: UserAccessCardHeaderProps
  signInProps?: UserAccessCardSignInProps
  signUpProps?: UserAccessCardSignUpProps
  resetPasswordProps?: UserAccessCardResetPasswordProps
}

export default function UserAccessCard(props: UserAccessCardProps) {
  const title = useMemo(() => {
    if (props.type === 'sign-in') {
      return 'Sign in to your account'
    }

    if (props.type === 'sign-up') {
      return 'Create an account'
    }

    if (props.type === 'reset-password') {
      return 'Reset your password'
    }

    return ''
  }, [props.type])

  return (
    <CenterIsland
      data-id='UserAccessCard'
      parentSx={{
        backgroundColor: 'transparent',
        border: 'none',
        mt: 0,
      }}
      sx={{
        backgroundColor: 'transparent',
        border: 'none',
        maxWidth: '400px',
        pt: 0,
        px: [1, 2],
        ...props.sx,
      }}
    >
      <UserAccessCardHeader {...props.headerProps} title={title} />
      {props.type === 'sign-in' && <UserAccessCardSignIn {...props.signInProps} />}
      {props.type === 'sign-up' && <UserAccessCardSignUp {...props.signUpProps} />}
      {props.type === 'reset-password' && (
        <UserAccessCardResetPassword {...props.resetPasswordProps} />
      )}
    </CenterIsland>
  )
}

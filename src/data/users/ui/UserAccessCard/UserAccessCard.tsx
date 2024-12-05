import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'

import CenterIsland from '../../../../lib/layouts/CenterIsland/CenterIsland.js'

import type { UserAccessCardHeaderProps } from './UserAccessCardHeader/UserAccessCardHeader.js'
import UserAccessCardHeader from './UserAccessCardHeader/UserAccessCardHeader.js'

export type UserAccessCardProps = {
  type: 'sign-in' | 'sign-up' | 'reset-password'

  sx?: BoxProps['sx']
  headerProps?: UserAccessCardHeaderProps
  signInProps?: any
  signUpProps?: any
  resetPasswordProps?: any
}

export default function UserAccessCard(props: UserAccessCardProps) {
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
      <UserAccessCardHeader {...props.headerProps} />
    </CenterIsland>
  )
}

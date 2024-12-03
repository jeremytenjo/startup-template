import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Box from '@useweb/ui/Box'
import Avatar from '@useweb/ui/Avatar'

import type UserSchema from '../../../../data/users/user.schema.js'

export type CpmAvatarProps = {
  user: UserSchema | undefined
  loading: boolean | undefined
  sx?: BoxProps['sx']
  wrapperSx?: BoxProps['sx']
  cmpSx?: BoxProps['sx']
}

export default function CpmAvatar(props: CpmAvatarProps) {
  return (
    <Box
      data-id='ProfilePhoto'
      sx={{
        position: 'relative',
        justifyContent: 'center',
        height: '87px',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        gridAutoFlow: 'column',
        mb: '-10px',
        visibility: props.loading ? 'hidden' : 'visible',
        ...(props.wrapperSx || {}),
      }}
    >
      <Avatar
        src={props.user?.photoURL}
        alt={`${props?.user?.displayName} profile photo`}
        sx={{
          width: '70px',
          height: '70px',
          m: '0 auto',
          ...(props.sx || {}),
        }}
      />
    </Box>
  )
}

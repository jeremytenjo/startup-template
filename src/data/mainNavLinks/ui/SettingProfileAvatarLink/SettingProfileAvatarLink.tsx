import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Link from '@useweb/ui/Link'
import Avatar from '@useweb/ui/Avatar'

import useAuth from '../../../users/utils/useAuth/useAuth.js'

export type SettingProfileAvatarLinkProps = {
  sx?: BoxProps['sx']
  avatarSx?: BoxProps['sx']
}

export default function SettingProfileAvatarLink(props: SettingProfileAvatarLinkProps) {
  const auth = useAuth()

  return (
    <Link
      href={`/settings/profile`}
      sx={{
        ...props.sx,
      }}
    >
      <Avatar
        src={auth.user?.photoURL}
        alt={auth.user?.displayName}
        sx={{
          justifySelf: 'start',
          width: '40px',
          height: '40px',
          borderRadius: '12px',
          ...props.avatarSx,
        }}
      />
    </Link>
  )
}

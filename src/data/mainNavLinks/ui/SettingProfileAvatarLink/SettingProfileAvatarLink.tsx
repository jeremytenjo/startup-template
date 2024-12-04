import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Link from '@useweb/ui/Link'
import Avatar from '@useweb/ui/Avatar'

import useAuth from '../../../users/utils/useAuth/useAuth.js'

export type SettingProfileAvatarLinkProps = {
  sx?: BoxProps['sx']
  avatarSx?: BoxProps['sx']
  onClick?: any
  disableLink?: boolean
}

export default function SettingProfileAvatarLink(props: SettingProfileAvatarLinkProps) {
  if (props.disableLink) {
    return (
      <SettingProfileAvatarLinkAvatar
        onClick={props.onClick}
        sx={{
          ...props.avatarSx,
        }}
      />
    )
  }

  return (
    <Link
      href={`/settings/profile`}
      sx={{
        ...props.sx,
      }}
    >
      <SettingProfileAvatarLinkAvatar
        onClick={props.onClick}
        sx={{
          ...props.avatarSx,
        }}
      />
    </Link>
  )
}

const SettingProfileAvatarLinkAvatar = (props: {
  sx?: BoxProps['sx']
  onClick?: any
}) => {
  const auth = useAuth()

  return (
    <Avatar
      src={auth.user?.photoURL}
      alt={auth.user?.displayName}
      avatarProps={{
        onClick: props.onClick,
      }}
      sx={{
        justifySelf: 'start',
        width: '40px',
        height: '40px',
        borderRadius: '12px',
        ...(props.onClick && {
          cursor: 'pointer',
        }),
        ...props.sx,
      }}
    />
  )
}

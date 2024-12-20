import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Link from '@useweb/ui/Link'
import type { AvatarProps } from '@useweb/ui/Avatar'
import Avatar from '@useweb/ui/Avatar'

import useAuth from '../../../users/utils/useAuth/useAuth.js'
import useNavLinks from '../../utils/useNavLinks/useNavLinks.js'

export type SettingProfileAvatarLinkProps = {
  sx?: BoxProps['sx']
  avatarSx?: BoxProps['sx']
  onClick?: any
  disableLink?: boolean
  imgProps?: AvatarProps['imgProps']
}

export default function SettingProfileAvatarLink(props: SettingProfileAvatarLinkProps) {
  const navLinks = useNavLinks()

  if (props.disableLink) {
    return (
      <SettingProfileAvatarLinkAvatar
        onClick={props.onClick}
        sx={{
          ...props.avatarSx,
        }}
        imgProps={props.imgProps}
      />
    )
  }

  return (
    <Link
      href={navLinks.navLinks.profile.url}
      sx={{
        ...props.sx,
      }}
    >
      <SettingProfileAvatarLinkAvatar
        onClick={props.onClick}
        sx={{
          ...props.avatarSx,
        }}
        imgProps={props.imgProps}
      />
    </Link>
  )
}

const SettingProfileAvatarLinkAvatar = (props: {
  sx?: BoxProps['sx']
  onClick?: any
  imgProps?: AvatarProps['imgProps']
}) => {
  const auth = useAuth()

  return (
    <Avatar
      src={auth.user?.profilePhoto?.src}
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
      imgProps={props.imgProps}
    />
  )
}

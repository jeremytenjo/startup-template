import React from 'react'
import Link from '@useweb/ui/Link'
import type { BoxProps } from '@useweb/ui/Box'

import FullLogoIcon from '../../icons/FullLogoIcon.js'

export default function FullLogoLink(props: {
  sx?: BoxProps['sx']
  iconSx?: BoxProps['sx']
  onClick?: () => void
  overrideHref?: string
}) {
  return (
    <Link
      data-id='FullLogoLink'
      sx={{
        display: 'grid',
        ...(props.sx ?? {}),
      }}
      onClick={props?.onClick}
      href={props?.overrideHref || '/'}
    >
      <FullLogoIcon sx={props.iconSx} />
    </Link>
  )
}

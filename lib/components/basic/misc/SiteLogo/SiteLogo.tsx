import React from 'react'
import Link, { type LinkProps } from '@useweb/ui/Link'
import Image, { type ImageProps } from '@useweb/ui/Image'

import { siteInfo } from '../../../../../data/_siteInfo/siteInfo.js'

export type SiteLogoProps = Omit<ImageProps, 'alt'> & {
  src?: string
  sx?: LinkProps['sx']
  onClick?: any
}

export default function SiteLogo({
  src,
  width = 182,
  height = 44,
  sx = {},
  onClick,
}: SiteLogoProps) {
  const siteLogo = src || '/images/logo/logo-full.png'

  return (
    <Link
      href='/'
      sx={{
        position: 'relative',
        ...sx,
      }}
      onClick={onClick}
    >
      <Image
        src={siteLogo}
        width={width}
        height={height}
        alt={`${siteInfo.name} beautiful logo`}
      />
    </Link>
  )
}

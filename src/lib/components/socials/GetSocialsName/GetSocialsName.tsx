import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Text, { type TextProps } from '@useweb/ui/Text'

import type PlatformNamesSchema from '../../../../data/_commonSchemas/PlatformNamesSchema/PlatformNames.schema.js'

export type GetSocialsNameProps = {
  platformName: PlatformNamesSchema | undefined
  sx?: BoxProps['sx']
  tag?: TextProps['tag']
  affix?: string
}

export default function GetSocialsName(props: GetSocialsNameProps) {
  return (
    <Text
      text={`${socialNames[props?.platformName || '']?.name || ''} ${props.affix || ''}`}
      tag={props.tag || 'p'}
      sx={{
        ...(props.sx || {}),
      }}
    />
  )
}

const socialNames: {
  [key in PlatformNamesSchema]: { name: string }
} = {
  youtubeVideo: { name: 'Youtube' },
  youtubeShort: { name: 'Youtube Short' },
  tiktokVideo: { name: 'Tiktok' },
  freshcutVideo: { name: 'Freshcut' },
}

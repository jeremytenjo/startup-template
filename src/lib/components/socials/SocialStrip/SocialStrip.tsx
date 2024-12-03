import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Box from '@useweb/ui/Box'

import type PlatformNamesSchema from '../../../../data/_commonSchemas/PlatformNamesSchema/PlatformNames.schema.js'
import GetSocialsIcon from '../GetSocialsIcon/GetSocialsIcon.js'
import GetSocialsName from '../GetSocialsName/GetSocialsName.js'

export type SocialStripProps = {
  platformName: PlatformNamesSchema | undefined
  sx?: BoxProps['sx']
  iconSx?: BoxProps['sx']
  labelSx?: BoxProps['sx']
  nameAffix?: string
}

export default function SocialStrip(props: SocialStripProps) {
  return (
    <Box
      data-id='SocialStrip'
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        ...(props.sx || {}),
      }}
    >
      <GetSocialsIcon platformName={props.platformName} iconSx={props.iconSx} />
      <GetSocialsName
        platformName={props.platformName}
        sx={props.labelSx}
        affix={props.nameAffix}
      />
    </Box>
  )
}

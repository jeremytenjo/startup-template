import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Box from '@useweb/ui/Box'

import type PlatformNamesSchema from '../../../../data/_commonSchemas/PlatformNamesSchema/PlatformNames.schema.js'
import YoutubeIcon from '../../icons/YoutubeIcon/YoutubeIcon.js'
import YoutubeShortIcon from '../../icons/YoutubeShortIcon.js'
import TiktokIcon from '../../icons/TiktokIcon.js'

export type GetSocialsIconProps = {
  platformName: PlatformNamesSchema | undefined
  sx?: BoxProps['sx']
  iconSx?: BoxProps['sx']
  tiktokIcon?: React.ReactNode
}

export default function GetSocialsIcon(props: GetSocialsIconProps) {
  const socialIcons: {
    [key in PlatformNamesSchema]: React.ReactNode
  } = React.useMemo(() => {
    const iconSx = {
      fontSize: '16px',
      ...(props.iconSx || {}),
    }

    return {
      youtubeVideo: <YoutubeIcon sx={iconSx} />,
      youtubeShort: <YoutubeShortIcon sx={iconSx} />,
      tiktokVideo: props.tiktokIcon || <TiktokIcon sx={iconSx} />,
      freshcutVideo: null,
    }
  }, [props.platformName, props.iconSx])

  return (
    <Box
      data-id='GetSocialsIcon'
      sx={{
        display: 'flex',
        ...(props.sx || {}),
      }}
    >
      {socialIcons[props?.platformName || 'none'] || 'missing icon'}
    </Box>
  )
}

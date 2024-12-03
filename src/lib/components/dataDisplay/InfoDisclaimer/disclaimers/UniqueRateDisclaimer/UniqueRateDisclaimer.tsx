import React from 'react'
import Text from '@useweb/ui/Text'
import type { TextProps } from '@useweb/ui/Text'

import InfoDisclaimer from '../../InfoDisclaimer.js'

export default function UniqueRateDisclaimer(props: {
  sx?: TextProps['sx']
  triggerSx?: TextProps['sx']
  message?: string
}) {
  return (
    <InfoDisclaimer
      id='UniqueRateDisclaimer'
      disclaimerSx={props.sx}
      triggerSx={props.triggerSx}
      disclaimer={
        <Text
          text={
            props.message ||
            `This rate will be the amount you charge for a completely unique video you make on a game`
          }
          tag='p'
          sx={{}}
        />
      }
    />
  )
}

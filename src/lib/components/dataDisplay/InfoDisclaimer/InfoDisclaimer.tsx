import React from 'react'
import type { DisclaimerProps } from '@useweb/ui/Disclaimer'
import Disclaimer from '@useweb/ui/Disclaimer'

import HelpIcon from '../../icons/HelpIcon.js'

export type InfoDisclaimerProps = {
  id: string
  disclaimer: any
  disclaimerSx?: DisclaimerProps['sx']
  triggerSx?: DisclaimerProps['sx']
}

export default function InfoDisclaimer(props: InfoDisclaimerProps) {
  return (
    <Disclaimer
      id={props.id}
      trigger={
        <HelpIcon
          sx={{
            fontSize: '14px',
            cursor: 'pointer',
            ...(props.triggerSx ?? {}),
          }}
        />
      }
      disclaimerWrapperSx={props.disclaimerSx}
      disclaimer={props.disclaimer}
    />
  )
}

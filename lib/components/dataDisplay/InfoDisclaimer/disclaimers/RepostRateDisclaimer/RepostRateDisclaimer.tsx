import React from 'react'
import Text from '@useweb/ui/Text'

import InfoDisclaimer from '../../InfoDisclaimer.js'

export default function RepostRateDisclaimer() {
  return (
    <InfoDisclaimer
      id='RepostRateDisclaimer'
      disclaimer={
        <Text
          text={`This rate will be the amount you charge for reposting an already-made video to another platform.`}
          tag='p'
          sx={{}}
        />
      }
    />
  )
}

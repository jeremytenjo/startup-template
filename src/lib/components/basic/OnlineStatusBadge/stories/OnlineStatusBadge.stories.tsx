//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'

import OnlineStatusBadgeComponent from '../OnlineStatusBadge.js'

export default {
  title: 'lib/components',
}

export const OnlineStatusBadge = {
  render: () => {
    return (
      <>
        <OnlineStatusBadgeComponent show sx={{}} />
      </>
    )
  },
}

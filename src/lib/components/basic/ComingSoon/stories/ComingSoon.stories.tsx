//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'

import ComingSoonComponent from '../ComingSoon.js'

export default {
  title: 'lib/components',
}

export const ComingSoon = {
  render: () => {
    return (
      <>
        <ComingSoonComponent />
      </>
    )
  },
}

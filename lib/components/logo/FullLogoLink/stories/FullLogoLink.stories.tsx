//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'

import FullLogoLinkComponent from '../FullLogoLink.js'

export default {
  title: 'lib/components',
}

export const FullLogoLink = {
  render: () => {
    return (
      <>
        <FullLogoLinkComponent />
      </>
    )
  },
}

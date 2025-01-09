//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'
import PixelPerfect from '@useweb/pixel-perfect'

import MessagesNotSelectedComponent from '../MessagesNotSelected.js'

export default {
  title: 'lib/components/MessagesNotSelected',
}

export const Default = {
  render: () => {
    return (
      <>
        <PixelPerfect
          hide={true}
          assets={[
            {
              width: 0,
              // Design https://www.figma.com/file/eg8sAdcWmoj6V3ttnJbDyn/Social-Seed?node-id=909%3A36172
              url: 'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/7b1e60f5-752f-4cdf-9a27-1c2cd4e25e3e',
            },
          ]}
        />
        <MessagesNotSelectedComponent />
      </>
    )
  },
}

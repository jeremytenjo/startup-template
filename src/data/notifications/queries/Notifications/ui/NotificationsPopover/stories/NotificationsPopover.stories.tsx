//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'

import NotificationsPopover from '../NotificationsPopover.js'

const defaultArgs: any = {
  name: 'NotificationsPopover',
}

export default {
  title: 'data/notifications/queries/Notifications/ui/NotificationsPopover',
  args: defaultArgs,
  // https://storybook.js.org/docs/react/writing-docs/docs-page#remixing-docspage-using-doc-blocks
  parameters: {
    signInAs: 'creator1',
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: typeof defaultArgs) => {
  return (
    <>
      <NotificationsPopover {...args} />
    </>
  )
}

export const Default = {
  render: (args) => {
    return <Template {...args} />
  },
}

// const variantArgs: NotificationsPopoverProps = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }

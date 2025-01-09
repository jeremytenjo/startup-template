//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'

import ImageAttachment, { type ImageAttachmentProps } from '../ImageAttachment.js'

const defaultArgs: ImageAttachmentProps = {
  src: 'https://i.pravatar.cc/206',
  alt: 'hello',
}

export default {
  title: 'data/messages/queries/messagesByConversationId/ui/_common/Image Attachment',
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: typeof defaultArgs) => {
  return (
    <>
      <ImageAttachment {...args} />
    </>
  )
}

export const Default = {
  render: (args: ImageAttachmentProps) => {
    return <Template {...args} />
  },
}

export const OnRemove = {
  ...Default,
  args: {
    ...defaultArgs,
    onRemove: () => console.log('remove'),
  } satisfies ImageAttachmentProps,
}

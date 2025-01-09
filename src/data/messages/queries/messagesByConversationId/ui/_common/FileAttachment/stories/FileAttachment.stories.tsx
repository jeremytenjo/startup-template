//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'

import FileAttachment, { type FileAttachmentProps } from '../FileAttachment.js'

const defaultArgs: FileAttachmentProps = {
  fileType: '/image',
  fileName: 'hello',
}

export default {
  title: 'data/messages/queries/messagesByConversationId/ui/_common/File Attachment',
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: typeof defaultArgs) => {
  return (
    <>
      <FileAttachment {...args} />
    </>
  )
}

export const Default = {
  render: (args: FileAttachmentProps) => {
    return <Template {...args} />
  },
}

export const OnRemove = {
  ...Default,
  args: {
    ...defaultArgs,
    onRemove() {
      console.log('onRemove')
    },
  } satisfies FileAttachmentProps,
}

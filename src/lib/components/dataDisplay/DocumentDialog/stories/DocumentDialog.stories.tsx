//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'

import DocumentDialog, { type DocumentDialogProps } from '../DocumentDialog.js'

const defaultArgs: DocumentDialogProps = {
  title: 'Document Dialog',
  triggerComponent: 'DocumentDialog',
  dialogContent: 'DialogContent',
  onAgree: () => {},
  loading: false,
}

export default {
  title: 'lib/components/dataDisplay/DocumentDialog',
  component: DocumentDialog,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: DocumentDialogProps) => {
  return (
    <>
      <DocumentDialog {...args} />
    </>
  )
}

export const Default = {
  render: (args: DocumentDialogProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies DocumentDialogProps
// }

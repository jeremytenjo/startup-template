//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'

import ContinueWithGoogleButton, {
  type ContinueWithGoogleButtonProps,
} from '../ContinueWithGoogleButton.js'

const defaultArgs: ContinueWithGoogleButtonProps = {}

export default {
  title: 'lib/components/auth/Continue With Google Button',
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: typeof defaultArgs) => {
  return (
    <>
      <ContinueWithGoogleButton {...args} />
    </>
  )
}

export const Default = {
  render: (args: ContinueWithGoogleButtonProps) => {
    return <Template {...args} />
  },
}

// const variantArgs: ContinueWithGoogleButtonProps = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }

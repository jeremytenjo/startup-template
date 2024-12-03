//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'

import VerifyYoutubeAccountButton, {
  type VerifyYoutubeAccountButtonProps,
} from '../VerifyYoutubeAccountButton.js'

const defaultArgs: VerifyYoutubeAccountButtonProps = {
  isVerified: false,
}

export default {
  title:
    'lib/integrations/Google/Youtube/VerifyYoutubeAccount/Verify Youtube Account Button',
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: typeof defaultArgs) => {
  return (
    <>
      <VerifyYoutubeAccountButton {...args} />
    </>
  )
}

export const Default = {
  render: (args: VerifyYoutubeAccountButtonProps) => {
    return <Template {...args} />
  },
}

// const variantArgs: VerifyYoutubeAccountButtonProps = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }

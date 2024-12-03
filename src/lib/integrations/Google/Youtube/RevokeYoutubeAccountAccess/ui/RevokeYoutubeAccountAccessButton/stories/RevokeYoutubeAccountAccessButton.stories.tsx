//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'

import RevokeYoutubeAccountAccessButton, {
  type RevokeYoutubeAccountAccessButtonProps,
} from '../RevokeYoutubeAccountAccessButton.js'

const defaultArgs: RevokeYoutubeAccountAccessButtonProps = {}

export default {
  title:
    'lib/integrations/Google/Youtube/RevokeYoutubeAccountAccess/Revoke Youtube Account Button',
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: typeof defaultArgs) => {
  return (
    <>
      <RevokeYoutubeAccountAccessButton {...args} />
    </>
  )
}

export const Default = {
  render: (args: RevokeYoutubeAccountAccessButtonProps) => {
    return <Template {...args} />
  },
}

// const variantArgs: RevokeYoutubeAccountAccessButtonProps = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }

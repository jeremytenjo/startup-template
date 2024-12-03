//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'

import MembershipRequiredButton, {
  type MembershipRequiredButtonProps,
} from '../MembershipRequiredButton.js'

const defaultArgs: MembershipRequiredButtonProps = {
  text: 'MembershipRequiredButton',
}

export default {
  title: 'lib/components/memberships/Membership Required Button',
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: MembershipRequiredButtonProps) => {
  return (
    <>
      <MembershipRequiredButton {...args} />
    </>
  )
}

export const Default = {
  render: (args: MembershipRequiredButtonProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies MembershipRequiredButtonProps
// }

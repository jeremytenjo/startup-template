//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'

import DiscordAuthButton, { type DiscordAuthButtonProps } from '../DiscordAuthButton.js'

const defaultArgs: DiscordAuthButtonProps = {
  onSuccess: (p) => {
    console.log(p)
  },
  disabled: false,
  error: false,
  errorMessage: 'Discord account already linked to a user.',
}

export default {
  title: 'lib/integrations/Discord/ui/DiscordAuthButton',
  component: DiscordAuthButton,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: DiscordAuthButtonProps) => {
  return (
    <>
      <DiscordAuthButton {...args} />
    </>
  )
}

export const Default = {
  render: (args: DiscordAuthButtonProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies DiscordAuthButtonProps
// }

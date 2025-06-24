//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import Avatar, { type AvatarProps } from '@useweb/ui/Avatar'

const defaultArgs: AvatarProps = {
  src: 'https://source.unsplash.com/random/100x100',
  alt: 'Avatar',
}

export default {
  title: 'lib/components/useweb/Avatar',
  component: Avatar,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: AvatarProps) => {
  return (
    <>
      <Avatar {...args} />
    </>
  )
}

export const Default = {
  render: (args: AvatarProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies AvatarProps
// }

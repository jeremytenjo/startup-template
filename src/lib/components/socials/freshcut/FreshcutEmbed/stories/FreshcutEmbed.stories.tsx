//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'

import FreshcutEmbed, { type FreshcutEmbedProps } from '../FreshcutEmbed.js'

const defaultArgs: FreshcutEmbedProps = {
  url: 'https://freshcut.gg/post/24273d8d-9416-4553-9718-fb871f6d5b71',
}

export default {
  title: 'lib/components/socials/freshcut/FreshcutEmbed',
  component: FreshcutEmbed,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: FreshcutEmbedProps) => {
  return (
    <>
      <FreshcutEmbed {...args} />
    </>
  )
}

export const Default = {
  render: (args: FreshcutEmbedProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies FreshcutEmbedProps
// }

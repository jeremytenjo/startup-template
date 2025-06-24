//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import Skeleton, { type SkeletonProps } from '@useweb/ui/Skeleton'

const defaultArgs: SkeletonProps = {
  loading: true,
  children: 'Skeleton',
}

export default {
  title: 'lib/components/useweb/Skeleton',
  component: Skeleton,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: SkeletonProps) => {
  return (
    <>
      <Skeleton {...args} />
    </>
  )
}

export const Default = {
  render: (args: SkeletonProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies SkeletonProps
// }

//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import Rating, { type RatingProps } from '@useweb/ui/Rating'

const defaultArgs: RatingProps = {
  name: 'Rating',
}

export default {
  title: 'lib/components/useweb/Rating',
  component: Rating,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: RatingProps) => {
  return (
    <>
      <Rating {...args} />
    </>
  )
}

export const Default = {
  render: (args: RatingProps) => {
    return <Template {...args} />
  },
}

export const ShortStyle = {
  ...Default,
  args: {
    ...defaultArgs,
    reviewsAmount: 0,
    shortStyle: true,
  } satisfies RatingProps,
}

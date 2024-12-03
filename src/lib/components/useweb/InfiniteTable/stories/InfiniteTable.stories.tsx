//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import InfiniteTable, { type InfiniteTableProps } from '@useweb/ui/InfiniteTable'

const defaultArgs: InfiniteTableProps<any> = {} as any

export default {
  title: 'lib/components/useweb/InfiniteTable',
  component: InfiniteTable,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: InfiniteTableProps<any>) => {
  return (
    <>
      <InfiniteTable {...args} />
    </>
  )
}

export const Default = {
  render: (args: InfiniteTableProps<any>) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies InfiniteTableProps<any>
// }

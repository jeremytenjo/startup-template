//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import Table, { type TableProps } from '@useweb/ui/Table'

const defaultArgs: TableProps = {
  children: <>Table</>,
}

export default {
  title: 'lib/components/useweb/Table',
  component: Table,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: TableProps) => {
  return (
    <>
      <Table {...args} />
    </>
  )
}

export const Default = {
  render: (args: TableProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies TableProps
// }

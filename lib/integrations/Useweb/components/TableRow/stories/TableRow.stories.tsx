//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import TableRow, { TableRowSkeletons, type TableRowProps } from '@useweb/ui/TableRow'

const defaultArgs: TableRowProps = {
  gridTemplateColumns: 'minmax(100px, 1fr) 100px 125px 150px 200px',
  columns: [
    {
      content: 'Pending creator',
    },
    {
      content: 'Pending creator',
    },
    {
      content: 'Pending creator',
    },
    {
      content: 'Pending creator',
    },
    {
      content: 'Pending creator',
    },
  ],
}

export default {
  title: 'lib/components/useweb/table/TableRow',
  component: TableRow,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: TableRowProps) => {
  return (
    <>
      <TableRow {...args} />
    </>
  )
}

export const Default = {
  render: (args: TableRowProps) => {
    return <Template {...args} />
  },
}

export const Skeletons = {
  render: () => {
    return (
      <TableRowSkeletons
        gridTemplateColumns='minmax(100px, 1fr) 100px 125px 150px 200px'
        columnsLength={5}
      />
    )
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies TableRowProps
// }

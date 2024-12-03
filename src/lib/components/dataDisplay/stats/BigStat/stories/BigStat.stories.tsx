//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'

import BigStat, { type BigStatProps } from '../BigStat.js'
import BigPersonIcon from '../../../../icons/BigPersonIcon.js'

const defaultArgs: BigStatProps = {
  icon: <BigPersonIcon />,
  label: 'Label',
}

export default {
  title: 'lib/components/dataDisplay/stats/BigStat',
  component: BigStat,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: BigStatProps) => {
  return (
    <>
      <BigStat {...args} />
    </>
  )
}

export const Default = {
  render: (args: BigStatProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies BigStatProps
// }

//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'

import StatWithIcon, { type StatWithIconProps } from '../StatWithIcon.js'
import ControllerIcon from '../../../icons/ControllerIcon.js'

const defaultArgs: StatWithIconProps = {
  icon: <ControllerIcon />,
  loading: false,
  title: 'Visits',
  value: '1,000,000',
}

export default {
  title: 'lib/components/dataDisplay/StatWithIcon',
  component: StatWithIcon,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: StatWithIconProps) => {
  return (
    <>
      <StatWithIcon {...args} />
    </>
  )
}

export const Default = {
  render: (args: StatWithIconProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies StatWithIconProps
// }

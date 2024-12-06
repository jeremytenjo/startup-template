//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'

import SubSettingTitle, { type SubSettingTitleProps } from '../SubSettingTitle.js'

const defaultArgs: SubSettingTitleProps = {
  title: 'Control who can message you',
  subTitle:
    'Depending on the setting you select, different people can send you a direct message.',
}

export default {
  title: 'pagesContent/settings/_common/SubSettingTitle',
  component: SubSettingTitle,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: SubSettingTitleProps) => {
  return (
    <>
      <SubSettingTitle {...args} />
    </>
  )
}

export const Default = {
  render: (args: SubSettingTitleProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies SubSettingTitleProps
// }

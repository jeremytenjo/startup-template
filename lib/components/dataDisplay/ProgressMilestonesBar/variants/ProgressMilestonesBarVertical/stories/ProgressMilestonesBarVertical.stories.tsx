//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'

import ProgressMilestonesBarVertical, {
  type ProgressMilestonesBarVerticalProps,
} from '../ProgressMilestonesBarVertical.js'
import { ProgressMilestonesBarStoryDefaultArgs } from '../../../stories/ProgressMilestonesBar.stories.js'

const defaultArgs: ProgressMilestonesBarVerticalProps =
  ProgressMilestonesBarStoryDefaultArgs

export default {
  title:
    'lib/components/dataDisplay/ProgressMilestonesBar/variants/ProgressMilestonesBarVertical',
  component: ProgressMilestonesBarVertical,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: ProgressMilestonesBarVerticalProps) => {
  return (
    <>
      <ProgressMilestonesBarVertical {...args} />
    </>
  )
}

export const Default = {
  render: (args: ProgressMilestonesBarVerticalProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies ProgressMilestonesBarVerticalProps
// }

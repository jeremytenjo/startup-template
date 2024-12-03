//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import AsyncTester from '@useweb/async-tester'

import romonitorGetPlaceUsersStats, {
  type RomonitorGetPlaceUsersStatsProps,
  type RomonitorGetPlaceUsersStatsReturn,
} from '../romonitorGetPlaceUsersStats.js'

const defaultArgs: RomonitorGetPlaceUsersStatsProps = {
  placeId: 18799085098,
}

export default {
  title: 'lib/integrations/RoMonitor/utils/romonitorGetPlaceUsersStats',
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: RomonitorGetPlaceUsersStatsProps) => {
  const fn = async (triggerProps = {}) => {
    return await romonitorGetPlaceUsersStats({ ...args, ...triggerProps })
  }

  return (
    <>
      <AsyncTester<RomonitorGetPlaceUsersStatsReturn, RomonitorGetPlaceUsersStatsProps>
        fn={fn}
        autoExec
      />
    </>
  )
}

export const Default = {
  render: (args: RomonitorGetPlaceUsersStatsProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies RomonitorGetPlaceUsersStatsProps
// }

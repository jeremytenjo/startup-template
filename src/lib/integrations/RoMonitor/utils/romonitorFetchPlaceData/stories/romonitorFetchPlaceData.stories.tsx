//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import AsyncTester from '@useweb/async-tester'

import romonitorFetchPlaceData, {
  type RomonitorFetchPlaceDataProps,
  type RomonitorFetchPlaceDataReturn,
} from '../romonitorFetchPlaceData.js'

const last14DaysIso = new Date(
  new Date().setDate(new Date().getDate() - 14),
).toISOString()

const todayIso = new Date().toISOString()

const defaultArgs: RomonitorFetchPlaceDataProps = {
  placeId: 18799085098,
  startDateISO: last14DaysIso,
  endDateISO: todayIso,
  dataType: 'ccus',
}

export default {
  title: 'lib/integrations/RoMonitor/utils/romonitorFetchPlaceData',
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: RomonitorFetchPlaceDataProps) => {
  const fn = async (triggerProps = {}) => {
    return await romonitorFetchPlaceData({ ...args, ...triggerProps })
  }

  return (
    <>
      <AsyncTester<RomonitorFetchPlaceDataReturn, RomonitorFetchPlaceDataProps>
        fn={fn}
        autoExec
      />
    </>
  )
}

export const Default = {
  render: (args: RomonitorFetchPlaceDataProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies RomonitorFetchPlaceDataProps
// }

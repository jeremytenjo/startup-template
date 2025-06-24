//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'

import ProgressMilestonesBar, {
  type ProgressMilestonesBarProps,
} from '../ProgressMilestonesBar.js'
import GreenArrowDownIcon from '../../../icons/GreenArrowDownIcon.js'

const progress = 33

export const ProgressMilestonesBarStoryDefaultArgs: ProgressMilestonesBarProps = {
  progress,
  milestoneComponentWidth: 70,

  progressPoint: {
    component: (
      <Box
        data-id='ProgressPointCHld'
        sx={{
          textAlign: 'center',
        }}
      >
        <Text text={`${progress}%`} tag='p' sx={{}} />
        <Text text={`$2,500`} tag='p' sx={{}} />
        <Text text={`15K Impressions`} tag='p' sx={{}} />
        <GreenArrowDownIcon
          sx={{
            mt: 1,
          }}
        />
      </Box>
    ),
    componentWidth: 100,
    componentHeight: 120,
  },
  milestones: [
    {
      percent: 0,
      component: (
        <Box data-id='BoxName' sx={{}}>
          <Text text={`Upfront Payment`} tag='p' sx={{}} />
          <Text text={`$300`} tag='p' sx={{}} />
        </Box>
      ),
    },
    {
      percent: 25,
      component: (
        <Box data-id='BoxName' sx={{}}>
          <Text text={`20K Impressions`} tag='p' sx={{}} />
          <Text text={`$300`} tag='p' sx={{}} />
        </Box>
      ),
    },
    {
      percent: 50,
      component: (
        <Box data-id='BoxName' sx={{}}>
          <Text text={`50K Impressions`} tag='p' sx={{}} />
          <Text text={`$300`} tag='p' sx={{}} />
        </Box>
      ),
    },
    {
      percent: 75,
      component: (
        <Box data-id='BoxName' sx={{}}>
          <Text text={`75K Impressions`} tag='p' sx={{}} />
          <Text text={`$300`} tag='p' sx={{}} />
        </Box>
      ),
    },
    {
      percent: 100,
      component: (
        <Box data-id='BoxName' sx={{}}>
          <Text text={`100K Impressions`} tag='p' sx={{}} />
          <Text text={`$300`} tag='p' sx={{}} />
        </Box>
      ),
    },
  ],
}

export default {
  title: 'lib/components/dataDisplay/ProgressMilestonesBar',
  component: ProgressMilestonesBar,
  args: ProgressMilestonesBarStoryDefaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: ProgressMilestonesBarProps) => {
  return (
    <Box
      sx={{
        '[data-id="BoxName"]': {
          textAlign: 'center',
        },
      }}
    >
      <ProgressMilestonesBar {...args} />
    </Box>
  )
}

export const Default = {
  render: (args: ProgressMilestonesBarProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies ProgressMilestonesBarProps
// }

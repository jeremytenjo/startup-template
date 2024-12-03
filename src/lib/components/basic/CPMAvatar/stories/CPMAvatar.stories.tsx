//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'

import userStubs from '../../../../../data/users/users.stubs.js'
import CpmAvatar, { type CpmAvatarProps } from '../CpmAvatar.js'

const defaultArgs: CpmAvatarProps = {
  user: userStubs[0],
  loading: false,
}

export default {
  title: 'lib/components/basic/Cpm Avatar',
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: typeof defaultArgs) => {
  return (
    <>
      <CpmAvatar {...args} />
    </>
  )
}

export const Default = {
  render: (args: CpmAvatarProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies CpmAvatarProps
// }

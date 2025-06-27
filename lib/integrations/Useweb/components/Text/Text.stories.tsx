import React from 'react'
import Text, { type TextProps } from '@useweb/ui/Text'

export { default as Typography } from '../../theme/tokens/stories/theme.typography.js'

const defaultArgs: TextProps = { text: 'hello', variant: 'h1' }

export default {
  title: 'lib/components/useweb/Text',
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

export const Default = {
  render: (args) => {
    return (
      <>
        <Text {...args} />
      </>
    )
  },
}

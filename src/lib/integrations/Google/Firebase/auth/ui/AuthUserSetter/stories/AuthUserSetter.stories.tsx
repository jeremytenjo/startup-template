//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'

import AuthUserSetter, { type AuthUserSetterProps } from '../AuthUserSetter.js'

const defaultArgs: AuthUserSetterProps = {
  open: true,
}

export default {
  title: 'lib/components/auth/Auth User Setter',
  args: defaultArgs,
  // https://storybook.js.org/docs/react/writing-docs/docs-page#remixing-docspage-using-doc-blocks
  parameters: {},
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: typeof defaultArgs) => {
  return (
    <>
      <AuthUserSetter {...args} />
    </>
  )
}

export const Default = {
  render: (args) => {
    return <Template {...args} />
  },
}

// const variantArgs: AuthUserSetterProps = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }

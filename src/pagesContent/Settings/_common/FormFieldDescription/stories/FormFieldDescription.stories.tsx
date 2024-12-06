//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'

import FormFieldDescription, {
  type FormFieldDescriptionProps,
} from '../FormFieldDescription.js'

const defaultArgs: FormFieldDescriptionProps = {
  title: 'Allow messages from anyone',
  subTitle: 'People you follow will still be able to message you',
}

export default {
  title: 'pagesContent/settings/_common/FormFieldDescription',
  component: FormFieldDescription,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: FormFieldDescriptionProps) => {
  return (
    <>
      <FormFieldDescription {...args} />
    </>
  )
}

export const Default = {
  render: (args: FormFieldDescriptionProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies FormFieldDescriptionProps
// }

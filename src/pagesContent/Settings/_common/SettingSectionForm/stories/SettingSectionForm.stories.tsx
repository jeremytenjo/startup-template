//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'

import SettingSectionForm, {
  type SettingSectionFormProps,
} from '../SettingSectionForm.js'

type FormSchema = {
  name: string
}

const defaultArgs: SettingSectionFormProps<FormSchema> = {
  title: 'SettingSectionForm',
  children: 'SettingSectionForm',
  onSubmit: ({ formValues }) => {
    console.log(formValues)
  },
  loading: false,
  disabled: false,
  error: false,
}

export default {
  title: 'pagesContent/settings/_common/SettingSectionForm',
  component: SettingSectionForm,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: SettingSectionFormProps<FormSchema>) => {
  return (
    <>
      <SettingSectionForm {...args} />
    </>
  )
}

export const Default = {
  render: (args: SettingSectionFormProps<FormSchema>) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies SettingSectionFormProps<FormSchema>
// }

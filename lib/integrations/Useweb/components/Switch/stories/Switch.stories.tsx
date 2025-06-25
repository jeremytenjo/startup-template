//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'
import Switch, { type SwitchProps } from '@useweb/ui/Switch'
import Form from '@useweb/ui/Form'

const defaultArgs: SwitchProps<any> = {
  name: 'Switch',
}

export default {
  title: 'lib/components/useweb/Switch',
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: typeof defaultArgs) => {
  return (
    <Form
      onSubmit={(formData) => {
        return console.log(formData)
      }}
    >
      <Switch<any> {...args} />
    </Form>
  )
}

export const Default = {
  render: (args: SwitchProps<any>) => {
    return <Template {...args} />
  },
}

// const variantArgs: SwitchProps = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }

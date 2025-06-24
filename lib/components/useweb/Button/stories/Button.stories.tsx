import React from 'react'
import Button, { type ButtonProps } from '@useweb/ui/Button'

export default {
  title: 'lib/components/useweb/Button',
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['contained', 'outlined', 'text'],
      },
    },
  },
}

const Template = (args) => {
  return (
    <>
      <Button {...args}>Button</Button>
    </>
  )
}

export const Default = Template.bind({}) as any

const defaultArgs: ButtonProps = {
  name: 'testbutton',
  variant: 'green',
}

Default.args = defaultArgs

export const Disabled = Template.bind({}) as any

const DisabledProps: ButtonProps = {
  ...defaultArgs,
  disabled: true,
}

Disabled.args = DisabledProps

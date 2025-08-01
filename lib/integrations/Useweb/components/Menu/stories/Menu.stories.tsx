import React from 'react'
import Menu, { type MenuProps } from '@useweb/ui/Menu'

export default {
  title: 'lib/components/useweb/Menu',
}

const Template = (args) => {
  return (
    <>
      <Menu {...args}>Menu</Menu>
    </>
  )
}

export const Default = Template.bind({}) as any

const defaultArgs: MenuProps = {
  id: 'menu',
  items: [<div key='1'>hello</div>],
  triggerComponent: <div>trigger</div>,
}

Default.args = defaultArgs

// export const Variant = Template.bind({}) as any

// const VariantArgs: MenuProps = {
//  ...defaultArgs,
//  name: 'World',
// }

// Variant.args = VariantArgs

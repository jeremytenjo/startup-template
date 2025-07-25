import React from 'react'
import IconButton, { type IconButtonProps } from '@useweb/ui/IconButton'

import IconHamburger from '../../../../../components/icons/IconHamburger.js'

export default {
  title: 'lib/components/useweb/IconButton',
}

const Template = (args) => {
  return (
    <div style={{ padding: '20px' }}>
      <IconButton {...args}>
        <IconHamburger />
      </IconButton>
    </div>
  )
}

export const Default = Template.bind({}) as any

const defaultArgs: IconButtonProps = {
  name: 'IconButton',
}

Default.args = defaultArgs

// export const Variant = Template.bind({}) as any

// const VariantArgs: IconButtonProps = {
//  ...defaultArgs,
//  name: 'World',
// }

// Variant.args = VariantArgs

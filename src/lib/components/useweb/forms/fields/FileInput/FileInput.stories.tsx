/* eslint-disable storybook/prefer-pascal-case */
import React from 'react'
import FileInput from '@useweb/ui/FileInput'
import Form from '@useweb/ui/Form'

import Typography from '../../../../../../theme/tokens/stories/theme.typography.js'

export default {
  title: 'lib/components/useweb/FileInput',
}

export const Default = {
  render: (args) => {
    return (
      <Form
        onSubmit={(formValues) => {
          console.log(formValues)
        }}
      >
        <FileInput {...args} />
      </Form>
    )
  },
}

export const typography = Typography

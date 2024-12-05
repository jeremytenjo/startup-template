import React from 'react'
import type { ButtonProps } from '@useweb/ui/Button'
import Button from '@useweb/ui/Button'

import GoogleIcon from '../../../../../../../lib/components/icons/GoogleIcon.js'

export type ContinueWithGoogleButtonProps = {
  onClick?: any
  buttonProps?: Partial<ButtonProps>
  sx?: ButtonProps['sx']
}

export default function ContinueWithGoogleButton(props: ContinueWithGoogleButtonProps) {
  return (
    <Button
      {...(props.buttonProps || {})}
      name='continue with google'
      onClick={props.onClick || null}
      sx={{
        backgroundColor: 'neutral.400',
        color: 'neutral.100',
        borderColor: 'neutral.250',
        display: 'flex',
        gap: 2,
        height: '42px',
        fontWeight: 600,
        '&:hover, &:active, &:focus': {
          boxShadow: 'none',
          backgroundColor: 'neutral.400',
          borderColor: 'neutral.250',
        },

        '& path': {
          fill: '#B6C1D1',
        },

        ...(props.sx || {}),
      }}
    >
      <GoogleIcon
        sx={{
          width: '20px',
        }}
      />
      Continue with Google
    </Button>
  )
}

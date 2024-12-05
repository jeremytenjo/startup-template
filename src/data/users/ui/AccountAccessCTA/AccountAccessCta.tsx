import React from 'react'
import type { ButtonProps } from '@useweb/ui/Button'
import Button from '@useweb/ui/Button'

export type AccountAccessCtaProps = {
  loading?: boolean
  text: string
  buttonProps?: Partial<ButtonProps>
}

export default function AccountAccessCta(props: AccountAccessCtaProps) {
  return (
    <Button
      name={`${props.text} button`}
      type='submit'
      variant='outlined'
      {...(props.buttonProps || {})}
      loading={props.loading}
      sx={{
        height: '42px',
      }}
    >
      {props.text}
    </Button>
  )
}

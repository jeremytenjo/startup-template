import React from 'react'
import Box, { type BoxProps } from '@useweb/ui/Box'
import type { ButtonProps } from '@useweb/ui/Button'
import Button from '@useweb/ui/Button'
import ErrorMessage from '@useweb/ui/ErrorMessage'

import useVerifyYoutubeAccount from '../useVerifyYoutubeAccount/useVerifyYoutubeAccount.js'
import useAuth from '../../../../../../data/users/utils/useAuth/useAuth.js'
import RevokeYoutubeAccountAccessButton from '../../RevokeYoutubeAccountAccess/ui/RevokeYoutubeAccountAccessButton/RevokeYoutubeAccountAccessButton.js'

export type VerifyYoutubeAccountButtonProps = {
  isVerified: boolean
  sx?: BoxProps['sx']
  buttonProps?: Partial<ButtonProps>
}

export default function VerifyYoutubeAccountButton(
  props: VerifyYoutubeAccountButtonProps,
) {
  const auth = useAuth()
  const verifyyoutubeaccount = useVerifyYoutubeAccount()

  return props.isVerified ? (
    <RevokeYoutubeAccountAccessButton />
  ) : (
    <Box
      data-id='VerifyYoutubeAccount'
      sx={{
        width: ['100%', 'fit-content'],
        ...(props.sx || {}),
      }}
    >
      <Button
        loading={verifyyoutubeaccount.loading}
        sx={{
          width: ['100%', , 'fit-content'],
        }}
        onClick={() => verifyyoutubeaccount.exec({ user: auth.user })}
        {...(props.buttonProps || {})}
        name='verify youtube Account'
      >
        Verify Youtube Account
      </Button>

      <ErrorMessage
        error={verifyyoutubeaccount.error}
        message={'Error verifying youtube account'}
        sx={{
          my: 2,
        }}
      />
    </Box>
  )
}

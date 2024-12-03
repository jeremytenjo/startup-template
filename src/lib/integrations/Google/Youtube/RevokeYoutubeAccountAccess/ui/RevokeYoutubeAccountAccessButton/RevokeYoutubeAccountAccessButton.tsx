import React from 'react'
import Box, { type BoxProps } from '@useweb/ui/Box'
import ErrorMessage from '@useweb/ui/ErrorMessage'
import ConfirmationButton from '@useweb/ui/ConfirmationButton'

import useRevokeYoutubeAccountAccess from '../../useRevokeYoutubeAccountAccess/useRevokeYoutubeAccountAccess.js'
import useAuth from '../../../../../../../data/users/utils/useAuth/useAuth.js'

export type RevokeYoutubeAccountAccessButtonProps = {
  sx?: BoxProps['sx']
}

export default function RevokeYoutubeAccountAccessButton(
  props: RevokeYoutubeAccountAccessButtonProps,
) {
  const auth = useAuth()
  const revokeyoutubeaccountaccess = useRevokeYoutubeAccountAccess()

  return (
    <Box
      data-id='RevokeYoutubeAccountAccess'
      sx={{
        width: ['100%', 'fit-content'],

        ...(props.sx || {}),
      }}
    >
      <ConfirmationButton
        fn={{
          fn: async () => {
            await revokeyoutubeaccountaccess.exec({ user: auth.user })
          },
        }}
        acceptButtonProps={{
          acceptText: 'Unlink Youtube account',
        }}
        triggerButtonProps={{
          name: 'Unlink draft',
          label: 'Unlink Youtube account',
          sx: {
            width: ['100%', 'fit-content'],
            whiteSpace: 'nowrap',
          },
        }}
        dialogProps={{
          title: 'Unlink Youtube account',
          children: (
            <>
              Are you sure you want to revoke your Youtube account? You will lose your
              verified status and won`t appear in search results and able to accept jobs
              anymore.
            </>
          ),
        }}
      />

      <ErrorMessage
        error={revokeyoutubeaccountaccess.error}
        message={'Error revoking youtube account access'}
        sx={{
          my: 2,
        }}
      />
    </Box>
  )
}

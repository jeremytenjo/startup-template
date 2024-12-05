import React from 'react'
import Box from '@useweb/ui/Box'

import PageTitleHeading from '../../../../../../lib/layouts/PageTitleHeading/PageTitleHeading.js'
import ResetPasswordForm from '../../../../utils/resetPassword/resetPasswordForm/ui/ResetPasswordForm.js'
import type { UseResetPasswordForm } from '../../../../utils/resetPassword/resetPasswordForm/useResetPasswordForm/useResetPassword.js'

export type UserAccessCardResetPasswordProps = {
  onSuccess: UseResetPasswordForm['onSuccess']
}

export default function UserAccessCardResetPassword(
  props: UserAccessCardResetPasswordProps,
) {
  return (
    <Box data-id='UserAccessCardResetPassword' sx={{}}>
      <PageTitleHeading
        title='Password Reset'
        subTitle='Please fill in the email that you used to register. You will be sent an email with instructions on how to reset your password.'
        sx={{
          textAlign: 'center',
        }}
        size={3}
      />

      <ResetPasswordForm onSuccess={props.onSuccess} />
    </Box>
  )
}

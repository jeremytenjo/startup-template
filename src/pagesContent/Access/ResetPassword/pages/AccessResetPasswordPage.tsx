import React from 'react'
import Box from '@useweb/ui/Box'

import AccessResetPasswordPageLayout from '../layouts/AccessResetPasswordPageLayout/AccessResetPasswordPageLayout.js'
import UserAccessCard from '../../../../data/users/ui/UserAccessCard/UserAccessCard.js'

export default function AccessResetPasswordPage() {
  return (
    <AccessResetPasswordPageLayout>
      <Box data-id='AccessResetPasswordPage' sx={{}}>
        <UserAccessCard type='reset-password' />
      </Box>
    </AccessResetPasswordPageLayout>
  )
}
